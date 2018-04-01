/**
 * Author: Шестаков П.Н.
 * Script: кластер для точек
 */

define([
    "dojo/_base/declare",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/Color",
    "esri/symbols/TextSymbol",
    "esri/symbols/Font"

], function (declare, Graphic, Point, Color, TextSymbol, Font) {

    return declare(Graphic, {
        constructor: function (geometry, symbol, attributes, infoTemplate, point, spatialReference) {
            this.attributes = attributes || {};
            this.attributes.x = point.geometry.x; //координата x
            this.attributes.y = point.geometry.y; //координата y
            this.attributes.points = []; //точки входящие в кластер
            this.attributes.points.push(point);
            this.attributes.spatialReference = spatialReference;
        },
        add: function (point) {//добавление точки
            var count, x, y;
            count = this.attributes.points.length;
            x = (point.geometry.x + (this.attributes.x * count)) / (count + 1);
            y = (point.geometry.y + (this.attributes.y * count)) / (count + 1);
            this.attributes.x = x;
            this.attributes.y = y;
            this.attributes.points.push(point);
        },
        getCountPoint: function () {//количество точек
            return this.attributes.points.length;
        },
        setGeo: function () {
            this.setGeometry(new Point(this.attributes.x, this.attributes.y, this.attributes.spatialReference));
        },
        getLabel: function () {
            var font = new Font("10pt", Font.STYLE_NORMAL,
                Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Arial");
            var textSymbol = new TextSymbol(this.getCountPoint().toString(), font, new Color([255, 255, 255, 1]));
            //textSymbol.setOffset(0, -4); //чтобы текст отображался по центру круга
            textSymbol.setOffset(0, 15); //чтобы текст отображался по центру круга
            return new Graphic(new Point(this.attributes.x, this.attributes.y, this.attributes.spatialReference), textSymbol, this.attributes);
        }
    });
});