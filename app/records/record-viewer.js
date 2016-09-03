"use strict";
/*
    Esta página toma un identificador (, un schema y un filtro en el caso de no ser un ObjectId) como parámetro para entregar la visualización del registro
*/
var page_1 = require('ui/page');
var action_bar_1 = require("ui/action-bar");
var grid_layout_1 = require('ui/layouts/grid-layout');
var tab_view_1 = require("ui/tab-view");
var observable_1 = require("data/observable");
var Inputs = require('../form/input-schemas/brix');
var SimpleText = require("../services/partials/inputs/simple_text");
var RecordService = require("../services/record.service");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
// optional options 
var options = {
    message: 'loading plant info...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: false,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};
// options is optional 
function onNavigatedTo(args) {
    loader.show(options);
    var page = args.object;
    var id = page.navigationContext.id;
    var schm = page.navigationContext.schm;
    var key = page.navigationContext.key;
    var datatype = page.navigationContext.datatype;
    //console.log(id+" - "+schm+" - "+key+" - "+datatype);
    var config = {
        id: id,
        query: {
            schm: schm,
            key: key,
            datatype: datatype
        }
    };
    var grid = new grid_layout_1.GridLayout();
    var obs = new observable_1.Observable();
    function tabItemMaker(data) {
        console.log(JSON.stringify(data));
        console.log(data.getSchmAttr("registrationStart"));
        var tab = new tab_view_1.TabView();
        tab.items = [];
        var validIds = data.getIdsForShow();
        console.log("validIds.length: " + validIds.length);
        for (var e = 0; e < validIds.length; e++) {
            var identif = validIds[e];
            //console.log(data.getAttr(identif));
            var config = {
                bindingContext: {
                    value: data.getAttr(identif),
                    description: data.getAttrInputConf(identif, "label") //data.getSchmAttrInputConf(identif, "visualization")//
                },
                cb: ''
            };
            var tabItem = new tab_view_1.TabViewItem();
            tabItem.title = data.getAttrInputConf(identif, "shortName");
            tabItem.view = new SimpleText.SimpleText(config).getView();
            tab.items.push(tabItem);
        }
        return tab;
        /*
        var inf = obs.get('record');
        while (inf.length) {
            inf.pop();
        }
        inf.push(data.getListOfAttr());
        */
    }
    RecordService.FindOne(config)
        .then(tabItemMaker)
        .then(function (tab) {
        grid.addChild(tab);
        loader.hide();
    }, function (err) {
        loader.hide();
    });
    var navBtn = new action_bar_1.NavigationButton();
    navBtn.android.systemIcon = "ic_menu_back";
    page.actionBar.title = "Plant info";
    //page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    page.content = grid;
}
exports.createPage = function createPage() {
    var page = new page_1.Page();
    page._applyXmlAttribute('xmlns', "http://schemas.nativescript.org/tns.xsd");
    page.on(page_1.Page.navigatedToEvent, onNavigatedTo);
    return page;
};
//# sourceMappingURL=record-viewer.js.map