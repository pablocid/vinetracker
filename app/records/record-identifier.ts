import {Page} from 'ui/page';
import {NavigationButton} from "ui/action-bar";
import {GridLayout} from 'ui/layouts/grid-layout';
import {TabView, TabViewItem} from "ui/tab-view";
import { Observable } from "data/observable";
var Inputs = require('../form/input-schemas/brix');
import { ObservableArray } from "data/observable-array";
var Scan = require('../services/partials/inputs/scan');

import frame = require('ui/frame');

var RecordService = require("../services/record.service");

exports.createPage = function () {

    var tab = new TabView();
    var obs = new Observable();
    obs.set('record',new ObservableArray() );

    var tabItems = new ObservableArray();
        var configInfo = {
        observable: obs,
        target: "record",
        cb:''
    };

    var info = new Inputs.Info(configInfo);
    
    tab.items = [];
    
    function cbInfo(idCode) {
        var navigationOptions={
            moduleName:'records/record-viewer',
            context:{
                id: idCode,
                schm: "57a4e02ec830e2bdff1a1608",
                key: "57c3583bc8307cd5b82f447d",
                datatype:'string'
            }
        }
        
        frame.topmost().navigate(navigationOptions);
    }
    
    var configScan = {
        observable:obs,
        target:"idCode",
        cb:cbInfo
    };

    var scan = new Scan.Scan(configScan);//new Inputs.Scan(configScan);
    var scanItem = new TabViewItem();
    scanItem.title = "Plant Scanner";
    scanItem.view = scan.getView();
    tab.items.push(scanItem);

    var grid = new GridLayout();
    grid.addChild(tab);

    var navBtn = new NavigationButton();
    navBtn.android.systemIcon="ic_menu_back";

    var page = new Page();
    page.actionBar.title = "Plant identifier";
    //page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

    page.content = grid;
    page._applyXmlAttribute('xmlns',"http://schemas.nativescript.org/tns.xsd");
    return page;
};
