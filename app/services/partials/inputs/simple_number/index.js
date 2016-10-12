/***************************SIMPLE TEXT ************************** */
"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
var observable_1 = require("data/observable");
function TabViewBuilder(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var ab = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ label }}\"/>\n            <Label style=\"font-size:30; \" text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'show',
        path: '~/services/partials/inputs/simple_number'
    });
    a.bindingContext = {
        value: conf.record.getAttr(conf.attrId),
        label: conf.record.getAttrAttr(conf.attrId, "label")
    };
    stack.orientation = "vertical";
    //stack.width = 500;
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);
    return stack;
}
exports.TabView = TabViewBuilder;
function TabViewEditBuilder(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var a = builder.load({
        name: 'create',
        path: '~/services/partials/inputs/simple_number',
    });
    var viewModel = new observable_1.Observable();
    viewModel.set("label", conf.record.getAttrAttr(conf.attrId, "label"));
    viewModel.set("value", conf.record.getAttr(conf.attrId));
    a.bindingContext = viewModel;
    viewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (v) {
        //console.log(v.object.get("value"));
        conf.record.setAttr(conf.attrId, v.object.get("value"));
    });
    stack.orientation = "vertical";
    stack.addChild(a);
    return stack;
}
exports.EditView = TabViewEditBuilder;
/*********************  ***********************/
exports.getView = function (conf) {
    var mode = conf.mode;
    var view;
    console.log("In getView: " + mode);
    switch (mode) {
        case 'TabView':
            view = TabViewBuilder(conf);
            break;
        case 'TabViewEdit':
            view = TabViewEditBuilder(conf);
            break;
        default:
            view = TabViewBuilder(conf);
    }
    return view;
};
//# sourceMappingURL=index.js.map