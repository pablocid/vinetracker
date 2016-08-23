"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
exports.SimpleText = function SimpleText(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var b = builder.parse("\n            <Label style=\"font-size:30; \" text=\"{{ description }}\"/>\n            <Label style=\"font-size:30; \" text=\"{{ value }}\" />\n    ");
    var a = builder.load({
        name: 'theme1',
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
//# sourceMappingURL=index.js.map