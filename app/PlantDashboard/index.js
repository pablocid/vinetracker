"use strict";
var frame_1 = require('ui/frame');
var _1 = require("../services/helperViewer/");
var action_bar_1 = require("ui/action-bar");
var BasePage_1 = require('../factories/BasePage');
var dialogs_1 = require('ui/dialogs');
var newView = new _1.HelperViewer();
var style = {
    paddingBT: 30,
    fontSize: 20
};
newView.theme = "        \n    <ListView items=\"{{ items }}\" itemTap=\"{{selectedOption}}\">\n        <ListView.itemTemplate>\n            <GridLayout columns=\"30, *\" style=\"font-size:" + style.fontSize + "; padding:10; padding-bottom:" + style.paddingBT + "; padding-top:" + style.paddingBT + ";\">\n                <Label text=\"\" col=\"0\" />\n                <Label text=\"{{ name }}\" col=\"0\" textWrap=\"true\" col=\"1\"/>\n            </GridLayout>\n        </ListView.itemTemplate>\n    </ListView>\n";
var items = [
    //{name:"Consulta datos de una planta", link:""},
    { name: "Evaluaciones disponibles", link: "PlantDashboard/Evaluations/index" }
];
function selectedOption(selectedArgs) {
    var index = selectedArgs.index;
    var opt = {
        moduleName: items[index].link,
        clearHistory: false,
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    };
    frame_1.topmost().navigate(opt);
}
newView.setBindingContext({ items: items, selectedOption: selectedOption });
var actionItem = new action_bar_1.ActionItem();
actionItem.text = "option1";
actionItem.android.position = "popup";
actionItem.on(action_bar_1.ActionItem.tapEvent, function (args) {
    var msg = "evaluar ...";
    var opt1 = "una hilera";
    var opt2 = "una planta (Código QR)";
    dialogs_1.action({
        message: msg,
        cancelButtonText: "cancelar",
        actions: [opt1, opt2]
    }).then(function (result) {
        if (result === opt1) {
            console.log("La primera opci0ón");
        }
        if (result === opt2) {
            console.log("La segunda opci0ón");
        }
        //console.log("Dialog result: " + result)
    });
    console.log('tap on option1');
});
var b = new BasePage_1.BasePage();
b.mainContent = newView.getContent();
b.setTitleActionBar('Plant Dashboard', 'menú principal de la aplicación');
b.addActionItem(actionItem);
module.exports = b;
//# sourceMappingURL=index.js.map