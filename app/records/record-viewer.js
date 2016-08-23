"use strict";
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
    var idCode = page.navigationContext.idCode;
    var schm = page.navigationContext.schm;
    var filter = page.navigationContext.filter;
    var config = {
        dir: 'api/records',
        query: {
            page: '',
            items: '',
            schm: schm,
            filter: filter
        }
    };
    var grid = new grid_layout_1.GridLayout();
    var obs = new observable_1.Observable();
    function tabItemMaker(data) {
        var tab = new tab_view_1.TabView();
        tab.items = [];
        for (var e = 0; e < data.getIdsForShow().length; e++) {
            var identif = data.getIdsForShow()[e];
            console.log(data.getAttr(identif));
            var config = {
                bindingContext: {
                    value: data.getAttr(identif),
                    description: data.getSchmAttr(identif, "label")
                },
                cb: ''
            };
            var tabItem = new tab_view_1.TabViewItem();
            tabItem.title = data.getSchmAttr(identif, "shortName");
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
    });
    var navBtn = new action_bar_1.NavigationButton();
    navBtn.android.systemIcon = "ic_menu_back";
    page.actionBar.title = "Plant info";
    page.actionBar.actionItems.addItem(navBtn);
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