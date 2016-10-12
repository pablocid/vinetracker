"use strict";
/**
 * En esta seccion se listan todas los registros evaluados
 */
var page_1 = require('ui/page');
var RecordService = require("../../../services/record.service");
var _1 = require("../../../services/helperViewer/");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var options = {
    message: 'buscando plantas evaluadas ...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};
function onNavigatedTo(args) {
    loader.show(options);
    var page = args.object;
    var schm = page.navigationContext.schm;
    var mainSchm = page.navigationContext.mainSchm;
    var schemaRecord = page.navigationContext.schemaRecord;
    var view = new _1.HelperViewer();
    view.theme = "\n        <ListView items=\"{{ items }}\" itemTap=\"{{selectedOption}}\">\n            <ListView.itemTemplate>\n                <GridLayout columns=\"30, *\" style=\"font-size:20; padding:10; padding-bottom:50; padding-top:50;\">\n                    <Label text=\"\" col=\"0\" />\n                    <Label text=\"{{ name }}\" col=\"0\" textWrap=\"true\" col=\"1\"/>\n                </GridLayout>\n            </ListView.itemTemplate>\n        </ListView>\n    ";
    var config = {
        attrId: "57c42f77c8307cd5b82f4486",
        query: {
            schm: schemaRecord.id,
            populate: "57c42f77c8307cd5b82f4486",
        }
    };
    RecordService.FindPop(config).then(function (x) {
        view.listItems = x.items.map(function (x) {
            var text = "Planta ";
            text += "E" + x.getPopAttr("57c42f77c8307cd5b82f4486", "espaldera", "number");
            text += "H" + x.getPopAttr("57c42f77c8307cd5b82f4486", "hilera", "number");
            text += x.getPopAttr("57c42f77c8307cd5b82f4486", "posicion", "number") ? "P" + x.getPopAttr("57c42f77c8307cd5b82f4486", "posicion", "number") : "-";
            return { name: text + " brix: " + x.getAttr("57c84628ab66902c2208a855") };
        });
        view.setBindingContext({ selectedOption: onTapItem, items: view.listItems });
        loader.hide();
    });
    function onTapItem(args) {
        var index = args.index;
        console.log(index);
    }
    page.content = view.getContent();
}
exports.createPage = function createPage() {
    var page = new page_1.Page();
    page.on(page_1.Page.navigatedToEvent, onNavigatedTo);
    return page;
};
//# sourceMappingURL=index.js.map