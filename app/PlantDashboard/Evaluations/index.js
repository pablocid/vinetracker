/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */
"use strict";
var tab_view_1 = require("ui/tab-view");
var EvaluationList_1 = require('../Components/EvaluationList');
var EvaluationReport_1 = require('../Components/EvaluationReport');
var BasePage_1 = require('../../factories/BasePage');
var tab = new tab_view_1.TabView();
var evalListTab = new tab_view_1.TabViewItem();
var sumaryTab = new tab_view_1.TabViewItem();
var evalList = new EvaluationList_1.EvaluationListView();
var sumary = new EvaluationReport_1.SumaryReport();
evalListTab.title = "Evaluaciones";
evalListTab.view = evalList.getView();
sumaryTab.title = "Resumen";
sumaryTab.view = sumary.getView();
tab.items = [evalListTab, sumaryTab];
var ePage = new BasePage_1.BasePage();
ePage.fnOnLoad = function () {
    evalList.onLoadedPage();
    sumary.onLoadedPage();
};
ePage.mainContent = tab;
ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');
module.exports = ePage;
//# sourceMappingURL=index.js.map