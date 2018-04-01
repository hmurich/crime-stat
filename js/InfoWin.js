/**
 * Author: Шестаков П.Н.
 * Script: информационное окно
 */
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojox/charting/Chart2D",
    "dojo/fx/easing",
    "dojo/promise/all",

    "esri/dijit/PopupTemplate",

    "crime/Cfg",
    "crime/Util",
    "crime/Const",
    "dojo/i18n!crime/nls/uInterface"
], function (declare, domConstruct, Chart2D, easing, all, PopupTemplate, Cfg, Util, Const, i18n) {

        var InfoWin = function () {
        };

        //создание шаблона всплывающего окна
        InfoWin.createTemplate = function () {
            var _title;
            var _description;
            var _mediaInfos = [];
            var _fieldInfos = [];
            if (Cfg.statisticsLevel == Const.LVL_CITY) {
                _title = i18n.infoWinTitle;
                var OrganFld = "ORGAN";
                if (dojo.locale == 'kk') {
                    OrganFld = "ORGAN_KZ";
                } else if (dojo.locale == 'en') {
                    OrganFld = "ORGAN_EN";
                }
                _description = '<b>'+i18n.infoWinColNum+'</b>{UD}<br/>' +
                    '<b>'+i18n.infoWinColOrg+'</b>{'+OrganFld+'}<br/>' +
                    //'<b>'+i18n.infoWinColDate+'</b>{DAT_VOZB_STR}<br/>' +
                    '<b>'+i18n.infoWinColLaw+'</b>{STAT_NAME}<br/>' +
                    '<b>'+i18n.infoWinColHard+'</b>{HARD_NAME}<br/>' +
                    '<b>'+i18n.infoWinColDateFulfillment+'</b>{DAT_SOVER_STR}<br/>' +
                    '<b>'+i18n.infoWinColPlace+'</b>{FE1R29P1}<br/>'+
                    '<b>'+i18n.infoWinColStreet+'</b>{FZ1R18P5}<br/>' +
                    '<b>'+i18n.infoWinColHouse+'</b>{FZ1R18P6}';
            } else {
                _title = '';
                _description = '';
            }

            return new PopupTemplate({
                "title": _title,
                "mediaInfos": _mediaInfos,
                "fieldInfos": _fieldInfos,
                "description": _description,
                "showAttachments": false,
                "widgetsInTemplate": true
            });
        }


        InfoWin.createTemplateUPP = function () {
            var _title;
            var _description;
            var _mediaInfos = [];
            var _fieldInfos = [];

                _title = '<b>'+i18n.lblName+': </b>{SHORT_NAME}';
                _description =  '<b>'+i18n.titleAddress+': </b>{ADDRESS}<br/>' +
                    '<b>'+i18n.lblDescription+': </b>{DESCRIPTION}<br/>' +
                    '<br/>' +
                    '<a id="aExternal0" target="_blank" href="http://mvd.gov.kz/portal/page/portal/mvd/MVD/mvd_nav_iu/upp" >'+
                    i18n.aMVD+'</a>';

            return new PopupTemplate({
                "title": _title,
                "mediaInfos": _mediaInfos,
                "fieldInfos": _fieldInfos,
                "description": _description,
                "showAttachments": false,
                "widgetsInTemplate": true
            });
        }


        //надписи для столбцов диаграммы
        InfoWin.getFieldLabels = function () {
            var year = Cfg.parDate.getFullYear();
            var month = Cfg.parDate.getMonth();
            var day = Cfg.parDate.getDate();
            var labels = [];
            for (var i = 0; i < 3; i++) {
                var _date;
                var _year = year - i;
                if ((_year < 2015) || ((month == 1) && (day == 29))) {//до 01.01.2015
                    _date = new Date(_year, month + 1, 0);
                } else { //c 01.01.2015
                    _date = new Date(_year, month, day);
                }
                labels.push({id: i, lbl: i18n.infoWinChartDate + Util.dateToStr(_date, "RU")});
            }
            return labels;
        }

        //содержимое информационного окна рисованное вручную
        InfoWin.setContent = function (feature, map) {
            var _content = domConstruct.create('div');
            var chart = null;

            var divText = domConstruct.create("div", {}, _content); //текстовая информация
            var text = '<b>' + Util.nvl(feature.attributes.NAME, "") + '</b><hr>' +
                '<b>'+i18n.infoWinRegColK+'</b>' + Util.nvl(feature.attributes.K, "") +
                '<br/><b>'+i18n.infoWinRegColK10+'</b>' + Util.nvl(feature.attributes.K10, "") + '<br/><br/>';
            divText.innerHTML = text;
            var divChart = domConstruct.create("div", {}, _content); //диаграмма
            chart = new Chart2D(divChart);
            var fieldLabels = InfoWin.getFieldLabels();
            //ось X
            chart.addAxis("x", {fixLower: "minor", fixUpper: "minor", natural: true,
                max: 4, //число меток
                labels: [ //метки
                    {value: 1, text: fieldLabels[2].lbl},
                    {value: 2, text: fieldLabels[1].lbl},
                    {value: 3, text: fieldLabels[0].lbl},
                    {value: 4, text: ""}
                ]});
            //ось Y
            chart.addAxis("y", {vertical: true,
                fixLower: "minor", //алгоритм вычисления меток
                fixUpper: "minor", //minor - максимальная метка на оси несущественно отличаеться от максимального значения
                includeZero: true //нулевая отметка
            });
            //Начертания
            chart.addPlot("lines", { //наименование
                type: "Markers", //тип - линии
                labels: true, //показывать надписи
                labelStyle: "outside", //надписи извне
                precision: 0, //число цифр после запятой
                markers: true  //показывать символы
            });
            chart.addPlot("cols", {
                type: "Columns", //тип колонки
                gap: 1, //разрыв между столбцами
                maxBarSize: 30, //ширина
                minBarSize: 30,
                animate: { duration: 1000, easing: easing.linear} //анимация
            });
            //данные
            chart.addSeries("Кол-во", //наименование
                [Util.nvl(feature.attributes.BEFORE_LAST_K, 0), Util.nvl(feature.attributes.LAST_K, 0), Util.nvl(feature.attributes.K, 0)], //данные
                {   stroke: {//тип линий и контура
                    color: "#1E90FF",
                    width: 5
                },
                    fill: "#1874CD", //цвет наполнения
                    plot: "cols" //наименование начертания
                });
            chart.addSeries("Количество",
                [Util.nvl(feature.attributes.BEFORE_LAST_K, 0), Util.nvl(feature.attributes.LAST_K, 0), Util.nvl(feature.attributes.K, 0)],
                {   stroke: {
                    color: "#EE6363",
                    width: 2
                },
                    fill: "#FFC1C1",
                    plot: "lines"
                });
            map.infoWindow.setContent(_content);
            if (chart) {
                chart.resize(330, 200);
                chart.render();
            }
        }

        return InfoWin;

    }
)
