/**
 * Author: Шестаков П.Н.
 * Script: рисование данных по областям и районам
 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/on",
    "dojo/dom-construct",

    "esri/graphic",
    "esri/domUtils",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "esri/renderers/ClassBreaksRenderer",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font",

    "crime/Cfg",
    "crime/Const",
    "crime/InfoWin",
    "crime/Util",
    "dojo/i18n!crime/nls/uInterface"

], function (declare, dom, on, domConstruct, Graphic, domUtils, SimpleFillSymbol, Color, ClassBreaksRenderer, TextSymbol, Font, Cfg, Const, InfoWin, Util, i18n) {

    return declare(null, {
        constructor: function (map) {
            this.map = map;
        },
        paint: function () {
            var infoTemplate = InfoWin.createTemplate(); //информационное окно
            var coordinates; //массив с координатами регионов
            var codes; //коды регионов, которые рисуются на верхнем слое, из-за того, что могут быть перекрыты
            var nameField = "NAME"; //имя поле "Наименование региона"
            var codeField = "CODE"; //имя поле "Код региона"
            var field; //имя поле "Наименование региона" для координат
            var rendField = "K"; //поле значение которого используеться для градации заливки и значение которого отображаеться
            var infoType;

            if (Cfg.statisticsLevel == Const.LVL_AREA) {
                coordinates = this.map.coordinatesArea;
                codes = Const.Capitals;
                field = "S1";
                dom.byId("countRecord").innerHTML = "";
                dom.byId("textView").innerHTML = i18n.statusViewArea;
                infoType = Const.INFO_TYPE_AREA;
            } else {
                coordinates = this.map.coordinatesRegion;
                field = "NAME";
                codes = Const.Cities;
                dom.byId("countRecord").innerHTML = "";
                dom.byId("textView").innerHTML = i18n.statusViewRegion;
                infoType = Const.INFO_TYPE_REGIONS;
            }
            //атрибут  EXIST обозначает:
            //если false данных по региону нет, иначе есть
            for (var i = 0; i < coordinates.length; i++) {
                coordinates[i].attributes['EXIST'] = false;
            }
            var sum = 0;
            for (var i = 0; i < this.map.queryResult.length; i++) {
                var feature = this.map.queryResult[i];
                feature.setInfoTemplate(infoTemplate);
                sum += feature.attributes[rendField];
                var indx = Util.findInGraphics(coordinates, 'CODE', feature.attributes[codeField]);
                if (indx >= 0) {//ищем геометрию для данных
                    feature.setGeometry(coordinates[indx].geometry); //добавление геометрии
                    coordinates[indx].attributes['EXIST'] = true;
                    feature.attributes[nameField] = coordinates[indx].attributes[field];
                    this.addGraphic(feature, infoTemplate, codes, codeField);
                    this.addText(feature.attributes[rendField], feature, codes, codeField);
                }
            }
            for (var i = 0; i < coordinates.length; i++) { //добавляем регионы без данных
                if (coordinates[i].attributes['EXIST'] == false) {
                    var feature = coordinates[i];
                    feature.attributes[codeField] = feature.attributes['CODE'];
                    feature.attributes[nameField] = feature.attributes[field];
                    this.addGraphic(feature, infoTemplate, codes, codeField);
                }
            }
            this.map.queryResult.sort(function (x, y) {  //сортировка
                    return (y.attributes.K - x.attributes.K)
                }
            );
            var colorArr = Const.DEF_COLORS; //цветовая палитра
            var breaks = this.calcBreaks(this.map.queryResult, sum, colorArr.length, rendField);
            var renderer = this.createRenderer(rendField, breaks, colorArr);
            this.map.canvasRegion.setRenderer(renderer);
            this.createLegend(renderer.infos);
            this.map.canvasRegion.show();
            this.map.canvasCities.setRenderer(renderer);
            this.map.canvasCities.show();
            this.map.canvasText.show();
            this.map.infoWindow.resize(345, 325);
            this.map.info.fill(this.map.queryResult, {type: infoType, nameField: nameField, codeField: codeField, label: i18n.statusViewCrime});
            if (Cfg.scaleMap < Const.SCALE_AREA) {
                this.map.setFullExtent();
            }
        },
        addGraphic: function (feature, infoTemplate, codes, codeField) { //добавление региона
            if (codes.indexOf(feature.attributes[codeField]) >= 0) {
                this.map.canvasCities.add(feature);
            } else {
                this.map.canvasRegion.add(feature);
            }
        },
        addText: function (text, feature, codes, codeField) {//добавление текста
            var font = new Font("7pt", Font.STYLE_NORMAL,
                Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER, "Arial");
            font.setDecoration("underline");
            var textSymbol = new TextSymbol(text.toString(), font, new Color([0, 0, 255]));
            var label = new Graphic(feature.geometry.getCentroid(), textSymbol, feature.attributes, feature.infoTemplate);
            this.map.canvasText.add(label);
        },
        calcBreaks: function (data, sum, count, rendField) { //вычисление делений для градации
            //data отсортирована по количеству по убыванию
            var min = 0, max = 0, avg = 0, delta = 1;
            var breaks = [], nums = [];
            if (data.length == 0) { //нет данных
                min = 0;
            } else if (data.length < count) {
                min = Math.max(data[data.length - 1].attributes[rendField], 0);
                max = Math.max(data[0].attributes[rendField], 0);
                if ((max - min) < count) {
                    min = 0;
                }
                delta = Math.max(Math.round((min + max) / count), 1);
            } else {
                min = data[data.length - 1].attributes[rendField];
                avg = Math.round(sum / data.length);
                delta = Math.max(Math.round((avg - min) / (count / 2 )), 1);
            }

            var num = min;
            for (var i = 0; i < count - 1; i++) {
                num += delta;
                nums[i] = num;
            }

            breaks.push(Object.create({min: 0, max: nums[0] - 1}));
            for (var i = 0; i < count - 2; i++) {
                breaks.push(Object.create({min: nums[i], max: nums[i + 1] - 1}));
            }
            breaks.push(Object.create({min: nums[count - 2], max: Infinity}));
            return breaks;
        },
        createRenderer: function (rendField, breaks, colorArr) { //получить градацию цветов
            var symbol = new SimpleFillSymbol();
            symbol.setColor(new Color([245, 245, 245, Const.OPACITY])); //WhiteSmoke для тех у кого нет данных
            var renderer = new ClassBreaksRenderer(null, rendField);
            for (var i = 0; i < breaks.length; i++) {
                var text = breaks[i].min
                if (breaks[i].max == Infinity) {
                    text += i18n.legendMore
                } else {
                    text = text + " - " + breaks[i].max;
                }
                renderer.addBreak({
                    minValue: breaks[i].min,
                    maxValue: breaks[i].max,
                    symbol: new SimpleFillSymbol().setColor(colorArr[i]),
                    label: text
                });
            }
            return  renderer;
        },
        createLegend: function (infos) { //прорисовка легенды по градации
            var legendDiv = dom.byId("mapLegendDiv");
            domConstruct.empty(legendDiv);
            for (var i = 0; i < infos.length; i++) {
                domConstruct.create("div", {
                    style: {
                        float: "left",
                        width: "15px",
                        height: "15px",
                        border: "1px solid black",
                        backgroundColor: infos[i].symbol.color
                    }}, legendDiv);
                domConstruct.create("div", {
                    innerHTML: infos[i].label,
                    style: {
                        float: "left",
                        paddingLeft: "5px",
                        marginTop: "3px",
                        whiteSpace: "nowrap",
                        fontSize: "0.8em"
                    }}, legendDiv);
                if (i < infos.length - 1) {
                    domConstruct.create("div", {
                        style: {
                            clear: "left",
                            paddingTop: "5px"
                        }}, legendDiv);
                }
            }
            domUtils.show(legendDiv);
        }
    });
});
