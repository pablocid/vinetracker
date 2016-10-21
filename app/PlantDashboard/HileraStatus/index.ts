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

import { ObservableArray } from 'data/observable-array';
import { Observable } from 'data/observable';
var lodash = require('lodash');

var hileraPage = new BasePage();
var hileraC = new Hilera();

var evalObs = new Observable();
var evalTitle = 'evaluados';
var noevTitle = 'no evaluados';

//var context = <Context>hileraPage.page.navigationContext;

/**** for testing */
var plantTest = new PlantTest();
var context = new Context();
context.plant = plantTest.getPlant();
context.schema = plantTest.getSchm();
/**** */

hileraC.plant = context.plant;
hileraC.schmEvaluation = context.schema;

var tab = new TabView();

var evTab = new TabViewItem();
var evaluados = new List();

evTab.view = evaluados.getView();
evTab.title = evalTitle

var noevTab = new TabViewItem();
var noevaluados = new NoEvaluated();

noevTab.view = noevaluados.getView();
noevTab.title = noevTitle

tab.items = [noevTab, evTab];

hileraPage.mainContent = tab;

/**********tap callbacks *****************/
evaluados.callbackOnTap = function(index){
  console.log(evaluados.items[index].name);
  context.plant = evaluados.items[index].plant;
  //Topmost().navitaget({})
}

noevaluados.callbackOnTap = function(index){
  console.log(noevaluados.items[index].name);
  context.plant = noevaluados.items[index].plant;
}

/**************** ********************/
function onload(){
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
}

hileraPage.fnOnLoad = onload;

var refresh = new ActionItem();
refresh.text = "refresh";
refresh.android.position = "popup";
refresh.on('tap',x=>{
  onload();
});
hileraPage.addActionItem(refresh)
export =  hileraPage;