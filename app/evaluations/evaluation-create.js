"use strict";
var page_1 = require('ui/page');
var grid_layout_1 = require('ui/layouts/grid-layout');
var tab_view_1 = require("ui/tab-view");
var Inputs = require('../form/input-schemas/brix');
var SimpleText = require("../services/partials/inputs/simple_text");
var RecordService = require("../services/record.service");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var Frame = require('ui/frame');
var actionBarModule = require("ui/action-bar");
var RecordFactory = require("../services/record.factory");
var theSchema = require("./evaluation-schm").Evaluacion();
console.log(theSchema[0]._id);
// optional options 
var options = {
    message: 'loading records...',
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
    //loader.show(options);
    var page = args.object;
    /********** TAB ITEMS *********** */
    var schm = ""; //page.navigationContext.schm;
    function tabItemMaker() {
        var RecordConstructor = RecordFactory.RecordFactory(null, theSchema);
        var data = new RecordConstructor();
        console.log(data.getSchmAttr("registrationStart"));
        var tab = new tab_view_1.TabView();
        tab.items = [];
        var validIds = data.getIdsForEdit();
        for (var e = 0; e < validIds.length; e++) {
            var identif = validIds[e];
            //console.log(data.getAttr(identif));
            var config = {
                bindingContext: {
                    value: "",
                    description: data.getInputAttr(identif, "label")
                },
                cb: ''
            };
            var tabItem = new tab_view_1.TabViewItem();
            tabItem.title = data.getInputAttr(identif, "shortName");
            tabItem.view = new SimpleText.EditView(config).getView();
            tab.items.push(tabItem);
        }
        return tab;
    }
    var grid = new grid_layout_1.GridLayout();
    grid.addChild(tabItemMaker());
    /********** ACTION BAR *********** */
    var item = new actionBarModule.ActionItem();
    item.android.systemIcon = "ic_menu_save";
    item.on("tap", function () {
        console.log("plus tap");
        var navigationOptions = {
            moduleName: 'evaluations/evaluation-create',
            context: {}
        };
        Frame.topmost().navigate(navigationOptions);
    });
    page.actionBar.title = "Registros evaluados";
    page.actionBar.actionItems.addItem(item);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    page.content = grid;
}
exports.createPage = function createPage() {
    var page = new page_1.Page();
    page._applyXmlAttribute('xmlns', "http://schemas.nativescript.org/tns.xsd");
    page.on(page_1.Page.navigatedToEvent, onNavigatedTo);
    return page;
};
//# sourceMappingURL=evaluation-create.js.map