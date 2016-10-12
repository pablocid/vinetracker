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
var WaveRefresh = require("nativescript-wave-refresh");
/******************************** */
/**
 * Esta implementación es solo para Plantas (schema: 57a4e02ec830e2bdff1a1608 / individuos)
 * y los registros listados siempre mostrarán (populate) la ubicación de la planta (ExHxPx) 
 * En cuanto al atributo de grados brix (Schema:Type:attribute => )
 */
// optional options 
var options = {
  message: 'loading records...',
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

function onNavigatedTo(args) {
     console.log("onNavigatedTo");
    loader.show(options);
    var page = args.object;
    
    /********** LIST ITEMS *********** */
    var schm = page.navigationContext.schema;
    var listViewAttr = page.navigationContext.listViewAttr;

    var a = Builder.parse(`
        <ListView items="{{ items }}" itemTap="{{selectedOption}}"    >
            <ListView.itemTemplate >
                <GridLayout columns="30, *" style="font-size:25; padding:10; padding-bottom:50; padding-top:50;" backgroundColor="{{color}}">
                    <Label text="" col="0" />
                    <Label text="{{ text}}" col="0" textWrap="true" col="1"/>
                </GridLayout>
            </ListView.itemTemplate>
        </ListView>
    `);

    var a = Builder.parse(`
    
<StackLayout xmlns:WR="nativescript-wave-refresh">

    <WR:WaveRefresh backgroundColor="#2196F3" refresh="{{ stopRefresh }}"  id="waveRefresh">
      <ListView items="{{ items }}" itemTap="{{selectedOption}}">
        <ListView.itemTemplate>
          <GridLayout columns="30, *" style="font-size:25; padding:10; padding-bottom:50; padding-top:50;" backgroundColor="{{color}}">
                    <Label text="" col="0" />
                    <Label text="{{ text}}" col="0" textWrap="true" col="1"/>
                </GridLayout>
        </ListView.itemTemplate>
      </ListView>
    </WR:WaveRefresh>

</StackLayout>
    
    `);


    var configFind ={
        //populate by indiv_ref
        attrId:"57c42f77c8307cd5b82f4486",
        query:{
            schm:schm,
            populate:"57c42f77c8307cd5b82f4486"
        }
    }

function mix(a, b, v){
    return (1-v)*a + v*b;
}

function HSVtoRGB(H, S, V){
    var V2 = V * (1 - S);
    var r  = ((H>=0 && H<=60) || (H>=300 && H<=360)) ? V : ((H>=120 && H<=240) ? V2 : ((H>=60 && H<=120) ? mix(V,V2,(H-60)/60) : ((H>=240 && H<=300) ? mix(V2,V,(H-240)/60) : 0)));
    var g  = (H>=60 && H<=180) ? V : ((H>=240 && H<=360) ? V2 : ((H>=0 && H<=60) ? mix(V2,V,H/60) : ((H>=180 && H<=240) ? mix(V,V2,(H-180)/60) : 0)));
    var b  = (H>=0 && H<=120) ? V2 : ((H>=180 && H<=300) ? V : ((H>=120 && H<=180) ? mix(V2,V,(H-120)/60) : ((H>=300 && H<=360) ? mix(V,V2,(H-300)/60) : 0)));

    return {
        r : Math.round(r * 255),
        g : Math.round(g * 255),
        b : Math.round(b * 255)
    };
}
// rango del 170 al 0
    function brixColor(num){
        var n = 270 - num*270/25;
        var o = HSVtoRGB(n,1,1);
        return "rgb("+o.r+","+o.g+","+o.b+")"
        /*
        if(num <5 ){return "#8081E0";}
        if(num >=5 && num <13  ){return "#EDEA1C";}
        if(num >=13 && num <18  ){return "#048C0D";}
        if( num >=18  ){return "#D60909";}
        */

    }
    var showItems = [];

    //console.log("SChema que se envia a record")
    function onTapItem(args) {
        //console.log("Tap item "+Object.keys(showItems[args.index])+" ----------------------");
         var navigationOptions={
            moduleName:'evaluations/evaluation-create',
            context:{
                _id: showItems[args.index]._id,
            }
        }
        
        Frame.topmost().navigate(navigationOptions);
    }
   RecordService.FindPop(configFind).then(x=>{
           
           showItems = x.items; 
           var listItems = x.items.map(x=>{
           var num = Math.floor(Math.random()*30+1)
           console.log(num)
           var text = "Planta ";
           text += "E"+x.getPopAttr("57c42f77c8307cd5b82f4486","espaldera", "number")
           text += "H"+x.getPopAttr("57c42f77c8307cd5b82f4486","hilera", "number")
           text += x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number")?"P"+x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number") : "-";

           return {
               text:text+": "+x.getAttr(listViewAttr),
               color:brixColor(x.getAttr("57c84628ab66902c2208a855"))
           }
       })
       console.log(showItems)
        a.bindingContext ={selectedOption:onTapItem, items:listItems, stopRefresh:stopRefresh }
        loader.hide();
    });
    
    function stopRefresh(args: any) {
    // Load more data here and then set 'refreshing = false' to end the refresh
    let w = args.object;
    
    RecordService.FindPop(configFind).then(x=>{
           
           showItems = x.items; 
           var listItems = x.items.map(x=>{
               var num = Math.floor(Math.random()*30+1)
               console.log(num)
               var text = "Planta ";
               text += "E"+x.getPopAttr("57c42f77c8307cd5b82f4486","espaldera", "number")
               text += "H"+x.getPopAttr("57c42f77c8307cd5b82f4486","hilera", "number")
               text += x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number")?"P"+x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number") : "-";
    
               return {
                   text:text+": "+x.getAttr(listViewAttr),
                   color:brixColor(x.getAttr("57c84628ab66902c2208a855"))
               }
           })
        console.log(showItems)
        a.bindingContext ={selectedOption:onTapItem, items:listItems, stopRefresh:stopRefresh }
        //loader.hide();
        w.refreshing = false;
    });
  }


    var grid = new GridLayout();
    grid.addChild(a);

    page.content = grid;
    
    console.log(" onNavigatedTo -- page.actionBar.actionItems.getItems.length"+page.actionBar.actionItems.getItems.length)
    /********** ACTION BAR *********** */
