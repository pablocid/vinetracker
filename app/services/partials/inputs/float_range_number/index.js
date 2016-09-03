/***************************SIMPLE TEXT ************************** */
"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
var observable_1 = require("data/observable");
/*
exports.SimpleText = function SimpleText (conf) {
    var self = this;
    var stack = new StackLayout();
    var b = builder.parse(`
            <Label style="font-size:30; " text="{{ description }}"/>
            <Label style="font-size:30; " text="{{ value }}" />
    `);
    var a = builder.load({
        name:'show',
        path:'~/services/partials/inputs/simple_text'
    });

    a.bindingContext = conf.bindingContext;
    stack.orientation = "vertical";
    //stack.width = 500;
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);

    this.getView = function(){
        return stack;
    }

}*/
function TabViewBuilder(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var b = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ description }}\"/>\n            <Label style=\"font-size:30; \" text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'show',
        path: '~/services/partials/inputs/simple_text'
    });
    a.bindingContext = {
        value: conf.record.getAttr(conf.attrId),
        description: conf.record.getAttrInputConf(conf.attrId, "label")
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
    var b = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ description }}\"/>\n            <TextView text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'create',
        path: '~/services/partials/inputs/simple_text',
    });
    var viewModel = new observable_1.Observable();
    var enteros = [];
    for (var i = 1; i <= 30; i++) {
        enteros.push(i);
    }
    viewModel.set("enteros", enteros);
    viewModel.set("decimales", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    viewModel.set("keyboardType", "number");
    a.bindingContext = viewModel;
    stack.orientation = "vertical";
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
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