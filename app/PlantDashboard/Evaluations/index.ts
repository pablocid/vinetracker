/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */

import { EventData } from 'data/observable';
import { topmost as Topmost } from 'ui/frame';
import { TabView, TabViewItem } from "ui/tab-view";
import { EvaluationListView } from '../Components/EvaluationList';
import { SumaryReport } from '../Components/EvaluationReport';
import { BasePage } from '../../factories/BasePage';

var tab = new TabView();

var evalListTab = new TabViewItem();
var sumaryTab = new TabViewItem();

var evalList = new EvaluationListView();
var sumary = new SumaryReport();

evalListTab.title = "Evaluaciones";
evalListTab.view = evalList.getView();

sumaryTab.title = "Resumen";
sumaryTab.view = sumary.getView();

tab.items = [evalListTab, sumaryTab];

var ePage = new BasePage();
ePage.mainContent = tab;
ePage.setTitleActionBar('Evaluaciones','lista de evaluaciones disponibles');
export = ePage;
