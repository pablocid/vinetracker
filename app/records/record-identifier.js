"use strict";
var page_1 = require('ui/page');
var action_bar_1 = require("ui/action-bar");
var grid_layout_1 = require('ui/layouts/grid-layout');
var tab_view_1 = require("ui/tab-view");
var observable_1 = require("data/observable");
var Inputs = require('../form/input-schemas/brix');
var observable_array_1 = require("data/observable-array");
var Scan = require('../services/partials/inputs/scan');
var frame = require('ui/frame');
var RecordService = require("../services/record.service");
exports.createPage = function () {
    var tab = new tab_view_1.TabView();
    var obs = new observable_1.Observable();
    obs.set('record', new observable_array_1.ObservableArray());
    var tabItems = new observable_array_1.ObservableArray();
    var configInfo = {
        observable: obs,
        target: "record",
        cb: ''
    };
    var info = new Inputs.Info(configInfo);
    tab.items = [];
    function cbInfo(idCode) {
        var navigationOptions = {
            moduleName: 'records/record-viewer',
            context: {
                id: idCode,
                schm: "57a4e02ec830e2bdff1a1608",
                key: "57c3583bc8307cd5b82f447d",
                datatype: 'string'
            }
        };
        frame.topmost().navigate(navigationOptions);
    }
    var configScan = {
        observable: obs,
        target: "idCode",
        cb: cbInfo
    };
    var scan = new Scan.Scan(configScan); //new Inputs.Scan(configScan);
    var scanItem = new tab_view_1.TabViewItem();
    scanItem.title = "Plant Scanner";
    scanItem.view = scan.getView();
    tab.items.push(scanItem);
    var grid = new grid_layout_1.GridLayout();
    grid.addChild(tab);
    var navBtn = new action_bar_1.NavigationButton();
    navBtn.android.systemIcon = "ic_menu_back";
    var page = new page_1.Page();
    page.actionBar.title = "Plant identifier";
    //page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    page.content = grid;
    page._applyXmlAttribute('xmlns', "http://schemas.nativescript.org/tns.xsd");
    return page;
};
//# sourceMappingURL=record-identifier.js.map