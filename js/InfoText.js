/**
 * Author: Шестаков П.Н.
 * Script: дополнительная информация в текстовом виде
 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/dom-style",

    "crime/Cfg",
    "crime/Const",
    "dojo/i18n!crime/nls/uInterface"

], function (declare, dom, domConstruct, lang, domStyle, Cfg, Const, i18n) {

    return declare(null, {
        constructor: function () {//ссылки на div
            this.infoDiv = dom.byId("infoDiv");
            this.infoMarker = dom.byId("infoMarker");
        },
        fill: function (infoData, options) {//заполнение данными
            this.clear();
            var text = "";
            if ((options) && (options.hasOwnProperty("type"))) {
                if (options.type == Const.INFO_TYPE_CRIME_POINT) {
                    text = this.getCrimeText(infoData, options.count, options.label)
                } else if ((options.type == Const.INFO_TYPE_AREA) || (options.type == Const.INFO_TYPE_REGIONS)) {
                    text = this.getRegionsText(infoData, options.nameField, options.codeField, (options.type == Const.INFO_TYPE_AREA), options.label);
                }
            }
            this.infoDiv.innerHTML = text;
        },
        getCrimeText: function (infoData, count, label) {//по точкам преступлений
            var title = "";
            var tableText = "";
            if (count > 0) {
                title = "<p>"+i18n.infoTextTitle1+" " + count + " " + label + "</p>";
                tableText = "<table>";
                tableText += this.getTableHead(i18n.infoTextCol1, i18n.infoTextCol3);
                tableText += "<tbody>";
                var sortData = this.sortInfoData(infoData);
                sortData.forEach(lang.hitch(this, function (entry) {
                    tableText += this.getTableRow(entry.name, entry.count, entry.ico);
                }));
                tableText += "</tbody></table>";
            }
            return title + tableText;
        },
        getRegionsText: function (infoData, nameField, codeField, isShowTitle, label) {//по областям и районам
            var title = "";
            var sum = 0;
            var tableText = "";

            if (infoData.length > 0) {
                tableText = "<table>";
                tableText += this.getTableHead(i18n.infoTextCol2, i18n.infoTextCol3);
                tableText += "<tbody>";
                for (var i = 0; i < infoData.length; i++) {
                    var regName = infoData[i].attributes[nameField];
                    tableText += this.getTableRow(regName, infoData[i].attributes.K);
                    sum += (infoData[i].attributes.K - 0);
                }
                tableText += "</tbody></table>";
                if (isShowTitle) {
                    title = "<p>"+i18n.infoTextTitle2+" " + label + " "+i18n.infoTextTitle3+" " + sum + "</p>";
                }
            }
            return title + tableText;
        },
        sortInfoData: function (infoData) {//сортировка
            var arr = [];
            infoData.forEach(lang.hitch(this, function (entry) {
                arr.push({name: entry.value.name, count: entry.value.count, ico: entry.value.ico});
            }));
            arr.sort(function (x, y) {
                    return (y.count - x.count)
                }
            );
            return arr;
        },
        getTableHead: function (col1, col2) {//заголовок таблицы
            var head = "<thead><tr>";
            head += "<th style=\"text-align: center;\">&#160;</th>";
            head += "<th style=\"text-align: left;\">" + col1 + "</th>";
            head += "<th style=\"text-align: right;\">" + col2 + "</th>";
            head += "</tr></thead>";
            return head;
        },
        getTableRow: function (val1, val2, ico) {//строка таблицы
            var row = "<tr>";
            if (ico) {
                row += "<td style=\"text-align: center;\">";
                row +="<img src=\""+Const.getPicturePath(ico)+"\"/>";
                row +="</td>";
            } else {
                row +="<td></td>";
            }
            row += "<td style=\"text-align: left;\">";
            row += val1;
            row += "</td><td style=\"text-align: right;\">";
            row += val2;
            row += "</td></tr>";
            return row;
        },
        clear: function () { //очистить
            domConstruct.empty(this.infoDiv);
        },
        hide: function () { //скрыть
            domStyle.set(this.infoDiv, {
                right:"-325px"
            });
            domStyle.set(this.infoMarker, {
                right:"0px"
            });
        },
        show: function () { //показать
            domStyle.set(this.infoDiv, {
                right:"0px"
            });
            domStyle.set(this.infoMarker, {
                right:"323px"
            });
            //dojo.anim(this.infoMarker, {right: 323}).play();
            //dojo.anim(this.infoDiv, {right: 0}).play();
        },
        isVisible: function () { //видно ?
            return  (dojo.style(this.infoMarker, 'right') != '0px');
        }
    });
});