var barcodescanner = require("nativescript-barcodescanner");
import Button = require('ui/button');
import {StackLayout} from 'ui/layouts/stack-layout';
import {TabViewItem} from "ui/tab-view";
import {ListView} from "ui/list-view";
import {Label} from 'ui/label';
import view = require("ui/core/view");
import xml = require("xml");
import builder = require("ui/builder");
exports.Scan = function Scan(conf) {
    var self = this;
    //Elements
    var scan = new Button.Button();
    scan.text = "Scan";
    scan.setInlineStyle("background-color:#1565C0; color:white; border-radius:60; margin-top:100; padding: 30;");
    scan.on('tap',function(){
        conf.cb('683(10).6');
        //conf.cb('57a8d8dfef44961377526953');
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
    var stacklayout = new StackLayout();
    stacklayout.addChild(scan);
    
    this.getView = function(){
        return stacklayout;
    }

}