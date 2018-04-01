/**
 * Author: Шестаков П.Н.
 * Script: кластеризация (групировка) точек
 */

define([
    "dojo/_base/declare",

    "crime/ClusterPoints",
    "crime/Const"

], function (declare, ClusterPoints, Const) {

    return declare(null, {

        constructor: function (map, distance) {
            this.clusters = [];
            this.mapResolution = map.extent.getWidth() / map.width / Const.MAP_CLUSTER_RESOLUTION; //разрешение
            this.permissibleSpread = distance; //допустимое растояние между точками кластера
            this.spatialReference = map.extent.spatialReference; //пространственная привязка.
        },
        addPoint: function (point) {
            var isClustered = false;
            // ищем в какой кластер поместить новую точку
            for (var i = 0; i < this.clusters.length; i++) {
                var cluster = this.clusters[i];
                if (this.isClusterContainsPoint(cluster, point)) { //найден кластер
                    cluster.add(point);//добавление в кластер точки
                    isClustered = true;
                    break;
                }
            }
            if (!isClustered) { //не нашли для точки кластер
                //создаем новый кластер для точки
                var cluster = new ClusterPoints(null, null, null, null, point, this.spatialReference);
                this.clusters.push(cluster);
            }
        },
        getClusterList: function () { //список кластеров
            return this.clusters;
        },
        isClusterContainsPoint: function (cluster, point) {
            var distance = ( //растояние между точками
                Math.sqrt(
                    Math.pow((cluster.attributes.x - point.geometry.x), 2) + Math.pow((cluster.attributes.y - point.geometry.y), 2)
                ) / this.mapResolution
                );
            return (distance <= this.permissibleSpread); //попадает в область кластера?
        }
    });
});