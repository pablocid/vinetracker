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
import Frame = require('ui/frame');
var _ = require("lodash");
/**
 * Esta implementación debe buscar los schemas que estan relacionado con la evaluación de plantas
 * El filtrado debe ser por creatable y visible
 * El link a evaluation-records se debe hacer con los siguientes parámetros
 *     - schema
 *     - attribute: valor a mostrar en el texto de item
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var options = {
  message: 'buscando evaluaciones disponibles ...',
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
exports.createPage = function () {
    loader.show(options);
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
    var array = [
       {name:"Evaluación de grados brix", schema:"57c42f2fc8307cd5b82f4484"}
   ];
    
    var config={
        query:{
            filter:[ {key:"attributes", value:{"$in": ["57c42f77c8307cd5b82f4486"] } , "datatype":"list" } ]
        }
    }

    function SchmSchemaObj (schm){
        if(schm){
            _.assignIn(this,schm);
        }
    }
    SchmSchemaObj.prototype.getAttr = function (attrId, dt){
        var self = this;
        return this.findValueByVarHelper(self.attributes, "id", attrId, dt);
    }
    SchmSchemaObj.prototype.findValueByVarHelper = function(array, key, value, target){
        var self = this;
        if(!Array.isArray(array)){return null;}

        var index = array.map(x=> x[key] ).indexOf(value);
        
        if(index !== -1){
            if(target === undefined){
                return array[index];
            }else{
                return array[index][target];
            }
        }else{
            return null;
        }
    }


    var itemsSchm = [];
    function onTapItem(args) {
        console.log(args.index);
         var navigationOptions={
            moduleName:'evaluations/evaluation-records',
            context:{
                schema: itemsSchm[args.index]._id,
                listViewAttr:itemsSchm[args.index].getAttr("listViewAttrValue","string")
            }
        }
        
        Frame.topmost().navigate(navigationOptions);
    }
    RecordService.FindSchm(config).then(x=>{
        x.items = x.items.map(c=> new SchmSchemaObj(c))
        return x;
    }).then(x=>{
        // filter by creatable
        itemsSchm =  x.items.filter(u=>u.getAttr("creatable","boolean"));
        a.bindingContext ={
            selectedOption:onTapItem, 
            items:itemsSchm.map(s=>{
                return {
                    name:s.getAttr("listViewLabel", "string")
                }
            }) 
        }
        loader.hide();
    })
   
    
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
