/**
 * Author: Шестаков П.Н.
 * Script: Диалог выбор региона
 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-style",
    "dojo/query",
    "dojo/store/Memory",
    "dojo/store/Observable",
    "dojo/request/xhr",
    "dijit/registry",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree",
    "dojo/i18n!crime/nls/uInterface",
    "crime/QuerySDE",
    "crime/Const",
    "crime/Cfg",
    "crime/Util"

], function (declare, dom, lang, on, domStyle, query, Memory, Observable, xhr, registry, ObjectStoreModel, Tree,  i18n, QuerySDE, Const, Cfg, Util) {

    return declare(null, {
        dlgDiv: null,
        map: null,
        tree: null,
        constructor: function (divId, map) {//инициализация
            this.dlgDiv = registry.byId(divId);
            this.map = map;

            on(dom.byId("closePopLocOK"), "click", lang.hitch(this, function (evt) {
                this.setVisible(false, Const.MR_OK);
            }));
            on(dom.byId("closePopLocCancel"), "click", lang.hitch(this, function (evt) {
                this.setVisible(false, Const.MR_CANCEL);
            }));
        },
        initTree: function () {
            var map = this.map;
            //дерево
            var store = new Memory({//данные
                data: [
                    {id: 19, name: i18n.regionRK}
                ],
                getChildren: function (object) {//поиск дочерних узлов
                    if (object.rco) {
                        return [];
                    } else {
                        var children = this.query({parent: object.id});
                        if ((children) && (children.length > 0)) {//уже загружены
                            return children;
                        } else {//запрос
                            if (object.id == 19) {
                                children = [];
                                for (var i = 0; i < map.coordinatesArea.length; i++) {
                                    var obj = map.coordinatesArea[i];
                                    children.push({id: obj.attributes.CODE, name: obj.attributes.S1, parent: object.id, code: obj.attributes.CODE});
                                }
                                return children;
                            } else {
                                var url = Const.URL_ADDR_FIND_SERVICE + Const.SRVC_ATE_TREE + "&parent=" + object.id+"&locale="+dojo.locale;
                                xhr(url, {sync: true})
                                    .then(function (data) {
                                        var arr = dojo.fromJson(data);
                                        for (var i = 0; i < arr.result.length; i++) {
                                            var obj = arr.result[i];
                                            children.push({id: obj.id, name: obj.city_center, parent: object.id, code: obj.code, rco: obj.rco});
                                        }
                                    }, function (err) {
                                        console.error("ajax ate query error: ", err);
                                        children = [];
                                    });
                                return  children;
                            }
                        }
                    }
                }
            });
            var model = new ObjectStoreModel({
                store: store,
                query: {id: 19},
                labelAttr: "name"
            });
            this.tree = new Tree({ //дерево
                model: model,
                dndParams: ['singular'],
                singular: true,
                openOnClick: true,
                getIconClass: function (item, opened) {
                    var iclass = "tree-lvl-city";
                    if (item.id == 19) {
                        iclass = "tree-lvl-country";
                    } else if (!item.rco) {
                        iclass = "tree-lvl-area";
                    }
                    return iclass;
                }
            });
            this.tree.placeAt(dom.byId("treeATE")); //привязка к html
            this.tree.startup();
        },
        setVisible: function (visible, modalResult) {//закрытие/открытие
            if (visible) {
                this.dlgDiv.show();
            } else {
                if (modalResult) {
                    if (modalResult == Const.MR_OK) {
                        if (!(this.tree.selectedItem)) {
                            alert(i18n.msgValNotSelect);
                            return;
                        }
                        if (!(this.tree.selectedItem.rco)) {
                            alert(i18n.msgSetLowerLevel);
                            return;
                        }
                        this.applyPopLoc(this.tree.selectedItem, this.tree.selectedNode);
                    }
                }
                this.dlgDiv.hide();
            }
        },
        applyPopLoc: function (obj, node) { //сохранение
            Cfg.RCO = obj.rco;
            var code = obj.code;

            var namePL = this.getTreeItemFullName(node)+obj.name;
            var inpt = registry.byId("PopulatedLocality");
            inpt.value = namePL;
            inpt.set("displayedValue", namePL);
            inpt.set("title", namePL);

            var inpt = registry.byId("Address");
            inpt.value = "";
            inpt.set("displayedValue", "");

            var bool = false;
            if (code) {
                bool = this.bringCloser(code.substr(0, 6), this.map.coordinatesRegion);
                if (!bool) {
                    this.bringCloser(code.substr(0, 4), this.map.coordinatesArea);
                }
            }
        },
        getTreeItemFullName: function (node) {
            var label = "";
            if (node.item.id > 19) {
                var parent = node.getParent();
                while ((parent) && (parent.item.id > 19)) {
                    label = parent.item.name + ', ' + label;
                    parent = parent.getParent();
                }
            }
            return label;
        },
        bringCloser: function (code, list) {
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                if (obj.attributes.CODE) {
                    if (obj.attributes.CODE == code) {
                        this.map.setExtent(obj.geometry.getExtent());
                        return true;
                    }
                }
            }
            return false;
        }
    });
});
