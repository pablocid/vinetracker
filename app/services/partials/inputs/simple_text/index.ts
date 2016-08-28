import {StackLayout} from 'ui/layouts/stack-layout';
import builder = require("ui/builder");
import {View} from "ui/core/view";

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

}
exports.EditView = function (conf) {
    var self = this;
    var stack = new StackLayout();
    var b = builder.parse(`
            <Label style="font-size:30; " text="{{ description }}"/>
            <TextView text="{{ value }}" />
    `);
    var a = builder.load({ //xmlns:dd="nativescript-drop-down"
        name:'create',
        path:'~/services/partials/inputs/simple_text',
    });
    var enteros =[];
    for (var i = 1; i <= 30; i++) {
        enteros.push(i);
        
    }
    conf.bindingContext.enteros = enteros;
    conf.bindingContext.decimales = [0,1,2,3,4,5,6,7,8,9];
    conf.bindingContext.keyboardType = "number";
    a.bindingContext = conf.bindingContext;
    stack.orientation = "vertical";
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);

    this.getView = function(){
        return stack;
    }

}