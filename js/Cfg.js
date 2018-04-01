/**
 * Author: Шестаков П.Н.
 * Script: Настройки и параметры запросов
 */
define([
    "dojo/dom",
    "dojo/dom-class",
    "dojo/query",
    "dojo/dom-construct",
    "dojo/store/Memory",
    "dojo/store/Observable",

    "dijit/registry",
    "dijit/form/CheckBox",

    "esri/geometry/Extent",
    "esri/urlUtils",
    "esri/symbols/PictureMarkerSymbol",

    "crime/Const",
    "dojo/i18n!crime/nls/uInterface",
    "crime/Dict",
    "crime/Util"

], function (dom, domClass, query, domConstruct, Memory, Observable, registry, CheckBox, Extent, urlUtils, PictureMarkerSymbol, Const, i18n, Dict, Util) {

    var Cfg = function () {
    };

    Cfg.RCO = '';
    Cfg.memGeonim = new Observable(new Memory({idProperty: 'id'})); //геоним
    Cfg.memBlds = new Observable(new Memory({idProperty: 'id'})); //список зданий

    Cfg.page = Const.PAGE_MAP;

    Cfg.dlgEMail = null;
    Cfg.mailSymbol = new PictureMarkerSymbol("http://" + Const.GIS_SERVER + "/images/map-target.png", 28, 28); //символ
    Cfg.mailX = null;
    Cfg.mailY = null;

    Cfg.setMailXY = function (extent) {
        var val = ""
        if (extent) {
            Cfg.mailX = extent.x;
            Cfg.mailY = extent.y;
            val = "X=" + Cfg.mailX + " Y=" + Cfg.mailY;
        }
        else {
            Cfg.mailX = null;
            Cfg.mailY = null;
        }
        var inptXY = registry.byId("inptXY");
        inptXY.value = val;
        inptXY.set("displayedValue", val);
    }

    Cfg.typeMap = Const.ID_MAP_CRIME; //вид карты

     //Cfg.curExtent = '{"xmin":645972.3916660303,"ymin":5660078.036472451,"xmax":696772.4932662335,"ymax":5682012.038673788,"spatialReference":{"wkid":32642}}';
    Cfg.curExtent =  '{"xmin":7918761.474799805,"ymin":6631723.419222131,"xmax":7989198.196364501,"ymax":6664018.063672574,"spatialReference":{"wkid":102100,"latestWkid":3857}}';

    //изменение видимого пространства
    Cfg.setCurExtent = function (extent) {
        Cfg.curExtent = dojo.toJson(extent.toJson());
    }

    Cfg.queryExtent = null;

    Cfg.tile = Const.ID_TILE; //подложка

    Cfg.isShowPoint = true;
    Cfg.isShowHeat = false;
    Cfg.isShowUpp = true;

    Cfg.statisticsLevel = Const.LVL_CITY;

    Cfg.setStatDefaultValue = function () {
        Cfg.page = Const.PAGE_STAT;
        var d = new Date(); //дата
        d.setDate(d.getDate() - 1); //текущая дата - 1 день
        registry.byId("parDate").set("value", d);
        Cfg.setParDate(d);
        Cfg.toggleCrimeCodex();
    }

    Cfg.setDefaultValue = function () {
        Cfg.page = Const.PAGE_MAP;
        var d = new Date(); //дата
        registry.byId("parDate").set("value", d);
        Cfg.setParDate(d);
        Cfg.statisticsLevel = Const.LVL_CITY;
        Cfg.setPeriod(Const.ID_PERIOD_MONTH, true);
        Cfg.toggleCrimeCodex();
        Cfg.isShowPoint = true;
        Cfg.isShowHeat = false;
        Cfg.isShowUpp = false;
        Cfg.setViewType();
        Cfg.fullPlaces();
        //Cfg.setViewType(Const.SHOW_POINT);
    }

    Cfg.crimePlace = "000";
    Cfg.fullPlaces = function () {
        var placeBox = registry.byId("parPlace");
        placeBox.removeOption(placeBox.getOptions());
        placeBox.addOption({ label: Const.getFilterCaption(0), value: "000" });
        for(var row in Const.places) { // Для каждой
            placeBox.addOption({ label: Const.places[row].nameru, value: row });
        }
    }

    Cfg.levelMap = 0;
    Cfg.scaleMap = 16000000; //уровень детализации карт
    Cfg.setScaleMap = function (scale, prevScaleMap, lvl) {
        Cfg.levelMap = lvl;
        Cfg.scaleMap = scale;
    }

    Cfg.period = Const.ID_PERIOD_MONTH;//период
    //изменение периода
    Cfg.setPeriod = function (periodId, isSet) {
        Cfg.period = periodId;
        if (isSet) {
            if (Cfg.period == Const.ID_PERIOD_MONTH) {
                dom.byId("periodMonth").checked = true;
            } else if (Cfg.period == Const.ID_PERIOD_YEAR) {
                dom.byId("periodYear").checked = true;
            } else if (Cfg.period == Const.ID_PERIOD_ARBITRARY) {
                dom.byId("periodA").checked = true;
            } else {
                dom.byId("periodDay").checked = true;
            }
        }
        Cfg.calcBeginDate();
    }

    Cfg.IndexSlide = -1;
    Cfg.SlideDates = [];
    Cfg.isSlidesPlay = false;

    Cfg.setIndexSlide = function (indx) {
        Cfg.IndexSlide = indx;
        var slider = registry.byId("slider");
        slider.set("value", indx + 1);
        var btnPrevSlide = dom.byId("btnPrevSlide");
        var imgPrev = dom.byId("imgPrev");
        if ((indx <= 0) || Cfg.isSlidesPlay) {
            btnPrevSlide.disabled = true;
            domClass.replace(imgPrev, "disable-prev-button", imgPrev.class);
        } else {
            btnPrevSlide.disabled = false;
            domClass.replace(imgPrev, "enable-prev-button", imgPrev.class);
        }
        var btnNexSlide = dom.byId("btnNexSlide");
        var imgNext = dom.byId("imgNext");
        if ((indx >= (Cfg.SlideDates.length - 1)) || Cfg.isSlidesPlay) {
            btnNexSlide.disabled = true;
            domClass.replace(imgNext, "disable-next-button", imgNext.class);
        } else {
            btnNexSlide.disabled = false;
            domClass.replace(imgNext, "enable-next-button", imgNext.class);
        }
        var btnPlay = dom.byId("btnPlay");
        var imgPlay = dom.byId("imgPlay");
        if (indx >= (Cfg.SlideDates.length - 1)) {
            btnPlay.disabled = true;
            domClass.replace(imgPlay, "disable-play-button", imgPlay.class);
        } else if (Cfg.isSlidesPlay) {
            btnPlay.disabled = false;
            domClass.replace(imgPlay, "pause-button", imgPlay.class);
        } else {
            btnPlay.disabled = false;
            domClass.replace(imgPlay, "play-button", imgPlay.class);
        }
        var btnExit = dom.byId("btnExit");
        var imgExit = dom.byId("imgExit");
        var increasingly = dom.byId("increasingly");
        var lblIncreasingly = dom.byId("lblIncreasingly");
        if (Cfg.isSlidesPlay) {
            btnExit.disabled = true;
            increasingly.disabled = true;
            lblIncreasingly.style.color = "#696969";
            domClass.replace(imgExit, "disable-exit-button", imgExit.class);
        } else {
            increasingly.disabled = false;
            lblIncreasingly.style.color = "#000000";
            btnExit.disabled = false;
            domClass.replace(imgExit, "exit-button", imgExit.class);
        }
    }

    Cfg.calcBeginDate = function () {
        var startDay = Cfg.parDate;
        var inptDateB = registry.byId("parDateB");
        if (Cfg.period != Const.ID_PERIOD_DAY) {
            var year = Cfg.parDate.getFullYear();
            var month = Cfg.parDate.getMonth();
            if (Cfg.period == Const.ID_PERIOD_YEAR) {
                startDay = new Date(year, 0, 1);
            } else if (Cfg.period == Const.ID_PERIOD_MONTH) {
                startDay = new Date(year, month, 1);
            } else {
                if (inptDateB) {
                    startDay = inptDateB.value;
                }
            }
        }
        if (Cfg.page != Const.PAGE_STAT) {
            inptDateB.set("disabled", (Cfg.period != Const.ID_PERIOD_ARBITRARY));
            inptDateB.set("value", startDay);
        }
        return startDay;
    }

    Cfg.saveCrimeParams = function () {
        //тяжесть преступления и статьи
        var items = [];
        query("input", "lawItemDiv").forEach(function (node, index, nodelist) {
            if (registry.byId(node.id).get("checked")) {
                items.push(node.value);
            }
        });
        if (Cfg.parDate >= Const.newCodexDate) { //новый кодекс
            Cfg.typeCrime2015 = registry.byId("parCrimeType").value;
            Cfg.lawItems2015 = [];
            Cfg.lawItems2015 = Cfg.lawItems2015.concat(items);
        } else {
            Cfg.typeCrime = registry.byId("parCrimeType").value;
            Cfg.lawItems = [];
            Cfg.lawItems = Cfg.lawItems.concat(items);
        }
        //Cfg.crimeShowType = Cfg.getViewType();
        Cfg.isShowPoint = dom.byId("viewPoint").checked;
        Cfg.isShowHeat = dom.byId("viewHeat").checked;
        Cfg.isShowUpp = dom.byId("viewUPP").checked;

        Cfg.statisticsLevel = Const.LVL_CITY;
        Cfg.parTime = registry.byId("inptTime").value;
        Cfg.crimePlace = registry.byId("parPlace").value;
    }

    Cfg.setCrimeParams = function () {
        //тяжесть преступления и статьи
        var laws;
        if (Cfg.parDate >= Const.newCodexDate) { //новый кодекс
            registry.byId("parCrimeType").set("value", Cfg.typeCrime2015);
            laws = Cfg.lawItems2015;
        } else {
            registry.byId("parCrimeType").set("value", Cfg.typeCrime);
            laws = Cfg.lawItems;
        }
        query("input", "lawItemDiv").forEach(function (node, index, nodelist) {
            if (laws.indexOf(node.value) >= 0) {
                registry.byId(node.id).set("checked", true);
            } else {
                registry.byId(node.id).set("checked", false);
            }
        });
    }

    Cfg.toggleCrimeCodex = function () {
        //очистить контролы
        var crimeBox = registry.byId("parCrimeType");
        crimeBox.removeOption(crimeBox.getOptions());
        if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
            query("input", "lawItemDiv").forEach(function (node, index, nodelist) {
                registry.byId(node.id).destroyRecursive(true);
            });
            domConstruct.empty("lawItemDiv");
        }

        var laws;

        //заполнение
        crimeBox.options = [
            { label: Dict.CrimeHard[0].label, value: "0", selected: true },
            { type: "separator" },
            { label: Dict.CrimeHard[1].label, value: "1" },
            { label: Dict.CrimeHard[2].label, value: "2" },
            { label: Dict.CrimeHard[3].label, value: "3" },
            { label: Dict.CrimeHard[4].label, value: "4" },
            { type: "separator" }
        ];

        if (Cfg.parDate >= Const.newCodexDate) { //новый кодекс
            crimeBox.addOption([
                { label: Dict.CrimeHard[5].label, value: "5" },
                { label: Dict.CrimeHard[6].label, value: "6" },
                { type: "separator" }
            ]);
            laws = Const.lawItems2015;
        } else {
            laws = Const.lawItems;
        }
        crimeBox.set('value', "0");

        if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {

            var lblLaw = Dict.byValue(Dict.CrimeHard, "-1");
            crimeBox.addOption({ label: lblLaw.label, value: "-1" });

            var list = dom.byId("lawItemDiv");

            laws.forEach(function (node, index, nodelist) {
                var div = new domConstruct.create("div", {class: "radioDiv"}, list);
                var checkBox = new CheckBox({
                    name: "lw" + node.value,
                    id: "lw" + node.value,
                    value: node.value,
                    checked: false
                }, domConstruct.create("input", null, div));
                var checkLabel = domConstruct.create('label', { 'for': checkBox.name, innerHTML: "&#160;" + node.label },
                    div);
            });
            Cfg.setCrimeParams();
        }
    }

    Cfg.parDate = new Date(); //дата
    Cfg.parTime = 0; //время преступления
    //изменение даты
    Cfg.setParDate = function (date) {
        if (((Cfg.parDate >= Const.newCodexDate) && (date < Const.newCodexDate)) ||
            ((Cfg.parDate < Const.newCodexDate) && (date >= Const.newCodexDate))) { //нужно менять статьи
            if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
                Cfg.saveCrimeParams();
            }
            Cfg.parDate = date;
            Cfg.toggleCrimeCodex();
        } else {
            Cfg.parDate = date;
        }
        Cfg.calcBeginDate();
    }

    /*Cfg.getViewType = function () {
        var val = undefined;
        if ((!dom.byId("viewHeat").checked) && (dom.byId("viewPoint").checked)) {
            val = Const.SHOW_POINT;
        } else if (dom.byId("viewHeat").checked && (!dom.byId("viewPoint").checked)) {
            val = Const.SHOW_HEAT
        } else if (dom.byId("viewHeat").checked && dom.byId("viewPoint").checked) {
            val = Const.SHOW_BOTH
        }
        if (!val) {
            val = Const.SHOW_POINT;
            Cfg.setViewType(val);
        }
        return val;
    } */

    Cfg.setViewType = function () {
        //Cfg.crimeShowType = val;
        dom.byId("viewPoint").checked = Cfg.isShowPoint;
        dom.byId("viewHeat").checked = Cfg.isShowHeat;
        dom.byId("viewUPP").checked = Cfg.isShowUpp;
       /* if (Cfg.crimeShowType == Const.SHOW_POINT) {
            dom.byId("viewPoint").checked = true;
            dom.byId("viewHeat").checked = false;
        } else if (Cfg.crimeShowType == Const.SHOW_HEAT) {
            dom.byId("viewPoint").checked = false;
            dom.byId("viewHeat").checked = true;
        } else if (Cfg.crimeShowType == Const.SHOW_BOTH) {
            dom.byId("viewPoint").checked = true;
            dom.byId("viewHeat").checked = true;
        } */
    }

    Cfg.typeCrime = 0;//Код преступления все
    Cfg.lawItems = []; //выделенные статьи закона
    Cfg.typeCrime2015 = 0;//Код преступления все для нового кодекса
    Cfg.lawItems2015 = []; //выделенные статьи закона для нового кодекса

    Cfg.isValidParams = function () { //проверка валидности параметров
        var inptDate = registry.byId("parDate");

        if (!(inptDate.validate())) {
            alert(i18n.msgInvalidDate);
            return false;
        }
        if (Cfg.page != Const.PAGE_STAT) {
            var inptDateB = registry.byId("parDateB");

            if (!(inptDateB.validate())) {
                alert(i18n.msgInvalidDate);
                return false;
            }

            if (inptDateB.value > inptDate.value) {
                alert(i18n.msgDateEndLess);
                return false;
            }

            var Days = Math.floor((inptDate.value.getTime() - inptDateB.value.getTime()) / (1000 * 60 * 60 * 24));
            if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
                if (Days > 366) {
                    alert(i18n.msgPeriodMore366);
                    return false;
                }
            }
            if (Cfg.page == Const.PAGE_SLIDE) {
                if (Days > 31) {
                    alert(i18n.msgPeriodMore31);
                    return false;
                }
                var startDay = Cfg.calcBeginDate();
                Cfg.SlideDates = [];
                for (i = 0; i <= Days; i++) {
                    var d = new Date(startDay.getTime());
                    d.setDate(startDay.getDate() + i);
                    Cfg.SlideDates.push(d);
                }
                var slider = registry.byId("slider");
                slider.set("minimum", 0);
                slider.set("maximum", Cfg.SlideDates.length);
                slider.set("discreteValues", Cfg.SlideDates.length + 1);
                Cfg.setIndexSlide(-1);
            }
        }

        if ((registry.byId("parCrimeType").value == -1)) {
            var cnt = 0;
            query("input", "lawItemDiv").forEach(function (node, index, nodelist) {
                if (registry.byId(node.id).get("checked")) {
                    cnt++;
                }
            });
            if (cnt == 0) {
                alert(i18n.msgLawUndefined);
                return false;
            }
        }
        return true;
    }

    Cfg.IsShowStatistics = true; //показывать статистику?

    return Cfg;
});