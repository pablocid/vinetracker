"use strict";
var barcodescanner = require("nativescript-barcodescanner");
var Button = require('ui/button');
var stack_layout_1 = require('ui/layouts/stack-layout');
var tab_view_1 = require("ui/tab-view");
var list_view_1 = require("ui/list-view");
var label_1 = require('ui/label');
var view = require("ui/core/view");
var builder = require("ui/builder");
exports.Scan = function Scan(conf) {
    var self = this;
    //conf.cb('683(10).6');
    //Elements
    var scan = new Button.Button();
    scan.text = "Scan";
    scan.setInlineStyle("background-color:#1565C0; color:white; border-radius:60; margin-top:100; padding: 30;");
    scan.on('tap', function () {
        conf.cb('683(10).6');
        /*
                //frame.topmost().goBack();
                barcodescanner.hasCameraPermission().then(
                    function(granted) {
                    // if this is 'false' you probably want to call 'requestCameraPermission' now
                    console.log("Has Camera Permission? ");
                    }
                );
        
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
                }).then(
                    function(result) {
                        conf.observable.set('idCode', result.text);
                        conf.cb(result.text);
                        console.log("Scan format: " + result.format);
                        console.log("Scan text:   " + result.text);
                    },
                    function(error) {
                        console.log("No scan: " + error);
                    }
                )
        */
    });
    //Layout
    var stacklayout = new stack_layout_1.StackLayout();
    stacklayout.addChild(scan);
    //TabItem
    var tabItem = new tab_view_1.TabViewItem();
    tabItem.title = "QR";
    tabItem.view = stacklayout;
    this.getView = function () {
        return tabItem;
    };
};
exports.Info = function Info(conf) {
    var self = this;
    // list
    var listView = new list_view_1.ListView();
    listView.on("itemLoadingEvent", function (args) {
        console.log("itemLoadingEvent Triggerd");
    });
    var btn = new label_1.Label();
    btn.text = "HOLA";
    var stk = new stack_layout_1.StackLayout();
    //stk.addChild(btn);
    var v = new view.View();
    var a = builder.parse("\n        <GridLayout columns=\"auto, *\">\n            <Label text=\"{{ description }}\" col=\"0\"/>\n            <Label text=\"{{ value }}\" col=\"1\"/>\n        </GridLayout>\n    ");
    var b = builder.load({
        name: 'my',
        path: '~/form/input-schemas'
    });
    //stk.addChild(b);
    b.bindingContext = { description: "Una Descripcion : -  - ", value: " Un buen valor" };
    listView.itemTemplate = "\n        <GridLayout columns=\"auto, *\">\n            <Label text=\"{{ description }}\" col=\"0\"/>\n            <Label text=\"{{ value }}\" col=\"1\"/>\n        </GridLayout>\n    ";
    listView.items = conf.observable.get('record');
    //TabItem
    var tabItem = new tab_view_1.TabViewItem();
    tabItem.title = conf.title;
    tabItem.view = b; //listView;
    this.getView = function () {
        return tabItem;
    };
};
//# sourceMappingURL=brix.js.map