var frame = require('ui/frame');
var Page = require('ui/page').Page;
var StackLayout = require('ui/layouts/stack-layout');
var Label = require('ui/label').Label;
var Button = require('ui/button').Button;
var ActionBar = require("ui/action-bar");
var GridLayout = require('ui/layouts/grid-layout');
var TabViewModule = require("ui/tab-view");
var View = require("ui/core/view");
var TextViewModule = require("ui/text-view");
var ListViewModule = require("ui/list-view");
var Builder = require("ui/builder");
var Observable = require("data/observable");
var TextFieldModule = require("ui/text-field");
var barcodescanner = require("nativescript-barcodescanner");
var Inputs = require('./input-schemas/brix');
var http = require('http');
var ObsArray = require("data/observable-array").ObservableArray
var reqAuth = require("../services/auth.service").ReqAuth;
var appSet = require("application-settings");

var RecordService = require("../services/record.service");

var dialogs = require("ui/dialogs");

var xmlModule = require("xml");
var Builder = require("ui/builder");
exports.createPage = function () {
/*
var myComponentInstance = Builder.load({
        path: "./form-page",
        name: "MyControl"
});
*/  
    var tab = new TabViewModule.TabView();
/*
    //tab brix
    var tabItem = new TabViewModule.TabViewItem();
    tabItem.title ="Brix";

    //tab color
    var tabItem2 = new TabViewModule.TabViewItem();
    tabItem2.title ="Color";

    var view = new View.View();
    var textView = new TextViewModule.TextView();
    textView.text="HOLA";
    var stacklayout = new StackLayout.StackLayout();
    var welcomLabel = new Label();
    welcomLabel.text = "Estas en la página de settings";
    
    var backButton = new Button();
    backButton.text = "Go back";
    backButton.on('tap',function(){
        frame.topmost().goBack();
    });

    stacklayout.addChild(welcomLabel);
    stacklayout.addChild(backButton);

    tabItem.view = stacklayout;

    var textView2 = new TextViewModule.TextView();
    textView2.text="HCASKJD"; 

    var listView = new ListViewModule.ListView();
    var array = [];
    for (var index = 0; index < 100; index++) {
        array.push('ASDASDSAD__'+index);
        
    }
    listView.items = array;
    tabItem2.view = listView;
*/
    var obs = new Observable.Observable();
    
    var infoArray = new ObsArray();
    obs.set('record',infoArray);

    dialogs.action({
        message: "Your message",
        cancelButtonText: "Cancel text",
        actions: ["Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2","Option1", "Option2"]
    }).then(function (result) {
        console.log("Dialog result: " + result)
    });


    function cbInfo(idCode) {
        //obs.set('selectedTab', 1);
        //console.log(obs.get('selectedTab'));
        tab.selectedIndex = 1;
        var config = {
            dir:'api/records',
            query:{
                page:'',
                items:'',
                schm:'57a4e02ec830e2bdff1a1608',
                filter: [
                    {key:'cod_indiv', value:idCode, datatype:'string'}
                ]
            }
        }

        RecordService.FindOne(config).then(function (data) {
            var inf = obs.get('record');
            while (inf.length) { 
                inf.pop(); 
            } 
            inf.push(data.getListOfAttr());

        });

    }

    var configScan = {
        observable:obs,
        target:"idCode",
        cb:cbInfo
    };

    var configInfo = {
        observable: obs,
        target: "record",
        cb:''
    };

    var scan = new Inputs.Scan(configScan);
    var info = new Inputs.Info(configInfo);

    tab.items = [scan.getView(), info.getView()];

    var grid = new GridLayout.GridLayout();
    grid.addChild(tab);

    var navBtn = new ActionBar.NavigationButton();
    //navBtn.android.systemIcon="ic_menu_back";

    var page = new Page();
    page.actionBar.title = "Test";
    page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:green; color:white;");

    page.content = grid;

    return page;
};
