"use strict";
var ContextFS_1 = require('../../factories/ContextFS');
var Hilera_1 = require('../../factories/Hilera');
var RecordService_1 = require('../../services/RecordService');
var List_1 = require('../Components/List');
var BasePage_1 = require('../../factories/BasePage');
var tab_view_1 = require("ui/tab-view");
var action_bar_1 = require('ui/action-bar');
var lodash = require('lodash');
/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
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
var tab = new tab_view_1.TabView();
hileraPage.mainContent = tab;
var desc = new action_bar_1.ActionItem();
desc.text = "orden descendente";
desc.android.position = "popup";
hileraPage.addActionItem(desc);
var asc = new action_bar_1.ActionItem();
asc.text = "orden ascendente";
asc.android.position = "popup";
hileraPage.addActionItem(asc);
//**************** *******************
function onload(args) {
    var loader = new LoadingIndicator();
    var contextFs = new ContextFS_1.ContextFS();
    hileraPage.setTitleActionBar('Ubicación E' + contextFs.plant.espaldera + 'H' + contextFs.plant.hilera);
    var hilera = new Hilera_1.HileraFactory(contextFs.hilera);
    hilera.evTabTitle = 'evaluadas';
    hilera.NoEvTabTitle = 'no evaluadas';
    desc.on('tap', function (x) {
        hilera.sort = 'desc';
    });
    asc.on('tap', function (x) {
        hilera.sort = 'asc';
    });
    //****************** EVALUADAS
    var evTab = new tab_view_1.TabViewItem();
    evTab.title = hilera.evTabTitle;
    var evList = new List_1.List();
    evList.items = hilera.evaluated;
    evTab.view = evList.getView();
    evList.callbackOnTap = function (index) {
        loader.show(options);
        //importante setear la planta porque desde ahí saca el ID y la Ubicación
        contextFs.plant = hilera.evaluated.getItem(index);
        var record = new RecordService_1.FindForEvaluation();
        record.record(contextFs.schema, contextFs.plant).then(function (d) {
            contextFs.record = d;
            loader.hide();
            var modalPageModule = 'PlantDashboard/Evaluation/index';
            var context = "some custom context";
            var fullscreen = true;
            hileraPage.page.showModal(modalPageModule, context, function (plant) {
                console.log('closeCallback');
                console.log('registro actualizado');
            }, fullscreen);
        });
    };
    //****************** NO EVALUADAS
    var noEvTab = new tab_view_1.TabViewItem();
    noEvTab.title = hilera.NoEvTabTitle;
    var noEvList = new List_1.List();
    noEvList.items = hilera.noEvaluated;
    noEvList.callbackOnTap = function (index) {
        loader.show(options);
        //importante setear la planta porque desde ahí saca el ID y la Ubicación
        contextFs.plant = hilera.noEvaluated.getItem(index);
        var record = new RecordService_1.FindForEvaluation();
        record.record(contextFs.schema, contextFs.plant).then(function (d) {
            contextFs.record = d;
            loader.hide();
            var modalPageModule = 'PlantDashboard/Evaluation/index';
            var context = "some custom context";
            var fullscreen = true;
            hileraPage.page.showModal(modalPageModule, context, function (plant) {
                if (plant) {
                    console.log('registro guardado. ID: ' + plant.id);
                    hilera.addEvaluated = plant.id;
                }
            }, fullscreen);
        });
    };
    noEvTab.view = noEvList.getView();
    //*********** set TabViewItems
    tab.items = [noEvTab, evTab];
    hilera.callbackOnChangeList = function () {
        evTab.title = hilera.evTabTitle;
        noEvTab.title = hilera.NoEvTabTitle;
    };
    var findIds = new RecordService_1.FindPlantIds();
    loader.show(options2);
    findIds.getEvaluatedId(contextFs.schema, contextFs.plant).then(function (x) {
        loader.hide();
        if (x && x.length) {
            hilera.idEvaluated = x;
        }
    });
    //if(!contextFs.allowedPlantsId && contextFs.schema.properties.restriction && contextFs.schema.properties.restriction.length){
    findIds.getRestrictionIds(contextFs.schema, contextFs.plant).then(function (x) {
        if (x && x.length) {
            hilera.idRestrictions = x;
            contextFs.allowedPlantsId = x;
        }
    });
    //}
} /**************** end onLoad ********************/
hileraPage.fnOnLoad = onload;
module.exports = hileraPage;
//# sourceMappingURL=index.js.map