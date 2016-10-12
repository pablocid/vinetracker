"use strict";
var page_1 = require('ui/page');
var grid_layout_1 = require('ui/layouts/grid-layout');
var Inputs = require('../form/input-schemas/brix');
var SimpleText = require("../services/partials/inputs/simple_text");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var Frame = require('ui/frame');
var actionBarModule = require("ui/action-bar");
var ViewMaker = require("../services/ViewMaker.service");
var RecordService = require("../services/record.service");
var RecordFactory = require("../services/record.factory");
var theSchema = require("./evaluation-schm").Evaluacion();
//console.log(theSchema[0]._id)
// optional options 
var InputMatcher = require("../services/partials/inputMatcher.service");
function onNavigatedTo(args) {
    var loader = new LoadingIndicator();
    var options = {
        message: 'loading records...',
        progress: 0.65,
        android: {
            indeterminate: true,
            cancelable: false,
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        }
    };
    loader.show(options);
    var page = args.object;
    /********** TAB ITEMS *********** */
    var schm = page.navigationContext.schm;
    var _id = page.navigationContext._id;
    var elRecord;
    if (!schm && !_id) {
        console.log("el schema y el _id no estan seteado");
        Frame.topmost().goBack();
    }
    else {
        console.log("Evaluation-create schema: " + schm);
        var grid = new grid_layout_1.GridLayout();
        RecordService.createNewRecord(schm, _id)
            .then(function (d) {
            //enlazar un cb para guardar el registro;
            d.SaveCb = function () {
                //guarda y asigna el resultado a 
                RecordService.saveRecord(d).then(function (x) { return d._id = x._id; });
            };
            elRecord = d;
            return d;
        })
            .then(ViewMaker.TabViewEdit)
            .then(function (d) {
            loader.hide();
            grid.addChild(d);
        }, function (err) {
            loader.hide();
            console.log(err);
        });
    }
    /********** ACTION BAR *********** */
    var item = new actionBarModule.ActionItem();
    item.android.systemIcon = "ic_menu_save";
    item.on("tap", function () {
        console.log("tap de guardado");
        console.log(elRecord.SaveCb());
        var navigationOptions = {
            moduleName: 'evaluations/evaluation-create',
            context: {}
        };
        Frame.topmost().goBack();
        //Frame.topmost().navigate(navigationOptions);
    });
    page.actionBar.title = "Evaluación de grados brix";
    page.actionBar.actionItems.addItem(item);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    page.content = grid;
}
exports.createPage = function createPage() {
    var page = new page_1.Page();
    page._applyXmlAttribute('xmlns', "http://schemas.nativescript.org/tns.xsd");
    page.on(page_1.Page.navigatedToEvent, onNavigatedTo);
    return page;
};
//# sourceMappingURL=evaluation-create.js.map