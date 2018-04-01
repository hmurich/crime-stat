/**
 * Author: Шестаков П.Н.
 * Script: Вспомогательные функции
 */
define([
    "esri/Color",
    "crime/Const",
    "dojo/i18n!crime/nls/uInterface"

], function (Color, Const, i18n) {
    var Util = function () {
    };

    Util.formatDate = function (mls, nls) { // дата в виде строки dd.mm.yyyy
        return Util.dateToStr(new Date(mls), nls);
    }

    Util.dateToStr = function (date, nls) {
        nls = nls || "EN";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (nls == "EN") {
            return year + '-' + month + '-' + day;
        } else {
            return day + '.' + month + '.' + year;
        }
    }

    Util.findInGraphics = function (arr, attribute, val) {//поиск в массиве Graphic по атрибуту
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].attributes[attribute] == val) {
                return i;
            }
        }
        return -1;
    }

    Util.nvl = function (value, defaultVal) {//замена неопределенного значения
        var v = defaultVal;
        if (value) {
            v = value;
        }
        return v;
    }

    Util.createGradient = function (colorFrom, colorTo, breakCount, opacity) {//создание градиента
        var colorArr = [];
        var deltaR = Math.round((colorTo.r - colorFrom.r) / breakCount);
        var deltaG = Math.round((colorTo.g - colorFrom.g) / breakCount);
        var deltaB = Math.round((colorTo.b - colorFrom.b) / breakCount);
        colorArr.push(colorFrom);
        for (var i = 1; i < breakCount - 1; i++) {
            colorArr.push(new Color([colorFrom.r + (deltaR * i), colorFrom.g + (deltaG * i), colorFrom.b + (deltaB * i), opacity]));
        }
        colorArr.push(colorTo);
        return colorArr;
    }


    Util.getCrimeCoefficient = function (countCrime, regCode, parDate) {//коэффициента преступности
        var count_people = Const.Population[regCode]; //абсолютная численность населения в регионе
        if (!(count_people)) {
            count_people = 100000000;
        }
        var _year = parDate.getFullYear();
        var year_day = Math.ceil((new Date(_year + 1, 0, 1) - new Date(_year, 0, 1)) / (1000 * 60 * 60 * 24)); //число дней в году
        var count_day = Math.ceil((parDate - new Date(_year, 0, 1)) / (1000 * 60 * 60 * 24)); // число дней с начало года

        //коэффициента преступности = (число преступлений  * единица  расчета (на 10000 человек) * число дней в году)
        //                            / (численность населения * число дней с начало года)
        return Math.ceil((countCrime * 10000 * year_day) / (count_day * count_people));
    }

    Util.hasOwnFeatures = function (results) {//вернул ли ГИС сервер результат?
        return (results.hasOwnProperty("features") &&
            results.features.length > 0);

    }

    Util.addComboBoxOptions = function (combo, results) {//заполнение элемента select
        if (Util.hasOwnFeatures(results)) {
            for (var i = 0; i < results.features.length; i++) {
                var feature = results.features[i];
                combo.addOption({disabled: false, label: feature.attributes.NAME, selected: false, value: feature.attributes.ID});
            }
        } else {
            combo.addOption({disabled: false, label: i18n.errValNotFound, selected: false, value: -1});
        }
    }

    Util.fullComboBox = function (combo, arr) {//заполнение элемента select
        Util.resetComboBox(combo, false);
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            combo.addOption({disabled: false, label: obj.label, selected: false, value: obj.value});
        }
    }

    Util.resetComboBox = function (combo, isAddEmpty) {//очистить элемент select
        combo.removeOption(combo.getOptions());
        if (isAddEmpty) {
            combo.addOption({disabled: false, label: "", selected: false, value: -1});
        }
    }

    Util.toggleTileLayers = function (map, id, removeId, tileLayers) {//переключение между подложками
        if (map.getLayer(id) != undefined) {//Этот слой активен
            return;
        }
        map.removeLayer(tileLayers[removeId]);//удаляем старый базовый слой
        map.addLayer(tileLayers[id]); //добавляем новый базовый слой
        map.reorderLayer(tileLayers[id], 0); //поместить вниз
    }

    Util.toggleTileLayers = function (map, id, removeId, tileLayers) {//переключение между подложками
        if (map.getLayer(id) != undefined) {//Этот слой активен
            return;
        }
        map.removeLayer(tileLayers[removeId]);//удаляем старый базовый слой
        map.addLayer(tileLayers[id]); //добавляем новый базовый слой
        map.reorderLayer(tileLayers[id], 0); //поместить вниз
    }

    Util.isMobile = function () {
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)));
    }

    Util.clearMemory = function (memory) {
        var arr = memory.query();
        for (var i = 0; i < arr.length; i++) {
            memory.remove(arr[i].id);
        }
    }

    Util.sleep = function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    return Util;
});
