/***************************SIMPLE TEXT ************************** */

import {StackLayout} from 'ui/layouts/stack-layout';
import builder = require("ui/builder");
import {View} from "ui/core/view";
import { Observable, PropertyChangeData } from "data/observable";
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

function TabViewBuilder (conf) {
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


function TabViewEditBuilder (conf) {
    var self = this;
    var stack = new StackLayout();
    var b = builder.parse(`
            <Label style="font-size:30; " text="{{ label }}"/>
            <TextView text="{{ value }}" />
    `);
    var a = builder.load({ //xmlns:dd="nativescript-drop-down"
        name:'create',
        path:'~/services/partials/inputs/float_range_number',
    });

    var viewModel = new Observable();
    var enteros =[];
    for (var i = conf.record.getAttrAttr(conf.attrId, "rangeMin"); i <= conf.record.getAttrAttr(conf.attrId, "rangeMax"); i++) {
        enteros.push(i);
    }
    viewModel.set("label",conf.record.getAttrAttr(conf.attrId, "label"))
    viewModel.set("enteros", enteros);
    //viewModel.set("decimales", [0,5]);
    //viewModel.set("value",conf.record.getAttr(conf.attrId));
    viewModel.set("selectedIndex", enteros.indexOf(conf.record.getAttr(conf.attrId)))
    //viewModel.set("selectedIndex",10)
    viewModel.addEventListener(Observable.propertyChangeEvent,function(v:PropertyChangeData){
        //console.log(v.object.get("value"));
        var index = viewModel.get("selectedIndex");

        conf.record.setAttr(conf.attrId,enteros[index]);
    });
    //viewModel.set("keyboardType", "number");

    a.bindingContext = viewModel;
    stack.orientation = "vertical";
    //stack.setInlineStyle("background-color:lightgray; margin:0; ");
    stack.addChild(a);
    return stack;

}
exports.EditView = TabViewEditBuilder;

/*********************  ***********************/
exports.getView = function(conf){
    var mode = conf.mode;
    var view;
    console.log("In getView: "+mode)
    switch(mode){
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
}