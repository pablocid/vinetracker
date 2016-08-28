import {Page} from 'ui/page';
import {NavigationButton} from "ui/action-bar";
import {GridLayout} from 'ui/layouts/grid-layout';
import {TabView, TabViewItem} from "ui/tab-view";
import { Observable } from "data/observable";
var Inputs = require('../form/input-schemas/brix');
import { ObservableArray } from "data/observable-array";
var SimpleText = require("../services/partials/inputs/simple_text");

var RecordService = require("../services/record.service");

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
 
var loader = new LoadingIndicator();
import Builder = require("ui/builder");
import Frame = require('ui/frame');


import actionBarModule = require("ui/action-bar");


// optional options 
var options = {
  message: 'loading records...',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: false,
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  }
};
 
 // options is optional 

function onNavigatedTo(args) {
    //loader.show(options);
    var page = args.object;
    
    /********** LIST ITEMS *********** */
    var schm = "";//page.navigationContext.schm;
    var config = {
        query:{
            schm:schm,
        }
    }
    
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
       {name:"Planta E1H1P1", value:"16.5", schema:"xxxxxxx12312312xxxxx", id:""}
   ];
    function onTapItem(args) {
        console.log(args.index);
         var navigationOptions={
            moduleName:'records/record-viewer',
            context:{
                id: array[args.index].id,
                schm: "57a4e02ec830e2bdff1a1608",
                key: "cod_indiv",
                datatype:'string'
            }
        }
        
        //Frame.topmost().navigate(navigationOptions);
    }
   
    a.bindingContext ={selectedOption:onTapItem, items:array }
    var grid = new GridLayout();
    grid.addChild(a);



    /********** ACTION BAR *********** */
    var item = new actionBarModule.ActionItem();
    
    item.android.systemIcon = "ic_menu_add";
    item.on("tap",function(){
        console.log("plus tap");
        var navigationOptions={
            moduleName:'evaluations/evaluation-create',
            context:{
                schema: schm
            }
        }
        
        Frame.topmost().navigate(navigationOptions);
    });
  
    page.actionBar.title = "Registros evaluados";
    page.actionBar.actionItems.addItem(item);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

    page.content = grid;

}
exports.createPage = function createPage() {
    var page = new Page();
    page._applyXmlAttribute('xmlns',"http://schemas.nativescript.org/tns.xsd");
    page.on(Page.navigatedToEvent, onNavigatedTo);
    return page;
}
