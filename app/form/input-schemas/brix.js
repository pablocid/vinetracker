var barcodescanner = require("nativescript-barcodescanner");
var Button = require('ui/button');
var StackLayout = require('ui/layouts/stack-layout');
var TabViewModule = require("ui/tab-view");
var ListViewModule = require("ui/list-view");


exports.Scan = function Scan(conf) {
    var self = this;
    conf.cb('683(10).6');
    //Elements
    var scan = new Button.Button();
    scan.text = "Scan";
    scan.setInlineStyle("background-color:green; color:white; border-radius:50; margin-top:70; padding: 20;");
/*
    scan.on('tap',function(){
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

    });
    */
    //Layout
    var stacklayout = new StackLayout.StackLayout();
    stacklayout.addChild(scan);
    
    //TabItem
    var tabItem = new TabViewModule.TabViewItem();
    tabItem.title ="QR";
    tabItem.view = stacklayout;

    this.getView = function(){
        return tabItem;
    }

}

exports.Info = function Info(conf) {
    var self = this;

    // list
    var listView = new ListViewModule.ListView();

    listView.on("itemLoadingEvent", function (args) {
        console.log("itemLoadingEvent Triggerd")

    });
    
    listView.items = conf.observable.get('record');
    //TabItem
    var tabItem = new TabViewModule.TabViewItem();
    tabItem.title ="Info";
    tabItem.view = listView;

    this.getView = function(){
        return tabItem;
    }

}