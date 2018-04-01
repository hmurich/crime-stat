/**
 * Author: Шестаков П.Н.
 * Script: Константы
 */
define([
    "esri/geometry/Extent",
    "esri/Color",
    "dojo/i18n!crime/nls/uInterface",
    "dojo/i18n!crime/nls/dict"

], function (Extent, Color, i18n, nlsDict) {

    var Const = function () {
    };

    //результат диалогового окна
    Const.MR_OK = 1;
    Const.MR_CANCEL = 0;


    Const.URL_ADDR_FIND_SERVICE = "http://service.pravstat.kz/PiProducer/ate?"; //url сервиса prstat
    //Const.URL_ADDR_FIND_SERVICE = "http://vm-wls-portal:8090/PiProducer/ate?";
    Const.SRVC_GEONIM_RCO = "type=geonim_rco" //Геоним &rco=107193&name=%D0%B8%D0%BC%D0%B0%D0%BD
    Const.SRVC_ATE_TREE = "type=ate_tree" //
    Const.SRVC_BLD_COOR = "type=bld_coor" //Здания &ats=107193&geonim=107430

    //Const.GIS_SERVER = "192.168.200.28";
    Const.GIS_SERVER = "infopublic.pravstat.kz";

    //адрес сервера ГИС
    //Const.URL_GIS_SERVER = "http://infopublic.pravstat.kz:8399/arcgis/rest/services/";
    Const.URL_GIS_SERVER = "http://" + Const.GIS_SERVER + ":8399/arcgis/rest/services/";
    //Const.URL_SERVLET = "http://vm-wls-portal:8090/PiProducer/";
    Const.URL_SERVLET = "http://service.pravstat.kz/PiProducer/";

    //адрес сервиса подложки(базовый слой) без дорог и рек
    Const.URL_TILE_SERVICE = "Kazakhstan/MapServer";

    //адрес сервиса подложки(базовый слой) с дорогами и реками
    Const.URL_ROAD_TILE_SERVICE = "rtakz29/MapServer";

    //адрес сервиса подложки(базовый слой) OpenStreetMap
    Const.URL_OSM_TILE_SERVICE = "OSM/MapServer";

    //адрес сервиса регионов
    Const.URL_KZ_AREA = "KZ_AREA_RU/MapServer";

    Const.URL_PRINTING_TOOLS = Const.URL_GIS_SERVER + 'Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

    Const.URL_ADDR_SERVICE = "addr/MapServer";
    Const.LAYER_POPULATED_LOCALITY = 3;

    Const.URL_UPP_SERVICE = "UPP/MapServer/0";

    //ID подложек
    Const.ID_TILE = 0;
    Const.ID_TILE_OSM = 1;
    Const.CAPTION_TILE = i18n.lblTileMap;
    Const.CAPTION_TILE_OSM = i18n.lblOsmMap;

    //наименование подложки
    Const.getTileCaption = function (type) {
        if (type == Const.ID_TILE) {
            return Const.CAPTION_TILE;
        } else {
            return Const.CAPTION_TILE_OSM;
        }
    }

    //координаты
    Const.LAYER_COORDINATES_AREA = 9; //Области
    Const.LAYER_COORDINATES_REGION = 8; //районы

    //адрес динамического сервиса преступлений, несовершеннолетних, наркопреступлений
    Const.URL_CRIME_DYN_SERVICE = "stat/MapServer";
    //номер слоя, преступления
    Const.LAYER_CRIME = 5; //точки
    Const.LAYER_CRIME_AREA = 0; //Области
    Const.LAYER_CRIME_REGION = 1; //районы
    //номер слоя, несовершеннолетние
    Const.LAYER_UA = 8; //точки
    Const.LAYER_UA_AREA = 9; //Области
    Const.LAYER_UA_REGION = 10; //районы
    //номер слоя, наркопреступления
    Const.LAYER_NARCOTIC_AREA = 11; //Области
    Const.LAYER_NARCOTIC_REGION = 12; //районы

    //адрес динамического сервиса ДТП
    Const.URL_RTA_DYN_SERVICE = "rta/MapServer";
    //номер слоя
    Const.LAYER_RTA = 0; //точки
    Const.LAYER_RTA_AREA = 1; //Области
    Const.LAYER_RTA_REGION = 2; //районы

    //адрес динамического сервиса обращения граждан
    Const.URL_OL_DYN_SERVICE = "ol/MapServer";
    //номер слоя
    Const.LAYER_OL_AREA = 0; //Области
    Const.LAYER_OL_REGION = 1; //районы

    //адрес динамического сервиса обращения граждан
    Const.URL_JA_DYN_SERVICE = "ja/MapServer";
    Const.LAYER_JA_AREA = 0; //Области
    Const.LAYER_JA_REGION = 1; //районы

    //адрес динамического сервиса педофилы
    Const.URL_P_DYN_SERVICE = "p/MapServer";
    Const.LAYER_P = 0; //точки

    Const.ID_QR_COORDINATES_AREA = 1; //Области
    Const.ID_QR_COORDINATES_REGION = 2; //районы
    Const.ID_QR_CRIME_AREA = 10; //Области
    Const.ID_QR_CRIME_REGION = 11; //районы
    Const.ID_QR_CRIME = 12; //точки
    Const.ID_QR_UA_AREA = 20; //Области
    Const.ID_QR_UA_REGION = 21; //районы
    Const.ID_QR_UA = 22; //точки
    Const.ID_QR_RTA_AREA = 30; //Области
    Const.ID_QR_RTA_REGION = 31; //районы
    Const.ID_QR_RTA = 32; //точки
    Const.ID_QR_OL_AREA = 40; //Области
    Const.ID_QR_OL_REGION = 41; //районы
    Const.ID_QR_NARCOTIC_AREA = 50; //Области
    Const.ID_QR_NARCOTIC_REGION = 51; //районы
    Const.ID_QR_JA_AREA = 60; //Области
    Const.ID_QR_JA_REGION = 61; //районы
    Const.ID_QR_P = 70; //точки
    Const.ID_QR_P_PHOTO = 71;
    Const.ID_QR_UPP = 80;

    Const.SCALE_AREA = 6000000;
    Const.SCALE_REGION = 500000;

    Const.SHOW_POINT = "point";
    Const.SHOW_HEAT = "heat";
    Const.SHOW_BOTH = "both";

    Const.PAGE_MAP = 1;
    Const.PAGE_STAT = 2;
    Const.PAGE_SLIDE = 3;

    Const.LVL_AREA = 1;
    Const.LVL_REGION = 2;
    Const.LVL_CITY = 3;

    //тип информационной панели
    Const.INFO_TYPE_AREA = 1;
    Const.INFO_TYPE_REGIONS = 2;
    Const.INFO_TYPE_CRIME_POINT = 3;

    Const.SELECTED_YEAR = 0;
    Const.LAST_YEAR = 1;
    Const.YEAR_BEFORE_LAST = 2;

    Const.MAP_CLUSTER_RESOLUTION = 4;

    Const.OPACITY = 0.5;
    //количество делений градаций
    Const.BREAK_COUNT = 5;

    //url динамического слоя
    Const.getUrlRestResource = function (id) {
        switch (id) {
            case Const.ID_QR_COORDINATES_AREA:
                return Const.URL_GIS_SERVER + Const.URL_KZ_AREA + "/" + Const.LAYER_COORDINATES_AREA;
                break;
            case Const.ID_QR_COORDINATES_REGION:
                return Const.URL_GIS_SERVER + Const.URL_KZ_AREA + "/" + Const.LAYER_COORDINATES_REGION;
                break;
            case Const.ID_QR_CRIME_AREA:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_CRIME_AREA;
                break;
            case Const.ID_QR_CRIME_REGION:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_CRIME_REGION;
                break;
            case Const.ID_QR_CRIME:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_CRIME;
                break;
            case Const.ID_QR_UA_AREA:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_UA_AREA;
                break;
            case Const.ID_QR_UA_REGION:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_UA_REGION;
                break;
            case Const.ID_QR_UA:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_UA;
                break;
            case Const.ID_QR_RTA_AREA:
                return Const.URL_GIS_SERVER + Const.URL_RTA_DYN_SERVICE + "/" + Const.LAYER_RTA_AREA;
                break;
            case Const.ID_QR_RTA_REGION:
                return Const.URL_GIS_SERVER + Const.URL_RTA_DYN_SERVICE + "/" + Const.LAYER_RTA_REGION;
                break;
            case Const.ID_QR_RTA:
                return Const.URL_GIS_SERVER + Const.URL_RTA_DYN_SERVICE + "/" + Const.LAYER_RTA;
                break;
            case Const.ID_QR_OL_AREA:
                return Const.URL_GIS_SERVER + Const.URL_OL_DYN_SERVICE + "/" + Const.LAYER_OL_AREA;
                break;
            case Const.ID_QR_OL_REGION:
                return Const.URL_GIS_SERVER + Const.URL_OL_DYN_SERVICE + "/" + Const.LAYER_OL_REGION;
                break;
            case Const.ID_QR_JA_AREA:
                return Const.URL_GIS_SERVER + Const.URL_JA_DYN_SERVICE + "/" + Const.LAYER_JA_AREA;
                break;
            case Const.ID_QR_JA_REGION:
                return Const.URL_GIS_SERVER + Const.URL_JA_DYN_SERVICE + "/" + Const.LAYER_JA_REGION;
                break;
            case Const.ID_QR_NARCOTIC_AREA:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_NARCOTIC_AREA;
                break;
            case Const.ID_QR_NARCOTIC_REGION:
                return Const.URL_GIS_SERVER + Const.URL_CRIME_DYN_SERVICE + "/" + Const.LAYER_NARCOTIC_REGION;
                break;
            case Const.ID_QR_P:
            case Const.ID_QR_P_PHOTO:
                return Const.URL_GIS_SERVER + Const.URL_P_DYN_SERVICE + "/" + Const.LAYER_P;
                break;
            case Const.ID_QR_UPP:
                return Const.URL_GIS_SERVER + Const.URL_UPP_SERVICE;
                break;
            default:
                return Const.URL_GIS_SERVER;
                break;
        }
    }

    //тип карты
    Const.ID_MAP_CRIME = 1;
    Const.ID_MAP_UA = 2;
    Const.ID_MAP_RTA = 3;
    Const.ID_MAP_OL = 4;
    Const.ID_MAP_NARCOTIC = 5;
    Const.ID_MAP_JA = 6;
    Const.ID_MAP_P = 7;

    Const.CAPTION_MAP_CRIME = i18n.mapCrime;
    Const.CAPTION_MAP_UA = i18n.mapUa;
    Const.CAPTION_MAP_RTA = i18n.mapRta;
    Const.CAPTION_MAP_OL = i18n.mapOl;
    Const.CAPTION_MAP_NARCOTIC = i18n.mapNarcotic;
    Const.CAPTION_MAP_JA = i18n.mapJa;
    Const.CAPTION_MAP_P = i18n.mapP;

    //наименование типа карты
    Const.getMapCaption = function (type) {
        if (type == Const.ID_MAP_CRIME) {
            return Const.CAPTION_MAP_CRIME;
        } else if (type == Const.ID_MAP_UA) {
            return Const.CAPTION_MAP_UA;
        } else if (type == Const.ID_MAP_RTA) {
            return Const.CAPTION_MAP_RTA;
        } else if (type == Const.ID_MAP_OL) {
            return Const.CAPTION_MAP_OL;
        } else if (type == Const.ID_MAP_JA) {
            return Const.CAPTION_MAP_JA;
        } else if (type == Const.ID_MAP_P) {
            return Const.CAPTION_MAP_P;
        } else {
            return Const.CAPTION_MAP_NARCOTIC;
        }
    }

    // видимое пространство по умолчанию (вся карта)
    //Const.FULL_EXTENT = '{"xmin":-1632319.5607512083,"ymin":4513636.160255361,"xmax":2431688.5672650486,"ymax":6109606.018861746,"spatialReference":{"wkid":32642}}';
    Const.FULL_EXTENT = '{"xmin":3512434.323759551,"ymin":5160387.06176115,"xmax":12528334.684050262,"ymax":7674859.54422964,"spatialReference":{"wkid":102100,"latestWkid":3857}}';

    //Отображаемый период
    Const.ID_PERIOD_DAY = 1;
    Const.ID_PERIOD_MONTH = 2;
    Const.ID_PERIOD_YEAR = 3;
    Const.ID_PERIOD_ARBITRARY = 4;

    Const.CAPTION_PERIOD_DAY = i18n.lblPeriodDay;
    Const.CAPTION_PERIOD_MONTH = i18n.lblPeriodMonth;
    Const.CAPTION_PERIOD_YEAR = i18n.lblPeriodYear;

    //коды регионов, перекрываемых другими
    Const.Capitals = ['1971', '1975'];
    Const.Cities = ['191110', '191910', '191926', '193516', '193518', '193520', '193522', '193523', '193524', '193528', '195510', '195910', '193920', '196324', '191510', '191118', '193521', '194319', '195116'];

    //цвета для палитры по умолчанию
    Const.DEF_COLORS = [new Color([56, 168, 0, Const.OPACITY]), new Color([139, 209, 0, Const.OPACITY]), new Color([255, 255, 0, Const.OPACITY]), new Color([255, 128, 0, Const.OPACITY]), new Color([255, 0, 0, Const.OPACITY])];


    //наименование периода
    Const.getPeriodCaption = function (type) {
        if (type == Const.ID_PERIOD_DAY) {
            return Const.CAPTION_PERIOD_DAY;
        } else if (type == Const.ID_PERIOD_MONTH) {
            return Const.CAPTION_PERIOD_MONTH;
        } else {
            return Const.CAPTION_PERIOD_YEAR;
        }
    }

    Const.newCodexDate = new Date(2015, 0, 1); //Дата начала действия нового кодекса

    //Все статьи старого кодекса
    Const.lawAllItems = {
        "0960": {code: "96", name: nlsDict.allLi0960},
        "0970": {code: "97", name: nlsDict.allLi0970},
        "0980": {code: "98", name: nlsDict.allLi0980},
        "0990": {code: "99", name: nlsDict.allLi0990},
        "1000": {code: "100", name: nlsDict.allLi1000},
        "1010": {code: "101", name: nlsDict.allLi1010},
        "1020": {code: "102", name: nlsDict.allLi1020},
        "1030": {code: "103", name: nlsDict.allLi1030},
        "1040": {code: "104", name: nlsDict.allLi1040},
        "1050": {code: "105", name: nlsDict.allLi1050},
        "1060": {code: "106", name: nlsDict.allLi1060},
        "1070": {code: "107", name: nlsDict.allLi1070},
        "1080": {code: "108", name: nlsDict.allLi1080},
        "1090": {code: "109", name: nlsDict.allLi1090},
        "1100": {code: "110", name: nlsDict.allLi1100},
        "1110": {code: "111", name: nlsDict.allLi1110},
        "1120": {code: "112", name: nlsDict.allLi1120},
        "1130": {code: "113", name: nlsDict.allLi1130},
        "1140": {code: "114", name: nlsDict.allLi1140},
        "1141": {code: "114-1", name: nlsDict.allLi1141},
        "1150": {code: "115", name: nlsDict.allLi1150},
        "1160": {code: "116", name: nlsDict.allLi1160},
        "1170": {code: "117", name: nlsDict.allLi1170},
        "1180": {code: "118", name: nlsDict.allLi1180},
        "1190": {code: "119", name: nlsDict.allLi1190},
        "1200": {code: "120", name: nlsDict.allLi1200},
        "1210": {code: "121", name: nlsDict.allLi1210},
        "1220": {code: "122", name: nlsDict.allLi1220},
        "1230": {code: "123", name: nlsDict.allLi1230},
        "1240": {code: "124", name: nlsDict.allLi1240},
        "1250": {code: "125", name: nlsDict.allLi1250},
        "1260": {code: "126", name: nlsDict.allLi1260},
        "1270": {code: "127", name: nlsDict.allLi1270},
        "1280": {code: "128", name: nlsDict.allLi1280},
        "1290": {code: "129", name: nlsDict.allLi1290},
        "1300": {code: "130", name: nlsDict.allLi1300},
        "1310": {code: "131", name: nlsDict.allLi1310},
        "1320": {code: "132", name: nlsDict.allLi1320},
        "1321": {code: "132-1", name: nlsDict.allLi1321},
        "1330": {code: "133", name: nlsDict.allLi1330},
        "1340": {code: "134", name: nlsDict.allLi1340},
        "1350": {code: "135", name: nlsDict.allLi1350},
        "1360": {code: "136", name: nlsDict.allLi1360},
        "1370": {code: "137", name: nlsDict.allLi1370},
        "1380": {code: "138", name: nlsDict.allLi1380},
        "1381": {code: "138-1", name: nlsDict.allLi1381},
        "1390": {code: "139", name: nlsDict.allLi1390},
        "1400": {code: "140", name: nlsDict.allLi1400},
        "1410": {code: "141", name: nlsDict.allLi1410},
        "1411": {code: "141-1", name: nlsDict.allLi1411},
        "1420": {code: "142", name: nlsDict.allLi1420},
        "1430": {code: "143", name: nlsDict.allLi1430},
        "1440": {code: "144", name: nlsDict.allLi1440},
        "1450": {code: "145", name: nlsDict.allLi1450},
        "1460": {code: "146", name: nlsDict.allLi1460},
        "1470": {code: "147", name: nlsDict.allLi1470},
        "1480": {code: "148", name: nlsDict.allLi1480},
        "1490": {code: "149", name: nlsDict.allLi1490},
        "1500": {code: "150", name: nlsDict.allLi1500},
        "1501": {code: "150-1", name: nlsDict.allLi1501},
        "1510": {code: "151", name: nlsDict.allLi1510},
        "1520": {code: "152", name: nlsDict.allLi1520},
        "1530": {code: "153", name: nlsDict.allLi1530},
        "1540": {code: "154", name: nlsDict.allLi1540},
        "1550": {code: "155", name: nlsDict.allLi1550},
        "1560": {code: "156", name: nlsDict.allLi1560},
        "1570": {code: "157", name: nlsDict.allLi1570},
        "1580": {code: "158", name: nlsDict.allLi1580},
        "1590": {code: "159", name: nlsDict.allLi1590},
        "1600": {code: "160", name: nlsDict.allLi1600},
        "1610": {code: "161", name: nlsDict.allLi1610},
        "1620": {code: "162", name: nlsDict.allLi1620},
        "1630": {code: "163", name: nlsDict.allLi1630},
        "1640": {code: "164", name: nlsDict.allLi1640},
        "1650": {code: "165", name: nlsDict.allLi1650},
        "1660": {code: "166", name: nlsDict.allLi1660},
        "1661": {code: "166-1", name: nlsDict.allLi1661},
        "1670": {code: "167", name: nlsDict.allLi1670},
        "1680": {code: "168", name: nlsDict.allLi1680},
        "1690": {code: "169", name: nlsDict.allLi1690},
        "1700": {code: "170", name: nlsDict.allLi1700},
        "1710": {code: "171", name: nlsDict.allLi1710},
        "1720": {code: "172", name: nlsDict.allLi1720},
        "1730": {code: "173", name: nlsDict.allLi1730},
        "1740": {code: "174", name: nlsDict.allLi1740},
        "1750": {code: "175", name: nlsDict.allLi1750},
        "1760": {code: "176", name: nlsDict.allLi1760},
        "1770": {code: "177", name: nlsDict.allLi1770},
        "1771": {code: "177-1", name: nlsDict.allLi1771},
        "1780": {code: "178", name: nlsDict.allLi1780},
        "1790": {code: "179", name: nlsDict.allLi1790},
        "1800": {code: "180", name: nlsDict.allLi1800},
        "1810": {code: "181", name: nlsDict.allLi1810},
        "1820": {code: "182", name: nlsDict.allLi1820},
        "1830": {code: "183", name: nlsDict.allLi1830},
        "1831": {code: "183-1", name: nlsDict.allLi1831},
        "1840": {code: "184", name: nlsDict.allLi1840},
        "1841": {code: "184-1", name: nlsDict.allLi1841},
        "1850": {code: "185", name: nlsDict.allLi1850},
        "1860": {code: "186", name: nlsDict.allLi1860},
        "1870": {code: "187", name: nlsDict.allLi1870},
        "1880": {code: "188", name: nlsDict.allLi1880},
        "1890": {code: "189", name: nlsDict.allLi1890},
        "1900": {code: "190", name: nlsDict.allLi1900},
        "1910": {code: "191", name: nlsDict.allLi1910},
        "1920": {code: "192", name: nlsDict.allLi1920},
        "1921": {code: "192-1", name: nlsDict.allLi1921},
        "1930": {code: "193", name: nlsDict.allLi1930},
        "1940": {code: "194", name: nlsDict.allLi1940},
        "1941": {code: "194-1", name: nlsDict.allLi1941},
        "1950": {code: "195", name: nlsDict.allLi1950},
        "1960": {code: "196", name: nlsDict.allLi1960},
        "1970": {code: "197", name: nlsDict.allLi1970},
        "1980": {code: "198", name: nlsDict.allLi1980},
        "1990": {code: "199", name: nlsDict.allLi1990},
        "2000": {code: "200", name: nlsDict.allLi2000},
        "2010": {code: "201", name: nlsDict.allLi2010},
        "2020": {code: "202", name: nlsDict.allLi2020},
        "2021": {code: "202-1", name: nlsDict.allLi2021},
        "2030": {code: "203", name: nlsDict.allLi2030},
        "2040": {code: "204", name: nlsDict.allLi2040},
        "2050": {code: "205", name: nlsDict.allLi2050},
        "2051": {code: "205-1", name: nlsDict.allLi2051},
        "2060": {code: "206", name: nlsDict.allLi2060},
        "2070": {code: "207", name: nlsDict.allLi2070},
        "2080": {code: "208", name: nlsDict.allLi2080},
        "2090": {code: "209", name: nlsDict.allLi2090},
        "2100": {code: "210", name: nlsDict.allLi2100},
        "2110": {code: "211", name: nlsDict.allLi2110},
        "2120": {code: "212", name: nlsDict.allLi2120},
        "2130": {code: "213", name: nlsDict.allLi2130},
        "2140": {code: "214", name: nlsDict.allLi2140},
        "2150": {code: "215", name: nlsDict.allLi2150},
        "2160": {code: "216", name: nlsDict.allLi2160},
        "2161": {code: "216-1", name: nlsDict.allLi2161},
        "2170": {code: "217", name: nlsDict.allLi2170},
        "2180": {code: "218", name: nlsDict.allLi2180},
        "2190": {code: "219", name: nlsDict.allLi2190},
        "2200": {code: "220", name: nlsDict.allLi2200},
        "2210": {code: "221", name: nlsDict.allLi2210},
        "2220": {code: "222", name: nlsDict.allLi2220},
        "2221": {code: "222-1", name: nlsDict.allLi2221},
        "2230": {code: "223", name: nlsDict.allLi2230},
        "2240": {code: "224", name: nlsDict.allLi2240},
        "2250": {code: "225", name: nlsDict.allLi2250},
        "2260": {code: "226", name: nlsDict.allLi2260},
        "2261": {code: "226-1", name: nlsDict.allLi2261},
        "2270": {code: "227", name: nlsDict.allLi2270},
        "2271": {code: "227-1", name: nlsDict.allLi2271},
        "2280": {code: "228", name: nlsDict.allLi2280},
        "2290": {code: "229", name: nlsDict.allLi2290},
        "2300": {code: "230", name: nlsDict.allLi2300},
        "2310": {code: "231", name: nlsDict.allLi2310},
        "2320": {code: "232", name: nlsDict.allLi2320},
        "2330": {code: "233", name: nlsDict.allLi2330},
        "2331": {code: "233-1", name: nlsDict.allLi2331},
        "2332": {code: "233-2", name: nlsDict.allLi2332},
        "2333": {code: "233-3", name: nlsDict.allLi2333},
        "2334": {code: "233-4", name: nlsDict.allLi2334},
        "2340": {code: "234", name: nlsDict.allLi2340},
        "2350": {code: "235", name: nlsDict.allLi2350},
        "2351": {code: "235-1", name: nlsDict.allLi2351},
        "2352": {code: "235-2", name: nlsDict.allLi2352},
        "2353": {code: "235-3", name: nlsDict.allLi2353},
        "2354": {code: "235-4", name: nlsDict.allLi2354},
        "2360": {code: "236", name: nlsDict.allLi2360},
        "2370": {code: "237", name: nlsDict.allLi2370},
        "2380": {code: "238", name: nlsDict.allLi2380},
        "2390": {code: "239", name: nlsDict.allLi2390},
        "2400": {code: "240", name: nlsDict.allLi2400},
        "2410": {code: "241", name: nlsDict.allLi2410},
        "2420": {code: "242", name: nlsDict.allLi2420},
        "2430": {code: "243", name: nlsDict.allLi2430},
        "2440": {code: "244", name: nlsDict.allLi2440},
        "2450": {code: "245", name: nlsDict.allLi2450},
        "2451": {code: "245-1", name: nlsDict.allLi2451},
        "2460": {code: "246", name: nlsDict.allLi2460},
        "2461": {code: "246-1", name: nlsDict.allLi2461},
        "2470": {code: "247", name: nlsDict.allLi2470},
        "2480": {code: "248", name: nlsDict.allLi2480},
        "2490": {code: "249", name: nlsDict.allLi2490},
        "2500": {code: "250", name: nlsDict.allLi2500},
        "2510": {code: "251", name: nlsDict.allLi2510},
        "2520": {code: "252", name: nlsDict.allLi2520},
        "2530": {code: "253", name: nlsDict.allLi2530},
        "2540": {code: "254", name: nlsDict.allLi2540},
        "2550": {code: "255", name: nlsDict.allLi2550},
        "2560": {code: "256", name: nlsDict.allLi2560},
        "2570": {code: "257", name: nlsDict.allLi2570},
        "2580": {code: "258", name: nlsDict.allLi2580},
        "2590": {code: "259", name: nlsDict.allLi2590},
        "2600": {code: "260", name: nlsDict.allLi2600},
        "2610": {code: "261", name: nlsDict.allLi2610},
        "2620": {code: "262", name: nlsDict.allLi2620},
        "2630": {code: "263", name: nlsDict.allLi2630},
        "2640": {code: "264", name: nlsDict.allLi2640},
        "2650": {code: "265", name: nlsDict.allLi2650},
        "2660": {code: "266", name: nlsDict.allLi2660},
        "2670": {code: "267", name: nlsDict.allLi2670},
        "2680": {code: "268", name: nlsDict.allLi2680},
        "2690": {code: "269", name: nlsDict.allLi2690},
        "2691": {code: "269-1", name: nlsDict.allLi2691},
        "2700": {code: "270", name: nlsDict.allLi2700},
        "2710": {code: "271", name: nlsDict.allLi2710},
        "2720": {code: "272", name: nlsDict.allLi2720},
        "2730": {code: "273", name: nlsDict.allLi2730},
        "2731": {code: "273-1", name: nlsDict.allLi2731},
        "2740": {code: "274", name: nlsDict.allLi2740},
        "2750": {code: "275", name: nlsDict.allLi2750},
        "2751": {code: "275-1", name: nlsDict.allLi2751},
        "2760": {code: "276", name: nlsDict.allLi2760},
        "2770": {code: "277", name: nlsDict.allLi2770},
        "2780": {code: "278", name: nlsDict.allLi2780},
        "2790": {code: "279", name: nlsDict.allLi2790},
        "2800": {code: "280", name: nlsDict.allLi2800},
        "2810": {code: "281", name: nlsDict.allLi2810},
        "2820": {code: "282", name: nlsDict.allLi2820},
        "2830": {code: "283", name: nlsDict.allLi2830},
        "2840": {code: "284", name: nlsDict.allLi2840},
        "2850": {code: "285", name: nlsDict.allLi2850},
        "2860": {code: "286", name: nlsDict.allLi2860},
        "2870": {code: "287", name: nlsDict.allLi2870},
        "2880": {code: "288", name: nlsDict.allLi2880},
        "2890": {code: "289", name: nlsDict.allLi2890},
        "2900": {code: "290", name: nlsDict.allLi2900},
        "2910": {code: "291", name: nlsDict.allLi2910},
        "2920": {code: "292", name: nlsDict.allLi2920},
        "2930": {code: "293", name: nlsDict.allLi2930},
        "2940": {code: "294", name: nlsDict.allLi2940},
        "2950": {code: "295", name: nlsDict.allLi2950},
        "2960": {code: "296", name: nlsDict.allLi2960},
        "2970": {code: "297", name: nlsDict.allLi2970},
        "2980": {code: "298", name: nlsDict.allLi2980},
        "2990": {code: "299", name: nlsDict.allLi2990},
        "3000": {code: "300", name: nlsDict.allLi3000},
        "3010": {code: "301", name: nlsDict.allLi3010},
        "3020": {code: "302", name: nlsDict.allLi3020},
        "3030": {code: "303", name: nlsDict.allLi3030},
        "3040": {code: "304", name: nlsDict.allLi3040},
        "3041": {code: "304-1", name: nlsDict.allLi3041},
        "3050": {code: "305", name: nlsDict.allLi3050},
        "3060": {code: "306", name: nlsDict.allLi3060},
        "3070": {code: "307", name: nlsDict.allLi3070},
        "3071": {code: "307-1", name: nlsDict.allLi3071},
        "3080": {code: "308", name: nlsDict.allLi3080},
        "3090": {code: "309", name: nlsDict.allLi3090},
        "3100": {code: "310", name: nlsDict.allLi3100},
        "3101": {code: "310-1", name: nlsDict.allLi3101},
        "3110": {code: "311", name: nlsDict.allLi3110},
        "3120": {code: "312", name: nlsDict.allLi3120},
        "3130": {code: "313", name: nlsDict.allLi3130},
        "3140": {code: "314", name: nlsDict.allLi3140},
        "3150": {code: "315", name: nlsDict.allLi3150},
        "3160": {code: "316", name: nlsDict.allLi3160},
        "3170": {code: "317", name: nlsDict.allLi3170},
        "3171": {code: "317-1", name: nlsDict.allLi3171},
        "3172": {code: "317-2", name: nlsDict.allLi3172},
        "3180": {code: "318", name: nlsDict.allLi3180},
        "3190": {code: "319", name: nlsDict.allLi3190},
        "3191": {code: "319-1", name: nlsDict.allLi3191},
        "3200": {code: "320", name: nlsDict.allLi3200},
        "3210": {code: "321", name: nlsDict.allLi3210},
        "3211": {code: "321-1", name: nlsDict.allLi3211},
        "3220": {code: "322", name: nlsDict.allLi3220},
        "3230": {code: "323", name: nlsDict.allLi3230},
        "3240": {code: "324", name: nlsDict.allLi3240},
        "3250": {code: "325", name: nlsDict.allLi3250},
        "3260": {code: "326", name: nlsDict.allLi3260},
        "3270": {code: "327", name: nlsDict.allLi3270},
        "3280": {code: "328", name: nlsDict.allLi3280},
        "3290": {code: "329", name: nlsDict.allLi3290},
        "3300": {code: "330", name: nlsDict.allLi3300},
        "3301": {code: "330-1", name: nlsDict.allLi3301},
        "3302": {code: "330-2", name: nlsDict.allLi3302},
        "3303": {code: "330-3", name: nlsDict.allLi3303},
        "3310": {code: "331", name: nlsDict.allLi3310},
        "3320": {code: "332", name: nlsDict.allLi3320},
        "3330": {code: "333", name: nlsDict.allLi3330},
        "3340": {code: "334", name: nlsDict.allLi3340},
        "3350": {code: "335", name: nlsDict.allLi3350},
        "3360": {code: "336", name: nlsDict.allLi3360},
        "3370": {code: "337", name: nlsDict.allLi3370},
        "3371": {code: "337-1", name: nlsDict.allLi3371},
        "3380": {code: "338", name: nlsDict.allLi3380},
        "3381": {code: "338-1", name: nlsDict.allLi3381},
        "3390": {code: "339", name: nlsDict.allLi3390},
        "3400": {code: "340", name: nlsDict.allLi3400},
        "3410": {code: "341", name: nlsDict.allLi3410},
        "3420": {code: "342", name: nlsDict.allLi3420},
        "3430": {code: "343", name: nlsDict.allLi3430},
        "3440": {code: "344", name: nlsDict.allLi3440},
        "3450": {code: "345", name: nlsDict.allLi3450},
        "3460": {code: "346", name: nlsDict.allLi3460},
        "3470": {code: "347", name: nlsDict.allLi3470},
        "3471": {code: "347-1", name: nlsDict.allLi3471},
        "3480": {code: "348", name: nlsDict.allLi3480},
        "3490": {code: "349", name: nlsDict.allLi3490},
        "3500": {code: "350", name: nlsDict.allLi3500},
        "3510": {code: "351", name: nlsDict.allLi3510},
        "3520": {code: "352", name: nlsDict.allLi3520},
        "3530": {code: "353", name: nlsDict.allLi3530},
        "3540": {code: "354", name: nlsDict.allLi3540},
        "3550": {code: "355", name: nlsDict.allLi3550},
        "3560": {code: "356", name: nlsDict.allLi3560},
        "3570": {code: "357", name: nlsDict.allLi3570},
        "3580": {code: "358", name: nlsDict.allLi3580},
        "3590": {code: "359", name: nlsDict.allLi3590},
        "3600": {code: "360", name: nlsDict.allLi3600},
        "3610": {code: "361", name: nlsDict.allLi3610},
        "3620": {code: "362", name: nlsDict.allLi3620},
        "3630": {code: "363", name: nlsDict.allLi3630},
        "3631": {code: "363-1", name: nlsDict.allLi3631},
        "3640": {code: "364", name: nlsDict.allLi3640},
        "3650": {code: "365", name: nlsDict.allLi3650},
        "3660": {code: "366", name: nlsDict.allLi3660},
        "3670": {code: "367", name: nlsDict.allLi3670},
        "3680": {code: "368", name: nlsDict.allLi3680},
        "3690": {code: "369", name: nlsDict.allLi3690},
        "3700": {code: "370", name: nlsDict.allLi3700},
        "3710": {code: "371", name: nlsDict.allLi3710},
        "3720": {code: "372", name: nlsDict.allLi3720},
        "3730": {code: "373", name: nlsDict.allLi3730},
        "3740": {code: "374", name: nlsDict.allLi3740},
        "3750": {code: "375", name: nlsDict.allLi3750},
        "3760": {code: "376", name: nlsDict.allLi3760},
        "3770": {code: "377", name: nlsDict.allLi3770},
        "3780": {code: "378", name: nlsDict.allLi3780},
        "3790": {code: "379", name: nlsDict.allLi3790},
        "3800": {code: "380", name: nlsDict.allLi3800},
        "3801": {code: "380-1", name: nlsDict.allLi3801},
        "3802": {code: "380-2", name: nlsDict.allLi3802},
        "3810": {code: "381", name: nlsDict.allLi3810},
        "3820": {code: "382", name: nlsDict.allLi3820},
        "3830": {code: "383", name: nlsDict.allLi3830},
        "3840": {code: "384", name: nlsDict.allLi3840},
        "3850": {code: "385", name: nlsDict.allLi3850},
        "3860": {code: "386", name: nlsDict.allLi3860},
        "3870": {code: "387", name: nlsDict.allLi3870},
        "3880": {code: "388", name: nlsDict.allLi3880},
        "3890": {code: "389", name: nlsDict.allLi3890},
        "3900": {code: "390", name: nlsDict.allLi3900},
        "3910": {code: "391", name: nlsDict.allLi3910},
        "3920": {code: "392", name: nlsDict.allLi3920},
        "3930": {code: "393", name: nlsDict.allLi3930}
    }

    //подстатьи старого кодекса
    Const.subLawItems = {
        "2591": "2590",
        "2592": "2590",
        "3481": "3480"
    }

    //Все статьи нового кодекса
    Const.lawAllItems2015 = {
        "0000": {code: "0", name: nlsDict.all15Li0000},
        "0010": {code: "1", name: nlsDict.all15Li0010},
        "0990": {code: "99", name: nlsDict.all15Li0990},
        "1000": {code: "100", name: nlsDict.all15Li1000},
        "1010": {code: "101", name: nlsDict.all15Li1010},
        "1020": {code: "102", name: nlsDict.all15Li1020},
        "1030": {code: "103", name: nlsDict.all15Li1030},
        "1040": {code: "104", name: nlsDict.all15Li1040},
        "1050": {code: "105", name: nlsDict.all15Li1050},
        "1060": {code: "106", name: nlsDict.all15Li1060},
        "1070": {code: "107", name: nlsDict.all15Li1070},
        "1080": {code: "108", name: nlsDict.all15Li1080},
        "1090": {code: "109", name: nlsDict.all15Li1090},
        "1100": {code: "110", name: nlsDict.all15Li1100},
        "1110": {code: "111", name: nlsDict.all15Li1110},
        "1120": {code: "112", name: nlsDict.all15Li1120},
        "1130": {code: "113", name: nlsDict.all15Li1130},
        "1140": {code: "114", name: nlsDict.all15Li1140},
        "1150": {code: "115", name: nlsDict.all15Li1150},
        "1160": {code: "116", name: nlsDict.all15Li1160},
        "1170": {code: "117", name: nlsDict.all15Li1170},
        "1180": {code: "118", name: nlsDict.all15Li1180},
        "1190": {code: "119", name: nlsDict.all15Li1190},
        "1200": {code: "120", name: nlsDict.all15Li1200},
        "1210": {code: "121", name: nlsDict.all15Li1210},
        "1220": {code: "122", name: nlsDict.all15Li1220},
        "1230": {code: "123", name: nlsDict.all15Li1230},
        "1240": {code: "124", name: nlsDict.all15Li1240},
        "1250": {code: "125", name: nlsDict.all15Li1250},
        "1260": {code: "126", name: nlsDict.all15Li1260},
        "1270": {code: "127", name: nlsDict.all15Li1270},
        "1280": {code: "128", name: nlsDict.all15Li1280},
        "1290": {code: "129", name: nlsDict.all15Li1290},
        "1300": {code: "130", name: nlsDict.all15Li1300},
        "1310": {code: "131", name: nlsDict.all15Li1310},
        "1320": {code: "132", name: nlsDict.all15Li1320},
        "1330": {code: "133", name: nlsDict.all15Li1330},
        "1340": {code: "134", name: nlsDict.all15Li1340},
        "1350": {code: "135", name: nlsDict.all15Li1350},
        "1360": {code: "136", name: nlsDict.all15Li1360},
        "1370": {code: "137", name: nlsDict.all15Li1370},
        "1380": {code: "138", name: nlsDict.all15Li1380},
        "1390": {code: "139", name: nlsDict.all15Li1390},
        "1400": {code: "140", name: nlsDict.all15Li1400},
        "1410": {code: "141", name: nlsDict.all15Li1410},
        "1420": {code: "142", name: nlsDict.all15Li1420},
        "1430": {code: "143", name: nlsDict.all15Li1430},
        "1440": {code: "144", name: nlsDict.all15Li1440},
        "1450": {code: "145", name: nlsDict.all15Li1450},
        "1460": {code: "146", name: nlsDict.all15Li1460},
        "1470": {code: "147", name: nlsDict.all15Li1470},
        "1480": {code: "148", name: nlsDict.all15Li1480},
        "1490": {code: "149", name: nlsDict.all15Li1490},
        "1500": {code: "150", name: nlsDict.all15Li1500},
        "1510": {code: "151", name: nlsDict.all15Li1510},
        "1520": {code: "152", name: nlsDict.all15Li1520},
        "1530": {code: "153", name: nlsDict.all15Li1530},
        "1540": {code: "154", name: nlsDict.all15Li1540},
        "1550": {code: "155", name: nlsDict.all15Li1550},
        "1560": {code: "156", name: nlsDict.all15Li1560},
        "1570": {code: "157", name: nlsDict.all15Li1570},
        "1580": {code: "158", name: nlsDict.all15Li1580},
        "1590": {code: "159", name: nlsDict.all15Li1590},
        "1600": {code: "160", name: nlsDict.all15Li1600},
        "1610": {code: "161", name: nlsDict.all15Li1610},
        "1620": {code: "162", name: nlsDict.all15Li1620},
        "1630": {code: "163", name: nlsDict.all15Li1630},
        "1640": {code: "164", name: nlsDict.all15Li1640},
        "1650": {code: "165", name: nlsDict.all15Li1650},
        "1660": {code: "166", name: nlsDict.all15Li1660},
        "1670": {code: "167", name: nlsDict.all15Li1670},
        "1680": {code: "168", name: nlsDict.all15Li1680},
        "1690": {code: "169", name: nlsDict.all15Li1690},
        "1700": {code: "170", name: nlsDict.all15Li1700},
        "1710": {code: "171", name: nlsDict.all15Li1710},
        "1720": {code: "172", name: nlsDict.all15Li1720},
        "1730": {code: "173", name: nlsDict.all15Li1730},
        "1740": {code: "174", name: nlsDict.all15Li1740},
        "1750": {code: "175", name: nlsDict.all15Li1750},
        "1760": {code: "176", name: nlsDict.all15Li1760},
        "1770": {code: "177", name: nlsDict.all15Li1770},
        "1780": {code: "178", name: nlsDict.all15Li1780},
        "1790": {code: "179", name: nlsDict.all15Li1790},
        "1800": {code: "180", name: nlsDict.all15Li1800},
        "1810": {code: "181", name: nlsDict.all15Li1810},
        "1820": {code: "182", name: nlsDict.all15Li1820},
        "1830": {code: "183", name: nlsDict.all15Li1830},
        "1840": {code: "184", name: nlsDict.all15Li1840},
        "1850": {code: "185", name: nlsDict.all15Li1850},
        "1860": {code: "186", name: nlsDict.all15Li1860},
        "1870": {code: "187", name: nlsDict.all15Li1870},
        "1880": {code: "188", name: nlsDict.all15Li1880},
        "1890": {code: "189", name: nlsDict.all15Li1890},
        "1900": {code: "190", name: nlsDict.all15Li1900},
        "1910": {code: "191", name: nlsDict.all15Li1910},
        "1920": {code: "192", name: nlsDict.all15Li1920},
        "1930": {code: "193", name: nlsDict.all15Li1930},
        "1940": {code: "194", name: nlsDict.all15Li1940},
        "1950": {code: "195", name: nlsDict.all15Li1950},
        "1960": {code: "196", name: nlsDict.all15Li1960},
        "1970": {code: "197", name: nlsDict.all15Li1970},
        "1980": {code: "198", name: nlsDict.all15Li1980},
        "1990": {code: "199", name: nlsDict.all15Li1990},
        "2000": {code: "200", name: nlsDict.all15Li2000},
        "2010": {code: "201", name: nlsDict.all15Li2010},
        "2020": {code: "202", name: nlsDict.all15Li2020},
        "2030": {code: "203", name: nlsDict.all15Li2030},
        "2040": {code: "204", name: nlsDict.all15Li2040},
        "2050": {code: "205", name: nlsDict.all15Li2050},
        "2060": {code: "206", name: nlsDict.all15Li2060},
        "2070": {code: "207", name: nlsDict.all15Li2070},
        "2080": {code: "208", name: nlsDict.all15Li2080},
        "2090": {code: "209", name: nlsDict.all15Li2090},
        "2100": {code: "210", name: nlsDict.all15Li2100},
        "2110": {code: "211", name: nlsDict.all15Li2110},
        "2120": {code: "212", name: nlsDict.all15Li2120},
        "2130": {code: "213", name: nlsDict.all15Li2130},
        "2140": {code: "214", name: nlsDict.all15Li2140},
        "2150": {code: "215", name: nlsDict.all15Li2150},
        "2160": {code: "216", name: nlsDict.all15Li2160},
        "2170": {code: "217", name: nlsDict.all15Li2170},
        "2180": {code: "218", name: nlsDict.all15Li2180},
        "2190": {code: "219", name: nlsDict.all15Li2190},
        "2200": {code: "220", name: nlsDict.all15Li2200},
        "2210": {code: "221", name: nlsDict.all15Li2210},
        "2220": {code: "222", name: nlsDict.all15Li2220},
        "2230": {code: "223", name: nlsDict.all15Li2230},
        "2240": {code: "224", name: nlsDict.all15Li2240},
        "2250": {code: "225", name: nlsDict.all15Li2250},
        "2260": {code: "226", name: nlsDict.all15Li2260},
        "2270": {code: "227", name: nlsDict.all15Li2270},
        "2280": {code: "228", name: nlsDict.all15Li2280},
        "2290": {code: "229", name: nlsDict.all15Li2290},
        "2300": {code: "230", name: nlsDict.all15Li2300},
        "2310": {code: "231", name: nlsDict.all15Li2310},
        "2320": {code: "232", name: nlsDict.all15Li2320},
        "2330": {code: "233", name: nlsDict.all15Li2330},
        "2340": {code: "234", name: nlsDict.all15Li2340},
        "2350": {code: "235", name: nlsDict.all15Li2350},
        "2360": {code: "236", name: nlsDict.all15Li2360},
        "2370": {code: "237", name: nlsDict.all15Li2370},
        "2380": {code: "238", name: nlsDict.all15Li2380},
        "2390": {code: "239", name: nlsDict.all15Li2390},
        "2400": {code: "240", name: nlsDict.all15Li2400},
        "2410": {code: "241", name: nlsDict.all15Li2410},
        "2420": {code: "242", name: nlsDict.all15Li2420},
        "2430": {code: "243", name: nlsDict.all15Li2430},
        "2440": {code: "244", name: nlsDict.all15Li2440},
        "2450": {code: "245", name: nlsDict.all15Li2450},
        "2460": {code: "246", name: nlsDict.all15Li2460},
        "2470": {code: "247", name: nlsDict.all15Li2470},
        "2480": {code: "248", name: nlsDict.all15Li2480},
        "2490": {code: "249", name: nlsDict.all15Li2490},
        "2500": {code: "250", name: nlsDict.all15Li2500},
        "2510": {code: "251", name: nlsDict.all15Li2510},
        "2520": {code: "252", name: nlsDict.all15Li2520},
        "2530": {code: "253", name: nlsDict.all15Li2530},
        "2540": {code: "254", name: nlsDict.all15Li2540},
        "2550": {code: "255", name: nlsDict.all15Li2550},
        "2560": {code: "256", name: nlsDict.all15Li2560},
        "2570": {code: "257", name: nlsDict.all15Li2570},
        "2580": {code: "258", name: nlsDict.all15Li2580},
        "2590": {code: "259", name: nlsDict.all15Li2590},
        "2600": {code: "260", name: nlsDict.all15Li2600},
        "2610": {code: "261", name: nlsDict.all15Li2610},
        "2620": {code: "262", name: nlsDict.all15Li2620},
        "2630": {code: "263", name: nlsDict.all15Li2630},
        "2640": {code: "264", name: nlsDict.all15Li2640},
        "2650": {code: "265", name: nlsDict.all15Li2650},
        "2660": {code: "266", name: nlsDict.all15Li2660},
        "2670": {code: "267", name: nlsDict.all15Li2670},
        "2680": {code: "268", name: nlsDict.all15Li2680},
        "2690": {code: "269", name: nlsDict.all15Li2690},
        "2700": {code: "270", name: nlsDict.all15Li2700},
        "2710": {code: "271", name: nlsDict.all15Li2710},
        "2720": {code: "272", name: nlsDict.all15Li2720},
        "2730": {code: "273", name: nlsDict.all15Li2730},
        "2740": {code: "274", name: nlsDict.all15Li2740},
        "2750": {code: "275", name: nlsDict.all15Li2750},
        "2760": {code: "276", name: nlsDict.all15Li2760},
        "2770": {code: "277", name: nlsDict.all15Li2770},
        "2780": {code: "278", name: nlsDict.all15Li2780},
        "2790": {code: "279", name: nlsDict.all15Li2790},
        "2800": {code: "280", name: nlsDict.all15Li2800},
        "2810": {code: "281", name: nlsDict.all15Li2810},
        "2820": {code: "282", name: nlsDict.all15Li2820},
        "2830": {code: "283", name: nlsDict.all15Li2830},
        "2840": {code: "284", name: nlsDict.all15Li2840},
        "2850": {code: "285", name: nlsDict.all15Li2850},
        "2860": {code: "286", name: nlsDict.all15Li2860},
        "2870": {code: "287", name: nlsDict.all15Li2870},
        "2880": {code: "288", name: nlsDict.all15Li2880},
        "2890": {code: "289", name: nlsDict.all15Li2890},
        "2900": {code: "290", name: nlsDict.all15Li2900},
        "2910": {code: "291", name: nlsDict.all15Li2910},
        "2920": {code: "292", name: nlsDict.all15Li2920},
        "2930": {code: "293", name: nlsDict.all15Li2930},
        "2940": {code: "294", name: nlsDict.all15Li2940},
        "2950": {code: "295", name: nlsDict.all15Li2950},
        "2960": {code: "296", name: nlsDict.all15Li2960},
        "2970": {code: "297", name: nlsDict.all15Li2970},
        "2980": {code: "298", name: nlsDict.all15Li2980},
        "2990": {code: "299", name: nlsDict.all15Li2990},
        "3000": {code: "300", name: nlsDict.all15Li3000},
        "3010": {code: "301", name: nlsDict.all15Li3010},
        "3020": {code: "302", name: nlsDict.all15Li3020},
        "3030": {code: "303", name: nlsDict.all15Li3030},
        "3040": {code: "304", name: nlsDict.all15Li3040},
        "3050": {code: "305", name: nlsDict.all15Li3050},
        "3060": {code: "306", name: nlsDict.all15Li3060},
        "3070": {code: "307", name: nlsDict.all15Li3070},
        "3080": {code: "308", name: nlsDict.all15Li3080},
        "3090": {code: "309", name: nlsDict.all15Li3090},
        "3100": {code: "310", name: nlsDict.all15Li3100},
        "3110": {code: "311", name: nlsDict.all15Li3110},
        "3120": {code: "312", name: nlsDict.all15Li3120},
        "3130": {code: "313", name: nlsDict.all15Li3130},
        "3140": {code: "314", name: nlsDict.all15Li3140},
        "3150": {code: "315", name: nlsDict.all15Li3150},
        "3160": {code: "316", name: nlsDict.all15Li3160},
        "3170": {code: "317", name: nlsDict.all15Li3170},
        "3180": {code: "318", name: nlsDict.all15Li3180},
        "3190": {code: "319", name: nlsDict.all15Li3190},
        "3200": {code: "320", name: nlsDict.all15Li3200},
        "3210": {code: "321", name: nlsDict.all15Li3210},
        "3220": {code: "322", name: nlsDict.all15Li3220},
        "3230": {code: "323", name: nlsDict.all15Li3230},
        "3240": {code: "324", name: nlsDict.all15Li3240},
        "3250": {code: "325", name: nlsDict.all15Li3250},
        "3260": {code: "326", name: nlsDict.all15Li3260},
        "3270": {code: "327", name: nlsDict.all15Li3270},
        "3280": {code: "328", name: nlsDict.all15Li3280},
        "3290": {code: "329", name: nlsDict.all15Li3290},
        "3300": {code: "330", name: nlsDict.all15Li3300},
        "3310": {code: "331", name: nlsDict.all15Li3310},
        "3320": {code: "332", name: nlsDict.all15Li3320},
        "3330": {code: "333", name: nlsDict.all15Li3330},
        "3340": {code: "334", name: nlsDict.all15Li3340},
        "3350": {code: "335", name: nlsDict.all15Li3350},
        "3360": {code: "336", name: nlsDict.all15Li3360},
        "3370": {code: "337", name: nlsDict.all15Li3370},
        "3380": {code: "338", name: nlsDict.all15Li3380},
        "3390": {code: "339", name: nlsDict.all15Li3390},
        "3400": {code: "340", name: nlsDict.all15Li3400},
        "3410": {code: "341", name: nlsDict.all15Li3410},
        "3420": {code: "342", name: nlsDict.all15Li3420},
        "3430": {code: "343", name: nlsDict.all15Li3430},
        "3440": {code: "344", name: nlsDict.all15Li3440},
        "3450": {code: "345", name: nlsDict.all15Li3450},
        "3460": {code: "346", name: nlsDict.all15Li3460},
        "3470": {code: "347", name: nlsDict.all15Li3470},
        "3480": {code: "348", name: nlsDict.all15Li3480},
        "3490": {code: "349", name: nlsDict.all15Li3490},
        "3500": {code: "350", name: nlsDict.all15Li3500},
        "3510": {code: "351", name: nlsDict.all15Li3510},
        "3520": {code: "352", name: nlsDict.all15Li3520},
        "3530": {code: "353", name: nlsDict.all15Li3530},
        "3540": {code: "354", name: nlsDict.all15Li3540},
        "3550": {code: "355", name: nlsDict.all15Li3550},
        "3560": {code: "356", name: nlsDict.all15Li3560},
        "3570": {code: "357", name: nlsDict.all15Li3570},
        "3580": {code: "358", name: nlsDict.all15Li3580},
        "3590": {code: "359", name: nlsDict.all15Li3590},
        "3600": {code: "360", name: nlsDict.all15Li3600},
        "3610": {code: "361", name: nlsDict.all15Li3610},
        "3620": {code: "362", name: nlsDict.all15Li3620},
        "3630": {code: "363", name: nlsDict.all15Li3630},
        "3640": {code: "364", name: nlsDict.all15Li3640},
        "3650": {code: "365", name: nlsDict.all15Li3650},
        "3660": {code: "366", name: nlsDict.all15Li3660},
        "3670": {code: "367", name: nlsDict.all15Li3670},
        "3680": {code: "368", name: nlsDict.all15Li3680},
        "3690": {code: "369", name: nlsDict.all15Li3690},
        "3700": {code: "370", name: nlsDict.all15Li3700},
        "3710": {code: "371", name: nlsDict.all15Li3710},
        "3720": {code: "372", name: nlsDict.all15Li3720},
        "3730": {code: "373", name: nlsDict.all15Li3730},
        "3740": {code: "374", name: nlsDict.all15Li3740},
        "3750": {code: "375", name: nlsDict.all15Li3750},
        "3760": {code: "376", name: nlsDict.all15Li3760},
        "3770": {code: "377", name: nlsDict.all15Li3770},
        "3780": {code: "378", name: nlsDict.all15Li3780},
        "3790": {code: "379", name: nlsDict.all15Li3790},
        "3800": {code: "380", name: nlsDict.all15Li3800},
        "3810": {code: "381", name: nlsDict.all15Li3810},
        "3820": {code: "382", name: nlsDict.all15Li3820},
        "3830": {code: "383", name: nlsDict.all15Li3830},
        "3840": {code: "384", name: nlsDict.all15Li3840},
        "3850": {code: "385", name: nlsDict.all15Li3850},
        "3860": {code: "386", name: nlsDict.all15Li3860},
        "3870": {code: "387", name: nlsDict.all15Li3870},
        "3880": {code: "388", name: nlsDict.all15Li3880},
        "3890": {code: "389", name: nlsDict.all15Li3890},
        "3900": {code: "390", name: nlsDict.all15Li3900},
        "3910": {code: "391", name: nlsDict.all15Li3910},
        "3920": {code: "392", name: nlsDict.all15Li3920},
        "3930": {code: "393", name: nlsDict.all15Li3930},
        "3940": {code: "394", name: nlsDict.all15Li3940},
        "3950": {code: "395", name: nlsDict.all15Li3950},
        "3960": {code: "396", name: nlsDict.all15Li3960},
        "3970": {code: "397", name: nlsDict.all15Li3970},
        "3980": {code: "398", name: nlsDict.all15Li3980},
        "3990": {code: "399", name: nlsDict.all15Li3990},
        "4000": {code: "400", name: nlsDict.all15Li4000},
        "4010": {code: "401", name: nlsDict.all15Li4010},
        "4020": {code: "402", name: nlsDict.all15Li4020},
        "4030": {code: "403", name: nlsDict.all15Li4030},
        "4040": {code: "404", name: nlsDict.all15Li4040},
        "4050": {code: "405", name: nlsDict.all15Li4050},
        "4060": {code: "406", name: nlsDict.all15Li4060},
        "4070": {code: "407", name: nlsDict.all15Li4070},
        "4080": {code: "408", name: nlsDict.all15Li4080},
        "4090": {code: "409", name: nlsDict.all15Li4090},
        "4100": {code: "410", name: nlsDict.all15Li4100},
        "4110": {code: "411", name: nlsDict.all15Li4110},
        "4120": {code: "412", name: nlsDict.all15Li4120},
        "4130": {code: "413", name: nlsDict.all15Li4130},
        "4140": {code: "414", name: nlsDict.all15Li4140},
        "4150": {code: "415", name: nlsDict.all15Li4150},
        "4160": {code: "416", name: nlsDict.all15Li4160},
        "4170": {code: "417", name: nlsDict.all15Li4170},
        "4180": {code: "418", name: nlsDict.all15Li4180},
        "4190": {code: "419", name: nlsDict.all15Li4190},
        "4200": {code: "420", name: nlsDict.all15Li4200},
        "4210": {code: "421", name: nlsDict.all15Li4210},
        "4220": {code: "422", name: nlsDict.all15Li4220},
        "4230": {code: "423", name: nlsDict.all15Li4230},
        "4240": {code: "424", name: nlsDict.all15Li4240},
        "4250": {code: "425", name: nlsDict.all15Li4250},
        "4260": {code: "426", name: nlsDict.all15Li4260},
        "4270": {code: "427", name: nlsDict.all15Li4270},
        "4280": {code: "428", name: nlsDict.all15Li4280},
        "4290": {code: "429", name: nlsDict.all15Li4290},
        "4300": {code: "430", name: nlsDict.all15Li4300},
        "4310": {code: "431", name: nlsDict.all15Li4310},
        "4320": {code: "432", name: nlsDict.all15Li4320},
        "4330": {code: "433", name: nlsDict.all15Li4330},
        "4340": {code: "434", name: nlsDict.all15Li4340},
        "4350": {code: "435", name: nlsDict.all15Li4350},
        "4360": {code: "436", name: nlsDict.all15Li4360},
        "4370": {code: "437", name: nlsDict.all15Li4370},
        "4380": {code: "438", name: nlsDict.all15Li4380},
        "4390": {code: "439", name: nlsDict.all15Li4390},
        "4400": {code: "440", name: nlsDict.all15Li4400},
        "4410": {code: "441", name: nlsDict.all15Li4410},
        "4420": {code: "442", name: nlsDict.all15Li4420},
        "4430": {code: "443", name: nlsDict.all15Li4430},
        "4440": {code: "444", name: nlsDict.all15Li4440},
        "4450": {code: "445", name: nlsDict.all15Li4450},
        "4460": {code: "446", name: nlsDict.all15Li4460},
        "4470": {code: "447", name: nlsDict.all15Li4470},
        "4480": {code: "448", name: nlsDict.all15Li4480},
        "4490": {code: "449", name: nlsDict.all15Li4490},
        "4500": {code: "450", name: nlsDict.all15Li4500},
        "4510": {code: "451", name: nlsDict.all15Li4510},
        "4520": {code: "452", name: nlsDict.all15Li4520},
        "4530": {code: "453", name: nlsDict.all15Li4530},
        "4540": {code: "454", name: nlsDict.all15Li4540},
        "4550": {code: "455", name: nlsDict.all15Li4550},
        "4560": {code: "456", name: nlsDict.all15Li4560},
        "4570": {code: "457", name: nlsDict.all15Li4570},
        "4580": {code: "458", name: nlsDict.all15Li4580},
        "4590": {code: "459", name: nlsDict.all15Li4590},
        "4600": {code: "460", name: nlsDict.all15Li4600},
        "4610": {code: "461", name: nlsDict.all15Li4610},
        "4620": {code: "462", name: nlsDict.all15Li4620},
        "4630": {code: "463", name: nlsDict.all15Li4630},
        "4640": {code: "464", name: nlsDict.all15Li4640},
        "4650": {code: "465", name: nlsDict.all15Li4650},
        "4660": {code: "466", name: nlsDict.all15Li4660}
    };

    //место совершения
    Const.places = {
        "001": {nameru: "улица (площадь)", namekz: "көше (алаң)"},
        "002": {nameru: "рынок", namekz: "базар"},
        "003": {nameru: "вокзал железнодорожный", namekz: "темір жол вокзалы"},
        "004": {nameru: "вокзал морской (речной)", namekz: "теңіз (өзен) вокзалы"},
        "005": {nameru: "автовокзал", namekz: "автовокзал"},
        "006": {nameru: "аэровокзал", namekz: "әуевокзал"},
        "007": {nameru: "не огороженный двор дома (за искл.частных)", namekz: "ауласы қойылмаған үй алаңы (жеке үйден басқа)"},
        "008": {nameru: "парк (сквер)", namekz: "саябақ (сквер)"},
        "009": {nameru: "пляж", namekz: "пляж"},
        "010": {nameru: "аэропорт", namekz: "әуежай"},
        "011": {nameru: "перрон", namekz: "перрон"},
        "012": {nameru: "прочие уличные", namekz: "басқа көшелік"},
        "013": {nameru: "водоем", namekz: "суат"},
        "014": {nameru: "лес, лесопосадка", namekz: "орман, орман егістері"},
        "015": {nameru: "пустырь, овраг", namekz: "пустырь, овраг"},
        "016": {nameru: "автостоянка", namekz: "асвтотұрақ"},
        "017": {nameru: "АЗС", namekz: "АЗС"},
        "018": {nameru: "частный двор, в т.ч. огороженный", namekz: "жеке аула, с.і.ауласымен"},
        "019": {nameru: "берег реки", namekz: "берег реки"},
        "020": {nameru: "тепловые трассы", namekz: "тепловые трассы"},
        "021": {nameru: "квартира", namekz: "пәтер"},
        "022": {nameru: "дом", namekz: "үй"},
        "023": {nameru: "подъезд жилого дома", namekz: "тұрғын үй кірер берісі"},
        "024": {nameru: "лифтовой отсек", namekz: "лифттік отсек"},
        "025": {nameru: "чердак", namekz: "чердак"},
        "026": {nameru: "подвал", namekz: "подвал"},
        "027": {nameru: "гостиница", namekz: "қонақ үй"},
        "028": {nameru: "общежитие", namekz: "жатақхана"},
        "029": {nameru: "медучреждение", namekz: "медмекеме"},
        "030": {nameru: "дом отдыха (санаторий)", namekz: "демалыс үйі (санаторий)"},
        "031": {nameru: "дача", namekz: "саяжай"},
        "032": {nameru: "казарма", namekz: "казарма"},
        "033": {nameru: "подсобное помещение жилых домов", namekz: "подсобное помещение жилых домов"},
        "034": {nameru: "хранилище", namekz: "қойма"},
        "035": {nameru: "вагон", namekz: "вагон"},
        "036": {nameru: "контейнер", namekz: "контейнер"},
        "037": {nameru: "гараж", namekz: "гараж"},
        "038": {nameru: "детсад (ясли)", namekz: "балабақша (ясли)"},
        "039": {nameru: "сарай", namekz: "қора"},
        "040": {nameru: "строящийся частный дом", namekz: "строящийся частный дом"},
        "041": {nameru: "гардероб", namekz: "гардероб"},
        "042": {nameru: "042", namekz: "042"},
        "043": {nameru: "склад", namekz: "қойма"},
        "044": {nameru: "учебное заведение", namekz: "оқу орны"},
        "045": {nameru: "другие помещения", namekz: "басқа үй-жай"},
        "046": {nameru: "ночной клуб", namekz: "түнгі клуб"},
        "047": {nameru: "047", namekz: "047"},
        "048": {nameru: "ломбард", namekz: "ломбард"},
        "049": {nameru: "объект игорного бизнеса", namekz: "ойын бизнесінің объектісі"},
        "050": {nameru: "тамбур вагона пассажирского поезда", namekz: "жолаушы поезы вагонының тамбуры"},
        "051": {nameru: "051", namekz: "051"},
        "052": {nameru: "052", namekz: "052"},
        "053": {nameru: "магазин частный", namekz: "дүкен жеке"},
        "054": {nameru: "военторг", namekz: "әскерисауда"},
        "055": {nameru: "магазин комиссионный", namekz: "дүкен комиссиялық"},
        "056": {nameru: "буфет", namekz: "асхана"},
        "057": {nameru: "киоск", namekz: "киоск"},
        "058": {nameru: "кафе (ресторан)", namekz: "кафе (ресторан)"},
        "059": {nameru: "метрополитен", namekz: "метрополитен"},
        "060": {nameru: "дом культуры", namekz: "дом культуры"},
        "061": {nameru: "банк межгосударственный", namekz: "мемлекетаралық банк"},
        "062": {nameru: "банк государственный", namekz: "мемлекеттік банк"},
        "063": {nameru: "банк акционерный", namekz: "акционерлік банк"},
        "064": {nameru: "банк с иностр. участием", namekz: "шетелд.қатысуымен банк"},
        "065": {nameru: "банк частный", namekz: "жеке банк"},
        "066": {nameru: "066", namekz: "066"},
        "067": {nameru: "акционерное общество", namekz: "акционерное общество"},
        "068": {nameru: "068", namekz: "068"},
        "069": {nameru: "дочерний акционерный банк", namekz: "еншілес акционерлік банк"},
        "071": {nameru: "кассы предприятий и учреждений", namekz: "кәсіпорын және мекеме кассасы"},
        "072": {nameru: "обменный пункт", namekz: "алмастыру пункті"},
        "073": {nameru: "канализационные коложцы", namekz: "канализационные коложцы"},
        "074": {nameru: "кладбище", namekz: "кладбище"},
        "075": {nameru: "производственные помещения", namekz: "производственные помещения"},
        "076": {nameru: "промышеленные помещения", namekz: "промышеленные помещения"},
        "077": {nameru: "служебные кабинеты", namekz: "служебные кабинеты"},
        "078": {nameru: "подсобные помещения кухни", namekz: "подсобные помещения кухни"},
        "079": {nameru: "пастбище", namekz: "пастбище"},
        "080": {nameru: "строящиеся или заброшенные здания", namekz: "строящиеся или заброшенные здания"},
        "081": {nameru: "офис", namekz: "кеңсе"},
        "082": {nameru: "база", namekz: "база"},
        "083": {nameru: "аптека", namekz: "дәріхана"},
        "084": {nameru: "отделение связи", namekz: "байланыс бөлімі"},
        "085": {nameru: "музей", namekz: "мұражай"},
        "086": {nameru: "выставочный зал", namekz: "көрме залы"},
        "087": {nameru: "места отправления религиозного культа", namekz: "діни культті жіберу орны"},
        "088": {nameru: "театр к/театр", namekz: "театр к/театр"},
        "089": {nameru: "ВУЗ", namekz: "ЖОО"},
        "090": {nameru: "подземные коммуникации", namekz: "подземные коммуникации"},
        "091": {nameru: "общественный транспорт", namekz: "қоғамдық көлік"},
        "092": {nameru: "транспорт ж/д", namekz: "т/ж көлігі"},
        "093": {nameru: "транспорт воздушний", namekz: "әуе көлігі"},
        "094": {nameru: "транспорт морской,речной", namekz: "теңіз, өзен көлігі"},
        "095": {nameru: "транспорт электрический", namekz: "электр.көлігі"},
        "096": {nameru: "транспорт автомобильный", namekz: "автомоб.көлігі"},
        "097": {nameru: "транспорт личный", namekz: "жеке көлік"},
        "098": {nameru: "транспорт другой механизированный", namekz: "басқа механ.көлігі"},
        "099": {nameru: "автострада (трасса)", namekz: "автострада (трасса)"},
        "100": {nameru: "другое место ", namekz: "другое место "},
        "101": {nameru: "из салона авто", namekz: "из салона авто"},
        "102": {nameru: "торговый дом", namekz: "торговый дом"},
        "103": {nameru: "военные объекты", namekz: "военные объекты"}
    }

    Const.getCrimeSceneCaption = function (code) {//наимеование статьи
        var place = Const.places[code];
        var lbl = "";
        if (place) {
            if (dojo.locale == 'kk') {
                lbl = place.namekz;
            } else {
                lbl = place.nameru;
            }
        }
        //console.log(lbl);
        return lbl;
    }

    Const.getLawCaption = function (code, date) {//наимеование статьи
        var lawItem = undefined;
        if (date >= Const.newCodexDate) {
            lawItem = Const.lawAllItems2015[code];
        } else {
            lawItem = Const.lawAllItems[code];
        }
        if (lawItem == undefined) {
            return code + ". " + i18n.lawUndefined;
        }
        if ((lawItem.code == "0") || (lawItem.code == "1")) {
            return lawItem.name;
        } else {
            return lawItem.code + ". " + lawItem.name;
        }
    }

    Const.getHardLawCaption = function (code) {//тяжесть статьи
        if (code == 2) {
            return i18n.hardAverage;
        } else if (code == 3) {
            return i18n.hardGrave;
        } else if (code == 4) {
            return i18n.hardStrong;
        } else if (code == 1) {
            return i18n.hardSmall;
        } else {
            return "";
        }
    }

    Const.getFilterCaption = function (code) {//тяжесть статьи
        if (code == 0) {
            return nlsDict.crimeHard0;
        } else if (code == 5) {
            return nlsDict.crimeHard5;
        } else if (code == 6) {
            return nlsDict.crimeHard6;
        } else if (code == 2) {
            return nlsDict.crimeHard2;
        } else if (code == 3) {
            return nlsDict.crimeHard3;
        } else if (code == 4) {
            return nlsDict.crimeHard4;
        } else if (code == 1) {
            return nlsDict.crimeHard1;
        } else if (code < 0) {
            return nlsDict.crimeHardLaw;
        } else {
            return "";
        }
    }

    Const.getFilterCaption4Rep = function (code) {//тяжесть статьи
        if (code == 5) {
            return i18n.titleHard5;
        } else if (code == 6) {
            return i18n.titleHard6;
        } else if (code == 2) {
            return i18n.titleHard2;
        } else if (code == 3) {
            return i18n.titleHard3;
        } else if (code == 4) {
            return i18n.titleHard4;
        } else if (code == 1) {
            return i18n.titleHard1;
        } else {
            return i18n.titleHard0;
        }
    }

    Const.lawItems2015 = [
        { value: "0990", label: nlsDict.li15f0990},
        { value: "1000", label: nlsDict.li15f1000},
        { value: "1010", label: nlsDict.li15f1010},
        { value: "1020", label: nlsDict.li15f1020},
        { value: "1030", label: nlsDict.li15f1030},
        { value: "1040", label: nlsDict.li15f1040},
        { value: "1050", label: nlsDict.li15f1050},
        { value: "1060", label: nlsDict.li15f1060},
        { value: "1070", label: nlsDict.li15f1070},
        { value: "1080", label: nlsDict.li15f1080},
        { value: "1110", label: nlsDict.li15f1110},
        { value: "1120", label: nlsDict.li15f1120},
        { value: "1130", label: nlsDict.li15f1130},
        { value: "1140", label: nlsDict.li15f1140},
        { value: "1190", label: nlsDict.li15f1190},
        { value: "1200", label: nlsDict.li15f1200},
        { value: "1210", label: nlsDict.li15f1210},
        { value: "1460", label: nlsDict.li15f1460},
        { value: "1490", label: nlsDict.li15f1490},
        { value: "1870", label: nlsDict.li15f1870},
        { value: "1880", label: nlsDict.li15f1880},
        { value: "1900", label: nlsDict.li15f1900},
        { value: "1910", label: nlsDict.li15f1910},
        { value: "1920", label: nlsDict.li15f1920},
        { value: "1923", label: nlsDict.li15f1923},
        { value: "2880", label: nlsDict.li15f2880},
        { value: "2910", label: nlsDict.li15f2910},
        { value: "2920", label: nlsDict.li15f2920},
        { value: "2930", label: nlsDict.li15f2930},
        { value: "2940", label: nlsDict.li15f2940},
        { value: "2970", label: nlsDict.li15f2970},
        { value: "3000", label: nlsDict.li15f3000},
        { value: "3020", label: nlsDict.li15f3020},
        { value: "3070", label: nlsDict.li15f3070},
        { value: "3090", label: nlsDict.li15f3090},
        { value: "3100", label: nlsDict.li15f3100},
        { value: "3140", label: nlsDict.li15f3140}
    ];

    Const.lawItems = [
        { value: "0960", label: nlsDict.lif0960},
        { value: "0970", label: nlsDict.lif0970},
        { value: "0980", label: nlsDict.lif0980},
        { value: "0990", label: nlsDict.lif0990},
        { value: "1000", label: nlsDict.lif1000},
        { value: "1010", label: nlsDict.lif1010},
        { value: "1030", label: nlsDict.lif1030},
        { value: "1040", label: nlsDict.lif1040},
        { value: "1200", label: nlsDict.lif1200},
        { value: "1210", label: nlsDict.lif1210},
        { value: "1220", label: nlsDict.lif1220},
        { value: "1240", label: nlsDict.lif1240},
        { value: "1250", label: nlsDict.lif1250},
        { value: "1310", label: nlsDict.lif1310},
        { value: "1750", label: nlsDict.lif1750},
        { value: "1770", label: nlsDict.lif1770},
        { value: "1780", label: nlsDict.lif1780},
        { value: "1790", label: nlsDict.lif1790},
        { value: "1810", label: nlsDict.lif1810},
        { value: "1850", label: nlsDict.lif1850},
        { value: "1870", label: nlsDict.lif1870},
        { value: "2330", label: nlsDict.lif2330},
        { value: "2331", label: nlsDict.lif2331},
        { value: "2332", label: nlsDict.lif2332},
        { value: "2333", label: nlsDict.lif2333},
        { value: "2350", label: nlsDict.lif2350},
        { value: "2370", label: nlsDict.lif2370},
        { value: "2420", label: nlsDict.lif2420},
        { value: "2570", label: nlsDict.lif2570},
        { value: "2580", label: nlsDict.lif2580},
        { value: "2590", label: nlsDict.lif2590},
        { value: "2600", label: nlsDict.lif2600},
        { value: "2610", label: nlsDict.lif2610},
        { value: "2640", label: nlsDict.lif2640},
        { value: "2960", label: nlsDict.lif2960},
        { value: "3240", label: nlsDict.lif3240},
        { value: "3250", label: nlsDict.lif3250}
    ];

    //население по регионам
    Const.Population = {
        "1911": 733212,
        "1915": 777471,
        "1919": 1873374,
        "1923": 532020,
        "1927": 608318,
        "1931": 1046497,
        "1935": 1352302,
        "1939": 881605,
        "1943": 700578,
        "1947": 524175,
        "1951": 2567707,
        "1955": 746163,
        "1959": 589308,
        "1963": 1398083,
        "1971": 697129,
        "1975": 1414017,
        "7070": 100000000,
        "191110": 149901,
        "191118": 65881,
        "191132": 27845,
        "191134": 27343,
        "191136": 26347,
        "191138": 50470,
        "191140": 34634,
        "191144": 6560,
        "191145": 17276,
        "191146": 31233,
        "191148": 27007,
        "191152": 20699,
        "191154": 15253,
        "191156": 40230,
        "191160": 9756,
        "191164": 21065,
        "191166": 58986,
        "191168": 29181,
        "191170": 73545,
        "191510": 408811,
        "191532": 38992,
        "191534": 25606,
        "191536": 22385,
        "191540": 16678,
        "191542": 19361,
        "191546": 29428,
        "191548": 62766,
        "191552": 18563,
        "191556": 35186,
        "191560": 40183,
        "191564": 44723,
        "191568": 14789,
        "191910": 151074,
        "191916": 54956,
        "191926": 28162,
        "191932": 39573,
        "191934": 70216,
        "191936": 30319,
        "191940": 266616,
        "191942": 126316,
        "191946": 48790,
        "191948": 39388,
        "191950": 47819,
        "191952": 261126,
        "191956": 116178,
        "191958": 79936,
        "191960": 41295,
        "191962": 177650,
        "191964": 50466,
        "191966": 61754,
        "191968": 181740,
        "192310": 256302,
        "192336": 72949,
        "192340": 30975,
        "192342": 25358,
        "192346": 55978,
        "192348": 30563,
        "192352": 29628,
        "192356": 30267,
        "192710": 259033,
        "192732": 41511,
        "192736": 54125,
        "192740": 23648,
        "192742": 16660,
        "192744": 55113,
        "192748": 32152,
        "192750": 16696,
        "192754": 16465,
        "192758": 21122,
        "192760": 17129,
        "192762": 38902,
        "192766": 15762,
        "193110": 100000,
        "193111": 100000,
        "193112": 100000,
        "193136": 88064,
        "193140": 87126,
        "193142": 51894,
        "193148": 128709,
        "193150": 64287,
        "193154": 78610,
        "193156": 31974,
        "193160": 41891,
        "193162": 51230,
        "193166": 95301,
        "193167": 100000,
        "193510": 471095,
        "193511": 100000,
        "193516": 76647,
        "193518": 90196,
        "193520": 19250,
        "193521": 13579,
        "193522": 50472,
        "193523": 69753,
        "193524": 178887,
        "193528": 56069,
        "193532": 53143,
        "193536": 18656,
        "193540": 63533,
        "193544": 31376,
        "193548": 41289,
        "193552": 25368,
        "193556": 34245,
        "193560": 13492,
        "193564": 45252,
        "193570": 100000,
        "193910": 215575,
        "193911": 100000,
        "193912": 100000,
        "193916": 40638,
        "193920": 40875,
        "193924": 125436,
        "193932": 15415,
        "193934": 17434,
        "193936": 46900,
        "193940": 21420,
        "193942": 14972,
        "193944": 50757,
        "193948": 15191,
        "193950": 30407,
        "193952": 28708,
        "193954": 68631,
        "193956": 31331,
        "193958": 12862,
        "193962": 24018,
        "193964": 28449,
        "193966": 24718,
        "193968": 27868,
        "194310": 241323,
        "194319": 37157,
        "194332": 72346,
        "194336": 36191,
        "194340": 73708,
        "194344": 73549,
        "194346": 51582,
        "194348": 38534,
        "194352": 76188,
        "194710": 177663,
        "194718": 118672,
        "194736": 51713,
        "194742": 30780,
        "194746": 31956,
        "194750": 91788,
        "194752": 21603,
        "195110": 100000,
        "195111": 100000,
        "195112": 100000,
        "195116": 64719,
        "195120": 85021,
        "195126": 235341,
        "195132": 10000,
        "195136": 53608,
        "195140": 103745,
        "195144": 291645,
        "195146": 107928,
        "195148": 54521,
        "195152": 295843,
        "195154": 287229,
        "195156": 54262,
        "195158": 127409,
        "195160": 100623,
        "195164": 76744,
        "195510": 341931,
        "195511": 100000,
        "195516": 68418,
        "195522": 144556,
        "195532": 14399,
        "195536": 27917,
        "195542": 17407,
        "195546": 19973,
        "195548": 21493,
        "195552": 14267,
        "195556": 12153,
        "195560": 29141,
        "195564": 12922,
        "195568": 21586,
        "195910": 204571,
        "195911": 100000,
        "195912": 100000,
        "195932": 42847,
        "195934": 18682,
        "195936": 35649,
        "195942": 27531,
        "195946": 24451,
        "195950": 44416,
        "195952": 20825,
        "195956": 22229,
        "195958": 22288,
        "195960": 49547,
        "195962": 13555,
        "195964": 17726,
        "195966": 44991,
        "196310": 318812,
        "196311": 100000,
        "196312": 100000,
        "196318": 38217,
        "196320": 38547,
        "196322": 11032,
        "196324": 58103,
        "196327": 100000,
        "196328": 329109,
        "196329": 100000,
        "196330": 100000,
        "196331": 100000,
        "196332": 15377,
        "196334": 36211,
        "196336": 21653,
        "196338": 39084,
        "196340": 63567,
        "196344": 44598,
        "196346": 36769,
        "196348": 36664,
        "196350": 33412,
        "196352": 30779,
        "196354": 29233,
        "196358": 46117,
        "196362": 40374,
        "196364": 82201,
        "196368": 48224,
        "197110": 697129,
        "197111": 341836,
        "197113": 276152,
        "197115": 79141,
        "197419": 100000000,
        "197420": 100000000,
        "197421": 100000000,
        "197431": 100000000,
        "197450": 100000000,
        "197451": 100000000,
        "197452": 100000000,
        "197453": 100000000,
        "197463": 100000000,
        "197464": 100000000,
        "197475": 100000000,
        "197476": 100000000,
        "197477": 100000000,
        "197510": 1414017,
        "197511": 187336,
        "197512": 162589,
        "197513": 296852,
        "197514": 276376,
        "197515": 138521,
        "197517": 167144,
        "197519": 185199,
        "1974": 100000000
    }

    Const.getPicturePath = function (crimeCode) {//Путь к рисунку
        if (crimeCode == 990) {
            return "images/crime-type/crime-099.png";
        } else if (crimeCode == 1000) {
            return "images/crime-type/crime-100.png";
        } else if (crimeCode == 1010) {
            return "images/crime-type/crime-101.png";
        } else if (crimeCode == 1020) {
            return "images/crime-type/crime-102.png";
        } else if (crimeCode == 1030) {
            return "images/crime-type/crime-103.png";
        } else if (crimeCode == 1040) {
            return "images/crime-type/crime-104.png";
        } else if (crimeCode == 1050) {
            return "images/crime-type/crime-105.png";
        } else if (crimeCode == 1060) {
            return "images/crime-type/crime-106.png";
        } else if (crimeCode == 1070) {
            return "images/crime-type/crime-107.png";
        } else if (crimeCode == 1080) {
            return "images/crime-type/crime-108.png";
        } else if (crimeCode == 1110) {
            return "images/crime-type/crime-111.png";
        } else if (crimeCode == 1120) {
            return "images/crime-type/crime-112.png";
        } else if (crimeCode == 1130) {
            return "images/crime-type/crime-113.png";
        } else if (crimeCode == 1140) {
            return "images/crime-type/crime-114.png";
        } else if (crimeCode == 1190) {
            return "images/crime-type/crime-119.png";
        } else if (crimeCode == 1200) {
            return "images/crime-type/crime-120.png";
        } else if (crimeCode == 1210) {
            return "images/crime-type/crime-121.png";
        } else if (crimeCode == 1460) {
            return "images/crime-type/crime-146.png";
        } else if (crimeCode == 1490) {
            return "images/crime-type/crime-149.png";
        } else if (crimeCode == 1870) {
            return "images/crime-type/crime-187.png";
        } else if (crimeCode == 1880) {
            return "images/crime-type/crime-188.png";
        } else if (crimeCode == 1900) {
            return "images/crime-type/crime-190.png";
        } else if (crimeCode == 1910) {
            return "images/crime-type/crime-191.png";
        } else if (crimeCode == 1920) {
            return "images/crime-type/crime-192.png";
        } else if (crimeCode == 1930) {
            return "images/crime-type/crime-193.png";
        } else if (crimeCode == 2880) {
            return "images/crime-type/crime-288.png";
        } else if (crimeCode == 2910) {
            return "images/crime-type/crime-291.png";
        } else if (crimeCode == 2920) {
            return "images/crime-type/crime-292.png";
        } else if (crimeCode == 2930) {
            return "images/crime-type/crime-293.png";
        } else if (crimeCode == 2940) {
            return "images/crime-type/crime-294.png";
        } else if (crimeCode == 2970) {
            return "images/crime-type/crime-297.png";
        } else if (crimeCode == 3020) {
            return "images/crime-type/crime-302.png";
        } else if (crimeCode == 3070) {
            return "images/crime-type/crime-307.png";
        } else if (crimeCode == 3090) {
            return "images/crime-type/crime-309.png";
        } else if (crimeCode == 3100) {
            return "images/crime-type/crime-310.png";
        } else if (crimeCode == 3140) {
            return "images/crime-type/crime-314.png";
        } /*else if (crimeCode == 3190) {
         return "images/crime-type/crime-319.png";
         }*/ else if (crimeCode == 3000) {
            return "images/crime-type/crime-300.png";
        } else {
            return "images/crime-type/crime-all.png";
        }
    }


    return Const;
});