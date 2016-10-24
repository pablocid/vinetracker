"use strict";
var BasePage_1 = require('../../factories/BasePage');
var builder_1 = require('ui/builder');
var frame_1 = require('ui/frame');
var tab_view_1 = require('ui/tab-view');
var stack_layout_1 = require('ui/layouts/stack-layout');
var EvaluationReport_1 = require('../Components/EvaluationReport');
var PlantScanner_1 = require('../Components/PlantScanner');
/***test */
/*
var plantTest = new PlantTest();
var schmTest = plantTest.getSchm();
var context = new Context();
context.schema = schmTest;
*/
/*** */
var localization = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
localization.mainContent = tab;
localization.setTitleActionBar('Localización', 'Elige la hilera que quires evaluar');
/***************************onLoad ************************** */
localization.fnOnLoad = function () {
    var resumenView = new EvaluationReport_1.SumaryReport();
    /**************** tabitems: SCAN ********************/
    var scan = new tab_view_1.TabViewItem();
    scan.title = 'scan';
    var scanView = new PlantScanner_1.PlantScanner();
    scan.view = scanView.getView();
    /**************** tabitems: Ubicacion ********************/
    var ubicacion = new tab_view_1.TabViewItem();
    ubicacion.title = 'ubicación';
    var sl = new stack_layout_1.StackLayout();
    sl.addChild(builder_1.parse("\n<StackLayout>\n    <Label text=\"Localization\"></Label>\n</StackLayout>\n"));
    ubicacion.view = sl;
    /**************** tabitems: resumen ********************/
    var resumen = new tab_view_1.TabViewItem();
    resumen.title = 'resumen';
    resumen.view = resumenView.getView();
    tab.items = [scan /*, ubicacion, resumen*/];
    scanView.callback = function (plant) {
        var context = localization.page.navigationContext;
        context.plant = plant;
        var navOpts = {
            moduleName: 'PlantDashboard/HileraStatus/index',
            context: context
        };
        frame_1.topmost().navigate(navOpts);
    };
}; /*************************** END onLoad ************************** */
module.exports = localization;
//# sourceMappingURL=index.js.map