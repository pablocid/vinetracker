import {PlantTest} from '../../factories/DataTest';
import {Plant} from '../../factories/Record';
import {Context} from '../../factories/Context';

import { BasePage } from '../../factories/BasePage';
import { parse as Parse, load as Load } from 'ui/builder';
import { EventData } from 'data/observable';
import { topmost as Topmost} from 'ui/frame';
import { TabView, TabViewItem } from 'ui/tab-view';
import { StackLayout } from 'ui/layouts/stack-layout';
import { SumaryReport } from '../Components/EvaluationReport';
import { PlantScanner } from '../Components/PlantScanner';

/***test */
/*
var plantTest = new PlantTest();
var schmTest = plantTest.getSchm();
var context = new Context();
context.schema = schmTest;
*/
/*** */

var localization = new BasePage();
var tab = new TabView();
localization.mainContent = tab;
localization.setTitleActionBar('Localización','Elige la hilera que quires evaluar');

/***************************onLoad ************************** */
localization.fnOnLoad = function(){

var resumenView = new SumaryReport();

/**************** tabitems: SCAN ********************/
var scan = new TabViewItem();
scan.title = 'scan';
var scanView = new PlantScanner();

scan.view = scanView.getView();

/**************** tabitems: Ubicacion ********************/
var ubicacion = new TabViewItem();
ubicacion.title = 'ubicación';
var sl = new StackLayout();
sl.addChild(Parse(`
<StackLayout>
    <Label text="Localization"></Label>
</StackLayout>
`))
ubicacion.view = sl;

/**************** tabitems: resumen ********************/
var resumen = new TabViewItem();
resumen.title = 'resumen';
resumen.view = resumenView.getView();

tab.items = [scan /*, ubicacion, resumen*/];


scanView.callback = function(plant:Plant){
    let context = <Context>localization.page.navigationContext;
    context.plant = plant;
    let navOpts = {
        moduleName:'PlantDashboard/HileraStatus/index',
        context:context
    }
    Topmost().navigate(navOpts);
}


}/*************************** END onLoad ************************** */

export = localization;