/*
    Esta página toma un identificador (, un schema y un filtro en el caso de no ser un ObjectId) como parámetro para entregar la visualización del registro
*/
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
 var ViewMaker = require("../services/ViewMaker.service");
// optional options 
var options = {
  message: 'loading plant info...',
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
    loader.show(options);
    var page = args.object;
    
    var id = page.navigationContext.id;
    var schm = page.navigationContext.schm;
    var key = page.navigationContext.key;
    var datatype = page.navigationContext.datatype;

    //console.log(id+" - "+schm+" - "+key+" - "+datatype);

    var config = {
        id:id,
        query:{
            schm:schm,
            key:key,
            datatype:datatype
        }
    }
    
    var grid = new GridLayout();
    var obs = new Observable();

    function tabItemMaker (data) {
        //console.log(JSON.stringify(data))
        //console.log(data.getSchmAttr("registrationStart") )
        var tab = new TabView();
        tab.items = [];
        var validIds = data.getIdsForShow();
        console.log("validIds.length: "+validIds.length)
        for (var e = 0; e < validIds.length; e++) {
            var identif = validIds[e];
            //console.log(data.getAttr(identif));
            var config = {
                bindingContext:{
                    value: data.getAttr(identif),
                    description: data.getAttrInputConf(identif, "label") //data.getSchmAttrInputConf(identif, "visualization")//
                },
                cb:''
            };
            var tabItem = new TabViewItem();
            tabItem.title =  data.getAttrInputConf(identif,"shortName");
            tabItem.view = SimpleText(config).getView();
            tab.items.push(tabItem);
            
        }
        return tab;
        
        /*
        var inf = obs.get('record');
        while (inf.length) { 
            inf.pop(); 
        } 
        inf.push(data.getListOfAttr());
        */
    }
    
    RecordService.FindOne(config)
        .then(ViewMaker.TabView)
        .then(function(tab){
            grid.addChild(tab);
            loader.hide();
        }, function (err) {
            loader.hide();
        });

    var navBtn = new NavigationButton();
    navBtn.android.systemIcon="ic_menu_back";

    
    page.actionBar.title = "Plant info";
    //page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

    page.content = grid;

}
exports.createPage = function createPage() {
    var page = new Page();
    page._applyXmlAttribute('xmlns',"http://schemas.nativescript.org/tns.xsd");
    page.on(Page.navigatedToEvent, onNavigatedTo);
    return page;
}
