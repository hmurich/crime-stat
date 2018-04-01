/**
 * Author: Шестаков П.Н.
 * Script: Карта (наследник  esri/map) с панелью инструментов
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
    "esri/layers/FeatureLayer",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/layers/FeatureLayer",
    "esri/renderers/HeatmapRenderer",
    "esri/Color",
    "esri/graphic",
    "esri/toolbars/draw",
    "esri/dijit/OverviewMap",
    "esri/tasks/PrintTask",
    "esri/tasks/PrintParameters",
    "esri/tasks/PrintTemplate",
    "esri/dijit/Basemap",
    "esri/dijit/BasemapLayer",
    "esri/dijit/BasemapGallery",
    "esri/tasks/DistanceParameters",
    "esri/symbols/PictureMarkerSymbol",
    "esri/tasks/GeometryService",
    "esri/geometry/Polyline",

    "crime/BaseMapList",
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
    "dojo/i18n!crime/nls/uInterface",
    "crime/Dict",
    "crime/DlgPopulatedLocality",
    "crime/DlgGeonim"

    // Функция обратного вызова, которая должна вернуть объект
], function (declare, dom, domClass, domProp, lang, on, domStyle, query, aspect, all, domConstruct, 
    connect, registry, Map, Extent, ArcGISTiledMapServiceLayer, domUtils, Navigation, Scalebar, 
    InfoTemplate, SpatialReference, GraphicsLayer, FeatureLayer, Point, SimpleMarkerSymbol, 
    SimpleLineSymbol, FeatureLayer, HeatmapRenderer, Color, Graphic, Draw, OverviewMap, PrintTask,
     PrintParameters, PrintTemplate, Basemap, BasemapLayer, BasemapGallery, DistanceParameters, 
     PictureMarkerSymbol, GeometryService, Polyline, BaseMapList, GeoLocation, Cfg, Const, QuerySDE, 
     PainterCrimePoint, Util, InfoWin, Tools, InfoText, PainterRegion, nlsInterface, Dict, DlgPopulatedLocality, DlgGeonim) {
    //приватная часть модуля
    //функция declare объявляет объект
    return declare(Map, {//superclass, если null - нет наследования
        coordinatesArea: [], //координаты областей
        coordinatesRegion: [], //координаты районов
        queryResult: [], //данные последнего запроса
        uppResult: [], //данные последнего запроса
        drawTool: null,
        MaxZoom: 0,
        MinZoom: 0,
        overviewMap: null,

        printTask: null,
        dlgPL: null,
        dlgGeonim: null,
        basemapGallery: null,
        base: null,
        IsRule: false,
        inputPoints: [],
        geometryService: null,
        totalDistance: 0,
        legDistance: [],
        tools: null,
        constructor: function (divId, options) { //конструктор
            this.setExtent(new Extent(dojo.fromJson(Cfg.curExtent)), true);
            //базовые слои
            var basemaps = [];
            basemaps.push({id: "KPSiSU",
                type: "ArcGIS",
                url: "http://infopublic.pravstat.kz:8399/arcgis/rest/services/Kazakhstan_WM/MapServer",
                thumbnailUrl: "images/maps/kpsisu.png",
                title: nlsInterface.mapTitle0});
            basemaps.push({id: "street",
                type: "ArcGIS",
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
                thumbnailUrl: "images/maps/world-street.png",
                title: nlsInterface.mapTitle1});
            basemaps.push({id: "imagery",
                type: "ArcGIS",
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
                thumbnailUrl: "images/maps/world-imagery.png",
                title: nlsInterface.mapTitle2});
            basemaps.push({id: "topo",
                type: "ArcGIS",
                url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
                thumbnailUrl: "images/maps/topo.png",
                title: nlsInterface.mapTitle3});
            basemaps.push({id: "googlemap",
                type: "Web",
                url: "https://www.google.ru/maps/vt/lyrs=m@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                thumbnailUrl: "images/maps/googlemap.png",
                title: nlsInterface.mapTitle4});
            basemaps.push({id: "googlesat",
                type: "Web",
                url: "https://www.google.ru/maps/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                thumbnailUrl: "images/maps/googlesat.png",
                title: nlsInterface.mapTitle5});
            basemaps.push({id: "googlehyb",
                type: "Web",
                url: "https://www.google.ru/maps/vt/lyrs=y@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                thumbnailUrl: "images/maps/googlehyb.png",
                title: nlsInterface.mapTitle6});
            basemaps.push({id: "osm",
                type: "osm",
                url: "http://www.thunderforest.com/maps/opencyclemap/",
                thumbnailUrl: "images/maps/osm.png",
                title: "Open Street Map"});

            this.basemapGallery = new BaseMapList("basemapGallery", this, basemaps);
            this.basemapGallery.setBaseMap(0);

            this.geometryService = new GeometryService("http://infopublic.pravstat.kz:8399/arcgis/rest/services/Utilities/Geometry/GeometryServer");
            //панель инструментов
            this.geoLocation = new GeoLocation(this);
            //масштаб
            this.scalebar = new Scalebar({
                map: this,
                scalebarStyle: "line",
                scalebarUnit: "metric"
            });
            //иструменты рисования
            this.drawTool = new Draw(this);
            this.info = new InfoText();

            this.overviewMap = new OverviewMap({
                map: this,
                attachTo: "bottom-left",
                visible: false
            });
            this.overviewMap.startup();
            this.printTask = new PrintTask(Const.URL_PRINTING_TOOLS);
            //слои
            this.canvasHeat = this.createHeatLayer();
            this.addLayer(this.canvasHeat);
            this.canvasPoint = new GraphicsLayer();
            this.addLayer(this.canvasPoint);
            this.camerPoint = new GraphicsLayer();
            // this.addLayer(this.camerPoint);
            this.canvasRegion = new GraphicsLayer();
            this.addLayer(this.canvasRegion);
            this.canvasCities = new GraphicsLayer();
            this.addLayer(this.canvasCities);
            this.canvasText = new GraphicsLayer();
            this.addLayer(this.canvasText);
            this.setLocale();
        },
        setLocale: function () {
            var pageAbout = "about-ru.html";
            var imgRef = "images/lang/ru_a.png";
            var ctrl = "lang-ru";
            if (dojo.locale == 'kk') {
                imgRef = "images/lang/kz_a.png";
                ctrl = "lang-kz";
                pageAbout = "about-kk.html";
            } else if (dojo.locale == 'en') {
                imgRef = "images/lang/en_a.png";
                ctrl = "lang-en";
                pageAbout = "about.html";
            }
            domClass.replace(dom.byId("lang-ru"), "dark", dom.byId("lang-ru").class);
            domClass.replace(dom.byId("lang-kz"), "dark", dom.byId("lang-kz").class);
            domClass.replace(dom.byId("lang-en"), "dark", dom.byId("lang-en").class);
            domClass.replace(dom.byId(ctrl), 'dark a-active', dom.byId(ctrl).class);
            dom.byId("lang").src = imgRef;
            dom.byId("aLocale").title = nlsInterface.aLocale;

            dom.byId("mtAbout").href = pageAbout;
            dom.byId("mtTable").href = "statistic.html?locale=" + dojo.locale;
            dom.byId("mtHome").innerHTML = nlsInterface.title;
            dom.byId("aBack").title = nlsInterface.back;
            dom.byId("aExternal0").title = nlsInterface.aExternal0;
            dom.byId("aExternal1").title = nlsInterface.aExternal1;
            dom.byId("aExternal2").title = nlsInterface.aExternal2;
            dom.byId("aExternal3").title = nlsInterface.aExternal3;
            dom.byId("aShare").title = nlsInterface.aShare;
            dom.byId("lblPeriod").innerHTML = nlsInterface.lblPeriod;
            dom.byId("lblFilter").innerHTML = nlsInterface.lblFilter;
            dom.byId("apply").innerHTML = nlsInterface.apply;
            dom.byId("hideStatistic").innerHTML = nlsInterface.hideStatistic;
            dom.byId("aAddress").innerHTML = nlsInterface.aAddress;
            dom.byId("aPeriod").innerHTML = nlsInterface.aPeriod;
            dom.byId("aFilter").innerHTML = nlsInterface.aFilter;
            dom.byId("aView").innerHTML = nlsInterface.aView;
            dom.byId("aTable").innerHTML = nlsInterface.aTable;
            dom.byId("aType").innerHTML = nlsInterface.aType;
            dom.byId("aMail").innerHTML = nlsInterface.aMail;
            dom.byId("aAbout").innerHTML = nlsInterface.aAbout;
            dom.byId("aFeedBack").innerHTML = nlsInterface.aFeedBack;
            dom.byId("aPrint").innerHTML = nlsInterface.aPrint;
            dom.byId("closeParams").innerHTML = nlsInterface.closeParams;
            dom.byId("pnPeriod").innerHTML = nlsInterface.pnPeriod;
            dom.byId("notePeriod").innerHTML = nlsInterface.notePeriod;
            dom.byId("lblPeriodDay").innerHTML = nlsInterface.lblPeriodDay;
            dom.byId("lblPeriodMonth").innerHTML = nlsInterface.lblPeriodMonth;
            dom.byId("lblPeriodYear").innerHTML = nlsInterface.lblPeriodYear;
            dom.byId("applyPeriod").innerHTML = nlsInterface.applyPeriod;
            dom.byId("pnLaw").innerHTML = nlsInterface.pnLaw;
            dom.byId("noteLaw").innerHTML = nlsInterface.noteLaw;
            dom.byId("applyFilter").innerHTML = nlsInterface.applyFilter;
            dom.byId("pnView").innerHTML = nlsInterface.pnView;
            dom.byId("noteData").innerHTML = nlsInterface.noteData;
            dom.byId("lblViewPoint").innerHTML = nlsInterface.lblViewPoint;
            dom.byId("lblViewHeat").innerHTML = nlsInterface.lblViewHeat;
            dom.byId("noteViewHeat").innerHTML = nlsInterface.noteViewHeat;
            dom.byId("applyView").innerHTML = nlsInterface.applyView;
            dom.byId("pnAddress").innerHTML = nlsInterface.pnAddress;
            registry.byId("dlgPopulatedLocality").set('title', nlsInterface.lblPL);
            registry.byId("dlgGeonim").set('title', nlsInterface.titleAddress);
            dom.byId("closePopLocCancel").innerHTML = nlsInterface.btnCancel;
            dom.byId("lblPL").innerHTML = nlsInterface.lblPL;
            dom.byId("closeGeonimCancel").innerHTML = nlsInterface.btnCancel;
            dom.byId("lblHouse").innerHTML = nlsInterface.lblHouse;
            dom.byId("lblGeonim").innerHTML = nlsInterface.lblGeonim;
            registry.byId("filterGeonim").set("placeholder", nlsInterface.placeholderFilter);
            dom.byId("lblAddress").innerHTML = nlsInterface.titleAddress;
            dom.byId("pnMap").innerHTML = nlsInterface.pnMap;
            dom.byId("noteMap").innerHTML = nlsInterface.noteMap;
            dom.byId("noteMap1").innerHTML = nlsInterface.noteMap1;
            dom.byId("pnPrint").innerHTML = nlsInterface.pnPrint;
            dom.byId("notePrintFile").innerHTML = nlsInterface.notePrintFile;
            dom.byId("notePrint").innerHTML = nlsInterface.notePrint;
            dom.byId("btnPrint").innerHTML = nlsInterface.btnPrint;
            dom.byId("btnRef").innerHTML = nlsInterface.btnRef;
            dom.byId("lblErrMsg").innerHTML = nlsInterface.lblErrMsg;
            dom.byId("btnFullSize").title = nlsInterface.btnFullSize;
            dom.byId("btnZoomIn").title = nlsInterface.btnZoomIn;
            dom.byId("gotopoint").title = nlsInterface.gotopoint;


            dom.byId("btnZoomOut").title = nlsInterface.btnZoomOut;
            dom.byId("btnLocation").title = nlsInterface.btnLocation;
            dom.byId("btnOverviewMap").title = nlsInterface.btnOverviewMap;
            dom.byId("infoMarker").title = nlsInterface.infoMarker;
            dom.byId("pnDelivery").innerHTML = nlsInterface.pnDelivery;
            dom.byId("noteDelivery").innerHTML = nlsInterface.noteDelivery;
            dom.byId("lblXY").innerHTML = nlsInterface.lblXY;
            dom.byId("noteXY").innerHTML = nlsInterface.noteXY;
            dom.byId("lblEmail").innerHTML = nlsInterface.lblEmail;
            dom.byId("lblRadius").innerHTML = nlsInterface.lblRadius;
            dom.byId("lblMailPeriod").innerHTML = nlsInterface.lblMailPeriod;
            dom.byId("subscribe").innerHTML = nlsInterface.subscribe;
            registry.byId("inptEmail").set("placeholder", nlsInterface.inptEmailPH);
            registry.byId("inptRadius").set("invalidMessage", nlsInterface.inptRadiusIM);
            Util.fullComboBox(registry.byId("inptPeriod"), Dict.MailPeriod);
            Util.fullComboBox(registry.byId("parFormat"), Dict.TypeFilePrint);
            Util.fullComboBox(registry.byId("inptTime"), Dict.TimePeriod);
            dom.byId("lblTime").innerHTML = nlsInterface.lblTime;

            dom.byId("btnPlay").title = nlsInterface.btnSliderShow;
            dom.byId("btnPrevSlide").title = nlsInterface.btnPrevSlide;
            dom.byId("btnNexSlide").title = nlsInterface.btnNextSlide;
            dom.byId("btnExit").title = nlsInterface.btnSliderExit;
            dom.byId("lblIncreasingly").innerHTML = nlsInterface.lblIncreasingly;
            dom.byId("btnSlide").innerHTML = nlsInterface.btnTimeSlider;

            dom.byId("pnSlide").innerHTML = nlsInterface.lblTimeSlider;
            dom.byId("noteSlide0").innerHTML = nlsInterface.noteTimeSlider0;
            dom.byId("a-mtPeriod").innerHTML = nlsInterface.noteTimeSlider1;
            dom.byId("a-mtFilter").innerHTML = nlsInterface.noteTimeSlider2;
            dom.byId("noteSlide1").innerHTML = nlsInterface.noteTimeSlider3;
            dom.byId("lblPeriodA").innerHTML = nlsInterface.lblPeriodManual;
            dom.byId("lblViewUPP").innerHTML = nlsInterface.lblPolice;

            dom.byId("aRule").innerHTML = nlsInterface.aRULE;
            dom.byId("pnRule").innerHTML = nlsInterface.pnRule;
            dom.byId("noteRoute").innerHTML = nlsInterface.noteRoute;
        },
        bindAction: function (map) {//действия на события
            map.on("update-start", function () {//начало обновления
                domUtils.show(dom.byId("loadingMapDiv")); //показать индикатор загрузки
            });
            map.on("update-end", function () {//окончание обновления
                domUtils.hide(dom.byId("loadingMapDiv")); //скрыть индикатор загрузки
            });
            map.on("extent-change", function () {//изменение видимой области карты
                var prevExtent;
                if (Cfg.queryExtent) {
                    prevExtent = Extent(dojo.fromJson(Cfg.queryExtent));
                } else {
                    prevExtent = Extent(dojo.fromJson(Cfg.curExtent));
                }
                Cfg.setCurExtent(map.extent);
                var prevScale = Cfg.scaleMap;
                Cfg.setScaleMap(map.getScale(), prevScale, map.getLevel());
                if ((Cfg.IsShowStatistics) && (Cfg.statisticsLevel == Const.LVL_CITY)) {
                    map.addGraphics(true);
                }
            });
            map.on("load", function () {//окончание загрузки
                //скрыть всплывающее меню  "ZoomTo"
                map.MaxZoom = map.getMaxZoom();
                map.MinZoom = map.getMinZoom();
                map.bindToolbar(map);
                domStyle.set(query("a.action.zoomTo")[0], "display", "none");
                //инициализация параметров
                Cfg.setDefaultValue(map);
                map.showData();
            });
            map.infoWindow.on("hide", function (event) {
                map.graphics.clear();
            });
            map.infoWindow.on("selection-change", function (event) {
            });
            map.on("click", function (event) {//клик по слою точек
                if (map.IsRule) {
                    map.createRoute(event);
                } else {
                    if ((event.graphic) && (event.graphic.attributes)) {
                        if (event.graphic.attributes.points) {
                            map.infoWindow.setFeatures(event.graphic.attributes.points);
                            map.infoWindow.show(event.graphic.geometry);
                        }
                    } else {
                        map.graphics.clear();
                        map.infoWindow.hide();
                        map.infoWindow.clearFeatures();
                    }
                }
            });
            map.on("key-down", function (event) {//нажатие клавиш
                if (event.keyCode === 27) {
                    map.infoWindow.hide();
                    map.infoWindow.clearFeatures();
                    map.graphics.clear();
                }
            });
        },
        createRoute: function (evt) {
            var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, this.spatialReference);
            this.inputPoints.push(inPoint);
            var symbolFinish = new PictureMarkerSymbol("images/marker-finish.png", 16, 26).setOffset(0, 0);
            var symbolStart = new PictureMarkerSymbol("images/marker-start.png", 16, 26).setOffset(0, 0);
            var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("red"), 4);

            if (this.inputPoints.length === 1) { //начальный символ отличаеться от последующих
                this.graphics.add(new Graphic(evt.mapPoint, symbolStart));
            } else if (this.inputPoints.length >= 2) {
                this.graphics.add(new Graphic(evt.mapPoint, symbolFinish));
            }

            if (this.inputPoints.length >= 2) {
                var distParams = new DistanceParameters();
                distParams.distanceUnit = GeometryService.UNIT_KILOMETER;

                distParams.geometry1 = this.inputPoints[this.inputPoints.length - 2];
                distParams.geometry2 = this.inputPoints[this.inputPoints.length - 1];
                distParams.geodesic = true;

                // рисование линии
                var polyline = new Polyline(this.spatialReference);
                polyline.addPath([distParams.geometry1, distParams.geometry2]);
                this.graphics.add(new Graphic(polyline, polylineSymbol));

                //вычисление длин
                var map = this;
                this.geometryService.distance(distParams, function (distance) {
                    if (isNaN(distance)) {
                        distance = 0;
                    }
                    var content = "";
                    map.legDistance.push(dojo.number.format(distance, {
                        places: 2
                    }));
                    map.totalDistance += distance;
                    content = content +nlsInterface.lblDistance+" <b>" + dojo.number.format(map.totalDistance, {
                        places: 2
                    }) + "</b> "+nlsInterface.metricKM+" <br />";
                    dojo.forEach(map.legDistance, function (leg, index) {
                        content = content + nlsInterface.distanceSegment + (index + 1) + ": <b>" + leg + "</b><br />";
                    });
                    dom.byId('inptDistance').innerHTML = content;
                });
            }
        },
        resetDistance: function () {
            this.inputPoints.length = 0;
            this.totalDistance = 0;
            this.legDistance.length = 0;
            dom.byId('inptDistance').innerHTML = "";
        },
        setFullExtent: function () {
            Cfg.curExtent = Const.FULL_EXTENT;
            var extent = new Extent(dojo.fromJson(Cfg.curExtent));
            this.setExtent(extent, true);
        },
        bindToolbar: function (map) { //настройка панели инструментов
            dom.byId("tools").style.display = "block";
            map.tools = new Tools(map);

            if (!Util.isMobile()) {
                map.info.show();
            }
            on(dom.byId("btnFullSize"), "click", function () {
                map.setFullExtent();
            });
            //найти местоположение
            on(dom.byId("btnLocation"), "click", function () {
                map.geoLocation.toggle();
            });

            on(dom.byId("btnOverviewMap"), "click", function () {
                if (map.overviewMap.visible) {
                    map.overviewMap.hide();
                    dojo.replaceClass("imgOverviewMap", "overview-map-button", "overview-map-button-visible");
                } else {
                    dojo.replaceClass("imgOverviewMap", "overview-map-button-visible", "overview-map-button");
                    map.overviewMap.show();
                }
            });


                //  var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, this.spatialReference);
                // this.inputPoints.push(inPoint);
                // var symbolFinish = new PictureMarkerSymbol("images/marker-finish.png", 16, 26).setOffset(0, 0);
                // var symbolStart = new PictureMarkerSymbol("images/marker-start.png", 16, 26).setOffset(0, 0);
                // var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color("red"), 4);

                // if (this.inputPoints.length === 1) { //начальный символ отличаеться от последующих
                //     this.graphics.add(new Graphic(evt.mapPoint, symbolStart));
                //     map.addGraphic(point);

                //     console.log(location);

                


            // on(dom.byId("gotopoint"), "click", function () {


            //    var CoordinateArcgisx =  $('.result3').val();
            //    var CoordinateArcgisy =  $('.result4').val();
            //    var CoodrinateArcgisXFloat = parseFloat(CoordinateArcgisx);
            //    var CoodrinateArcgisYFloat = parseFloat(CoordinateArcgisy);
            //    console.log(CoordinateArcgisx)
            //    console.log(CoordinateArcgisy);
            //    var point =  new Point( {"x":CoodrinateArcgisXFloat, "y":CoodrinateArcgisYFloat, "spatialReference": {"wkid": 102100, "latestWkid": 3857 } });


              
            //     // var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
            //     // var params = new ProjectParameters();
            //     // params.geometries = [point];
            //     // params.outSR = this.map.spatialReference;
            //     // var context = this;
            //     // geometryService.project(params, function (pointArr) {
            //     //     method.call(context, pointArr[0]);
            //     // });

              
            //    console.log(point);
               


            //    map.geoLocation.zoomToLocation(point);

            //     // console.log(zoom);
            //     // console.log(map.MaxZoom);
            //     // if (zoom < map.MaxZoom) {
            //     //     if(zoom <= 11 ){
            //     //         map.centerAndZoom(point, zoom + 6); 
            //     //     }
                   
            //     //     else{
            //     //         var zoom2 = zoom - 6
            //     //         map.centerAndZoom(point, zoom2 + 6); 
            //     //     }
                     
            //     // }

                
            // });
            on(dom.byId("gotopoint"), "click", function () {
               //  var CoordinateArcgisx =  $('.result3').val();
               // var CoordinateArcgisy =  $('.result4').val();
               // console.log(CoordinateArcgisx);
               //  var CoodrinateArcgisXFloat = parseFloat(CoordinateArcgisx);
               //  console.log(CoodrinateArcgisXFloat);
               // // var CoodrinateArcgisYFloat = parseFloat(CoordinateArcgisy);
               // // console.log(CoordinateArcgisx)
               // // console.log(CoordinateArcgisy);
               map.dlgGeonim.addAdressPoint(true);
               
               // var point = new Point( {"x":CoodrinateArcgisXFloat, "y":CoodrinateArcgisYFloat, "spatialReference": {"wkid": 102100, "latestWkid": 3857 } });
               // map.dlgGeonim.addAdressPoint(true,pont);
             });
            on(dom.byId("btnZoomIn"), "click", function () {
                var zoom = map.getZoom();
                console.log(zoom);
                if (zoom < map.MaxZoom) {
                    map.setZoom(zoom + 1);
                }
            });
            on(dom.byId("btnZoomOut"), "click", function () {
                var zoom = map.getZoom();
                if (zoom > map.MinZoom) {
                    map.setZoom(zoom - 1);
                }
            });
           
            on(dom.byId("periodDay"), "click", function () {
                Cfg.setPeriod(Const.ID_PERIOD_DAY, false);
            });
            on(dom.byId("periodMonth"), "click", function () {
                Cfg.setPeriod(Const.ID_PERIOD_MONTH, false);
            });
            on(dom.byId("periodA"), "click", function () {
                Cfg.setPeriod(Const.ID_PERIOD_ARBITRARY, false);
            })
            on(dom.byId("periodYear"), "click", function () {
                Cfg.setPeriod(Const.ID_PERIOD_YEAR, false);
            });
            on(registry.byId("parDate"), "change", function (val) {
                if (registry.byId("parDate").validate()) {
                    Cfg.setParDate(val);
                }
            });
            on(dom.byId("applyView"), "click", function () {
                map.tools.hideParamPanel();
                map.showStatistics();
            });

            on(dom.byId("applyPeriod"), "click", function () {
                map.tools.hideParamPanel();
                map.showStatistics();
            });

            on(dom.byId("applyFilter"), "click", function () {
                map.tools.hideParamPanel();
                map.showStatistics();
            });

            on(registry.byId("parCrimeType"), "change", function (val) {
                if ((val - 0) < 0) {
                    dom.byId("lawItemDiv").style.display = "block";
                } else {
                    dom.byId("lawItemDiv").style.display = "none";
                }
            });

            on(dom.byId("apply"), "click", function () {
                if (Cfg.page != Const.PAGE_SLIDE) {
                    map.showStatistics();
                }
            });

            on(dom.byId("hideStatistic"), "click", function () {
                if (Cfg.page != Const.PAGE_SLIDE) {
                    Cfg.IsShowStatistics = false;
                    map.clearGraphics(true);
                }
            });

            aspect.after(map.drawTool, "onDrawEnd", function (extent) {//Аспект запуск после события onDrawEnd
                //после щелчка мышкой по карте определяються параметры для сохранения
                Cfg.setMailXY(extent);
                //рисуется графический указатель
                var graphic = new Graphic(extent, Cfg.mailSymbol);
                map.graphics.clear();
                map.reposition();
                map.graphics.add(graphic);
            }, true);

            connect.connect(dom.byId("infoMarker"), "onclick", function () {
                if (map.info.isVisible()) {
                    map.info.hide();
                } else {
                    map.info.show();
                }
            });

            on(dom.byId("btnPrint"), "click", function () {
                dom.byId("printErrDiv").style.display = "none";
                dom.byId("printStart").style.display = "none";
                dom.byId("printResult").style.display = "none";
                dom.byId("printing").style.display = "inline-block";
                var params = new PrintParameters();
                var template = new PrintTemplate();
                template.format = registry.byId("parFormat").value;
                template.layout = "A4 Landscape";
                template.label = nlsInterface.templateTitle;
                template.layoutOptions = {titleText: nlsInterface.templateTitle, authorText: nlsInterface.templateAuthor, scalebarUnit: 'Kilometers', legendLayers: []};
                template.showLabels = true;
                params.map = map;
                params.template = template;
                try {
                    map.printTask.execute(params, lang.hitch(map, map.onPrintResult), lang.hitch(map, map.onPrintErr));
                }
                catch (e) {
                    map.onPrintErr(e);
                }
            });

            map.dlgPL = new DlgPopulatedLocality("dlgPopulatedLocality", map)
            on(dom.byId("btnPL"), "click", function (evt) {
                map.dlgPL.setVisible(true);
            });

            map.dlgGeonim = new DlgGeonim("dlgGeonim", map)
            on(dom.byId("btnAddress"), "click", function (evt) {
                map.dlgGeonim.setVisible(true);
            });

        },
        onPrintErr: function (error) {
            console.error("Ошибка печати: " + error.message);
            dom.byId("printStart").style.display = "inline-block";
            dom.byId("printErrDiv").style.display = "block";
            dom.byId("printing").style.display = "none";
            dom.byId("printResult").style.display = "none";
            dom.byId("printErrMsg").innerHTML = error.message;
        },
        onPrintResult: function (result) {
            console.info("завершение печати: ", result.url);
            dom.byId("printStart").style.display = "inline-block";
            dom.byId("printErrDiv").style.display = "none";
            dom.byId("printing").style.display = "none";
            dom.byId("printResult").style.display = "inline-block";
            dom.byId("btnRef").href = result.url;
        },
        showStatistics: function () {
            if (Cfg.isValidParams()) {
                Cfg.saveCrimeParams();
                this.showData();
            }
        },
        showData: function () {
            this.drawTool.deactivate();
            this.clearGraphics(true);
            this.addGraphics(false);
            Cfg.IsShowStatistics = true;
            if (this.IsRule) {
                if (this.tools) {
                    this.tools.hideParamPanel();
                } else {
                    this.IsRule = false;
                }
            }
        },
        clearGraphics: function (isClearData) {
            dom.byId("countRecord").innerHTML = "";
            dom.byId("textView").innerHTML = "";
            this.canvasRegion.clear();
            this.canvasRegion.hide();
            this.canvasCities.clear();
            this.canvasCities.hide();
            this.canvasPoint.clear();
            this.canvasPoint.hide();
            this.canvasText.clear();
            this.canvasText.hide();
            this.graphics.clear();
            this.canvasHeat.clear();
            this.canvasHeat.hide();
            this.canvasHeat.applyEdits([], null, null);
            this.canvasHeat.redraw();
            this.infoWindow.hide();
            this.infoWindow.clearFeatures();
            this.info.clear();
            this.resetDistance();
            domUtils.hide(dom.byId("mapLegendDiv"));
            if (isClearData) {
                this.queryResult = [];
                this.uppResult = [];
            }
            if (Cfg.page != Const.PAGE_SLIDE) {
                this.enableMapNavigation();
            }
        },
        addGraphics: function (isOnlyRepaint) {
            this.clearGraphics(false);
            dom.byId("countRecord").innerHTML = "";
            if (isOnlyRepaint && (Cfg.statisticsLevel == Const.LVL_CITY)) {//внутри ранее определенной области видимости
                //только перерисовываем не запрашивая
                this.disableMapNavigation();
                domUtils.show(dom.byId("loadingDataDiv"));
                domUtils.hide(dom.byId("toolbarDiv"));
                try {
                    var painter = new PainterCrimePoint(this);
                    painter.paint(false);
                    painter.addCamera(false);
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    domUtils.hide(dom.byId("loadingDataDiv"));
                    domUtils.show(dom.byId("toolbarDiv"));
                    this.enableMapNavigation();
                }
            } else {//вышли за пределы  области видимости
                //запрос данных с перерисовкой
                dom.byId("textPeriod").innerHTML = "";
                dom.byId("textFilter").innerHTML = "";
                this.executeQuery();
            }
        },
        createHeatLayer: function () {
            var featureCollection = {
                layerDefinition: {
                    "currentVersion": 10.31,
                    "id": 5,
                    "name": "Преступления городов",
                    "type": "Feature Layer",
                    "description": "Исходные данные по преступлениям в городах республики",
                    "geometryType": "esriGeometryPoint",
                    "copyrightText": "",
                    "parentLayer": null,
                    "subLayers": [],
                    "minScale": 0,
                    "maxScale": 0,
                    "drawingInfo": {
                        "renderer": {
                            "type": "simple",
                            "symbol": {
                                "type": "esriPMS",
                                "url": "8b3518707b4ed0c0d434f4594c21104f",
                                "imageData": "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAALpJREFUGJWN0CFLhEEUheHnyuAE2/YN9s2GTZs1mjVYthsEsZj8A2KwiMXi77AYtIpYDabpIx+OZYRVdNc3nvtyONyk09jHKTZ7VBu3wVHwBgk+cj5T67Hv5GAPs8Y0eE0t5+kv4iJjXGIntVrnscTsbDfGKZisdsEkYfiXmvOQGvfB1gp1UOtDCs4xx/pfZuNqjZKCl8YBrvVX/uAuOPR1DG7aaPSklBPMsIHnXnARvFtsilIesbts+Cd8XDFnEkCCjAAAAABJRU5ErkJggg==",
                                "contentType": "image/png",
                                "width": 8,
                                "height": 8,
                                "angle": 0,
                                "xoffset": 0,
                                "yoffset": 0
                            },
                            "label": "",
                            "description": ""
                        },
                        "transparency": 0,
                        "labelingInfo": null
                    },
                    "defaultVisibility": true,
                    "extent": {
                        "xmin": -1127353.3505,
                        "ymin": -8803759,
                        "xmax": 23511969,
                        "ymax": 6367638.2073,
                        "spatialReference": {
                            "wkid": 32642,
                            "latestWkid": 32642
                        }
                    },
                    "timeInfo": {
                        "startTimeField": "DAT_SOVER",
                        "endTimeField": null,
                        "trackIdField": null,
                        "timeExtent": [
                            644587201000,
                            1461694572000
                        ],
                        "timeReference": null,
                        "timeInterval": 2,
                        "timeIntervalUnits": "esriTimeUnitsDays",
                        "exportOptions": {
                            "useTime": true,
                            "timeDataCumulative": false,
                            "timeOffset": null,
                            "timeOffsetUnits": null
                        },
                        "hasLiveData": true
                    },
                    "hasAttachments": false,
                    "htmlPopupType": "esriServerHTMLPopupTypeNone",
                    "displayField": "CRIME_CODE",
                    "typeIdField": null,
                    "fields": [
                        {
                            "name": "OBJECTID",
                            "type": "esriFieldTypeOID",
                            "alias": "OBJECTID",
                            "domain": null
                        },
                        {
                            "name": "ID",
                            "type": "esriFieldTypeDouble",
                            "alias": "ID",
                            "domain": null
                        },
                        {
                            "name": "YR",
                            "type": "esriFieldTypeSmallInteger",
                            "alias": "YR",
                            "domain": null
                        },
                        {
                            "name": "PERIOD",
                            "type": "esriFieldTypeSmallInteger",
                            "alias": "PERIOD",
                            "domain": null
                        },
                        {
                            "name": "CRIME_CODE",
                            "type": "esriFieldTypeString",
                            "alias": "CRIME_CODE",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "TIME_PERIOD",
                            "type": "esriFieldTypeSmallInteger",
                            "alias": "TIME_PERIOD",
                            "domain": null
                        },
                        {
                            "name": "HARD_CODE",
                            "type": "esriFieldTypeString",
                            "alias": "HARD_CODE",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "UD",
                            "type": "esriFieldTypeString",
                            "alias": "UD",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "ORGAN",
                            "type": "esriFieldTypeString",
                            "alias": "ORGAN",
                            "length": 200,
                            "domain": null
                        },
                        {
                            "name": "DAT_VOZB",
                            "type": "esriFieldTypeDate",
                            "alias": "DAT_VOZB",
                            "length": 36,
                            "domain": null
                        },
                        {
                            "name": "DAT_SOVER",
                            "type": "esriFieldTypeDate",
                            "alias": "DAT_SOVER",
                            "length": 36,
                            "domain": null
                        },
                        {
                            "name": "STAT",
                            "type": "esriFieldTypeString",
                            "alias": "STAT",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "DAT_VOZB_STR",
                            "type": "esriFieldTypeString",
                            "alias": "DAT_VOZB_STR",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "DAT_SOVER_STR",
                            "type": "esriFieldTypeString",
                            "alias": "DAT_SOVER_STR",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "SHAPE",
                            "type": "esriFieldTypeGeometry",
                            "alias": "SHAPE",
                            "domain": null
                        },
                        {
                            "name": "TZ1ID",
                            "type": "esriFieldTypeString",
                            "alias": "TZ1ID",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "REG_CODE",
                            "type": "esriFieldTypeString",
                            "alias": "REG_CODE",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "CITY_CODE",
                            "type": "esriFieldTypeString",
                            "alias": "CITY_CODE",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "STATUS",
                            "type": "esriFieldTypeSmallInteger",
                            "alias": "STATUS",
                            "domain": null
                        },
                        {
                            "name": "ORG_CODE",
                            "type": "esriFieldTypeString",
                            "alias": "ORG_CODE",
                            "length": 50,
                            "domain": null
                        },
                        {
                            "name": "ENTRYDATE",
                            "type": "esriFieldTypeDate",
                            "alias": "ENTRYDATE",
                            "length": 36,
                            "domain": null
                        },
                        {
                            "name": "FZ1R18P5",
                            "type": "esriFieldTypeString",
                            "alias": "FZ1R18P5",
                            "length": 200,
                            "domain": null
                        },
                        {
                            "name": "FZ1R18P6",
                            "type": "esriFieldTypeString",
                            "alias": "FZ1R18P6",
                            "length": 60,
                            "domain": null
                        },
                        {
                            "name": "TRANSGRESSION",
                            "type": "esriFieldTypeString",
                            "alias": "TRANSGRESSION",
                            "length": 1,
                            "domain": null
                        }
                    ],
                    "relationships": [],
                    "canModifyLayer": false,
                    "canScaleSymbols": false,
                    "hasLabels": false,
                    "capabilities": "Map,Query,Data",
                    "maxRecordCount": 200000,
                    "supportsStatistics": true,
                    "supportsAdvancedQueries": true,
                    "supportedQueryFormats": "JSON, AMF",
                    "isDataVersioned": true,
                    "ownershipBasedAccessControlForFeatures": {"allowOthersToQuery": true},
                    "useStandardizedQueries": true,
                    "advancedQueryCapabilities": {
                        "useStandardizedQueries": true,
                        "supportsStatistics": true,
                        "supportsOrderBy": true,
                        "supportsDistinct": true,
                        "supportsPagination": false,
                        "supportsTrueCurve": true,
                        "supportsReturningQueryExtent": true,
                        "supportsQueryWithDistance": true
                    },
                    "dateFieldsTimeReference": null
                },
                featureSet: {
                    features: [],
                    geometryType: "esriGeometryPoint"
                }
            };
            var featureLayer = new FeatureLayer(featureCollection, {id: 'heatLayer', mode: FeatureLayer.MODE_SNAPSHOT});
            var renderer = this.createHeatRenderer();
            featureLayer.setRenderer(renderer);
            return featureLayer;
        },
        createHeatRenderer: function () {
            var renderer = new HeatmapRenderer({
                blurRadius: 10,
                maxPixelIntensity: 100,
                minPixelIntensity: 0,
                colorStops: [
                    { ratio: 0, color: "rgba(255, 255, 255, 0)"},
                    { ratio: 0.1, color: "rgba(0, 0, 255, 0.7)"},
                    { ratio: 0.3, color: "rgba(255, 255, 150, 0.7)"},
                    { ratio: 0.5, color: "rgba(255, 255, 0, 0.7)"},
                    { ratio: 0.7, color: "rgba(255, 50, 50, 0.7)"},
                    { ratio: 0.9, color: "rgba(255, 0, 0, 0.7)"}
                ]
            });
            return renderer;
        },
        executeQuery: function () {
            this.queryResult = []; //обнуляем массив данных для нового запроса
            this.uppResult = [];
            var deferredArea, deferredRegion; //асинхронный фоновый запрос координат
            var deferredData, deferredUPP; //асинхронный фоновый запрос данных
            var deferred = []; //список запросов
            var indexArea = 0, indexRegion = 0, indexUPP = 0;

            Cfg.queryExtent = Cfg.curExtent;
            if (this.coordinatesArea.length == 0) { //еще нет координат по областям
                var query = new QuerySDE(this, Const.ID_QR_COORDINATES_AREA);
                deferredArea = query.executeQuery();
            }

            if (this.coordinatesRegion.length == 0) { //еще нет координат по районам
                var query = new QuerySDE(this, Const.ID_QR_COORDINATES_REGION);
                deferredRegion = query.executeQuery();
            }

            var queryData = null;
            if (Cfg.statisticsLevel == Const.LVL_AREA) {
                queryData = new QuerySDE(this, Const.ID_QR_CRIME_AREA);
            } else if (Cfg.statisticsLevel == Const.LVL_REGION) {
                queryData = new QuerySDE(this, Const.ID_QR_CRIME_REGION);
            } else {
                queryData = new QuerySDE(this, Const.ID_QR_CRIME);
            }
            deferredData = queryData.executeQuery();
            deferred.push(deferredData);

            if (deferredArea) {
                deferred.push(deferredArea);
                indexArea = deferred.length - 1;
            }

            if (deferredRegion) {
                deferred.push(deferredRegion);
                indexRegion = deferred.length - 1;
            }

            if (Cfg.isShowUpp) {
                var queryUPP = new QuerySDE(this, Const.ID_QR_UPP);
                deferredUPP = queryUPP.executeQuery();
                deferred.push(deferredUPP);
                indexUPP = deferred.length - 1;
            }

            var promises = all(deferred); //ожидаем выполнения всех запросов
            this.disableMapNavigation();
            domUtils.show(dom.byId("loadingDataDiv"));
            domUtils.hide(dom.byId("toolbarDiv"));
            var qr = "query time"
            console.time(qr);
            promises.then(lang.hitch(this, function (results) {//когда все запросы исполнились
                //lang.hitch - позволяет выполнять функцию в заданном контексте.
                try {
                    if (results[0].hasOwnProperty("features")) {
                        for (var i = 0; i < results[0].features.length; i++) {
                            this.queryResult.push(results[0].features[i]);
                        }
                    } else {
                        console.error("Ошибка запроса данных");
                    }
                    if (indexArea > 0) {
                        if (results[indexArea].hasOwnProperty("features")) {
                            for (var i = 0; i < results[indexArea].features.length; i++) {
                                var feature = results[indexArea].features[i];
                                if (dojo.locale == 'kk') {
                                    feature.attributes['S1'] = feature.attributes['S1_KZ'];
                                } else if (dojo.locale == 'en') {
                                    feature.attributes['S1'] = feature.attributes['S1_EN'];
                                }
                                this.coordinatesArea.push(feature);
                            }
                            this.dlgPL.initTree();
                            console.info("coordinatesArea " + this.coordinatesArea.length);
                        } else {
                            console.error("Ошибка запроса координат");
                        }
                    }
                    if (indexRegion > 0) {
                        if (results[indexRegion].hasOwnProperty("features")) {
                            for (var i = 0; i < results[indexRegion].features.length; i++) {
                                this.coordinatesRegion.push(results[indexRegion].features[i]);
                            }
                            console.info("coordinatesRegion " + this.coordinatesRegion.length);
                        } else {
                            console.error("Ошибка запроса координат");
                        }
                    }
                    if (indexUPP > 0) {
                        if (results[indexUPP].hasOwnProperty("features")) {
                            for (var i = 0; i < results[indexUPP].features.length; i++) {
                                this.uppResult.push(results[indexUPP].features[i]);
                            }
                            console.info("uppResult " + this.uppResult.length);
                        } else {
                            console.error("Ошибка запроса УПП");
                        }
                    }
                    var painter = null;
                    if (Cfg.statisticsLevel == Const.LVL_CITY) {
                        painter = new PainterCrimePoint(this);
                    } else {
                        painter = new PainterRegion(this);
                    }
                    if (painter) {//рисуем слой
                        painter.paint(true);
                         painter.addCamera(true);
                    }
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    domUtils.hide(dom.byId("loadingDataDiv"));
                    domUtils.show(dom.byId("toolbarDiv"));
                    console.timeEnd(qr);
                    if (Cfg.page != Const.PAGE_SLIDE) {
                        this.enableMapNavigation();
                    } else {
                        if (Cfg.isSlidesPlay) {
                            if (Cfg.IndexSlide < (Cfg.SlideDates.length - 1)) {
                                setTimeout(lang.hitch(this, this.nextSlide), 5000);
                            } else {
                                Cfg.isSlidesPlay = false;
                                Cfg.setIndexSlide(Cfg.IndexSlide);
                            }
                        } else {
                            Cfg.setIndexSlide(Cfg.IndexSlide);
                        }
                    }
                }
            }));
        },
        nextSlide: function () {
            if (Cfg.IndexSlide < (Cfg.SlideDates.length - 1)) {
                Cfg.setIndexSlide(Cfg.IndexSlide + 1);
                this.showData();
            } else {
                Cfg.isSlidesPlay = false;
                Cfg.setIndexSlide(Cfg.IndexSlide);
            }
        },
        prevSlide: function () {
            if (Cfg.IndexSlide > 0) {
                Cfg.setIndexSlide(Cfg.IndexSlide - 1);
                this.showData();
            }
        }
    });
});