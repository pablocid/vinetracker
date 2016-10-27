import {HileraFactory} from '../../Hilera';
import {PlantTest} from '../';
import {List} from '../../../PlantDashboard/Components/List';
import {EvaluationListView} from '../../../PlantDashboard/Components/EvaluationList';
import {BasePage} from '../../BasePage';
import { NavigationButton, ActionItems, ActionItem ,ActionBar, AndroidActionBarSettings, AndroidActionItemSettings} from "ui/action-bar";
import {EventData} from 'data/observable';
import {TabView, TabViewItem} from 'ui/tab-view';

var plantTest = new PlantTest();

var page = new BasePage();

var tab = new TabView();
page.mainContent = tab;

var hilera = new HileraFactory(plantTest.getPlants());
hilera.evTabTitle = 'evaluadas';
hilera.NoEvTabTitle = 'no evaluadas';

var restriccion = ['57a8d8dfef44961377525d79', '57a8d8dfef44961377525d7a','57a8d8dfef44961377525d7b', '57a8d8dfef44961377525d7c'];
var evaluated =   ['57a8d8dfef44961377525d7d', '57a8d8dfef44961377525d7e', '57a8d8dfef44961377525d7f','57a8d8dfef44961377525d80'];


var evTab = new TabViewItem();
var evList = new List();
evList.items = hilera.evaluated;

evTab.title = hilera.evTabTitle;
evTab.view = evList.getView();

var noEvTab = new TabViewItem();
var noEvList = new List();
noEvList.items = hilera.noEvaluated;

noEvTab.title = hilera.NoEvTabTitle;
noEvTab.view = noEvList.getView();


tab.items = [noEvTab, evTab];

hilera.callbackOnChangeList = function(){
    evTab.title = hilera.evTabTitle;
    noEvTab.title = hilera.NoEvTabTitle;
}


/************** Action Bar ************** */
var actionItem = new ActionItem();
actionItem.text = "restriccion";
actionItem.android.position = "popup";
actionItem.on(ActionItem.tapEvent,(args:EventData)=>{
    hilera.idRestrictions = restriccion;
})

page.addActionItem(actionItem);

var actionItem2 = new ActionItem();
actionItem2.text = "revertir orden de lista";
actionItem2.android.position = "popup";
actionItem2.on(ActionItem.tapEvent,(args:EventData)=>{
    hilera.reverse();
})

page.addActionItem(actionItem2);

var actionItem3 = new ActionItem();
actionItem3.text = "ordenar";
actionItem3.android.position = "popup";
actionItem3.on(ActionItem.tapEvent,(args:EventData)=>{
    //hilera.sort();
})

page.addActionItem(actionItem3);

var actionItem4 = new ActionItem();
actionItem4.text = "evaluados";
actionItem4.android.position = "popup";
actionItem4.on(ActionItem.tapEvent,(args:EventData)=>{
    hilera.idEvaluated = evaluated;
})

page.addActionItem(actionItem4);

page.setTitleActionBar('Hilera test');
export = page;
