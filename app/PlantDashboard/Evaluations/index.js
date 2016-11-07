"use strict";
var Context_1 = require('../../factories/Context');
var frame_1 = require('ui/frame');
var EvaluationList_1 = require('../Components/EvaluationList');
var BasePage_1 = require('../../factories/BasePage');
var ePage = new BasePage_1.BasePage();
var evalList = new EvaluationList_1.EvaluationListView();
var context;
console.log('creando la pagina');
ePage.fnOnLoad = function (args) {
    var page = args.object;
    context = page.navigationContext;
    if (!context) {
        context = new Context_1.Context();
    }
    evalList.onLoadedPage();
};
evalList.callbackOnSelection = function (schema) {
    console.log('schema.name:--------------------------->  ' + schema.name);
    context.schema = schema;
    var opt = {
        moduleName: 'PlantDashboard/Localization/index',
        context: context,
        clearHistory: false,
        animated: false,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    };
    frame_1.topmost().navigate(opt);
};
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');
//ePage.setMainContent();
//export = ePage;
function createPage() {
    return ePage.page;
}
exports.createPage = createPage;
//# sourceMappingURL=index.js.map