define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/on",
    "esri/geometry/Point",
    "dijit/registry",
    "esri/toolbars/draw",
    "dojo/request/xhr",
    "esri/tasks/GeometryService",
    "crime/Cfg",
    "crime/Const",
    "dojo/i18n!crime/nls/uInterface",
    "esri/SpatialReference"
], function (declare, dom, lang, on, Point,registry, Draw, xhr, Cfg, GeometryService,Const, i18n,SpatialReference) {
    return declare(null, {
        constructor: function (map) {
            this.IsMail = false;
            this.mtUp = dom.byId("mtUp");
            this.mtDown = dom.byId("mtDown");
            this.mapToolBar = dom.byId("mapToolBar");
            this.closeParams = dom.byId("closeParams");
            this.addressPanel = dom.byId("addressPanel");
            this.viewPanel = dom.byId("viewPanel");
            this.lawPanel = dom.byId("lawPanel");
            this.periodPanel = dom.byId("periodPanel");
            this.mapPanel = dom.byId("mapPanel");
            this.printPanel = dom.byId("printPanel");
            this.slidePanel = dom.byId("slidePanel");
            this.deliveryPanel = dom.byId("deliveryPanel");

            this.statusPeriod = dom.byId("statusPeriod");
            this.statusFilter = dom.byId("statusFilter");

            this.rulePanel = dom.byId("rulePanel");
            this.mtMail = dom.byId("mtMail");
            this.mtRule = dom.byId("mtRule");
            this.mtType = dom.byId("mtType");
            this.mtPrint = dom.byId("mtPrint");
            this.addPoint = dom.byId("point");
            this.mtPeriod = dom.byId("mtPeriod");
            this.amtPeriod = dom.byId("a-mtPeriod");
            this.amtFilter = dom.byId("a-mtFilter");
            this.mtFilter = dom.byId("mtFilter");
            this.mtAddress = dom.byId("mtAddress");
            this.mtView = dom.byId("mtView");
            this.mtSlide = dom.byId("mtSlide");

            this.gotopoint = dom.byId("gotopoint");

            this.map = map;

            this.inptEmail = registry.byId("inptEmail");
            this.inptRadius = registry.byId("inptRadius");
            this.inptPeriod = registry.byId("inptPeriod");
            this.subscribe = dom.byId("subscribe");
            this.statusView = dom.byId("statusView");

            this.aLangKz = dom.byId("a-lang-kz");
            this.aLangRu = dom.byId("a-lang-ru");
            this.aLangEn = dom.byId("a-lang-en");

            this.BUTTON_HEIGHT = 99;
            on(this.mtUp, "click", lang.hitch(this, function () {
                this.scrollTool("up");
            }));

            on(this.mtDown, "click", lang.hitch(this, function () {
                this.scrollTool("down");
            }));
            on(this.closeParams, "click", lang.hitch(this, function () {
                this.hideParamPanel();
            }));

            on(this.mtPeriod, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtPeriod, this.periodPanel);
            }));

            on(this.mtFilter, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtFilter, this.lawPanel);
            }));

            on(this.amtPeriod, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtPeriod, this.periodPanel);
            }));

            on(this.amtFilter, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtFilter, this.lawPanel);
            }));

            on(this.statusPeriod, "click", lang.hitch(this, function () {
                if (Cfg.page != Const.PAGE_SLIDE) {
                    this.showParamPanel(this.mtPeriod, this.periodPanel);
                }
            }));

            on(this.statusFilter, "click", lang.hitch(this, function () {
                if (Cfg.page != Const.PAGE_SLIDE) {
                    this.showParamPanel(this.mtFilter, this.lawPanel);
                }
            }));

            on(this.mtAddress, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtAddress, this.addressPanel);
            }));

            on(this.mtView, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtView, this.viewPanel);
            }));

            on(this.statusView, "click", lang.hitch(this, function () {
                if (Cfg.page != Const.PAGE_SLIDE) {
                    this.showParamPanel(this.mtView, this.viewPanel);
                }
            }));

            on(this.mtType, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtType, this.mapPanel);
            }));

            on(this.mtPrint, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtPrint, this.printPanel);
            }));

            on(this.mtSlide, "click", lang.hitch(this, function () {
                this.showParamPanel(this.mtSlide, this.slidePanel);
            }));

            on(dom.byId("btnSlide"), "click", lang.hitch(this, function () {
                if (Cfg.scaleMap >= Const.SCALE_REGION) {
                    alert(i18n.msgSlideNotAvailable);
                    return;
                }
                Cfg.page = Const.PAGE_SLIDE;
                if (Cfg.isValidParams()) {
                    this.hideParamPanel();
                    Cfg.IsShowStatistics = false;
                    Cfg.isSlidesPlay = false;
                    Cfg.isShowPoint = true;
                    Cfg.isShowHeat = false;
                    Cfg.isShowUpp = true;
                    Cfg.setViewType();
                    //Cfg.setViewType(Const.SHOW_POINT);
                    this.map.overviewMap.hide();
                    dojo.replaceClass("imgOverviewMap", "overview-map-button", dom.byId("imgOverviewMap").class);
                    this.map.clearGraphics(true);
                    dom.byId("mapSlider").style.display = "none";
                    dom.byId("divTimeSlider").style.display = "block";
                    Cfg.setIndexSlide(Cfg.IndexSlide);
                    dom.byId("tools").style.display = "none";
                    this.map.disableMapNavigation();
                } else {
                    Cfg.page = Const.PAGE_MAP;
                    dom.byId("tools").style.display = "block";
                }
            }));

            on(dom.byId("btnPlay"), "click", lang.hitch(this, function () {
                if (Cfg.isSlidesPlay) {
                    Cfg.isSlidesPlay = false;
                } else {
                    Cfg.isSlidesPlay = true;
                    this.map.nextSlide();
                }
            }));

            on(dom.byId("btnPrevSlide"), "click", lang.hitch(this, function () {
                this.map.prevSlide();
            }));

            on(dom.byId("gotopoint"), "click", lang.hitch(this, function () {
               var zoomLat = 7927570.84230966;
               var zoomLong = 6652418.744630314;
               console.log()
               
               console.log(location);
                this.map.centerAndZoom(location, 17 );
            }));

            on(dom.byId("btnNexSlide"), "click", lang.hitch(this, function () {
                this.map.nextSlide();
            }));

            on(dom.byId("btnExit"), "click", lang.hitch(this, function () {
                Cfg.page = Const.PAGE_MAP;
                dom.byId("mapSlider").style.display = "block";
                dom.byId("divTimeSlider").style.display = "none";
                dom.byId("tools").style.display = "block";
                this.map.overviewMap.hide();
                dojo.replaceClass("imgOverviewMap", "overview-map-button", dom.byId("imgOverviewMap").class);
                this.map.enableMapNavigation();
            }));

            on(this.aLangKz, "click", lang.hitch(this, function () {
                if (dojo.locale != "kk") {
                    window.location = "?locale=kk";
                }
            }));

            on(this.aLangRu, "click", lang.hitch(this, function () {
                if (dojo.locale != "ru") {
                    window.location = "?locale=ru";
                }
            }));

            on(this.aLangEn, "click", lang.hitch(this, function () {
                if (dojo.locale != "en") {
                    window.location = "?locale=en";
                }
            }));

            on(this.mtMail, "click", lang.hitch(this, function () {
                Cfg.setMailXY(null);
                var value = "1000";
                this.inptRadius.value = value;
                this.inptRadius.set("displayedValue", value);
                value = "";
                this.inptEmail.value = value;
                this.inptEmail.set("displayedValue", value);
                this.showParamPanel(this.mtMail, this.deliveryPanel);
                //this.map.reposition();
                this.map.clearGraphics(true);
                this.map.drawTool.activate(Draw.POINT);
            }));

            //Добавление камеры
             var addMapPoint = false;
             var coordinateX ;
             var coordinateY ;


            on(this.addPoint, "click", lang.hitch(this, function () {
                this.map.drawTool.activate(Draw.POINT);
                this.map.clearGraphics(true);
                addMapPoint = true;
            }));
          
        
            on(this.map, "click", lang.hitch(this, function (evt) {
                if(addMapPoint){
                    document.querySelector('.modal').style.display = "flex";
                    document.querySelector('.overlay').style.display = "block";
                    coordinateX = evt.mapPoint.x;
                    coordinateY= evt.mapPoint.y;
                    console.log(coordinateX +" "+ coordinateY );
                }
            }));

            on(dom.byId("no"), "click", lang.hitch(this, function () {
                document.querySelector('.modal').style.display = "none";
                document.querySelector('.overlay').style.display = "none";
            }));
            on(dom.byId("yes"), "click", lang.hitch(this, function () {
                document.querySelector('.modal2').style.display = "flex";
                document.querySelector('.modal2').style.display = "flex";
                document.querySelector(".coordinate").innerHTML = coordinateX + ' /'+ coordinateY ;
                document.getElementById("coordinateValX").value = coordinateX ; 
                document.getElementById("coordinateValY").value = coordinateY; 
                 //document.getElementById("coordinateVal").value = ;
                // addMapPoint = false;
            }));

            on(dom.byId("close-modal"), "click", lang.hitch(this, function () {
                document.querySelector('.modal').style.display = "none";
                document.querySelector('.modal2').style.display = "none";
                document.querySelector('.overlay').style.display = "none";
            }));


           on(dom.byId("modal-send-button"), "click", lang.hitch(this, function () {
                addMapPoint = false;
               // stat.showStatistics();
            }));
           
            on(this.mtRule, "click", lang.hitch(this, function () {
                Cfg.IsShowStatistics = false;
                this.map.resetDistance();
                this.showParamPanel(this.mtRule, this.rulePanel);
                this.map.reposition();
                this.map.clearGraphics(true);
            }));


            on(this.subscribe, "click", lang.hitch(this, function () {

                if ((!Cfg.mailX) || (!Cfg.mailY)) {
                    alert(i18n.msgCoordinatesUndefined);
                    return;
                }

                if (!this.inptRadius.isValid()) {
                    alert(i18n.msgRadiusInvalid);
                    return;
                }

                var r = this.inptRadius.value - 0;

                if ((r < 1000) || (r > 4000)) {
                    alert(i18n.msgRadiusInvalid1);
                    return;
                }

                if (!(/.+@.+\..+/i.test(this.inptEmail.value))) {
                    alert(i18n.msgEMailInvalid);
                    return;
                }
                var mailForm = this;

                xhr(Const.URL_SERVLET + "subscribe", {
                    method: "POST",
                    data: {
                        eMail: mailForm.inptEmail.value,
                        coorX: Cfg.mailX,
                        coorY: Cfg.mailY,
                        radius: mailForm.inptRadius.value,
                        period: mailForm.inptPeriod.value
                    }})
                    .then(function (data) {
                        var obj = dojo.fromJson(data);
                        if (obj.Success) {
                            alert(i18n.msgDeliveryOK);
                        } else {
                            alert(i18n.lblErrMsg + obj.Error);
                        }
                    }, function (err) {
                        alert(i18n.msgErrQuery);
                        console.error("subscribe error: ", err);
                    });

                this.hideParamPanel();
            }));
        },
        scrollTool: function (direction) {
            var top = parseInt(this.mapToolBar.style.top) || 0;
            if (direction == "down") {
                var toolbarHeight = -((this.getCountButton() - 1) * this.BUTTON_HEIGHT);
                if (toolbarHeight >= top) {
                    top = toolbarHeight;
                } else {
                    top = top - this.BUTTON_HEIGHT;
                }
            } else if (direction == "up") {
                if (top < 0) {
                    top = top + this.BUTTON_HEIGHT;
                }
            }
            this.mapToolBar.style.top = top + "px";
        },
        getCountButton: function () {
            var n = 0;
            for (var i = 0; i < this.mapToolBar.childNodes.length; i++) {
                if (this.mapToolBar.childNodes[i].tagName == "LI") {
                    if (this.mapToolBar.childNodes[i].style.display != "none") {
                        n += 1;
                    }
                }
            }
            return n;
        },
        hideParamPanel: function () {
            this.addressPanel.style.display = "block"
            this.viewPanel.style.display = "none";
            this.lawPanel.style.display = "none";
            this.periodPanel.style.display = "none";
            this.mapPanel.style.display = "none";
            this.rulePanel.style.display = "none";
            this.printPanel.style.display = "none";
            this.slidePanel.style.display = "none";

            this.deliveryPanel.style.display = "none";
            this.mtPeriod.style.backgroundPosition = "0 0";
            this.mtFilter.style.backgroundPosition = "0 0";
            this.mtAddress.style.backgroundPosition = "0 0";
            this.mtView.style.backgroundPosition = "0 0";
            this.mtType.style.backgroundPosition = "0 0";
            this.mtPrint.style.backgroundPosition = "0 0";
            this.mtMail.style.backgroundPosition = "0 0";
            this.mtSlide.style.backgroundPosition = "0 0";
            this.mtRule.style.backgroundPosition = "0 0";
            dojo.removeAttr(this.mtType, "title");
            dojo.removeAttr(this.mtPrint, "title");
            dojo.removeAttr(this.mtView, "title");
            dojo.removeAttr(this.mtPeriod, "title");
            dojo.removeAttr(this.mtFilter, "title");
            dojo.removeAttr(this.mtAddress, "title");
            dojo.removeAttr(this.mtMail, "title");
            dojo.removeAttr(this.mtRule, "title");
            dojo.removeAttr(this.mtSlide, "title");
            if (this.IsMail) {
                this.map.drawTool.deactivate();
                this.map.graphics.clear();
                Cfg.setMailXY(null);
            }
            this.map.IsRule = false;
        },
        showParamPanel: function (button, panel) {
            this.hideParamPanel();
            this.IsMail = (button.id == "mtMail");
            this.map.IsRule = (button.id == "mtRule");
            panel.style.display = "block";
            button.style.backgroundPosition = "0 -96px";
            button.title = "";
        }
    });
});
