define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-construct",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/WebTiledLayer"

], function (declare, dom, lang, on, domConstruct, ArcGISTiledMapServiceLayer, WebTiledLayer) {
    return declare(null, {
        BaseMaps: [],
        map: null,
        div: null,
        constructor: function (div, map, list) {
            this.map = map;
            this.BaseMaps = list;
            this.div = dom.byId(div);
            domConstruct.empty(this.div);
            for (var i = 0; i < this.BaseMaps.length; i++) {
                var baseMap = this.BaseMaps[i];
                baseMap.parent = this;
                if (baseMap.type == "ArcGIS") {
                    baseMap.layer = new ArcGISTiledMapServiceLayer(baseMap.url, {id: baseMap.id});
                } else if (baseMap.type == "Web") {
                    baseMap.layer = new WebTiledLayer(baseMap.url, {id: baseMap.id});
                } else if (baseMap.type == "osm") {
                        baseMap.layer = new WebTiledLayer("https://${subDomain}.tile.thunderforest.com/cycle/${level}/${col}/${row}.png", {
                        "copyright": 'Maps © <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                        "id": "OpenCycleMap",
                        "subDomains": ["a", "b", "c"]
                    });
                } else {
                    baseMap.layer = null;
                }
                var item = domConstruct.create("div", {
                    class: "responsive"}, this.div);
                var logomap = domConstruct.create("div", {
                    class: "img"}, item);
                var a = domConstruct.create("a", {
                    bm_indx: i,
                    href: "javascript:void(0);"}, logomap);
                domConstruct.create("img", {
                    src: baseMap.thumbnailUrl}, a);
                var label = domConstruct.create("div", {
                    class: "desc",
                    innerHTML: baseMap.title
                }, a);
                on(a, "click", lang.hitch(baseMap, function (e, p) {
                    this.parent.changeBaseMap(this);
                }));
            }
            domConstruct.create("div", {
                class: "clearfix"}, this.div);
        },
        onChange: function (baseMap) {
            console.info(baseMap.id, baseMap.title);
        },
        changeBaseMap: function (baseMap) {
            if (!baseMap) {
                return;
            }
            if (!baseMap.layer) {
                return;
            }
            if (this.map.base) {
                if (this.map.base.id == baseMap.id) {
                    return;
                }
            }
            this.onChange(baseMap);
            if (this.map.base) {
                this.map.removeLayer(this.map.base.layer);
            }
            this.map.addLayer(baseMap.layer); //добавляем новый базовый слой
            this.map.reorderLayer(baseMap.layer, 0);
            this.map.base = baseMap;


          


        },
        setBaseMap: function (indx) {
            var baseMap = this.BaseMaps[indx];

            if (baseMap) {
                this.changeBaseMap(baseMap);
            }
        }
    });
});
