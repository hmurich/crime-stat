define(["dojo/i18n!crime/nls/dict"
], function (i18n) {

    var Dict = function () {
    };

    //типы файлов для печати
    Dict.TypeFilePrint = [
        { value: "PDF", label: "PDF" },
        { value: "PNG32", label: i18n.PNG32 },
        { value: "PNG8", label: i18n.PNG8 },
        { value: "JPG", label: "JPG" },
        { value: "GIF", label: "GIF" },
        { value: "EPS", label: "EPS" },
        { value: "SVG", label: "SVG" },
        { value: "SVGZ", label: "SVGZ" }
    ];

    //период получения рассылки
    Dict.MailPeriod = [
        { value: "1", label: i18n.mailPeriod1 },
        { value: "2", label: i18n.mailPeriod2 },
        { value: "7", label: i18n.mailPeriod2 }
    ];

    console.warn(i18n);
    Dict.CrimeHard = [
        { label: i18n.crimeHard0, value: "0"},
        { label: i18n.crimeHard1, value: "1" },
        { label: i18n.crimeHard2, value: "2" },
        { label: i18n.crimeHard3, value: "3" },
        { label: i18n.crimeHard4, value: "4" },
        { label: i18n.crimeHard5, value: "5" },
        { label: i18n.crimeHard6, value: "6" },
        { label: i18n.crimeHardLaw, value: "-1" }
    ];

    Dict.TimePeriod = [
        { label: i18n.TimePeriod0, value: "0"},
        { label: i18n.TimePeriod1, value: "1" },
        { label: i18n.TimePeriod2, value: "2" },
        { label: i18n.TimePeriod3, value: "3" }
    ];

    Dict.Area = [
        { label: i18n.area1911, value: "1911", regions: [
            { label: i18n.reg191110, value: "191110"},
            { label: i18n.reg191118, value: "191118"},
            { label: i18n.reg191132, value: "191132"},
            { label: i18n.reg191134, value: "191134"},
            { label: i18n.reg191136, value: "191136"},
            { label: i18n.reg191138, value: "191138"},
            { label: i18n.reg191140, value: "191140"},
            { label: i18n.reg191144, value: "191144"},
            { label: i18n.reg191145, value: "191145"},
            { label: i18n.reg191146, value: "191146"},
            { label: i18n.reg191148, value: "191148"},
            { label: i18n.reg191152, value: "191152"},
            { label: i18n.reg191154, value: "191154"},
            { label: i18n.reg191156, value: "191156"},
            { label: i18n.reg191160, value: "191160"},
            { label: i18n.reg191164, value: "191164"},
            { label: i18n.reg191166, value: "191166"},
            { label: i18n.reg191168, value: "191168"},
            { label: i18n.reg191170, value: "191170"}
        ]},
        { label: i18n.area1915, value: "1915", regions: [
            { label: i18n.reg191510, value: "191510"},
            { label: i18n.reg191532, value: "191532"},
            { label: i18n.reg191534, value: "191534"},
            { label: i18n.reg191536, value: "191536"},
            { label: i18n.reg191540, value: "191540"},
            { label: i18n.reg191542, value: "191542"},
            { label: i18n.reg191546, value: "191546"},
            { label: i18n.reg191548, value: "191548"},
            { label: i18n.reg191552, value: "191552"},
            { label: i18n.reg191556, value: "191556"},
            { label: i18n.reg191560, value: "191560"},
            { label: i18n.reg191564, value: "191564"},
            { label: i18n.reg191568, value: "191568"}
        ]},
        { label: i18n.area1919, value: "1919", regions: [
            { label: i18n.reg191910, value: "191910"},
            { label: i18n.reg191916, value: "191916"},
            { label: i18n.reg191926, value: "191926"},
            { label: i18n.reg191932, value: "191932"},
            { label: i18n.reg191934, value: "191934"},
            { label: i18n.reg191936, value: "191936"},
            { label: i18n.reg191940, value: "191940"},
            { label: i18n.reg191942, value: "191942"},
            { label: i18n.reg191946, value: "191946"},
            { label: i18n.reg191948, value: "191948"},
            { label: i18n.reg191950, value: "191950"},
            { label: i18n.reg191952, value: "191952"},
            { label: i18n.reg191956, value: "191956"},
            { label: i18n.reg191958, value: "191958"},
            { label: i18n.reg191960, value: "191960"},
            { label: i18n.reg191962, value: "191962"},
            { label: i18n.reg191964, value: "191964"},
            { label: i18n.reg191966, value: "191966"},
            { label: i18n.reg191968, value: "191968"}
        ]},
        { label: i18n.area1923, value: "1923", regions: [
            { label: i18n.reg192310, value: "192310"},
            { label: i18n.reg192336, value: "192336"},
            { label: i18n.reg192340, value: "192340"},
            { label: i18n.reg192342, value: "192342"},
            { label: i18n.reg192346, value: "192346"},
            { label: i18n.reg192348, value: "192348"},
            { label: i18n.reg192352, value: "192352"},
            { label: i18n.reg192356, value: "192356"}
        ]},
        { label: i18n.area1927, value: "1927", regions: [
            { label: i18n.reg192710, value: "192710"},
            { label: i18n.reg192732, value: "192732"},
            { label: i18n.reg192736, value: "192736"},
            { label: i18n.reg192740, value: "192740"},
            { label: i18n.reg192742, value: "192742"},
            { label: i18n.reg192744, value: "192744"},
            { label: i18n.reg192748, value: "192748"},
            { label: i18n.reg192750, value: "192750"},
            { label: i18n.reg192754, value: "192754"},
            { label: i18n.reg192758, value: "192758"},
            { label: i18n.reg192760, value: "192760"},
            { label: i18n.reg192762, value: "192762"},
            { label: i18n.reg192766, value: "192766"}
        ]},
        { label: i18n.area1931, value: "1931", regions: [
            { label: i18n.reg193110, value: "193110"},
            { label: i18n.reg193111, value: "193111"},
            { label: i18n.reg193112, value: "193112"},
            { label: i18n.reg193136, value: "193136"},
            { label: i18n.reg193140, value: "193140"},
            { label: i18n.reg193142, value: "193142"},
            { label: i18n.reg193148, value: "193148"},
            { label: i18n.reg193150, value: "193150"},
            { label: i18n.reg193154, value: "193154"},
            { label: i18n.reg193156, value: "193156"},
            { label: i18n.reg193160, value: "193160"},
            { label: i18n.reg193162, value: "193162"},
            { label: i18n.reg193166, value: "193166"},
            { label: i18n.reg193167, value: "193167"}
        ]},
        { label: i18n.area1935, value: "1935", regions: [
            { label: i18n.reg193510, value: "193510"},
            { label: i18n.reg193511, value: "193511"},
            { label: i18n.reg193516, value: "193516"},
            { label: i18n.reg193518, value: "193518"},
            { label: i18n.reg193520, value: "193520"},
            { label: i18n.reg193521, value: "193521"},
            { label: i18n.reg193522, value: "193522"},
            { label: i18n.reg193523, value: "193523"},
            { label: i18n.reg193524, value: "193524"},
            { label: i18n.reg193528, value: "193528"},
            { label: i18n.reg193532, value: "193532"},
            { label: i18n.reg193536, value: "193536"},
            { label: i18n.reg193540, value: "193540"},
            { label: i18n.reg193544, value: "193544"},
            { label: i18n.reg193548, value: "193548"},
            { label: i18n.reg193552, value: "193552"},
            { label: i18n.reg193556, value: "193556"},
            { label: i18n.reg193560, value: "193560"},
            { label: i18n.reg193564, value: "193564"},
            { label: i18n.reg193570, value: "193570"}
        ]},
        { label: i18n.area1939, value: "1939", regions: [
            { label: i18n.reg193910, value: "193910"},
            { label: i18n.reg193911, value: "193911"},
            { label: i18n.reg193912, value: "193912"},
            { label: i18n.reg193916, value: "193916"},
            { label: i18n.reg193920, value: "193920"},
            { label: i18n.reg193924, value: "193924"},
            { label: i18n.reg193932, value: "193932"},
            { label: i18n.reg193934, value: "193934"},
            { label: i18n.reg193936, value: "193936"},
            { label: i18n.reg193940, value: "193940"},
            { label: i18n.reg193942, value: "193942"},
            { label: i18n.reg193944, value: "193944"},
            { label: i18n.reg193948, value: "193948"},
            { label: i18n.reg193950, value: "193950"},
            { label: i18n.reg193952, value: "193952"},
            { label: i18n.reg193954, value: "193954"},
            { label: i18n.reg193956, value: "193956"},
            { label: i18n.reg193958, value: "193958"},
            { label: i18n.reg193962, value: "193962"},
            { label: i18n.reg193964, value: "193964"},
            { label: i18n.reg193966, value: "193966"},
            { label: i18n.reg193968, value: "193968"}
        ]},
        { label: i18n.area1943, value: "1943", regions: [
            { label: i18n.reg194310, value: "194310"},
            { label: i18n.reg194319, value: "194319"},
            { label: i18n.reg194332, value: "194332"},
            { label: i18n.reg194336, value: "194336"},
            { label: i18n.reg194340, value: "194340"},
            { label: i18n.reg194344, value: "194344"},
            { label: i18n.reg194346, value: "194346"},
            { label: i18n.reg194348, value: "194348"},
            { label: i18n.reg194352, value: "194352"}
        ]},
        { label: i18n.area1947, value: "1947", regions: [
            { label: i18n.reg194710, value: "194710"},
            { label: i18n.reg194718, value: "194718"},
            { label: i18n.reg194736, value: "194736"},
            { label: i18n.reg194742, value: "194742"},
            { label: i18n.reg194746, value: "194746"},
            { label: i18n.reg194750, value: "194750"},
            { label: i18n.reg194752, value: "194752"}
        ]},
        { label: i18n.area1951, value: "1951", regions: [
            { label: i18n.reg195110, value: "195110"},
            { label: i18n.reg195111, value: "195111"},
            { label: i18n.reg195112, value: "195112"},
            { label: i18n.reg195113, value: "195113"},
            { label: i18n.reg195116, value: "195116"},
            { label: i18n.reg195120, value: "195120"},
            { label: i18n.reg195126, value: "195126"},
            { label: i18n.reg195132, value: "195132"},
            { label: i18n.reg195136, value: "195136"},
            { label: i18n.reg195140, value: "195140"},
            { label: i18n.reg195144, value: "195144"},
            { label: i18n.reg195146, value: "195146"},
            { label: i18n.reg195148, value: "195148"},
            { label: i18n.reg195152, value: "195152"},
            { label: i18n.reg195154, value: "195154"},
            { label: i18n.reg195156, value: "195156"},
            { label: i18n.reg195158, value: "195158"},
            { label: i18n.reg195160, value: "195160"},
            { label: i18n.reg195164, value: "195164"}
        ]},
        { label: i18n.area1955, value: "1955", regions: [
            { label: i18n.reg195510, value: "195510"},
            { label: i18n.reg195511, value: "195511"},
            { label: i18n.reg195516, value: "195516"},
            { label: i18n.reg195522, value: "195522"},
            { label: i18n.reg195532, value: "195532"},
            { label: i18n.reg195536, value: "195536"},
            { label: i18n.reg195542, value: "195542"},
            { label: i18n.reg195546, value: "195546"},
            { label: i18n.reg195548, value: "195548"},
            { label: i18n.reg195552, value: "195552"},
            { label: i18n.reg195556, value: "195556"},
            { label: i18n.reg195560, value: "195560"},
            { label: i18n.reg195564, value: "195564"},
            { label: i18n.reg195568, value: "195568"}
        ]},
        { label: i18n.area1959, value: "1959", regions: [
            { label: i18n.reg195910, value: "195910"},
            { label: i18n.reg195911, value: "195911"},
            { label: i18n.reg195912, value: "195912"},
            { label: i18n.reg195932, value: "195932"},
            { label: i18n.reg195934, value: "195934"},
            { label: i18n.reg195936, value: "195936"},
            { label: i18n.reg195942, value: "195942"},
            { label: i18n.reg195946, value: "195946"},
            { label: i18n.reg195950, value: "195950"},
            { label: i18n.reg195952, value: "195952"},
            { label: i18n.reg195956, value: "195956"},
            { label: i18n.reg195958, value: "195958"},
            { label: i18n.reg195960, value: "195960"},
            { label: i18n.reg195962, value: "195962"},
            { label: i18n.reg195964, value: "195964"},
            { label: i18n.reg195966, value: "195966"}
        ]},
        { label: i18n.area1963, value: "1963", regions: [
            { label: i18n.reg196310, value: "196310"},
            { label: i18n.reg196311, value: "196311"},
            { label: i18n.reg196312, value: "196312"},
            { label: i18n.reg196318, value: "196318"},
            { label: i18n.reg196320, value: "196320"},
            { label: i18n.reg196322, value: "196322"},
            { label: i18n.reg196324, value: "196324"},
            { label: i18n.reg196327, value: "196327"},
            { label: i18n.reg196328, value: "196328"},
            { label: i18n.reg196329, value: "196329"},
            { label: i18n.reg196330, value: "196330"},
            { label: i18n.reg196331, value: "196331"},
            { label: i18n.reg196332, value: "196332"},
            { label: i18n.reg196334, value: "196334"},
            { label: i18n.reg196336, value: "196336"},
            { label: i18n.reg196338, value: "196338"},
            { label: i18n.reg196340, value: "196340"},
            { label: i18n.reg196344, value: "196344"},
            { label: i18n.reg196346, value: "196346"},
            { label: i18n.reg196348, value: "196348"},
            { label: i18n.reg196350, value: "196350"},
            { label: i18n.reg196352, value: "196352"},
            { label: i18n.reg196354, value: "196354"},
            { label: i18n.reg196358, value: "196358"},
            { label: i18n.reg196362, value: "196362"},
            { label: i18n.reg196364, value: "196364"},
            { label: i18n.reg196368, value: "196368"}
        ]},
        { label: i18n.area1971, value: "1971", regions: [
            { label: i18n.reg197110, value: "197110"},
            { label: i18n.reg197111, value: "197111"},
            { label: i18n.reg197113, value: "197113"},
            { label: i18n.reg197115, value: "197115"}
        ]},
        { label: i18n.area1972, value: "1972", regions: []},
        { label: i18n.area1975, value: "1975", regions: [
            { label: i18n.reg197510, value: "197510"},
            { label: i18n.reg197511, value: "197511"},
            { label: i18n.reg197512, value: "197512"},
            { label: i18n.reg197513, value: "197513"},
            { label: i18n.reg197514, value: "197514"},
            { label: i18n.reg197515, value: "197515"},
            { label: i18n.reg197517, value: "197517"},
            { label: i18n.reg197519, value: "197519"},
            { label: i18n.reg197541, value: "197541"}
        ]},
        { label: i18n.area1987, value: "1987", regions: []},
        { label: i18n.area7070, value: "7070", regions: []}
    ];

   
    Dict.byValue = function (dict, val) {
        var result = null;
        for (var i = 0; i < dict.length; i++) {
            var obj = dict[i];
            if (obj.value == val) {
                result = obj;
                break;
            }
        }
        return result;
    }

    Dict.getAreaName = function (code, label) {
        var obj = Dict.byValue(Dict.Area, code);
        if (obj) {
            return obj.label;
        } else {
            return label;
        }
    }

    Dict.getRegName = function (code, label) {
        var obl = code.substr(0, 4);
        var obj = Dict.byValue(Dict.Area, obl);
        if (!obj) {
            return label;
        }
        obj = Dict.byValue(obj.regions, code);
        if (obj) {
            return obj.label;
        } else {
            return label;
        }
    }


    return Dict;
})
;