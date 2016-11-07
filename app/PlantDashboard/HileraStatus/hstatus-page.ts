import { ContextFS } from '../../factories/ContextFS';
import { FindForEvaluation, FindPlantIds } from '../../services/RecordService';
import { HileraComponent } from '../Components/HileraComponent';
import { Context } from '../../factories/Context';
import { Observable, EventData } from 'data/observable';
import { Page } from 'ui/page';
import { topmost as Topmost } from 'ui/frame';
import { StackLayout } from 'ui/layouts/stack-layout';


var hilera = new HileraComponent();
var findIds = new FindPlantIds();

var context: Context;

var record = new FindForEvaluation();
var page: Page;
var mainStack: StackLayout;


export function onLoaded(args: EventData) {
    console.log("login-page.onLoaded");
    page = <Page>args.object;
    //var newContext = <Context>args.object.navigationContext;
    let cFS: any = new ContextFS();
    var newContext = <Context>cFS;
    if (!newContext || contextChecker(newContext.schema, newContext.plant, newContext.hilera)) {
        console.log("Topmost().navigate('PlantDashboard/Evaluations/index');")
        Topmost().navigate('PlantDashboard/Evaluations/index');
        return;
    }

    if (
        context &&
        context.schema &&
        context.plant &&
        context.hilera &&
        context.schema.id === newContext.schema.id &&
        context.plant.hilera === newContext.plant.hilera &&
        context.plant.espaldera === newContext.plant.espaldera &&
        context.hilera.length === newContext.hilera.length
    ) {
        console.log('same')
        return;
    } else {
        context = newContext;
    }

    //titlePage.set('title', 'Ubicación E' + context.plant.espaldera + 'H' + context.plant.hilera);
    //titlePage.set('subTitle', context.schema.properties.listViewLabel + ' - En la hilera hay ' + context.hilera.length + ' plantas');

    hilera.mainList = context.hilera;

    //loader.show(options2);
    var evStop = false;

    findIds.getEvaluatedId(context.schema, context.plant).then(x => {
        evStop = true;
        stopLoader();
        if (x && x.length) { hilera.evaluatedItems = x; }
    });
    var rStop = false;
    findIds.getRestrictionIds(context.schema, context.plant).then(x => {
        rStop = true;
        stopLoader();
        if (x && x.length) { hilera.restrictionItems = x; }
    });

    function stopLoader() {
        if (evStop && rStop) {
            //loader.hide();
        }
    }



    hilera.evSelectItemCb = (i, item) => {
        onTapItem(i, item);
    };
    hilera.nonEvSelectItemCb = (i, item) => {
        onTapItem(i, item);
    };

    mainStack = page.getViewById<StackLayout>('mainContainer');
    mainStack.addChild(hilera.getView());


}

export function onUnloaded() {
    console.log("login-page.onUnloaded");
    context = <Context>{};
    mainStack.removeChildren();
    hilera.removeAllItems();
}

function onTapItem(i, item) {
    context.plant = item;
    console.log(context.plant.id);
    console.log(item.id)

    //loader.show(options);
    record.record(context.schema, item).then(d => {
        //loader.hide();
        context.record = d;

        var modalPageModule = 'PlantDashboard/Evaluation/evaluation-page';
        var fullscreen = true;
        page.showModal(modalPageModule, context, (status: string, id: string) => {
            page.closeModal();

            console.log('closeCallback');
            console.log('registro actualizado');
            console.log(status);
            console.log(id);
            hilera.evaluatedItems = [id];
        }, fullscreen);
    })
}

function contextChecker(schm, plant, hilera) {
    if (!schm || !plant || !hilera) {
        return true;
    } else {
        return false;
    }
}