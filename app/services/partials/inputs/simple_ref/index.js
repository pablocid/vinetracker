"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
var barcodescanner = require("nativescript-barcodescanner");
var observable_1 = require("data/observable");
/*** Loader *****/
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var RecordService = require("../../../record.service");
var dialogs = require("ui/dialogs");
function Scan(cb) {
    //cb('683(10).6');
    //cb('57a8d8dfef44961377526953');
    //frame.topmost().goBack();
    barcodescanner.hasCameraPermission().then(function (granted) {
        // if this is 'false' you probably want to call 'requestCameraPermission' now
        console.log("Has Camera Permission? ");
    });
    barcodescanner.scan({
        // Optionally limit scanning to certain types by passing in a formats property
        formats: "QR_CODE",
        // iOS only, default 'Close'
        cancelLabel: "Stop scanning",
        // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        message: "Escanea etiqueta",
        // Start with the front cam, if available. Android only, default false
        preferFrontCamera: false,
        // Render a button to switch between front and back cam. Android only, default false (on iOS it's always available)
        showFlipCameraButton: false,
        // Lock the orientation of the scan interface to either "landscape" or "portrait", default unset. Android only.
        orientation: "portrait"
    }).then(function (result) {
        cb(result.text);
        console.log("Scan format: " + result.format);
        console.log("Scan text:   " + result.text);
    }, function (error) {
        console.log("No scan: " + error);
    });
}
function TabViewBuilder(conf) {
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var a = builder.load({
        name: 'tabView',
        path: '~/services/partials/inputs/simple_ref'
    });
    a.bindingContext = {
        value: conf.record.getAttr(conf.attrId),
        description: conf.record.getAttrInputConf(conf.attrId, "label")
    };
    stack.orientation = "vertical";
    stack.addChild(a);
    console.log("return Stack");
    return stack;
}
exports.TabView = TabViewBuilder;
function TabViewEditBuilder(conf) {
    /*** Loader options*****/
    // optional options 
    var options = {
        message: 'check if record exist ...',
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
    /********** */
    var self = this;
    var stack = new stack_layout_1.StackLayout();
    var a = builder.load({
        name: 'editTabView',
        path: '~/services/partials/inputs/simple_ref',
    });
    var obs = new observable_1.Observable();
    var viewModel = new observable_1.Observable();
    viewModel.set("code", conf.record.getAttr(conf.attrId));
    viewModel.set("description", conf.record.getAttrInputConf(conf.attrId, "label"));
    viewModel.set("onScan", onScan);
    viewModel.set("loading", false);
    viewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (v) {
        conf.record.setAttr(conf.attrId, v.object.get("code"));
    });
    // si se identifica al registro por otro identificador que no sea _id
    if (true) {
        viewModel.set("code_indentify", "");
    }
    function onScan() {
        console.log("scaneo");
        Scan(function (c) {
            viewModel.set("loading", true);
            viewModel.set("code", "checking if record exist...");
            //identificado no _id
            if (true) {
                viewModel.set("code_indentify", c);
            }
            var config;
            /// si se escanea por _id
            if (/^[0-9a-f]{24}$/i.test(c)) {
                config = { id: c };
            }
            else {
                config = {
                    id: c,
                    query: {
                        schm: conf.record.getAttrAttr(conf.attrId, "schema_reference"),
                        key: conf.record.getAttrAttr(conf.attrId, "identifyByAttrId"),
                        datatype: "string"
                    }
                };
            }
            RecordService.FindOne(config)
                .then(function (res) {
                viewModel.set("loading", false);
                if (!res._id) {
                    viewModel.set("code", "No existe el registro en la base de datos");
                    console.log("No existe el registro en la base de datos");
                }
                var id = res._id;
                console.log("El codigo es : " + c);
                conf.record.setAttr(conf.attrId, id);
                console.log("conf.record.getAttr(conf.attrId):  " + conf.record.getAttr(conf.attrId));
                viewModel.set("code", id);
                //chechear si el registro ha sido ingresado
                var confCheck = {
                    id: id,
                    query: {
                        schm: conf.record.schm,
                        key: conf.attrId,
                        datatype: "reference"
                    }
                };
                console.log("conf.record.schm -- " + conf.record.schm);
                RecordService.FindOne(confCheck).then(function (x) {
                    console.log("ID del registro a ingresar: " + x._id);
                    if (x._id) {
                        dialogs.action("Esta planta ya a sido evaluada. Deseas evaluarla de nuevo?", "CANCELAR", ["SI", "NO"]).then(function (result) {
                            console.log("Dialog result: " + result);
                        });
                        viewModel.set("code", null);
                        viewModel.set("code_indentify", null);
                    }
                });
            })
                .then(function (da) {
                loader.hide();
            }, function (err) {
                loader.hide();
            });
        });
    }
    a.bindingContext = viewModel;
    stack.orientation = "vertical";
    stack.addChild(a);
    return stack;
}
exports.TabViewEdit = TabViewEditBuilder;
/*********************  ***********************/
exports.getView = function (conf) {
    var mode = conf.mode;
    var view;
    console.log("In getView: " + mode);
    switch (mode) {
        case 'TabView':
            view = TabViewBuilder(conf);
            break;
        case 'TabViewEdit':
            view = TabViewEditBuilder(conf);
            break;
        default:
            view = TabViewBuilder(conf);
    }
    return view;
};
//# sourceMappingURL=index.js.map