"use strict";
var stack_layout_1 = require('ui/layouts/stack-layout');
var builder = require("ui/builder");
var barcodescanner = require("nativescript-barcodescanner");
var observable_1 = require("data/observable");
/*** Loader *****/
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var RecordService = require("../../../record.service");
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
exports.TabView = function (conf) {
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
    this.getView = function () {
        return stack;
    };
};
exports.EditView = function (conf) {
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
    var enteros = [];
    for (var i = 1; i <= 30; i++) {
        enteros.push(i);
    }
    var obs = new observable_1.Observable();
    var viewModel = new observable_1.Observable();
    viewModel.set("code", conf.record.getAttr(conf.attrId));
    viewModel.set("description", conf.record.getAttrInputConf(conf.attrId, "label"));
    viewModel.set("onScan", onScan);
    viewModel.set("loading", false);
    obs.set("code", "as");
    function onScan() {
        console.log("scaneo");
        Scan(function (c) {
            viewModel.set("loading", true);
            viewModel.set("code", "checking if record exist...");
            var config = {
                id: c,
                query: {
                    schm: "57a4e02ec830e2bdff1a1608",
                    key: "57c3583bc8307cd5b82f447d",
                    datatype: "string"
                }
            };
            RecordService.FindOne(config)
                .then(function (res) {
                viewModel.set("loading", false);
                if (res._id) {
                    viewModel.set("code", "No existe el registro en la base de datos");
                    console.log("No existe el registro en la base de datos");
                }
                var id = res._id;
                console.log("El codigo es : " + c);
                conf.record.setAttr(conf.attrId, id);
                console.log("conf.record.getAttr(conf.attrId):  " + conf.record.getAttr(conf.attrId));
                viewModel.set("code", id);
            })
                .then(function (da) {
                loader.hide();
            }, function (err) {
                loader.hide();
            });
        });
    }
    a.bindingContext = viewModel;
    var sdf = {
        description: conf.record.getAttrInputConf(conf.attrId, "label"),
        onScan: onScan,
        code: obs.get("code")
    };
    stack.orientation = "vertical";
    stack.addChild(a);
    this.getView = function () {
        return stack;
    };
};
//# sourceMappingURL=index.js.map