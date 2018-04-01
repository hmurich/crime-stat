/**
 * Author: Шестаков П.Н.
 * Script: запрос данных в SDE
 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "esri/tasks/QueryTask",
    "esri/tasks/query",

    "crime/Const",
    "crime/Cfg",
    "crime/Util"

], function (declare, dom, lang, QueryTask, query, Const, Cfg, Util) {

    return declare(null, {

        constructor: function (map, idQr) {
            this.idQr = idQr;
            this.queryTask = new QueryTask(Const.getUrlRestResource(this.idQr));
            this.query = new query();
            //query.outFields /String []/ - Перечень полей из  FeatureClass
            this.query.outFields = this.getOutFields();
            //query.returnGeometry /Boolean/ - Если "true", каждый feature в FeatureSet возвращается с геометрией
            //query.geometry /Geometry/ - Пространственный фильтр
            //query.spatialRelationship /String/ - Пространственное соотношение
            // по умолчанию  SPATIAL_REL_INTERSECTS - часть  feature из FeatureClass1  содержится в  feature из FeatureClass2
            // SPATIAL_REL_CONTAINS -  полностью или частично  feature из FeatureClass1  содержится в feature из FeatureClass2
            switch (this.idQr) {
                case Const.ID_QR_CRIME_AREA:
                case Const.ID_QR_CRIME_REGION:
                    this.query.returnGeometry = false;
                    this.query.orderByFields = ["CODE"];
                    break;
                case Const.ID_QR_COORDINATES_AREA:
                case Const.ID_QR_COORDINATES_REGION:
                    this.query.returnGeometry = true;
                    this.query.orderByFields = ["CODE"];
                    break;
                case Const.ID_QR_CRIME:
                    this.query.returnGeometry = true;
                    this.query.geometry = map.extent;
                    this.query.spatialRelationship = query.SPATIAL_REL_CONTAINS;
                    break;
                case Const.ID_QR_UPP:
                    this.query.returnGeometry = true;
                    this.query.geometry = map.extent;
                    this.query.spatialRelationship = query.SPATIAL_REL_CONTAINS;
                    break;
                default:
                    this.query.returnGeometry = false;
                    this.query.geometry = map.extent;
                    break;
            }
            //query.outSpatialReference /SpatialReference/ - Пространственная привязка для геометрии.
            if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
                this.query.outSpatialReference = map.spatialReference;
            }
            //query.where /String/ - Условия запроса
            this.query.where = this.getWhere();
            console.info(" idQr=" + this.idQr + " where=" + this.query.where);
        },
        executeQuery: function (obj, onQueryResult) {
            var func = undefined;
            if (obj && onQueryResult) {
                func = lang.hitch(obj, onQueryResult);
            }
            return this.queryTask.execute(this.query, func, lang.hitch(this, this.onErrorQuery));
        },
        onErrorQuery: function (error) {
            console.error("Ошибка запроса для слоя № " + this.idQr + " с условием " + this.query.where + " : " + error.message);
        },
        getOutFields: function () {//Перечень полей
            switch (this.idQr) {
                case Const.ID_QR_CRIME_AREA:
                case Const.ID_QR_CRIME_REGION:
                    return ["K", //Кол-во преступлений
                        "K10", //Кол-во преступлений на 10 тыс. человек
                        "CODE", //Код региона
                        "NAME", //Наименование региона
                        "LAST_K", //за прошлый год
                        "BEFORE_LAST_K" //за позапрошлый год
                    ];
                    break;
                case Const.ID_QR_CRIME:
                    var OrganFld = "ORGAN";
                    if (dojo.locale == 'kk') {
                        OrganFld = "ORGAN_KZ";
                    } else if (dojo.locale == 'en') {
                        OrganFld = "ORGAN_EN";
                    }
                    return ["UD", //№ КУЗИ
                        "CRIME_CODE", //Код преступления (Статья) без пунктов
                        OrganFld, //Орган регистрации преступления
                        "STAT", //Статья УК с пунктами
                        "DAT_VOZB_STR",// Дата КУЗИ
                        "DAT_SOVER_STR", //дата совершения
                        "HARD_CODE",//Тяжесть статьи
                        "FZ1R18P5",
                        "FZ1R18P6",
                        "FE1R29P1_ID"
                    ];
                    break;
                case Const.ID_QR_UPP:
                    return ["SHORT_NAME",
                        "FULL_NAME",
                        "ADDRESS",
                        "DESCRIPTION"
                    ];
                    break;
                case Const.ID_QR_COORDINATES_AREA:
                    var NameFld = "S1";
                    if (dojo.locale == 'kk') {
                        NameFld = "S1_KZ";
                    } else if (dojo.locale == 'en') {
                        NameFld = "S1_EN";
                    }
                    return ["CODE", //Код региона
                        NameFld//Наименование региона
                    ];
                    break;
                case Const.ID_QR_COORDINATES_REGION:
                    return ["CODE", //Код региона
                        "NAME" //Наименование региона
                    ];
                    break;
                default:
                    return ["OBJECTID"];
                    break;
            }
        },
        getWhere: function () {//условие
            switch (this.idQr) {
                case Const.ID_QR_CRIME_AREA:
                case Const.ID_QR_CRIME_REGION:
                    var where = '';
                    where += this.getWhereCrimeCode('CRIME_CODE', 'CRIME_CODE', 'CRIME_CODE', true);
                    if (where.length > 0) {
                        where += " AND ";
                    }
                    //c 2015 ежедневно, ранее последний день месяца
                    var rptDay;
                    var year = Cfg.parDate.getFullYear();
                    var month = Cfg.parDate.getMonth();
                    if (year < 2015) {//до 01.01.2015
                        rptDay = new Date(year, month + 1, 0);
                    } else { //c 01.01.2015
                        rptDay = Cfg.parDate;
                    }
                    //where += 'DATE_REP = to_date(\'' + Util.formatDate(rptDay) + '\',\'dd.mm.yyyy\')';
                    where += 'DATE_REP = DATE \'' + Util.formatDate(rptDay) + '\'';

                    var year = rptDay.getFullYear();
                    var startDay = new Date(year, 0, 1);

                    if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
                        dom.byId("textPeriod").innerHTML = Util.formatDate(startDay, "RU") + " - " + Util.formatDate(rptDay, "RU");
                    }
                    return where;
                    break;
                case Const.ID_QR_CRIME:
                    var where = '';
                    where += this.getWhereCrimeCode('HARD_CODE', 'TRANSGRESSION', 'CRIME_CODE', false);
                    if (where.length > 0) {
                        where += " AND ";
                    }
                    where += this.getWherePeriod("DAT_SOVER");
                    if (Cfg.parTime > 0) {
                        where += " AND TIME_PERIOD=" + Cfg.parTime;
                    }
                    if (Cfg.crimePlace != "000" ) {
                        where += " AND FE1R29P1_ID='" + Cfg.crimePlace+"'";
                    }

                    return where;
                    break;
                case Const.ID_QR_COORDINATES_AREA:
                case Const.ID_QR_COORDINATES_REGION:
                case Const.ID_QR_UPP:
                    return "rownum > 0";
                    break;
                default:
                    return 'OBJECTID = 0';
                    break;
            }
        },
        getWherePeriod: function (field) { //условие по периоду
            var startDay = null;
            var endDay = null;
            if (Cfg.page == Const.PAGE_MAP) {
                startDay = Cfg.calcBeginDate();
                endDay = Cfg.parDate;
            } else if (Cfg.page == Const.PAGE_SLIDE) {
                var increasingly = dom.byId("increasingly");
                endDay =  Cfg.SlideDates[Cfg.IndexSlide];
                if (increasingly.checked) {
                    startDay = Cfg.SlideDates[0];
                } else {
                    startDay = endDay;
                }
            }
            if (endDay && startDay) {
                dom.byId("textPeriod").innerHTML = Util.formatDate(startDay, "RU") + " - " + Util.formatDate(endDay, "RU");
                return field + '>= TIMESTAMP \'' + Util.formatDate(startDay) + ' 00:00:00\' AND ' + field + '<= TIMESTAMP \'' + Util.formatDate(endDay) + ' 23:59:59\'';
            } else {
                return '';
            }
        },
        getWhereCrimeCode: function (fldHard, flTransgression, fldLaw, isArea) {//условие по типу преступления
            var where = '';
            var _typeCrime = 0;
            var _lawItems = [];
            if (Cfg.parDate >= Const.newCodexDate) { //новый кодекс
                _typeCrime = Cfg.typeCrime2015;
                _lawItems = Cfg.lawItems2015;
            } else {
                _typeCrime = Cfg.typeCrime;
                _lawItems = Cfg.lawItems;
            }
            if ((Cfg.page == Const.PAGE_MAP) || ( Cfg.page == Const.PAGE_SLIDE)) {
                dom.byId("textFilter").innerHTML = Const.getFilterCaption(_typeCrime);
            }
            if (_typeCrime == 0 && isArea) { //все, только для районов и областей
                where += fldHard + ' =\'' + _typeCrime + '\'';
            } else if (_typeCrime > 0 && _typeCrime <= 4) { //Тяжесть статьи
                where += fldHard + ' =\'' + _typeCrime + '\'';
            } else if (_typeCrime == 5 || _typeCrime == 6) { //проступки или преступления
                if (flTransgression != null) {
                    where += flTransgression + ' =\'' + _typeCrime + '\'';
                }
            } else if (_typeCrime < 0) { //по статьям
                where += fldLaw + ' IN (';
                var laws = '';
                _lawItems.forEach(function (node, index, nodelist) {
                    laws += '\'' + node + '\',';
                });
                if (Cfg.parDate < Const.newCodexDate) { //старый кодекс
                    if (_lawItems.indexOf('2590') >= 0) {
                        laws += '\'2591\',\'2592\',';
                    }
                    if (_lawItems.indexOf('3480') >= 0) {
                        laws += '\'3481\',';
                    }
                }
                where += laws.substr(0, laws.lastIndexOf(',')) + ')';
            }
            return where;
        }
    });
});