/*
    var item = new actionBarModule.ActionItem();
    
    item.android.systemIcon = "ic_menu_add";
    item.on("tap",function(){
        console.log("plus tap");
        var navigationOptions={
            moduleName:'evaluations/evaluation-create',
            context:{
                schm: schm
            }
        }
        
        Frame.topmost().navigate(navigationOptions);
    });
    page.actionBar.title = "Registros evaluados";
    //page.actionBar.actionItems.addItem(item);  
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
*/
}
function pageLoaded(args) {
    console.log("pageLoaded");
  var page = args.object;
  var schm = page.navigationContext.schema;

  /********** ACTION BAR *********** */
  /*
    var item = new actionBarModule.ActionItem();
    
    item.android.systemIcon = "ic_menu_add";
    item.on("tap",function(){
        console.log("plus tap");
        var navigationOptions={
            moduleName:'evaluations/evaluation-create',
            context:{
                schm: schm
            },
            backstackVisible: false
        }
        
        Frame.topmost().navigate(navigationOptions);
    });
  
    page.actionBar.title = "Registros evaluados";
    page.actionBar.actionItems.addItem(item);

    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    */

}
function navigatingTo(args) {
    console.log("navigatingTo");
  var page = args.object;
  var schm = page.navigationContext.schema;
  /********** ACTION BAR *********** */

    var item = new actionBarModule.ActionItem();
    var navBtn = new actionBarModule.NavigationButton();

    
    item.android.systemIcon = "ic_menu_add";
    item.on("tap",function(){
        console.log("plus tap");
        var navigationOptions={
            moduleName:'evaluations/evaluation-create',
            context:{
                schm: schm
            }
        }
        Frame.topmost().navigate(navigationOptions);
        //Frame.topmost().re
    });
    
    page.actionBar.title = "Registros evaluados";
    page.actionBar.navigationButton = item;
    //page.actionBar.actionItems = items;  
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");

}
exports.createPage = function createPage() {
    var page = new Page();
    
    page._applyXmlAttribute('xmlns',"http://schemas.nativescript.org/tns.xsd");
    page.on(Page.navigatedToEvent, onNavigatedTo);
    page.on(Page.loadedEvent, pageLoaded);
    page.on(Page.navigatingToEvent, navigatingTo);
    return page;
}
