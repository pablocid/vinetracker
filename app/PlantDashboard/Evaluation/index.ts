import {SaveRecord} from '../../services/RecordService';
import {Scanner} from '../Components/PlantScanner';
import {MultipleSelection} from '../Components/MultipleSelection';
import {NumberList} from '../Components/NumberList';
import {BaseInputComponent} from '../Components/BaseComponent';
import {SimpleText} from '../Components/SimpleText';
import {SelectionList} from '../Components/SelectionList';
import {Context} from '../../factories/Context';
import {PlantTest} from '../../factories/DataTest';
import {BasePage} from '../../factories/BasePage';
import { TabView, TabViewItem } from "ui/tab-view";
import { ActionItem } from 'ui/action-bar';
import {topmost as Topmost} from 'ui/frame';

var page = new BasePage();
var tab = new TabView();
page.mainContent = tab;

page.fnOnLoad = function(){


var context = <Context>page.page.navigationContext;

/**** for testing */
/*
var plantTest = new PlantTest();
var context = new Context();
context.plant = plantTest.getPlant();
context.schema = plantTest.getSchm();
context.record = plantTest.getRecordFen0();
*/
/**** */

//console.log(context.schema.listAttrIds);
//console.log(context.record.getAttribute("5808de89832db50010d3192c").attrSchm.input.id)
var tabsItems = [];
    
for (var index = 0; index < context.record.schema.listAttrIds.length; index++) {
    //5808de89832db50010d3192c
    let a = context.record.schema.listAttrIds[index];
    let item = new TabViewItem();
    let attr = context.record.getAttribute(a);
    
    if(!attr){ continue;};
    item.title = <string>attr.attrSchm.properties.shortName;
    
    let inputId = attr.attrSchm.inputRef;
    console.log(a+' => '+inputId);
    var view:BaseInputComponent;
    switch(inputId){
        //	selection_list
        case '57fe942a45be360010073dbc':
        //context.record.getAttribute(a).value = 'basal';
            view = new SelectionList(context.record.getAttribute(a));
            break;
        // simple_text
        case '57c3202cc8307cd5b82f4465':
            view = new SimpleText(context.record.getAttribute(a));
            break;
        //	NumberList
        case '5808d0fdd48d17001006e43b':
            //context.record.getAttribute(a).value  = 10;
            view = new NumberList(context.record.getAttribute(a));
            break;
        //	MultipleSelection
        case '5808dc55832db50010d3192b':
            //context.record.getAttribute(a).value = ['dead_pant']
            view = new MultipleSelection(context.record.getAttribute(a));
            break;
        //	Scann
        case '57c431d5c8307cd5b82f448a':
            //view = new Scanner(context.record.getAttribute(a));
            break;
    }

    if(view){
        item.view = view.getView();
        tabsItems.push(item);
    }

}


tab.items = tabsItems;




page.setTitleActionBar(context.plant.getUbicación(), context.record.schema.schm.name);

}/*********** end fnOnLoad ********************/

var save = new ActionItem();
save.android.systemIcon = 'ic_menu_save';
save.on('tap',x=>{

var context = <Context>page.page.navigationContext;
var plant = context.plant;
var record = context.record;
record.getAttribute("57c42f77c8307cd5b82f4486").value = plant.id;

record.espaldera = plant.getAttribute('5807af5f31f55d0010aaffe4').value;
record.hilera = plant.getAttribute('5807af9231f55d0010aaffe5').value
record.posicion = plant.getAttribute('5807afe331f55d0010aaffe6').value;

console.log(JSON.stringify(record.data));
let saveRequest = new SaveRecord(record);
saveRequest.save().then(s=>{
    console.log('Saved ....')
    console.log(JSON.stringify(s));
    Topmost().navigate({
        moduleName:'PlantDashboard/HileraStatus/index',
        context:context
    })
})

});
page.addActionItem(save)
export = page;