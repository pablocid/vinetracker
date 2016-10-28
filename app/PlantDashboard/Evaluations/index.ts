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

var ePage = new BasePage();
var evalList = new EvaluationListView();
ePage.fnOnLoad = function(){
    var context = new ContextFS();
    evalList.onLoadedPage();
    context.clean();
    evalList.callbackOnSelection = function(schema){
        console.log(schema.name)
        context.schema = schema;
        let opt = {
            moduleName:'PlantDashboard/Localization/index',
            clearHistory: false,
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeOut"
            }
        }
        Topmost().navigate(opt);
    }
}
ePage.mainContent = evalList.getView();
ePage.setTitleActionBar('Evaluaciones','lista de evaluaciones disponibles');


export = ePage;
