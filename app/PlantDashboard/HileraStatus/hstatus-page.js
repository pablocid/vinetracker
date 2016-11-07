"use strict";
var ContextFS_1 = require('../../factories/ContextFS');
var RecordService_1 = require('../../services/RecordService');
var HileraComponent_1 = require('../Components/HileraComponent');
var frame_1 = require('ui/frame');
var hilera = new HileraComponent_1.HileraComponent();
var findIds = new RecordService_1.FindPlantIds();
var context;
var record = new RecordService_1.FindForEvaluation();
var page;
var mainStack;
function onLoaded(args) {
    console.log("login-page.onLoaded");
    page = args.object;
    //var newContext = <Context>args.object.navigationContext;
    var cFS = new ContextFS_1.ContextFS();
    var newContext = cFS;
    if (!newContext || contextChecker(newContext.schema, newContext.plant, newContext.hilera)) {
        console.log("Topmost().navigate('PlantDashboard/Evaluations/index');");
        frame_1.topmost().navigate('PlantDashboard/Evaluations/index');
        return;
    }
    if (context &&
        context.schema &&
        context.plant &&
        context.hilera &&
        context.schema.id === newContext.schema.id &&
        context.plant.hilera === newContext.plant.hilera &&
        context.plant.espaldera === newContext.plant.espaldera &&
        context.hilera.length === newContext.hilera.length) {
        console.log('same');
        return;
    }
    else {
        context = newContext;
    }
    //titlePage.set('title', 'Ubicación E' + context.plant.espaldera + 'H' + context.plant.hilera);
    //titlePage.set('subTitle', context.schema.properties.listViewLabel + ' - En la hilera hay ' + context.hilera.length + ' plantas');
    hilera.mainList = context.hilera;
    //loader.show(options2);
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
        }
    }
    hilera.evSelectItemCb = function (i, item) {
        onTapItem(i, item);
    };
    hilera.nonEvSelectItemCb = function (i, item) {
        onTapItem(i, item);
    };
    mainStack = page.getViewById('mainContainer');
    mainStack.addChild(hilera.getView());
}
exports.onLoaded = onLoaded;
function onUnloaded() {
    console.log("login-page.onUnloaded");
    context = {};
    mainStack.removeChildren();
    hilera.removeAllItems();
}
exports.onUnloaded = onUnloaded;
function onTapItem(i, item) {
    context.plant = item;
    console.log(context.plant.id);
    console.log(item.id);
    //loader.show(options);
    record.record(context.schema, item).then(function (d) {
        //loader.hide();
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
function contextChecker(schm, plant, hilera) {
    if (!schm || !plant || !hilera) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=hstatus-page.js.map