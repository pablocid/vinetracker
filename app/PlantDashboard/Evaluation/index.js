"use strict";
var InfoComponent_1 = require('../Components/InfoComponent');
var SaveComponent_1 = require('../Components/SaveComponent');
var ContextFS_1 = require('../../factories/ContextFS');
var RecordService_1 = require('../../services/RecordService');
var MultipleSelection_1 = require('../Components/MultipleSelection');
var NumberList_1 = require('../Components/NumberList');
var SimpleText_1 = require('../Components/SimpleText');
var SelectionList_1 = require('../Components/SelectionList');
var BasePage_1 = require('../../factories/BasePage');
var tab_view_1 = require("ui/tab-view");
var action_bar_1 = require('ui/action-bar');
var frame_1 = require('ui/frame');
var dialogs_1 = require('ui/dialogs');
var page = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
page.mainContent = tab;
var save = new action_bar_1.ActionItem();
page.addActionItem(save);
page.fnOnShownModally = function (args) {
    //args.closeCallback
    var context = new ContextFS_1.ContextFS();
    var plant = context.plant;
    var record = context.record;
    var schema = context.schema;
    //**********************************
    save.android.systemIcon = 'ic_menu_save';
    save.on('tap', function (x) {
        record.getAttribute("57c42f77c8307cd5b82f4486").value = plant.id;
        record.espaldera = plant.espaldera;
        record.hilera = plant.hilera;
        record.posicion = plant.position;
        console.log(JSON.stringify(record.data));
        var saveRequest = new RecordService_1.SaveRecord(record);
        saveRequest.save().then(function (s) {
            console.log('Saved ....');
            console.log(JSON.stringify(s));
            //args.closeCallback(plant);
            frame_1.topmost().navigate('PlantDashboard/HileraStatus/index');
        });
    });
    var tabsItems = [];
    var infoComp = new InfoComponent_1.InfoComponent();
    infoComp.nameEvaluation = schema.name;
    infoComp.ubicacion = plant.getUbicación();
    var infoTab = new tab_view_1.TabViewItem();
    infoTab.title = 'info';
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
        console.log(a + ' => ' + inputId);
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
                    console.log(result);
                    if (result) {
                        //args.closeCallback(plant);
                        var saveRequest = new RecordService_1.SaveRecord(record);
                        saveRequest.save().then(function (s) {
                            args.closeCallback(plant);
                        });
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
            return 'Falta por registrar los siguientes atributos: \n' + list.join('\n');
        }
        else {
            return '';
        }
    }
    tab.items = tabsItems;
    page.setTitleActionBar(plant.getUbicación(), record.schema.schm.name);
}; /*********** end fnOnLoad ********************/
module.exports = page;
//# sourceMappingURL=index.js.map