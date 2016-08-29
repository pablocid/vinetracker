"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
exports.SimpleText = function SimpleText(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var b = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ description }}\"/>\n            <Label style=\"font-size:30; \" text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'show',
        path: '~/services/partials/inputs/simple_text'
    });
    a.bindingContext = conf.bindingContext;
    stack.orientation = "vertical";
    //stack.width = 500;
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);
    this.getView = function () {
        return stack;
    };
};
exports.TabView = function (conf) {
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
    this.getView = function () {
        return stack;
    };
};
exports.EditView = function (conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var b = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ description }}\"/>\n            <TextView text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'create',
        path: '~/services/partials/inputs/simple_text',
    });
    var enteros = [];
    for (var i = 1; i <= 30; i++) {
        enteros.push(i);
    }
    conf.bindingContext.enteros = enteros;
    conf.bindingContext.decimales = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    conf.bindingContext.keyboardType = "number";
    a.bindingContext = conf.bindingContext;
    stack.orientation = "vertical";
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);
    this.getView = function () {
        return stack;
    };
};
//# sourceMappingURL=index.js.map