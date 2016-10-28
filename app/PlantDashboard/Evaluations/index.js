"use strict";
var ContextFS_1 = require('../../factories/ContextFS');
var frame_1 = require('ui/frame');
var EvaluationList_1 = require('../Components/EvaluationList');
var BasePage_1 = require('../../factories/BasePage');
var ePage = new BasePage_1.BasePage();
var evalList = new EvaluationList_1.EvaluationListView();
ePage.fnOnLoad = function () {
    var context = new ContextFS_1.ContextFS();
    evalList.onLoadedPage();
    context.clean();
    evalList.callbackOnSelection = function (schema) {
        console.log(schema.name);
        context.schema = schema;
        var opt = {
            moduleName: 'PlantDashboard/Localization/index',
            clearHistory: false,
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeOut"
            }
        };
        frame_1.topmost().navigate(opt);
    };
};
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');
module.exports = ePage;
//# sourceMappingURL=index.js.map