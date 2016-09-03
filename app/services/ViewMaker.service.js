"use strict";
var tab_view_1 = require("ui/tab-view");
//var InputMatcher = require("./partials/inputMatcher.service");
/********************Inputs************************ */
var SimpleText = require("./partials/inputs/simple_text");
var SimpleRef = require("./partials/inputs/simple_ref");
/************************************************ */
function TabViewMaker(data) {
    var tab = new tab_view_1.TabView();
    tab.items = [];
    var validIds = data.getIdsForEdit();
    console.log("validIds: " + validIds.length);
    validIds.forEach(function (x) { return tab.items.push(TabViewItemMaker(data, x)); });
    return tab;
}
exports.TabView = TabViewMaker;
function TabViewItemMaker(data, attrId) {
    var tabItem = new tab_view_1.TabViewItem();
    var conf = {
        record: data,
        attrId: attrId,
        mode: "TabViewEdit",
        cb: ''
    };
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
        /*
        case "57c0c508c8307cd5b82f445a": // simple_number
            //View = new SimpleText.TabView(conf).getView();
            break;
        case "57c3202cc8307cd5b82f4465": // simple_text
            //View = new SimpleText.TabView(conf).getView();
            break;
        //case "wwwwwwwwwwwwwwwwwwwwww": // simple_brix
        //    View = new SimpleBrix.TabView(conf).getView();
        //    break;
        */
        default:
            console.log("default view");
            View = View = SimpleText.getView(conf);
    }
    return View;
}
//# sourceMappingURL=ViewMaker.service.js.map