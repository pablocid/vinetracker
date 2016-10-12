import {TabView, TabViewItem} from "ui/tab-view";
//var InputMatcher = require("./partials/inputMatcher.service");

/********************Inputs************************ */
var SimpleText = require("./partials/inputs/simple_text");
var SimpleRef = require("./partials/inputs/simple_ref");
var FloatRangeNumber = require("./partials/inputs/float_range_number");
var SimpleNumber = require("./partials/inputs/simple_number");
/************************************************ */



function TabViewMaker(data) {
    var tab = new TabView();
    tab.items = [];
    
    var validIds = data.getIdsForShow();
    console.log("validIds: "+validIds.length)

    validIds.forEach(x=>tab.items.push(TabViewItemMaker(data,x,"TabView")))
    //tab.items.push(TabViewItemMaker(data,validIds[2], "TabView"))
    console.log(validIds[0]);
    return tab;
}
exports.TabView = TabViewMaker;

function TabViewEditMaker(data) {
    var tab = new TabView();
    tab.items = [];
    
    var validIds = data.getIdsForEdit();
    console.log("validIds: "+validIds.length)

    validIds.forEach(x=>tab.items.push(TabViewItemMaker(data,x, "TabViewEdit")))
    return tab;
}
exports.TabViewEdit = TabViewEditMaker;

function TabViewItemMaker (data, attrId, mode){
    var tabItem = new TabViewItem();
    var conf = {
        record:data,
        attrId:attrId,
        mode:mode,
        cb:''
    }
    console.log("TabViewItemMaker");
    tabItem.view = InputMatcher(conf);
    tabItem.title = data.getAttrAttr(attrId,"shortName");

    return tabItem;
}

exports.TabViewItem = TabViewItemMaker;


//mode < TabViewEdit | TabView | ListView>
function InputMatcher (conf ){
    var record = conf.record;
    var attrId = conf.attrId;
    var mode = conf.mode || "TabView";
    var View ;
    switch(record.getInputAttr(attrId,"_id")){
        case "57c431d5c8307cd5b82f448a": //simple_ref
            console.log("simple_ref: referencia")
            View = SimpleRef.getView(conf);
            break;
        case "57c0c508c8307cd5b82f445a": // simple_number
            View = SimpleNumber.getView(conf);
            break;
        case "57c3202cc8307cd5b82f4465": // simple_text
            View = SimpleText.getView(conf);
            break;
    
        case "57cc674481d64f1000dec599": // float_range_number
            View = FloatRangeNumber.getView(conf);
            break;
        default:// simple_text
            console.log("default view")
            View =View = SimpleText.getView(conf);
    }

    return View;
}