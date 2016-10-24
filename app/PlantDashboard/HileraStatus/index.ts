import {PlantTest} from '../../factories/DataTest';
import {Hilera} from '../../factories/Hilera';
import {Plant} from '../../factories/Record';
import {NoEvaluated} from '../Components/NoEvaluated';
import {Filter, QueryConfig} from '../../factories/QueryParser';
import {FindPlant, FindPlants, FindRecord, FindRecords} from '../../services/RecordService';
import {List} from '../Components/List';
import {Schema} from '../../factories/Schema';
import {Context} from '../../factories/Context';
import {SumaryReport} from '../Components/EvaluationReport';
import {EvaluationListView} from '../Components/EvaluationList';
import {BasePage} from '../../factories/BasePage';
import { TabView, TabViewItem } from "ui/tab-view";
import { ActionItem } from 'ui/action-bar';
import {topmost as Topmost} from 'ui/frame';


import { ObservableArray } from 'data/observable-array';
import { Observable } from 'data/observable';
var lodash = require('lodash');

/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
 
var loader = new LoadingIndicator();

var options = {
  message: 'preparando la evaluación ...',
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

/******************** */
var hileraPage = new BasePage();
var tab = new TabView();
hileraPage.mainContent = tab;

/**************** ********************/
function onload(){

var hileraC = new Hilera();

var evalTitle = 'evaluados';
var noevTitle = 'no evaluados';

var context = <Context>hileraPage.page.navigationContext;

/**** for testing */
/*
var plantTest = new PlantTest();
var context = new Context();
context.plant = plantTest.getPlant();
context.schema = plantTest.getSchm();
*/
/**** */
var esp = context.plant.getAttribute("5807af5f31f55d0010aaffe4").value
var hil = context.plant.getAttribute("5807af9231f55d0010aaffe5").value
var evalName = context.schema.description;
hileraPage.setTitleActionBar('E'+esp+' '+'H'+hil, evalName);

hileraC.plant = context.plant;
hileraC.schmEvaluation = context.schema;

hileraC.restriction = context.schema.properties.restriction//[{id:'schm', string:'57febcf1179c960010e41f66'}];

var evTab = new TabViewItem();
var evaluados = new List();

evTab.view = evaluados.getView();
evTab.title = evalTitle

var noevTab = new TabViewItem();
var noevaluados = new NoEvaluated();

noevTab.view = noevaluados.getView();
noevTab.title = noevTitle

tab.items = [noevTab, evTab];



/**********tap callbacks *****************/
evaluados.callbackOnTap = function(index){
  loader.show(options);
  //console.log(evaluados.items[index].name);
  context.plant = evaluados.items[index].plant;
  let qc = new QueryConfig();
  qc.id = context.plant.id;
  qc.schm = context.schema.id;
  qc.key = '57c42f77c8307cd5b82f4486';
  qc.datatype = 'reference';

  let req = new FindRecord(qc);
  req.find().then(d=>{
    context.record = d;
    loader.hide();
    Topmost().navigate({
      moduleName:'PlantDashboard/Evaluation/index',
      context : context
    })
  })
}

noevaluados.callbackOnTap = function(index){
  loader.show(options);
  //console.log(noevaluados.items[index].name);
  context.plant = noevaluados.items[index].plant;
  let qc = new QueryConfig();
  qc.id = context.plant.id;
  qc.schm = context.schema.id;
  qc.key = '57c42f77c8307cd5b82f4486';
  qc.datatype = 'reference';

  let req = new FindRecord(qc);
  req.find().then(d=>{
    context.record = d;
    loader.hide();
    Topmost().navigate({
      moduleName:'PlantDashboard/Evaluation/index',
      context : context
    })
  })
}


  evaluados.loading = true;
  noevaluados.loading = true;
  /********* */
  hileraC.getEvandNoev().then(r=>{
      evaluados.items = r.evaluados;
      evTab.title = r.evaluados.length+' '+evalTitle;
      noevaluados.items = r.noEvaluados;
      noevTab.title = r.noEvaluados.length+' '+noevTitle;

      ///******
      evaluados.loading = false;
      noevaluados.loading = false;
    });
  /******** */
}/**************** end onLoad ********************/

hileraPage.fnOnLoad = onload;

var refresh = new ActionItem();
refresh.text = "refresh";
refresh.android.position = "popup";
refresh.on('tap',x=>{
  onload();
});
hileraPage.addActionItem(refresh)
export =  hileraPage;