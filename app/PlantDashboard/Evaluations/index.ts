import {ContextFS} from '../../factories/ContextFS';
/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */

import { EventData } from 'data/observable';
import { topmost as Topmost } from 'ui/frame';
import { TabView, TabViewItem } from "ui/tab-view";
import { EvaluationListView } from '../Components/EvaluationList';
import { SumaryReport } from '../Components/EvaluationReport';
import { BasePage } from '../../factories/BasePage';
import { GridLayout } from 'ui/layouts/grid-layout';
import { StackLayout } from 'ui/layouts/stack-layout';
import { parse as Parse, load as Load } from 'ui/builder';
import fs = require("file-system");


var context = new ContextFS();

var evalListTab = new TabViewItem();
var evalList = new EvaluationListView();

var ePage = new BasePage();
ePage.fnOnLoad = function(){
    evalList.onLoadedPage();
}
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones','lista de evaluaciones disponibles');

evalList.callbackOnSelection = function(schema){
    context.schema = schema;
    Topmost().navigate('PlantDashboard/Localization/index');
}
export = ePage;
