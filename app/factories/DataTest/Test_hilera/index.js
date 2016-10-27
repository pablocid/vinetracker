"use strict";
var Hilera_1 = require('../../Hilera');
var _1 = require('../');
var List_1 = require('../../../PlantDashboard/Components/List');
var BasePage_1 = require('../../BasePage');
var action_bar_1 = require("ui/action-bar");
var tab_view_1 = require('ui/tab-view');
var plantTest = new _1.PlantTest();
var page = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
page.mainContent = tab;
var hilera = new Hilera_1.HileraFactory(plantTest.getPlants());
hilera.evTabTitle = 'evaluadas';
hilera.NoEvTabTitle = 'no evaluadas';
var restriccion = ['57a8d8dfef44961377525d79', '57a8d8dfef44961377525d7a', '57a8d8dfef44961377525d7b', '57a8d8dfef44961377525d7c'];
var evaluated = ['57a8d8dfef44961377525d7d', '57a8d8dfef44961377525d7e', '57a8d8dfef44961377525d7f', '57a8d8dfef44961377525d80'];
var evTab = new tab_view_1.TabViewItem();
var evList = new List_1.List();
evList.items = hilera.evaluated;
evTab.title = hilera.evTabTitle;
evTab.view = evList.getView();
var noEvTab = new tab_view_1.TabViewItem();
var noEvList = new List_1.List();
noEvList.items = hilera.noEvaluated;
noEvTab.title = hilera.NoEvTabTitle;
noEvTab.view = noEvList.getView();
tab.items = [noEvTab, evTab];
hilera.callbackOnChangeList = function () {
    evTab.title = hilera.evTabTitle;
    noEvTab.title = hilera.NoEvTabTitle;
};
/************** Action Bar ************** */
var actionItem = new action_bar_1.ActionItem();
actionItem.text = "restriccion";
actionItem.android.position = "popup";
actionItem.on(action_bar_1.ActionItem.tapEvent, function (args) {
    hilera.idRestrictions = restriccion;
});
page.addActionItem(actionItem);
var actionItem2 = new action_bar_1.ActionItem();
actionItem2.text = "revertir orden de lista";
actionItem2.android.position = "popup";
actionItem2.on(action_bar_1.ActionItem.tapEvent, function (args) {
    hilera.reverse();
});
page.addActionItem(actionItem2);
var actionItem3 = new action_bar_1.ActionItem();
actionItem3.text = "ordenar";
actionItem3.android.position = "popup";
actionItem3.on(action_bar_1.ActionItem.tapEvent, function (args) {
    //hilera.sort();
});
page.addActionItem(actionItem3);
var actionItem4 = new action_bar_1.ActionItem();
actionItem4.text = "evaluados";
actionItem4.android.position = "popup";
actionItem4.on(action_bar_1.ActionItem.tapEvent, function (args) {
    hilera.idEvaluated = evaluated;
});
page.addActionItem(actionItem4);
page.setTitleActionBar('Hilera test');
module.exports = page;
//# sourceMappingURL=index.js.map