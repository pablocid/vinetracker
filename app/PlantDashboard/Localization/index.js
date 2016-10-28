"use strict";
var RecordService_1 = require('../../services/RecordService');
var QueryParser_1 = require('../../factories/QueryParser');
var ContextFS_1 = require('../../factories/ContextFS');
var BasePage_1 = require('../../factories/BasePage');
var builder_1 = require('ui/builder');
var frame_1 = require('ui/frame');
var tab_view_1 = require('ui/tab-view');
var stack_layout_1 = require('ui/layouts/stack-layout');
var EvaluationReport_1 = require('../Components/EvaluationReport');
var PlantScanner_1 = require('../Components/PlantScanner');
/**
 * Loader indicator
 */
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var options = {
    message: 'cargando la hilera en el sistema ...',
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
var localization = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
localization.mainContent = tab;
localization.setTitleActionBar('Localización', 'Elige la hilera que quires evaluar');
/***************************onLoad ************************** */
localization.fnOnLoad = function () {
    var contextFS = new ContextFS_1.ContextFS();
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
    sl.addChild(builder_1.parse("\n    <StackLayout>\n        <Label text=\"Localization\"></Label>\n    </StackLayout>\n    "));
    ubicacion.view = sl;
    /**************** tabitems: resumen ********************/
    var resumen = new tab_view_1.TabViewItem();
    resumen.title = 'resumen';
    resumen.view = resumenView.getView();
    tab.items = [scan /*, ubicacion, resumen*/];
    function getMainList(plant) {
        var qc = new QueryParser_1.QueryConfig();
        qc.items = "300";
        qc.schm = "57a4e02ec830e2bdff1a1608";
        // filtero espaldera
        var filter_espaldera = new QueryParser_1.Filter();
        filter_espaldera.key = "5807af5f31f55d0010aaffe4";
        filter_espaldera.value = plant.getAttribute("5807af5f31f55d0010aaffe4").value;
        filter_espaldera.datatype = "number";
        // filtero hilera
        var filter_hilera = new QueryParser_1.Filter();
        filter_hilera.key = "5807af9231f55d0010aaffe5";
        filter_hilera.value = plant.getAttribute("5807af9231f55d0010aaffe5").value;
        filter_hilera.datatype = "number";
        qc.filter = [filter_espaldera, filter_hilera];
        var plants = new RecordService_1.FindPlants(qc);
        return plants.finds();
    }
    scanView.callback = function (plant) {
        loader.show(options);
        contextFS.plant = plant;
        console.log(contextFS.plant.id);
        getMainList(contextFS.plant).then(function (p) {
            contextFS.hilera = p;
            return p;
        }).then(function (x) {
            loader.hide();
            var opt = {
                moduleName: 'PlantDashboard/HileraStatus/index',
                clearHistory: false,
                animated: true,
                transition: {
                    name: "slide",
                    duration: 380,
                    curve: "easeOut"
                }
            };
            frame_1.topmost().navigate(opt);
        });
    };
}; /*************************** END onLoad ************************** */
module.exports = localization;
//# sourceMappingURL=index.js.map