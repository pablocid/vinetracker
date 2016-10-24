"use strict";
var Hilera_1 = require('../../factories/Hilera');
var NoEvaluated_1 = require('../Components/NoEvaluated');
var QueryParser_1 = require('../../factories/QueryParser');
var RecordService_1 = require('../../services/RecordService');
var List_1 = require('../Components/List');
var BasePage_1 = require('../../factories/BasePage');
var tab_view_1 = require("ui/tab-view");
var action_bar_1 = require('ui/action-bar');
var frame_1 = require('ui/frame');
var lodash = require('lodash');
/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var options = {
    message: 'preparando la evaluación ...',
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
/******************** */
var hileraPage = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
hileraPage.mainContent = tab;
/**************** ********************/
function onload() {
    var hileraC = new Hilera_1.Hilera();
    var evalTitle = 'evaluados';
    var noevTitle = 'no evaluados';
    var context = hileraPage.page.navigationContext;
    /**** for testing */
    /*
    var plantTest = new PlantTest();
    var context = new Context();
    context.plant = plantTest.getPlant();
    context.schema = plantTest.getSchm();
    */
    /**** */
    var esp = context.plant.getAttribute("5807af5f31f55d0010aaffe4").value;
    var hil = context.plant.getAttribute("5807af9231f55d0010aaffe5").value;
    var evalName = context.schema.description;
    hileraPage.setTitleActionBar('E' + esp + ' ' + 'H' + hil, evalName);
    hileraC.plant = context.plant;
    hileraC.schmEvaluation = context.schema;
    hileraC.restriction = context.schema.properties.restriction; //[{id:'schm', string:'57febcf1179c960010e41f66'}];
    var evTab = new tab_view_1.TabViewItem();
    var evaluados = new List_1.List();
    evTab.view = evaluados.getView();
    evTab.title = evalTitle;
    var noevTab = new tab_view_1.TabViewItem();
    var noevaluados = new NoEvaluated_1.NoEvaluated();
    noevTab.view = noevaluados.getView();
    noevTab.title = noevTitle;
    tab.items = [noevTab, evTab];
    /**********tap callbacks *****************/
    evaluados.callbackOnTap = function (index) {
        loader.show(options);
        //console.log(evaluados.items[index].name);
        context.plant = evaluados.items[index].plant;
        var qc = new QueryParser_1.QueryConfig();
        qc.id = context.plant.id;
        qc.schm = context.schema.id;
        qc.key = '57c42f77c8307cd5b82f4486';
        qc.datatype = 'reference';
        var req = new RecordService_1.FindRecord(qc);
        req.find().then(function (d) {
            context.record = d;
            loader.hide();
            frame_1.topmost().navigate({
                moduleName: 'PlantDashboard/Evaluation/index',
                context: context
            });
        });
    };
    noevaluados.callbackOnTap = function (index) {
        loader.show(options);
        //console.log(noevaluados.items[index].name);
        context.plant = noevaluados.items[index].plant;
        var qc = new QueryParser_1.QueryConfig();
        qc.id = context.plant.id;
        qc.schm = context.schema.id;
        qc.key = '57c42f77c8307cd5b82f4486';
        qc.datatype = 'reference';
        var req = new RecordService_1.FindRecord(qc);
        req.find().then(function (d) {
            context.record = d;
            loader.hide();
            frame_1.topmost().navigate({
                moduleName: 'PlantDashboard/Evaluation/index',
                context: context
            });
        });
    };
    evaluados.loading = true;
    noevaluados.loading = true;
    /********* */
    hileraC.getEvandNoev().then(function (r) {
        evaluados.items = r.evaluados;
        evTab.title = r.evaluados.length + ' ' + evalTitle;
        noevaluados.items = r.noEvaluados;
        noevTab.title = r.noEvaluados.length + ' ' + noevTitle;
        ///******
        evaluados.loading = false;
        noevaluados.loading = false;
    });
    /******** */
} /**************** end onLoad ********************/
hileraPage.fnOnLoad = onload;
var refresh = new action_bar_1.ActionItem();
refresh.text = "refresh";
refresh.android.position = "popup";
refresh.on('tap', function (x) {
    onload();
});
hileraPage.addActionItem(refresh);
module.exports = hileraPage;
//# sourceMappingURL=index.js.map