/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */
"use strict";
var tab_view_1 = require("ui/tab-view");
var EvaluationList_1 = require('../Components/EvaluationList');
var BasePage_1 = require('../../factories/BasePage');
var evalListTab = new tab_view_1.TabViewItem();
var evalList = new EvaluationList_1.EvaluationListView();
var ePage = new BasePage_1.BasePage();
ePage.fnOnLoad = function () {
    evalList.onLoadedPage();
};
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');
module.exports = ePage;
//# sourceMappingURL=index.js.map