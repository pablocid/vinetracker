/**
 * En esta seccion se listan todas los registros evaluados
 */
import {Page} from 'ui/page';
import { parse as Parse, load as Load } from 'ui/builder';
import {EventData} from 'data/observable';
var RecordService = require("../../../services/record.service");
import {HelperViewer, SchmSchemaObj} from  "../../../services/helperViewer/";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var options = {
  message: 'buscando plantas evaluadas ...',
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

function onNavigatedTo(args: EventData) {
    loader.show(options);
    var page = <Page>args.object
    var schm = page.navigationContext.schm;
    var mainSchm = page.navigationContext.mainSchm;
    var schemaRecord = <SchmSchemaObj>page.navigationContext.schemaRecord;
    
    var view = new HelperViewer();
    view.theme = `
        <ListView items="{{ items }}" itemTap="{{selectedOption}}">
            <ListView.itemTemplate>
                <GridLayout columns="30, *" style="font-size:20; padding:10; padding-bottom:50; padding-top:50;">
                    <Label text="" col="0" />
                    <Label text="{{ name }}" col="0" textWrap="true" col="1"/>
                </GridLayout>
            </ListView.itemTemplate>
        </ListView>
    `;
    var config={
        attrId:"57c42f77c8307cd5b82f4486",
        query:{
            schm:schemaRecord.id,
            populate:"57c42f77c8307cd5b82f4486",
        }
    }
    RecordService.FindPop(config).then(x=>{
        view.listItems = x.items.map(x=>{
            let text = "Planta ";
            text += "E"+x.getPopAttr("57c42f77c8307cd5b82f4486","espaldera", "number")
            text += "H"+x.getPopAttr("57c42f77c8307cd5b82f4486","hilera", "number")
            text += x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number")?"P"+x.getPopAttr("57c42f77c8307cd5b82f4486","posicion", "number") : "-";
            return {name:text+" brix: "+x.getAttr("57c84628ab66902c2208a855")} 
        });
        view.setBindingContext({ selectedOption:onTapItem, items:view.listItems });
        loader.hide();
    })
    function onTapItem(args){
        let index = args.index;
        console.log(index);
    }
    page.content = view.getContent();
}

exports.createPage = function createPage() {
    var page = new Page();
    page.on(Page.navigatedToEvent, onNavigatedTo);
    return page;
}