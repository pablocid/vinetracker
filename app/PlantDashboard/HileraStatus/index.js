"use strict";
var DataTest_1 = require('../../factories/DataTest');
var Hilera_1 = require('../../factories/Hilera');
var NoEvaluated_1 = require('../Components/NoEvaluated');
var List_1 = require('../Components/List');
var Context_1 = require('../../factories/Context');
var BasePage_1 = require('../../factories/BasePage');
var tab_view_1 = require("ui/tab-view");
var action_bar_1 = require('ui/action-bar');
var observable_1 = require('data/observable');
var lodash = require('lodash');
var hileraPage = new BasePage_1.BasePage();
var hileraC = new Hilera_1.Hilera();
var evalObs = new observable_1.Observable();
var evalTitle = 'evaluados';
var noevTitle = 'no evaluados';
//var context = <Context>hileraPage.page.navigationContext;
/**** for testing */
var plantTest = new DataTest_1.PlantTest();
var context = new Context_1.Context();
context.plant = plantTest.getPlant();
context.schema = plantTest.getSchm();
/**** */
hileraC.plant = context.plant;
hileraC.schmEvaluation = context.schema;
var tab = new tab_view_1.TabView();
var evTab = new tab_view_1.TabViewItem();
var evaluados = new List_1.List();
evTab.view = evaluados.getView();
evTab.title = evalTitle;
var noevTab = new tab_view_1.TabViewItem();
var noevaluados = new NoEvaluated_1.NoEvaluated();
noevTab.view = noevaluados.getView();
noevTab.title = noevTitle;
tab.items = [noevTab, evTab];
hileraPage.mainContent = tab;
/**********tap callbacks *****************/
evaluados.callbackOnTap = function (index) {
    console.log(evaluados.items[index].name);
    context.plant = evaluados.items[index].plant;
    //Topmost().navitaget({})
};
noevaluados.callbackOnTap = function (index) {
    console.log(noevaluados.items[index].name);
    context.plant = noevaluados.items[index].plant;
};
/**************** ********************/
function onload() {
    evaluados.loading = true;
    noevaluados.loading = true;
    /********* */
    hileraC.getEvandNoev().then(function (r) {
        evaluados.items = r.evaluados;
        evTab.title = r.evaluados.length + ' ' + evalTitle;
        noevaluados.items = r.noEvaluados;
        noevTab.title = r.noEvaluados.length + ' ' + noevTitle;
        ///******
        evaluados.loading = false;
        noevaluados.loading = false;
    });
    /******** */
}
hileraPage.fnOnLoad = onload;
var refresh = new action_bar_1.ActionItem();
refresh.text = "refresh";
refresh.android.position = "popup";
refresh.on('tap', function (x) {
    onload();
});
hileraPage.addActionItem(refresh);
module.exports = hileraPage;
//# sourceMappingURL=index.js.map