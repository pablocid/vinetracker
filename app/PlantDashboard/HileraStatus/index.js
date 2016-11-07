"use strict";
var HileraComponent_1 = require('../Components/HileraComponent');
var RecordService_1 = require('../../services/RecordService');
var BasePage_1 = require('../../factories/BasePage');
var action_bar_1 = require('ui/action-bar');
var frame_1 = require('ui/frame');
var observable_1 = require('data/observable');
var lodash = require('lodash');
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
function contextChecker(schm, plant, hilera) {
    if (!schm) {
        console.log('undefined schm');
    }
    if (!plant) {
        console.log('undefined plant');
    }
    if (!hilera) {
        console.log('undefined hilera');
    }
    if (!schm || !plant || !hilera) {
        return true;
    }
    else {
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
var hileraPage = new BasePage_1.BasePage();
var titlePage = new observable_1.Observable();
titlePage.set('title', 'loading ...');
titlePage.set('subTitle', 'loading ...');
hileraPage.setTitleActionBar('ok', 'ok', titlePage);
//************** ActionItems **************
var desc = new action_bar_1.ActionItem();
desc.text = "orden descendente";
desc.android.position = "popup";
desc.on(action_bar_1.ActionItem.tapEvent, function () {
    hilera.setOrder('desc');
});
hileraPage.addActionItem(desc);
var asc = new action_bar_1.ActionItem();
asc.text = "orden ascendente";
asc.android.position = "popup";
asc.on(action_bar_1.ActionItem.tapEvent, function () {
    hilera.setOrder('asc');
});
hileraPage.addActionItem(asc);
//************** END: ActionItems **************
var hilera = new HileraComponent_1.HileraComponent();
hileraPage.mainContent = hilera.getView();
var findIds = new RecordService_1.FindPlantIds();
var context;
var record = new RecordService_1.FindForEvaluation();
var page;
console.log('Creating hilera status page ...........................');
hileraPage.fnOnLoad = function (args) {
    var c = args.object.navigationContext;
    console.log('schema : ------------------------ ' + c.schema.id);
    console.log('plant : ------------------------ ' + c.plant.id);
    console.log('hilera : ------------------------ ' + c.plant.hilera);
    console.log('hilera length : ------------------------ ' + c.hilera.length);
    load(c);
}; //************* end fnOnLoad *****************************************
function load(newContext) {
    if (!newContext) {
        console.log('undefined newContext');
    }
    if (!newContext || contextChecker(newContext.schema, newContext.plant, newContext.hilera)) {
        console.log("Topmost().navigate('PlantDashboard/Evaluations/index');");
        frame_1.topmost().navigate('PlantDashboard/Evaluations/index');
        return;
    }
    if (context) {
        console.log('context.schema.id === newContext.schema.id ' + (context.schema.id === newContext.schema.id) + '  ' + context.schema.id + ' vs ' + newContext.schema.id);
        console.log('context.plant.hilera === newContext.plant.hilera ' + (context.plant.hilera === newContext.plant.hilera) + ' ' + context.plant.hilera + ' vs ' + newContext.plant.hilera);
        console.log('context.plant.espaldera === newContext.plant.espaldera ' + (context.plant.espaldera === newContext.plant.espaldera) + ' ' + context.plant.espaldera + ' vs ' + newContext.plant.espaldera);
        console.log('context.hilera.length === newContext.hilera.length ' + (context.hilera.length === newContext.hilera.length) + '   ' + context.hilera.length + ' vs ' + newContext.hilera.length);
    }
    if (context &&
        context.schema.id === newContext.schema.id &&
        context.plant.hilera === newContext.plant.hilera &&
        context.plant.espaldera === newContext.plant.espaldera &&
        context.hilera.length === newContext.hilera.length) {
        console.log('same');
        return;
    }
    else {
        console.log('not the same');
        context = lodash.clone(newContext, true);
        hilera.removeAllItems();
    }
    titlePage.set('title', 'Ubicación E' + context.plant.espaldera + 'H' + context.plant.hilera);
    titlePage.set('subTitle', context.schema.properties.listViewLabel + ' - En la hilera hay ' + context.hilera.length + ' plantas');
    hilera.mainList = context.hilera;
    loader.show(options2);
    var evStop = false;
    findIds.getEvaluatedId(context.schema, context.plant).then(function (x) {
        evStop = true;
        stopLoader();
        if (x && x.length) {
            hilera.evaluatedItems = x;
        }
    });
    var rStop = false;
    findIds.getRestrictionIds(context.schema, context.plant).then(function (x) {
        rStop = true;
        stopLoader();
        if (x && x.length) {
            hilera.restrictionItems = x;
        }
    });
    function stopLoader() {
        if (evStop && rStop) {
            loader.hide();
        }
    }
}
hilera.evSelectItemCb = function (i, item) {
    onTapItem(i, item);
};
hilera.nonEvSelectItemCb = function (i, item) {
    onTapItem(i, item);
};
function onTapItem(i, item) {
    context.plant = item;
    console.log(context.plant.id);
    console.log(item.id);
    loader.show(options);
    record.record(context.schema, item).then(function (d) {
        loader.hide();
        context.record = d;
        var modalPageModule = 'PlantDashboard/Evaluation/evaluation-page';
        var fullscreen = true;
        page.showModal(modalPageModule, context, function (status, id) {
            page.closeModal();
            console.log('closeCallback');
            console.log('registro actualizado');
            console.log(status);
            console.log(id);
            hilera.evaluatedItems = [id];
        }, fullscreen);
    });
}
hileraPage.fnOnUnLoaded = function () {
    //context = <Context>{};
};
hileraPage.setMainContent();
function createPage() {
    return hileraPage.page;
}
exports.createPage = createPage;
//# sourceMappingURL=index.js.map