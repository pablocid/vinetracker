"use strict";
var RecordService_1 = require('../../services/RecordService');
var SaveComponent_1 = require('../Components/SaveComponent');
var PictureComponent_1 = require('../Components/PictureComponent');
var MultipleSelection_1 = require('../Components/MultipleSelection');
var SimpleText_1 = require('../Components/SimpleText');
var NumberList_1 = require('../Components/NumberList');
var SelectionList_1 = require('../Components/SelectionList');
var InfoComponent_1 = require('../Components/InfoComponent');
var tab_view_1 = require("ui/tab-view");
var dialogs_1 = require('ui/dialogs');
var context;
var closeCallback;
var page;
var usernameTextField;
var passwordTextField;
var mainStack;
var Evaluation;
function onShownModally(args) {
    console.log("login-page.onShownModally, context: " + args.context);
    var newContext = args.context;
    if (context && context.record && newContext.schema.id === context.schema.id && newContext.plant.id === context.plant.id) {
        console.log('Modal Same');
        return;
    }
    else {
        console.log('Modal Different');
        context = newContext;
        Evaluation = makeView(args, context);
    }
    //closeCallback = args.closeCallback;
    page = args.object;
    mainStack = page.getViewById('mainContainer');
    /*
    mainStack.addChild(Parse(`
    <StackLayout>
        <TextField hint="username" id="username" automationText="username" text="username"/>
        <TextField hint="password" id="password" automationText="password" text="password" secure="true"/>
        <Button text="Login" tap="onLoginButtonTap"/>
    </StackLayout>
    `))
    */
    //usernameTextField = page.getViewById<textField.TextField>("username");
    //passwordTextField = page.getViewById<textField.TextField>("password");
    mainStack.addChild(Evaluation);
}
exports.onShownModally = onShownModally;
function onLoaded(args) {
    console.log("login-page.onLoaded");
    var p = args.object;
}
exports.onLoaded = onLoaded;
function onUnloaded() {
    console.log("login-page.onUnloaded");
    context = {};
}
exports.onUnloaded = onUnloaded;
function onLoginButtonTap() {
    console.log("login-page.onLoginButtonTap");
    closeCallback(usernameTextField.text, passwordTextField.text);
}
exports.onLoginButtonTap = onLoginButtonTap;
function makeView(args, context) {
    console.log('makeView calling...');
    var tab = new tab_view_1.TabView();
    var plant = context.plant;
    var record = context.record;
    var schema = context.schema;
    var callbackSaveRecord = function () {
        context.record = record;
    };
    //**********************************
    var tabsItems = [];
    var infoComp = new InfoComponent_1.InfoComponent();
    infoComp.nameEvaluation = schema.properties.listViewLabel;
    infoComp.ubicacion = plant.getUbicación();
    infoComp.evalDescription = schema.description;
    infoComp.codigos = plant.id + '\n' + plant.getAttribute('57c3583bc8307cd5b82f447d').value;
    var infoTab = new tab_view_1.TabViewItem();
    infoTab.title = 'información';
    infoTab.view = infoComp.getView();
    tabsItems.push(infoTab);
    for (var index = 0; index < record.schema.listAttrIds.length; index++) {
        //5808de89832db50010d3192c
        var a = record.schema.listAttrIds[index];
        var item = new tab_view_1.TabViewItem();
        var attr = record.getAttribute(a);
        if (!attr) {
            continue;
        }
        ;
        item.title = attr.attrSchm.properties.shortName;
        var inputId = attr.attrSchm.inputRef;
        //console.log(a + ' => ' + inputId);
        var view;
        switch (inputId) {
            //	selection_list
            case '57fe942a45be360010073dbc':
                view = new SelectionList_1.SelectionList(record.getAttribute(a));
                break;
            // simple_text
            case '57c3202cc8307cd5b82f4465':
                view = new SimpleText_1.SimpleText(record.getAttribute(a));
                break;
            //	NumberList
            case '5808d0fdd48d17001006e43b':
                view = new NumberList_1.NumberList(record.getAttribute(a));
                break;
            //	MultipleSelection
            case '5808dc55832db50010d3192b':
                view = new MultipleSelection_1.MultipleSelection(record.getAttribute(a));
                break;
            //	Scann
            case '57c431d5c8307cd5b82f448a':
                //view = new Scanner(record.getAttribute(a));
                break;
            //fotos
            case '581a34e95c0eac001077ad6d':
                view = new PictureComponent_1.PictureComponent(record.getAttribute(a));
                view.onChangeDataCallback = callbackSaveRecord;
                break;
        }
        if (view) {
            item.view = view.getView();
            tabsItems.push(item);
        }
    }
    var saveComp = new SaveComponent_1.SaveComponent();
    var saveTab = new tab_view_1.TabViewItem();
    saveTab.title = 'guardar';
    saveTab.view = saveComp.getView();
    tabsItems.push(saveTab);
    saveComp.callback = function (ok) {
        if (!ok) {
            args.closeCallback();
        }
        else {
            if (args.closeCallback) {
                record.getAttribute("57c42f77c8307cd5b82f4486").value = plant.id;
                record.espaldera = plant.espaldera;
                record.hilera = plant.hilera;
                record.posicion = plant.position;
                console.log(JSON.stringify(record.data));
                var options = {
                    title: "Guardando el registro ...",
                    message: "Estas seguro de guarda el registro?. " + attrValueChecker(record),
                    okButtonText: "Si",
                    cancelButtonText: "No",
                    neutralButtonText: "Cancelar"
                };
                dialogs_1.confirm(options).then(function (result) {
                    // result can be true/false/undefined
                    //console.log(result);
                    if (result) {
                        var saveRequest = new RecordService_1.SaveRecord(record);
                        saveRequest.save().then(function (s) {
                            context = {};
                            args.closeCallback('ok', plant.id);
                        });
                    }
                    else {
                        args.closeCallback('error');
                    }
                });
            }
        }
    };
    function attrValueChecker(record) {
        var attrs = record.schema.listAttrIds;
        var list = [];
        for (var index = 0; index < attrs.length; index++) {
            var attr = attrs[index];
            var value = record.getAttribute(attr).value;
            if (value === undefined) {
                list.push(record.getAttribute(attr).attrSchm.properties.shortName);
            }
        }
        if (list.length) {
            return 'Falta por registrar los siguientes atributos: \n\n\n' + list.join('\n------------------------\n') + '\n------------------------';
        }
        else {
            return '';
        }
    }
    tab.items = tabsItems;
    return tab;
}
//# sourceMappingURL=evaluation-page.js.map