/**
 * Author: Шестаков П.Н.
 * Script: Данные в виде таблицы и диаграммы
 */
define([  // объявление модуля
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-prop",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-style",
    "dojo/query",
    "dojo/aspect",
    "dojo/promise/all",
    "dojo/dom-construct",
    "dojo/_base/connect",

    "dijit/registry",

    "esri/map",
    "esri/geometry/Extent",
    "esri/layers/ArcGISTiledMapServiceLayer",

    "esri/domUtils",
    "esri/toolbars/navigation",
    "esri/dijit/Scalebar",
    "esri/InfoTemplate",
    "esri/SpatialReference",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/layers/FeatureLayer",
    "esri/renderers/HeatmapRenderer",
    "esri/Color",
    "esri/graphic",
    "esri/toolbars/draw",

    "crime/GeoLocation",
    "crime/Cfg",
    "crime/Const",
    "crime/QuerySDE",
    "crime/PainterCrimePoint",
    "crime/Util",
    "crime/InfoWin",
    "crime/Tools",
    "crime/InfoText",
    "crime/PainterRegion",
    "dojox/charting/Chart2D",
    "dojo/fx/easing",
    "dojo/store/Memory",
    "dojo/store/Observable",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "dojo/i18n!crime/nls/uiStatistic",
    "crime/Dict"

    // Функция обратного вызова, которая должна вернуть объект
], function (declare, dom, domClass, domProp, lang, on, domStyle, query, aspect, all, domConstruct, connect, registry, Map, Extent, ArcGISTiledMapServiceLayer, domUtils, Navigation, Scalebar, InfoTemplate, SpatialReference, GraphicsLayer, SimpleLineSymbol, FeatureLayer, HeatmapRenderer, Color, Graphic, Draw, GeoLocation, Cfg, Const, QuerySDE, PainterCrimePoint, Util, InfoWin, Tools, InfoText, PainterRegion, Chart2D, easing, Memory, Observable, Grid, Selection, nlsInterface, Dict) {
    //приватная часть модуля
    //функция declare объявляет объект
    return declare(null, {//superclass, если null - нет наследования
        dataArea: null,
        dataRegion: null,
        dateLabels: [],
        tblData: null,
        tbl: null,

        constructor: function () { //конструктор
            Cfg.setStatDefaultValue();
            this.dataArea = new Observable(new Memory({idProperty: 'CODE'})), //области
                this.dataRegion = new Observable(new Memory({idProperty: 'CODE'})), //районы

                this.tblData = new Observable(new Memory({idProperty: 'CODE'}));
            this.tbl = new (declare([ Grid, Selection ]))({
                store: this.tblData,
                columns: [
                    {   label: nlsInterface.tblColName,
                        field: 'NAME'
                    },
                    {   label: 'Общее кол-во',
                        field: 'K'
                    },
                    {   label: 'Кол-во на 10 тыс.чел.',
                        field: 'K10'
                    },
                    {   label: 'За прошлый год',
                        field: 'LAST_K'
                    },
                    {   label: 'За позапрошлый год',
                        field: 'BEFORE_LAST_K'
                    }
                ],
                selectionMode: 'single',
                cellNavigation: false
            }, 'tblBody');
            this.setLocale();
            this.bindTools(this);
        },
        setLocale: function () {
            var ctrlStyle = "lang-ru";
            var langCtrl;
            if (dojo.locale == 'kk') {
                ctrlStyle = "lang-kz";
            } else if (dojo.locale == 'en') {
                ctrlStyle = "lang-en";
            }
            langCtrl = dom.byId(ctrlStyle);
            domClass.replace(dom.byId("lang-ru"), "lang-ru", dom.byId("lang-ru").class);
            domClass.replace(dom.byId("lang-kz"), "lang-kz", dom.byId("lang-kz").class);
            domClass.replace(dom.byId("lang-en"), "lang-en", dom.byId("lang-en").class);
            domClass.replace(langCtrl, ctrlStyle + ' selected', langCtrl.class);
            dom.byId("aBack").href = "index.html?locale=" + dojo.locale;
            dom.byId("aBack").title = nlsInterface.aBack;
            dom.byId("mtHome").href = "index.html?locale=" + dojo.locale;
            dom.byId("mtHome").innerHTML = nlsInterface.mtHome;
            dom.byId("lblPeriod").innerHTML = nlsInterface.lblPeriod;
            dom.byId("lblDate").innerHTML = nlsInterface.lblDate;
            dom.byId("lblFilter").innerHTML = nlsInterface.lblFilter;
            dom.byId("applyFilter").innerHTML = nlsInterface.applyFilter;
            dom.byId("lblRegion").innerHTML = nlsInterface.lblRegion;
            dom.byId("lblComparativeDate").innerHTML = nlsInterface.lblComparativeDate;
            dom.byId("lblReg").innerHTML = nlsInterface.lblReg;
            registry.byId("tableTab").set("title", nlsInterface.tableTab);
            registry.byId("comparativeChartTab").set("title", nlsInterface.comparativeChartTab);
            registry.byId("dynamicChartTab").set("title", nlsInterface.dynamicChartTab);
        },
        bindTools: function (stat) { //настройка панели инструментов
            on(registry.byId("parDate"), "change", function (val) {
                if (registry.byId("parDate").validate()) {
                    Cfg.setParDate(val);
                }
            });
            on(dom.byId("applyFilter"), "click", function () {
                stat.showStatistics();
            });

            on(dom.byId("a-lang-kz"), "click", lang.hitch(this, function () {
                if (dojo.locale != "kk") {
                    window.location = "?locale=kk";
                }
            }));

            on(dom.byId("a-lang-ru"), "click", lang.hitch(this, function () {
                if (dojo.locale != "ru") {
                    window.location = "?locale=ru";
                }
            }));

            on(dom.byId("a-lang-en"), "click", lang.hitch(this, function () {
                if (dojo.locale != "en") {
                    window.location = "?locale=en";
                }
            }));
        },
        showStatistics: function () {
            if (Cfg.isValidParams()) {
                Cfg.typeCrime = registry.byId("parCrimeType").value;
                Cfg.typeCrime2015 = registry.byId("parCrimeType").value;
                this.clearGraphics(true);
                this.addGraphics(false);
            }
        },
        addGraphics: function (isOnlyRepaint) {
            this.clearGraphics(false);
            if (isOnlyRepaint) {
                //только перерисовываем не запрашивая
                this.paint();
            } else {//вышли за пределы  области видимости
                //запрос данных с перерисовкой
                this.executeQuery();
            }
        },
        clearGraphics: function (isClearData) {
        },
        paint: function () {
            var reg_code = registry.byId("parObl").value;

            var combo = registry.byId("parReg");
            combo.removeOption(combo.getOptions());


            var arr = this.tblData.query();
            for (var i = 0; i < arr.length; i++) {
                this.tblData.remove(arr[i].CODE);
            }

            arr = [];
            if (reg_code == "1900") {
                combo.addOption({disabled: false, label: nlsInterface.regionRK, selected: false, value: "1900"});
                arr = this.dataArea.query();
            } else {
                arr = this.dataRegion.query(function (reg) {
                    return reg.CODE.substr(0, 4) == reg_code;
                });
            }

            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                this.tblData.put(arr[i]);
                if (obj.CODE != "1900") {
                    combo.addOption({disabled: false, label: obj.NAME, selected: false, value: obj.CODE});
                }
            }

            registry.byId("Tabs").selectChild(registry.byId("tableTab"));

            this.tbl.column(1).label = nlsInterface.tblColK + this.dateLabels[Const.SELECTED_YEAR].lbl;
            this.tbl.column(2).label = nlsInterface.tblColK10 + this.dateLabels[Const.SELECTED_YEAR].lbl;
            this.tbl.column(3).label = nlsInterface.tblColK + this.dateLabels[Const.LAST_YEAR].lbl;
            this.tbl.column(4).label = nlsInterface.tblColK + this.dateLabels[Const.YEAR_BEFORE_LAST].lbl;
            this.tbl.renderHeader();
            this.tbl.refresh();

            on(registry.byId("parReg"), "change", lang.hitch(this, function (val) {
                this.paintDynamicChart(reg_code, val);
            }));

            on(registry.byId("parComparativeDate"), "change", lang.hitch(this, function (val) {
                this.paintComparativeChart(reg_code, arr, val);
            }));

            aspect.after(registry.byId("dynamicChartTab"), "_onShow", lang.hitch(this, function () {
                this.paintDynamicChart(reg_code, registry.byId("parReg").value);
            }));

            aspect.after(registry.byId("comparativeChartTab"), "_onShow", lang.hitch(this, function () {
                this.paintComparativeChart(reg_code, arr, registry.byId("parComparativeDate").value);
            }));

        },
        paintComparativeChart: function (obl_code, arr, year) {
            var arrVal = [];
            var arrLbl = [];
            var shift = 0;
            if (obl_code != "1900") {
                shift = 1;
            }
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                if (obj.CODE != "1900") {
                    if (year == Const.LAST_YEAR) {
                        arrVal.push(Util.nvl(obj.LAST_K, 0));
                    } else if (year == Const.YEAR_BEFORE_LAST) {
                        arrVal.push(Util.nvl(obj.BEFORE_LAST_K, 0));
                    } else {
                        arrVal.push(Util.nvl(obj.K, 0));
                    }
                    arrLbl.push({value: i + shift, text: obj.NAME});
                }
            }
            arrLbl.push({value: arr.length + 1, text: " "});
            var divChart = dom.byId("comparativeChartBody");
            divChart.innerHTML = "";
            var chart = new Chart2D(divChart, {
                title: nlsInterface.comparativeChartTab,
                titlePos: "top",
                titleGap: 25,
                titleFont: "normal normal normal 15pt Arial",
                titleFontColor: "orange"
            });
            //ось X
            chart.addAxis("y", {vertical: true,
                fixLower: "minor", //алгоритм вычисления меток
                fixUpper: "minor", //minor - максимальная метка на оси несущественно отличаеться от максимального значения

                max: arrLbl.length, //число меток
                labels: arrLbl});
            //ось Y
            chart.addAxis("x", {fixLower: "minor", fixUpper: "minor", natural: true, includeZero: true //нулевая отметка


            });
            //Начертания
            chart.addPlot("cols", {
                type: "Bars", //тип колонки
                gap: 1, //разрыв между столбцами
                maxBarSize: 15, //ширина
                minBarSize: 15,
                labels: true, //показывать надписи
                //labelStyle: "outside", //надписи извне
                precision: 0, //число цифр после запятой
                animate: { duration: 1000, easing: easing.linear} //анимация
            });
            //данные
            chart.addSeries("Кол-во", //наименование
                arrVal, //данные
                {   stroke: {//тип линий и контура
                    color: "#98FB98",
                    width: 1
                },
                    fill: "#98FB98", //цвет наполнения
                    plot: "cols" //наименование начертания
                });
            chart.fullRender();
        },
        paintDynamicChart: function (obl_code, reg_code) {
            var feature = null;
            if (obl_code == "1900") {
                feature = this.dataArea.get(reg_code);
            } else {
                feature = this.dataRegion.get(reg_code);
            }
            var divChart = dom.byId("dynamicChartBody");
            divChart.innerHTML = "";

            if (feature) {
                var chart = new Chart2D(divChart, {
                    title: nlsInterface.dynamicChart,
                    titlePos: "top",
                    titleGap: 25,
                    titleFont: "normal normal normal 15pt Arial",
                    titleFontColor: "orange"
                });
                //ось X
                chart.addAxis("x", {fixLower: "minor", fixUpper: "minor", natural: true,
                    max: 4, //число меток
                    labels: [ //метки
                        {value: 1, text: this.dateLabels[Const.YEAR_BEFORE_LAST].lbl},
                        {value: 2, text: this.dateLabels[Const.LAST_YEAR].lbl},
                        {value: 3, text: this.dateLabels[Const.SELECTED_YEAR].lbl},
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
                    gap: 2, //разрыв между столбцами
                    maxBarSize: 50, //ширина
                    minBarSize: 50,
                    animate: { duration: 1000, easing: easing.linear} //анимация
                });
                //данные
                chart.addSeries("Кол-во", //наименование
                    [Util.nvl(feature.BEFORE_LAST_K, 0), Util.nvl(feature.LAST_K, 0), Util.nvl(feature.K, 0)], //данные
                    {   stroke: {//тип линий и контура
                        color: "#1E90FF",
                        width: 5
                    },
                        fill: "#1874CD", //цвет наполнения
                        plot: "cols" //наименование начертания
                    });
                chart.addSeries("Количество",
                    [Util.nvl(feature.BEFORE_LAST_K, 0), Util.nvl(feature.LAST_K, 0), Util.nvl(feature.K, 0)],
                    {   stroke: {
                        color: "#EE6363",
                        width: 3
                    },
                        fill: "#FFC1C1",
                        plot: "lines"
                    });
                chart.fullRender();
            }
        },
        executeQuery: function () {
            var arr = this.dataArea.query();
            for (var i = 0; i < arr.length; i++) {
                this.dataArea.remove(arr[i].CODE);
            }
            arr = this.dataRegion.query();
            for (var i = 0; i < arr.length; i++) {
                this.dataRegion.remove(arr[i].CODE);
            }
            this.dateLabels = [];
            var deferredDataA, deferredDataR; //асинхронный фоновый запрос данных
            var deferred = []; //список запросов
            var queryData = new QuerySDE(this, Const.ID_QR_CRIME_AREA);
            deferredDataA = queryData.executeQuery();
            queryData = new QuerySDE(this, Const.ID_QR_CRIME_REGION);
            deferredDataR = queryData.executeQuery();

            deferred.push(deferredDataA);
            deferred.push(deferredDataR);

            var promises = all(deferred); //ожидаем выполнения всех запросов
            domUtils.show(dom.byId("loadingData"));
            domUtils.hide(dom.byId("dataDiv"));
            var qr = "query time"
            console.time(qr);
            promises.then(lang.hitch(this, function (results) {//когда все запросы исполнились
                //lang.hitch - позволяет выполнять функцию в заданном контексте.
                try {
                    if (results[0].hasOwnProperty("features")) {
                        var combo = registry.byId("parObl");
                        combo.removeOption(combo.getOptions());
                        combo.addOption({disabled: false, label: nlsInterface.regionRK, selected: false, value: "1900"});
                        var k = 0;
                        var last_k = 0;
                        var before_last_k = 0;
                        this.dataArea.put({
                            "K": k,
                            "K10": 0,
                            "CODE": "1900",
                            "NAME": nlsInterface.regionRK,
                            "LAST_K": last_k,
                            "BEFORE_LAST_K": before_last_k
                        });
                        for (var i = 0; i < results[0].features.length; i++) {
                            var obj = results[0].features[i];
                            obj.attributes.NAME = Dict.getAreaName(obj.attributes.CODE, obj.attributes.NAME);
                            this.dataArea.put(obj.attributes);
                            combo.addOption({disabled: false, label: obj.attributes.NAME, selected: false, value: obj.attributes.CODE});
                            k += obj.attributes.K;
                            last_k += obj.attributes.LAST_K;
                            before_last_k += obj.attributes.BEFORE_LAST_K;
                        }
                        var rk = this.dataArea.get("1900");
                        rk.K = k;
                        rk.LAST_K = last_k;
                        rk.BEFORE_LAST_K = before_last_k;

                        this.dateLabels = InfoWin.getFieldLabels();
                        var combo = registry.byId("parComparativeDate");
                        combo.removeOption(combo.getOptions());
                        for (var i = 0; i < this.dateLabels.length; i++) {
                            var obj = this.dateLabels[i];
                            combo.addOption({disabled: false, label: obj.lbl, selected: false, value: obj.id});
                        }

                        var title = nlsInterface.tableTitle0 + Const.getFilterCaption4Rep(Cfg.typeCrime) + nlsInterface.tableTitle1;
                        dom.byId("tblTitle").innerHTML = title;

                        console.info("data area " + this.dataArea.query().length);
                    } else {
                        console.error("Ошибка запроса данных по областям");
                    }
                    if (results[1].hasOwnProperty("features")) {
                        for (var i = 0; i < results[1].features.length; i++) {
                            var obj = results[1].features[i];
                            obj.attributes.NAME = Dict.getRegName(obj.attributes.CODE, obj.attributes.NAME);

                            this.dataRegion.put(obj.attributes);
                        }
                        on(registry.byId("parObl"), "change", lang.hitch(this, function (val) {
                            this.addGraphics(true);
                        }));
                        console.info("data region " + this.dataRegion.query.length);
                    } else {
                        console.error("Ошибка запроса данных по районам");
                    }
                    this.paint();
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    domUtils.show(dom.byId("dataDiv"));
                    domUtils.hide(dom.byId("loadingData"));
                    console.timeEnd(qr);
                }
            }));
        }
    });
});