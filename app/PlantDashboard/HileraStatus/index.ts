import { ContextFS } from '../../factories/ContextFS';
import { HileraComponent } from '../Components/HileraComponent';
import { PlantTest } from '../../factories/DataTest';
import { HileraFactory } from '../../factories/Hilera';
import { Plant, Record } from '../../factories/Record';
import { NoEvaluated } from '../Components/NoEvaluated';
import { Filter, QueryConfig } from '../../factories/QueryParser';
import {
  FindForEvaluation,
  FindPlant,
  FindPlantIds,
  FindPlants,
  FindRecord,
  FindRecords
} from '../../services/RecordService';
import { List } from '../Components/List';
import { Schema } from '../../factories/Schema';
import { Context } from '../../factories/Context';
import { SumaryReport } from '../Components/EvaluationReport';
import { EvaluationListView } from '../Components/EvaluationList';
import { BasePage } from '../../factories/BasePage';
import { TabView, TabViewItem } from "ui/tab-view";
import { ActionItem } from 'ui/action-bar';
import { topmost as Topmost } from 'ui/frame';
import { Page } from 'ui/page';

import { ObservableArray } from 'data/observable-array';
import { Observable, EventData } from 'data/observable';

var lodash = require('lodash');

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
function contextChecker(schm, plant, hilera) {
  if (!schm) { console.log('undefined schm') }
  if (!plant) { console.log('undefined plant') }
  if (!hilera) { console.log('undefined hilera') }
  if (!schm || !plant || !hilera) {
    return true;
  } else {
    return false;
  }
}

var options = {
  message: 'cargando la evaluación ...',
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
var options2 = {
  message: 'filtrando plantas disponibles ...',
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
//********************
var hileraPage = new BasePage();
var titlePage = new Observable();

titlePage.set('title', 'loading ...');
titlePage.set('subTitle', 'loading ...');
hileraPage.setTitleActionBar('ok', 'ok', titlePage)

//************** ActionItems **************
var desc = new ActionItem();
desc.text = "orden descendente";
desc.android.position = "popup";
desc.on(ActionItem.tapEvent, () => {
  hilera.setOrder('desc');
});

hileraPage.addActionItem(desc);

var asc = new ActionItem();
asc.text = "orden ascendente";
asc.android.position = "popup";
asc.on(ActionItem.tapEvent, () => {
  hilera.setOrder('asc');
});
hileraPage.addActionItem(asc);

var updateLists = new ActionItem();
updateLists.text = "actualizar listas";
updateLists.android.position = "popup";
updateLists.on(ActionItem.tapEvent, () => {
  makeView();
});
hileraPage.addActionItem(updateLists);

//************** END: ActionItems **************

var hilera = new HileraComponent();
hileraPage.mainContent = hilera.getView();

var findIds = new FindPlantIds();

var context: Context;

var record = new FindForEvaluation();
var page: Page;

console.log('Creating hilera status page ...........................')

hileraPage.fnOnLoad = (args) => {
  var c = <Context>args.object.navigationContext;
  console.log('schema : ------------------------ ' + c.schema.id);
  console.log('plant : ------------------------ ' + c.plant.id);
  console.log('hilera : ------------------------ ' + c.plant.hilera);
  console.log('hilera length : ------------------------ ' + c.hilera.length);

  load(c);
}//************* end fnOnLoad *****************************************


function load(newContext: Context) {

  if (!newContext) { console.log('undefined newContext') }

  if (!newContext || contextChecker(newContext.schema, newContext.plant, newContext.hilera)) {
    console.log("Topmost().navigate('PlantDashboard/Evaluations/index');")
    Topmost().navigate('PlantDashboard/Evaluations/index');
    return;
  }

  if (context) {
    console.log('context.schema.id === newContext.schema.id ' + (context.schema.id === newContext.schema.id) + '  ' + context.schema.id + ' vs ' + newContext.schema.id);
    console.log('context.plant.hilera === newContext.plant.hilera ' + (context.plant.hilera === newContext.plant.hilera) + ' ' + context.plant.hilera + ' vs ' + newContext.plant.hilera);
    console.log('context.plant.espaldera === newContext.plant.espaldera ' + (context.plant.espaldera === newContext.plant.espaldera) + ' ' + context.plant.espaldera + ' vs ' + newContext.plant.espaldera);
    console.log('context.hilera.length === newContext.hilera.length ' + (context.hilera.length === newContext.hilera.length) + '   ' + context.hilera.length + ' vs ' + newContext.hilera.length);
  }



  if (
    context &&
    context.schema.id === newContext.schema.id &&
    context.plant.hilera === newContext.plant.hilera &&
    context.plant.espaldera === newContext.plant.espaldera &&
    context.hilera.length === newContext.hilera.length
  ) {
    console.log('same')
    return;
  }
  console.log('not the same')
  context = lodash.clone(newContext, true);

  makeView();
}

function makeView() {
  hilera.removeAllItems();
  titlePage.set('title', 'Ubicación E' + context.plant.espaldera + 'H' + context.plant.hilera);
  titlePage.set('subTitle', context.schema.properties.listViewLabel + ' - En la hilera hay ' + context.hilera.length + ' plantas');

  hilera.mainList = context.hilera;

  loader.show(options2);
  var evStop = false;
/*
  findIds.getEvaluatedId(context.schema, context.plant).then(x => {
    evStop = true;
    stopLoader();
    if (x && x.length) { hilera.evaluatedItems = x; }
  });
*/
  findIds.getEvaluated(context.schema, context.plant).then(x=>{
    evStop = true;
    stopLoader();
    if (x && x.length) { hilera.evaluatedItems2 = x; }
  });

  var rStop = false;
  findIds.getRestrictionIds(context.schema, context.plant).then(x => {
    rStop = true;
    stopLoader();
    if (x && x.length) { hilera.restrictionItems = x; }
  });

  function stopLoader() {
    if (evStop && rStop) {
      loader.hide();
    }
  }
}

hilera.evSelectItemCb = (i, item) => {
  onTapItem(i, item);
};
hilera.nonEvSelectItemCb = (i, item) => {
  onTapItem(i, item);
};

function onTapItem(i, item) {
  context.plant = item;
  console.log('onTapItem: plant id: ' + context.plant.id);

  loader.show(options);
  record.record(context.schema, item).then(d => {
    loader.hide();
    context.record = d;

    var modalPageModule = 'PlantDashboard/EvaluationPage/evaluation-page';
    var fullscreen = true;
    hileraPage.page.showModal(modalPageModule, context, (status: string, id: string, svRecord?:Record) => {
      console.log('closeCallback');
      
      if(status){
        console.log('registro actualizado');
        hilera.evaluatedItem(id, svRecord);
      }
    }, fullscreen);
  })
}

hileraPage.fnOnUnLoaded = function () {
  //context = <Context>{};
}

hileraPage.setMainContent();

export function createPage() {
  return hileraPage.page;
}

