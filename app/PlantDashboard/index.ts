/**
 * Esta seccion maneja la información de plantas y los datos que se evaluan relacionados a ellas.
 * Esta implementación es específica para plantas, por lo tanto el mainSchm corresponde al : 57a4e02ec830e2bdff1a1608
 * Las subsecciones son: Consultar datos y evaluaciones disponibles
 * En Consulta de datos se pueden mostrar opciones como : Luego de scanear el codigo, mostrar datos por attributo y por evaluación
 * En las evaluaciones disponibles
 */

import { Page, ShownModallyData } from 'ui/page';
import { GridLayout } from 'ui/layouts/grid-layout';
import { parse as Parse, load as Load } from 'ui/builder';
import { EventData} from 'data/observable';
import { topmost as Topmost} from 'ui/frame';
import { HelperViewer } from  "../services/helperViewer/";
import { NavigationButton, ActionItems, ActionItem ,ActionBar, AndroidActionBarSettings, AndroidActionItemSettings} from "ui/action-bar";
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import { BasePage } from '../factories/BasePage';
import { Record } from '../factories/Record';
import { action as Action} from 'ui/dialogs';
var newView = new HelperViewer();
var style = {
    paddingBT:30,
    fontSize:20
}
newView.theme = `
    <ListView items="{{ items }}" itemTap="{{selectedOption}}">
        <ListView.itemTemplate>
            <GridLayout columns="30, *" style="font-size:${style.fontSize}; padding:10; padding-bottom:${style.paddingBT}; padding-top:${style.paddingBT};">
                <Label text="" col="0" />
                <Label text="{{ name }}" col="0" textWrap="true" col="1"/>
            </GridLayout>
        </ListView.itemTemplate>
    </ListView>
`;
var items = [
    //{name:"Consulta datos de una planta", link:""},
    {name:"Evaluaciones disponibles", link:"PlantDashboard/Evaluations/index"}
];
function selectedOption(selectedArgs){
    let index = selectedArgs.index;
    let navOpts = {
        moduleName: items[index].link,
        context:{
            fn: function(){
                console.log("en fn")
            }
        }
    }
    Topmost().navigate(navOpts);
}
newView.setBindingContext({ items:items, selectedOption:selectedOption });

var actionItem = new ActionItem();
actionItem.text = "option1";
actionItem.android.position = "popup";
actionItem.on(ActionItem.tapEvent,(args:EventData)=>{
    var msg = "evaluar ...";
    var opt1 = "una hilera";
    var opt2 = "una planta (Código QR)";
    Action({
      message: msg,
      cancelButtonText: "cancelar",
      actions: [opt1, opt2]
    }).then(result => {
        if(result === opt1){
            console.log("La primera opci0ón")
        }
        if(result === opt2){
            console.log("La segunda opci0ón")
        }
          //console.log("Dialog result: " + result)
    });
    console.log('tap on option1');
})
var b = new BasePage();
/*
b.mainContent = newView.getContent();
b.setTitleActionBar('PlantDashboard');
b.addActionItem(actionItem);
*/
import { ScanHStatus } from './Components/ScanHStatus';
var d = new ScanHStatus('683(10).6');
d.description = 'Escanea la wa';
d.callback = function(record: Record){
    console.log('Callback: el _id es '+ JSON.stringify( record.getData() ) );
}

b.mainContent = d.getView();
b.setTitleActionBar('Scan hilera status');


export = b;