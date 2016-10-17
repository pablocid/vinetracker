"use strict";
var BasePage_1 = require('../../factories/BasePage');
var builder_1 = require('ui/builder');
var tab_view_1 = require('ui/tab-view');
var stack_layout_1 = require('ui/layouts/stack-layout');
var EvaluationReport_1 = require('../Components/EvaluationReport');
var PlantScanner_1 = require('../Components/PlantScanner');
var tab = new tab_view_1.TabView();
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
var resumen = new tab_view_1.TabViewItem();
resumen.title = 'resumen';
resumen.view = resumenView.getView();
tab.items = [scan, ubicacion, resumen];
var localization = new BasePage_1.BasePage();
localization.mainContent = tab;
localization.setTitleActionBar('Localización', 'Elige la hilera que quires evaluar');
module.exports = localization;
//# sourceMappingURL=index.js.map