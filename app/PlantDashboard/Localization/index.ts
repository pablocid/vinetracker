import { Schema } from '../../factories/Schema';
import { FindPlants, FindRecords } from '../../services/RecordService';
import { Filter, QueryConfig } from '../../factories/QueryParser';
import { ContextFS } from '../../factories/ContextFS';
import { PlantTest } from '../../factories/DataTest';
import { Plant } from '../../factories/Record';
import { Context } from '../../factories/Context';

import { BasePage } from '../../factories/BasePage';
import { parse as Parse, load as Load } from 'ui/builder';
import { EventData } from 'data/observable';
import { topmost as Topmost } from 'ui/frame';
import { TabView, TabViewItem } from 'ui/tab-view';
import { StackLayout } from 'ui/layouts/stack-layout';
import { SumaryReport } from '../Components/EvaluationReport';
import { PlantScanner } from '../Components/PlantScanner';
import { Page } from 'ui/page';


/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

var loader = new LoadingIndicator();

var options = {
    message: 'cargando la hilera en el sistema ...',
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



var localization = new BasePage();
var tab = new TabView();
localization.mainContent = tab;
localization.setTitleActionBar('Localización', 'Elige la hilera que quires evaluar');

var context: Context;

/***************************onLoad ************************** */
localization.fnOnLoad = function (args: EventData) {
    var page = <Page>args.object;

    context = <Context>page.navigationContext;
    if (!context) {
        Topmost().navigate('PlantDashboard/index');
    }

}/*************************** END onLoad ************************** */

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
scanView.callback = function (plant: Plant) {
    loader.show(options);
    context.plant = plant;
    console.log('context.plant.id: ---------------------> ' + context.plant.id);
    getMainList(context.plant).then(p => {
        context.hilera = p;
        console.log('largo de la hilera (' + context.plant.id + ') es ' + p.length)
        return context;
    }).then(c => {
        loader.hide();
        let opt = {
            moduleName: 'PlantDashboard/HileraStatus/index',
            context: c,
            clearHistory: false,
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeOut"
            }
        }
        Topmost().navigate(opt);

    })
}

function getMainList(plant: Plant) {
    var qc = new QueryConfig();
    qc.items = "300";
    qc.schm = "57a4e02ec830e2bdff1a1608";
    // filtero espaldera
    var filter_espaldera = new Filter();
    filter_espaldera.key = "5807af5f31f55d0010aaffe4";
    filter_espaldera.value = plant.getAttribute("5807af5f31f55d0010aaffe4").value;
    filter_espaldera.datatype = "number";

    // filtero hilera
    var filter_hilera = new Filter();
    filter_hilera.key = "5807af9231f55d0010aaffe5";
    filter_hilera.value = plant.getAttribute("5807af9231f55d0010aaffe5").value;
    filter_hilera.datatype = "number";

    qc.filter = [filter_espaldera, filter_hilera];
    var plants = new FindPlants(qc);

    return plants.finds();
}



export function createPage() {
    return localization.page;
}