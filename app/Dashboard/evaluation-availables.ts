//var frame = require('ui/frame');
import Page = require('ui/page');
//var StackLayout = require('ui/layouts/stack-layout');
//var Label = require('ui/label').Label;
//var Button = require('ui/button').Button;
import {NavigationButton} from "ui/action-bar";
import {GridLayout} from 'ui/layouts/grid-layout';
import TabViewModule = require("ui/tab-view");
//var View = require("ui/core/view");
//var TextViewModule = require("ui/text-view");
import {ListView, ItemEventData} from "ui/list-view";
//var Builder = require("ui/builder");
import { Observable } from "data/observable";
//var TextFieldModule = require("ui/text-field");
//var barcodescanner = require("nativescript-barcodescanner");
//var Inputs = require('./input-schemas/brix');
//var http = require('http');
import { ObservableArray } from "data/observable-array";
//var reqAuth = require("../services/auth.service").ReqAuth;
//var appSet = require("application-settings");

var RecordService = require("../services/record.service");

import dialogs = require("ui/dialogs");

import Builder = require("ui/builder");

exports.createPage = function () {
    var a = Builder.parse(`
        <ListView items="{{ items }}" itemTap="{{selectedOption}}">
            <ListView.itemTemplate>
                <GridLayout columns="30, *" style="font-size:25; padding:10; padding-bottom:50; padding-top:50;">
                    <Label text="" col="0" />
                    <Label text="{{ name }}" col="0" textWrap="true" col="1"/>
                </GridLayout>
            </ListView.itemTemplate>
        </ListView>
    `);
    function onTapItem(args) {
        console.log(args.index);
    }
   var array = [
       {name:"Evaluación de grados brix"}
   ];
    a.bindingContext ={selectedOption:onTapItem, items:array }
    var grid = new GridLayout();
    grid.addChild(a);

    var navBtn = new NavigationButton();

    var page = new Page.Page();
    page.actionBar.title = "Evaluaciones disponibles";
    page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

    page.content = grid;

    return page;
};
