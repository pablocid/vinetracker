"use strict";
var tab_view_1 = require("ui/tab-view");
//var InputMatcher = require("./partials/inputMatcher.service");
/********************Inputs************************ */
var SimpleText = require("./partials/inputs/simple_text");
var SimpleRef = require("./partials/inputs/simple_ref");
var FloatRangeNumber = require("./partials/inputs/float_range_number");
var SimpleNumber = require("./partials/inputs/simple_number");
/************************************************ */
function TabViewMaker(data) {
    var tab = new tab_view_1.TabView();
    tab.items = [];
    var validIds = data.getIdsForShow();
    console.log("validIds: " + validIds.length);
    validIds.forEach(function (x) { return tab.items.push(TabViewItemMaker(data, x, "TabView")); });
    //tab.items.push(TabViewItemMaker(data,validIds[2], "TabView"))
    console.log(validIds[0]);
    return tab;
}
exports.TabView = TabViewMaker;
function TabViewEditMaker(data) {
    var tab = new tab_view_1.TabView();
    tab.items = [];
    var validIds = data.getIdsForEdit();
    console.log("validIds: " + validIds.length);
    validIds.forEach(function (x) { return tab.items.push(TabViewItemMaker(data, x, "TabViewEdit")); });
    return tab;
}
exports.TabViewEdit = TabViewEditMaker;
function TabViewItemMaker(data, attrId, mode) {
    var tabItem = new tab_view_1.TabViewItem();
    var conf = {
        record: data,
        attrId: attrId,
        mode: mode,
        cb: ''
    };
    console.log("TabViewItemMaker");
    tabItem.view = InputMatcher(conf);
    tabItem.title = data.getAttrAttr(attrId, "shortName");
    return tabItem;
}
exports.TabViewItem = TabViewItemMaker;
//mode < TabViewEdit | TabView | ListView>
function InputMatcher(conf) {
    var record = conf.record;
    var attrId = conf.attrId;
    var mode = conf.mode || "TabView";
    var View;
    switch (record.getInputAttr(attrId, "_id")) {
        case "57c431d5c8307cd5b82f448a":
            console.log("simple_ref: referencia");
            View = SimpleRef.getView(conf);
            break;
        case "57c0c508c8307cd5b82f445a":
            View = SimpleNumber.getView(conf);
            break;
        case "57c3202cc8307cd5b82f4465":
            View = SimpleText.getView(conf);
            break;
        case "57cc674481d64f1000dec599":
            View = FloatRangeNumber.getView(conf);
            break;
        default:
            console.log("default view");
            View = View = SimpleText.getView(conf);
    }
    return View;
}
//# sourceMappingURL=ViewMaker.service.js.map