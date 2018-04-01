define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-style",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/request",
    "dojo/json",
    "dojo/request/xhr",
    "dojo/_base/Color",
    "dijit/registry",
    "esri/graphic",
    "esri/SpatialReference",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/tasks/GeometryService",
    "esri/tasks/ProjectParameters",
    "dojo/i18n!crime/nls/uInterface",
    "crime/Util",
    "crime/Const",
    "crime/Cfg",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/InfoTemplate"

], function (declare, dom, lang, on, domStyle, query, domConstruct, request, json, xhr, 
    Color, registry, Graphic, SpatialReference, Point, SimpleMarkerSymbol,PictureMarkerSymbol, SimpleLineSymbol, GeometryService, ProjectParameters, i18n, Util, Const, Cfg, FeatureLayer, Query, InfoTemplate) {

    return declare(null, {
        dlgDiv: null,
        map: null,
        geonimBox: null,
        geonimFilter: null,
        constructor: function (divId, map) {//инициализация
            this.dlgDiv = registry.byId(divId);
            this.map = map;
            this.geonimBox = registry.byId("parGeonim");
            this.geonimFilter = registry.byId("filterGeonim");
            this.houseBox = registry.byId("parHouse");
            //события
            this.geonimFilter.on("keydown", lang.hitch(this, function (evnt) {
                if (evnt.keyCode == 13) {
                    this.geonimItems();
                }
            }));
            registry.byId("btnFindGeonim").on("click", lang.hitch(this, function (evnt) {
                this.geonimItems();
            }));
            registry.byId("btnClearGeonim").on("click", lang.hitch(this, function (evnt) {
                this.clearVal();
            }));
            on(dom.byId("closeGeonimOK"), "click", lang.hitch(this, function (evt) {
                this.setVisible(false, Const.MR_OK);
            }));
            on(dom.byId("closeGeonimCancel"), "click", lang.hitch(this, function (evt) {
                this.setVisible(false, Const.MR_CANCEL);
            }));
            this.geonimBox.on("change", lang.hitch(this, this.houseItems));
        },
         addAdressPoint: function () {//закрытие/открытие
            
            var res = document.querySelector('#result3');
                              
            //console.warn(res, res.dataset, res.dataset.x, res.dataset.y);
               
               

           this.map.clearGraphics(true);
                                Cfg.IsShowStatistics = false;

           

          

       


            var point = new Point( {"x":parseFloat(res.dataset.x), "y":parseFloat(res.dataset.y), "spatialReference": {"wkid": 102100, "latestWkid": 3857 } });
              
            var symbol = new PictureMarkerSymbol({ "angle": 0, "xoffset": 0, "yoffset": 15, "type": "esriPMS", "url": "images/map12.png", "imageData": "", "contentType": "image/png", "width": 34, "height": 41 });
            console.log(symbol);

            var gr = new Graphic(point, symbol);

            this.map.graphics.add(gr);
            this.map.centerAndZoom(point, 18);

                
        
                                
                                   

                                    
                         
        },
        setVisible: function (visible, modalResult) {//закрытие/открытие
            if (visible) {
                this.clearVal();
                this.dlgDiv.show();
            } else {
                if (modalResult) {
                    if (modalResult == Const.MR_OK) {
                        if ((!this.houseBox.value) || (this.houseBox.value < 0)) {
                            alert(i18n.msgValNotSelect);
                            return;
                        } else {
                            var house = Cfg.memBlds.get(this.houseBox.value);
                            if (house) {
                                this.map.clearGraphics(true);
                                Cfg.IsShowStatistics = false;


                                var point = new Point(house.x, house.y, new SpatialReference(32642));
                                var PrjParams = new ProjectParameters();
                                PrjParams.geometries = [point];
                                PrjParams.outSR = this.map.spatialReference;

                                this.map.geometryService.project(PrjParams, lang.hitch(this, function (result) {
                                    var symbol = new SimpleMarkerSymbol(
                                        SimpleMarkerSymbol.STYLE_CIRCLE,
                                        10,
                                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([210, 105, 30, 0.3]), 32),
                                        new Color([210, 105, 30, 0.9])
                                    );
                                    var gr = new Graphic(result[0], symbol);

                                    this.map.graphics.add(gr);
                                    this.map.centerAndZoom(result[0], 18);

                                    var addr = this.geonimBox.get('displayedValue') + ' ' + house.number;
                                    var inpt = registry.byId("Address");
                                    inpt.value = addr;
                                    inpt.set("displayedValue", addr);
                                    inpt.set("title", addr);
                                }));
                            }
                        }
                    }
                }
                this.dlgDiv.hide();
            }
        },
        geonimItems: function () {//выполнение запроса геонима
            Util.clearMemory(Cfg.memGeonim);
            if (this.geonimFilter.get('value')) {
                if (this.geonimFilter.get('value').length > 0) {
                    var url = Const.URL_ADDR_FIND_SERVICE + Const.SRVC_GEONIM_RCO + "&rco=" + Cfg.RCO + "&name=" + this.geonimFilter.get('value');
                    var dlg = this;
                    console.log(url);
                    xhr(url).then(function (data) {
                        var obj = dojo.fromJson(data);

                       
                        var arr = obj.result;
                        console.log(arr);
                        var combo = registry.byId("parGeonim");
                        combo.removeOption(combo.getOptions());
                        if (arr.length > 0) {
                            for (var i = 0; i < arr.length; i++) {
                                Cfg.memGeonim.put(arr[i]);
                                combo.addOption({disabled: false, label: arr[i].ate_name, selected: false, value: arr[i].id});
                            }
                            dlg.houseItems();
                        } else {
                            combo.addOption({disabled: false, label: i18n.msgValNotFound, selected: false, value: -1});
                        }
                    }, function (err) {
                        console.error("ajax geonim query error: ", err);
                        registry.byId("parGeonim").addOption({disabled: false, label: i18n.msgRequestFailed, selected: false, value: -1});
                    });
                } else {
                    alert(i18n.msgEnterValue);
                }
            }
        },
        houseItems: function () {//выполнение запроса геонима
            Util.resetComboBox(this.houseBox, true);
            Util.clearMemory(Cfg.memBlds);
            if (this.geonimBox.value && this.geonimBox.value > 0) {//были изменения?
                var geonim = Cfg.memGeonim.get(this.geonimBox.value);
                if (geonim) {
                    var url = Const.URL_ADDR_FIND_SERVICE + Const.SRVC_BLD_COOR + "&ats=" + geonim.ats_id + "&geonim=" + geonim.id;
                    xhr(url).then(function (data) {
                        var obj = dojo.fromJson(data);
                        var arr = obj.result;
                        var combo = registry.byId("parHouse");
                        combo.removeOption(combo.getOptions());
                        if (arr.length > 0) {
                            for (var i = 0; i < arr.length; i++) {
                                Cfg.memBlds.put(arr[i]);
                                combo.addOption({disabled: false, label: arr[i].number, selected: false, value: arr[i].id});
                            }
                        } else {
                            combo.addOption({disabled: false, label:  i18n.msgCoordNotDefined, selected: false, value: -1});
                        }
                    }, function (err) {
                        console.error("ajax geonim query error: ", err);
                        registry.byId("parHouse").addOption({disabled: false, label:  i18n.msgRequestFailed, selected: false, value: -1});
                    });
                }
            }
        },
        clearVal: function () {
            this.geonimFilter.value = "";
            this.geonimFilter.set("displayedValue", "");
            Util.resetComboBox(this.geonimBox, true);
            Util.resetComboBox(this.houseBox, true);
        }
    });
});