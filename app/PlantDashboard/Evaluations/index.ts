import { Context } from '../../factories/Context';
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
import { Page } from 'ui/page';

import { GC } from 'utils/utils'


var ePage = new BasePage();
var evalList = new EvaluationListView();
var context: Context;
console.log('creando la pagina')
ePage.fnOnLoad = function (args: EventData) {
    var page = <Page>args.object;
    context = <Context>page.navigationContext;
    if (!context) {
        context = new Context();
    }
    evalList.onLoadedPage();
}
evalList.callbackOnSelection = function (schema) {
    console.log('schema.name:--------------------------->  ' + schema.name)
    context.schema = schema;
    let opt = {
        moduleName: 'PlantDashboard/Localization/index',
        context: context,
        clearHistory: false,
        animated: false,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeOut"
        }
    }
    Topmost().navigate(opt);
}

ePage.mainContent = evalList.getView();

ePage.setTitleActionBar('Evaluaciones', 'lista de evaluaciones disponibles');

//ePage.setMainContent();
//export = ePage;
export function createPage() {
    return ePage.page;
}