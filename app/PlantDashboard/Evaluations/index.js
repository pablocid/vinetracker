"use strict";
var ContextFS_1 = require('../../factories/ContextFS');
var frame_1 = require('ui/frame');
var tab_view_1 = require("ui/tab-view");
var EvaluationList_1 = require('../Components/EvaluationList');
var BasePage_1 = require('../../factories/BasePage');
var context = new ContextFS_1.ContextFS();
var evalListTab = new tab_view_1.TabViewItem();
var evalList = new EvaluationList_1.EvaluationListView();
var ePage = new BasePage_1.BasePage();
ePage.fnOnLoad = function () {
    evalList.onLoadedPage();
};
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');
evalList.callbackOnSelection = function (schema) {
    context.schema = schema;
    frame_1.topmost().navigate('PlantDashboard/Localization/index');
};
module.exports = ePage;
//# sourceMappingURL=index.js.map