/**
 * Author: Vyacheslav
 * Script: Нахождение местоположения пользователя
 *
 * patch:
 *  1) Шестаков П.  12.12.14
 *     оптимизация AMD загрузки, коментарии
 */
define([
    "dojo/_base/declare",
    "dojo/_base/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/tasks/GeometryService",
    "esri/tasks/ProjectParameters",
    "dojo/i18n!crime/nls/uInterface"
], function (declare, Color, Graphics, Point, SimpleMarkerSymbol, SimpleLineSymbol, GeometryService, ProjectParameters, i18n) {

    return declare(null, {

        constructor: function (map) {
            this.map = map;
            this.watchId = 0;
            this.locationGraphic = null;
            this.isActive = false;
        },

        locationError: function (error) { //вывод сообщения об ошибке
            if (navigator.geolocation) {
                navigator.geolocation.clearWatch(this.watchId);
            }
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert(i18n.msgLocalityUnable);
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert(i18n.msgLocalityNotAvailable);
                    break;

                case error.TIMEOUT:
                    alert(i18n.msgLocalityTimeout);
                    break;

                default:
                    alert(i18n.msgLocalityUnknown);
                    break;
            }
        },

        zoomToLocation: function (point) {//Центрирование и масштабирование карты.
            //this.map.centerAndZoom(point, 9); //уровень map.getLevel()
            this.map.centerAndZoom(point, 17); //уровень map.getLevel()
            this.addGraphic(point);
           document.getElementById("gotopoint").on('click', function(){
               
            });
        },


        showLocation: function (point) {//при изменения данных о местоположении
            this.map.centerAt(point);
            if (!this.locationGraphic) {
                this.addGraphic(point);
            } else {
                this.locationGraphic.setGeometry(point);
            }
        },

        processLocation: function (location, method) { //определение местоположения
            var pt = new Point(location.coords.longitude, location.coords.latitude);
            var geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
            var params = new ProjectParameters();
            params.geometries = [pt];
            params.outSR = this.map.spatialReference;
            var context = this;
            geometryService.project(params, function (pointArr) {
                method.call(context, pointArr[0]);
            });
        },

        addGraphic: function (pt) {//рисование окружности
            var symbol = new SimpleMarkerSymbol(
                SimpleMarkerSymbol.STYLE_CIRCLE,
                10,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([210, 105, 30, 0.3]), 32),
                new Color([210, 105, 30, 0.9])
            );

            this.locationGraphic = new Graphics(pt, symbol);
            this.map.graphics.add(this.locationGraphic);
        },

        toggle: function () { //нажатие на кнопку
            if (this.isActive) {
                this.hide();
                dojo.replaceClass("imgLocation", "location-button", "location-button-active");
            } else {
                dojo.replaceClass("imgLocation", "location-button-active", "location-button");
                this.show();
            }
            this.isActive = !this.isActive;
        },

        show: function () { //показать
            if (navigator.geolocation) {
                var context = this;
                navigator.geolocation.getCurrentPosition(//определение местоположения
                    function (location) {
                        context.processLocation(location, context.zoomToLocation);
                    },
                    function (error) {
                        context.locationError(error);
                    }
                );
                this.watchId = navigator.geolocation.watchPosition( //при изменения данных о местоположении
                    function (location) {
                        context.processLocation(location, context.showLocation);
                    },
                    function (error) {
                        context.locationError(error);
                    }
                );
            } else {
                alert(i18n.msgLocalityOldBrowser);
            }
        },

        hide: function () {  //скрыть
            if (navigator.geolocation) {
                navigator.geolocation.clearWatch(this.watchId);
            }
            if (this.locationGraphic) {
                this.map.graphics.clear();
                this.locationGraphic = null;
            }
        }
    });
});