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
    
    var idCode = page.navigationContext.idCode;
    var schm = page.navigationContext.schm;
    var filter = page.navigationContext.filter;

    var config = {
        dir:'api/records',
        query:{
            page:'',
            items:'',
            schm:schm,
            filter: filter
        }
    }
    
    var grid = new GridLayout();
    var obs = new Observable();

    function tabItemMaker (data) {
        var tab = new TabView();
        tab.items = [];

        for (var e = 0; e < data.getIdsForShow().length; e++) {
            var identif = data.getIdsForShow()[e];
            console.log(data.getAttr(identif));
            var config = {
                bindingContext:{
                    value: data.getAttr(identif),
                    description: data.getSchmAttr(identif, "label")
                },
                cb:''
            };
            var tabItem = new TabViewItem();
            tabItem.title =  data.getSchmAttr(identif,"shortName");
            tabItem.view = new SimpleText.SimpleText(config).getView();
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
        .then(tabItemMaker)
        .then(function(tab){
            grid.addChild(tab);
            loader.hide();
        });

    var navBtn = new NavigationButton();
    navBtn.android.systemIcon="ic_menu_back";

    
    page.actionBar.title = "Plant info";
    page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

    page.content = grid;

}
exports.createPage = function createPage() {
    var page = new Page();
    page._applyXmlAttribute('xmlns',"http://schemas.nativescript.org/tns.xsd");
    page.on(Page.navigatedToEvent, onNavigatedTo);

    return page;
}
