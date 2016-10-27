import {ContextFS} from '../../factories/ContextFS';
import {PlantTest} from '../../factories/DataTest';
import { HileraFactory } from '../../factories/Hilera';
import {Plant} from '../../factories/Record';
import {NoEvaluated} from '../Components/NoEvaluated';
import {Filter, QueryConfig} from '../../factories/QueryParser';
import {
    FindForEvaluation,
    FindPlant,
    FindPlantIds,
    FindPlants,
    FindRecord,
    FindRecords
} from '../../services/RecordService';
import {List} from '../Components/List';
import {Schema} from '../../factories/Schema';
import {Context} from '../../factories/Context';
import {SumaryReport} from '../Components/EvaluationReport';
import {EvaluationListView} from '../Components/EvaluationList';
import {BasePage} from '../../factories/BasePage';
import { TabView, TabViewItem } from "ui/tab-view";
import { ActionItem } from 'ui/action-bar';
import {topmost as Topmost} from 'ui/frame';
import { Page } from 'ui/page';

import { ObservableArray } from 'data/observable-array';
import { Observable } from 'data/observable';
var lodash = require('lodash');

/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
 


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
var tab = new TabView();
hileraPage.mainContent = tab;


var desc = new ActionItem();
desc.text = "orden descendente";
desc.android.position = "popup";

hileraPage.addActionItem(desc);

var asc = new ActionItem();
asc.text = "orden ascendente";
asc.android.position = "popup";

hileraPage.addActionItem(asc);

//**************** *******************
function onload(args){
  var loader = new LoadingIndicator();

  var contextFs = new ContextFS();

  hileraPage.setTitleActionBar('Ubicación E'+contextFs.plant.espaldera+'H'+contextFs.plant.hilera);
  var hilera = new HileraFactory(contextFs.hilera);
  hilera.evTabTitle = 'evaluadas';
  hilera.NoEvTabTitle = 'no evaluadas';
  
  desc.on('tap',x=>{
    hilera.sort ='desc';
  });

  asc.on('tap',x=>{
    hilera.sort ='asc';
  });
  

  //****************** EVALUADAS
  var evTab = new TabViewItem();
  evTab.title = hilera.evTabTitle;
  
  var evList = new List();
  evList.items = hilera.evaluated;
  evTab.view = evList.getView();
  evList.callbackOnTap = function(index){
    loader.show(options);
    //importante setear la planta porque desde ahí saca el ID y la Ubicación
    contextFs.plant = hilera.evaluated.getItem(index);
    let record = new FindForEvaluation();
    record.record(contextFs.schema, contextFs.plant).then(d=>{
      contextFs.record = d;
      loader.hide();
       var modalPageModule = 'PlantDashboard/Evaluation/index';
       var context = "some custom context";
       var fullscreen = true;
       hileraPage.page.showModal(modalPageModule, context,  (plant:Plant) => {
           console.log('closeCallback');
           console.log('registro actualizado');
       }, fullscreen);
    })
  }

  //****************** NO EVALUADAS
  var noEvTab = new TabViewItem();
  noEvTab.title = hilera.NoEvTabTitle;
  
  var noEvList = new List();
  noEvList.items = hilera.noEvaluated;
  noEvList.callbackOnTap = function(index){
    loader.show(options);
    //importante setear la planta porque desde ahí saca el ID y la Ubicación
    contextFs.plant = hilera.noEvaluated.getItem(index);
    let record = new FindForEvaluation();
    record.record(contextFs.schema, contextFs.plant).then(d=>{
      contextFs.record = d;
      loader.hide();
       var modalPageModule = 'PlantDashboard/Evaluation/index';
       var context = "some custom context";
       var fullscreen = true;
       hileraPage.page.showModal(modalPageModule, context,  (plant:Plant) => {
           if(plant){
              console.log('registro guardado. ID: '+plant.id);
              hilera.addEvaluated = plant.id;
           }
       }, fullscreen);

    })
  }
  noEvTab.view = noEvList.getView();

  //*********** set TabViewItems

  tab.items = [noEvTab, evTab];
  

  hilera.callbackOnChangeList = function(){
      evTab.title = hilera.evTabTitle;
      noEvTab.title = hilera.NoEvTabTitle;
  }

  var findIds = new FindPlantIds();
  
  loader.show(options2);

  findIds.getEvaluatedId(contextFs.schema, contextFs.plant).then(x=>{
    loader.hide();
    if(x && x.length){ hilera.idEvaluated = x; }
  });
  
  //if(!contextFs.allowedPlantsId && contextFs.schema.properties.restriction && contextFs.schema.properties.restriction.length){
    findIds.getRestrictionIds(contextFs.schema, contextFs.plant).then(x=>{
      if(x && x.length){
        hilera.idRestrictions = x;
        contextFs.allowedPlantsId = x;
      }
    });
  //}

}/**************** end onLoad ********************/

hileraPage.fnOnLoad = onload;


export =  hileraPage;