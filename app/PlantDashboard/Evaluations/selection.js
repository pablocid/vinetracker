"use strict";
/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */
var page_1 = require('ui/page');
var RecordService = require("../../services/record.service");
var _1 = require("../../services/helperViewer/");
var frame_1 = require('ui/frame');
function onNavigatedTo(args) {
    var page = args.object;
    var context = page.navigationContext;
    var schemaRecord = context.schema;
    var view = new _1.HelperViewer();
    view.theme = "\n        <ListView items=\"{{ items }}\" itemTap=\"{{selectedOption}}\">\n            <ListView.itemTemplate>\n                <GridLayout columns=\"30, *\" style=\"font-size:20; padding:10; padding-bottom:50; padding-top:50;\">\n                    <Label text=\"\" col=\"0\" />\n                    <Label text=\"{{ name }}\" col=\"0\" textWrap=\"true\" col=\"1\"/>\n                </GridLayout>\n            </ListView.itemTemplate>\n        </ListView>\n    ";
    function onTapItem(args) {
        var index = args.index;
        var selection = view.listItems[index];
        var navOpts = {
            moduleName: selection.link,
            context: context
        };
        frame_1.topmost().navigate(navOpts);
    }
    var items = [
        { name: "Plantas evaluadas", link: "PlantDashboard/Evaluations/Evaluated/index" },
        { name: "Plantas no evaluadas", link: "PlantDashboard/Evaluations/NotEvaluated/index" }
    ];
    view.listItems = items;
    view.setBindingContext({
        selectedOption: onTapItem,
        items: view.listItems
    });
    page.content = view.getContent();
}
exports.createPage = function createPage() {
    var page = new page_1.Page();
    page.on(page_1.Page.navigatedToEvent, onNavigatedTo);
    return page;
};
//# sourceMappingURL=selection.js.map