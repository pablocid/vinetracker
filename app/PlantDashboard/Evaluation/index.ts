import { PictureComponent } from '../Components/PictureComponent';
import { Record } from '../../factories/Record';
import { InfoComponent } from '../Components/InfoComponent';
import { SaveComponent } from '../Components/SaveComponent';
import { SaveRecord } from '../../services/RecordService';
import { Scanner } from '../Components/PlantScanner';
import { MultipleSelection } from '../Components/MultipleSelection';
import { NumberList } from '../Components/NumberList';
import { BaseComponent, BaseInputComponent } from '../Components/BaseComponent';
import { SimpleText } from '../Components/SimpleText';
import { SelectionList } from '../Components/SelectionList';
import { Context } from '../../factories/Context';
import { PlantTest } from '../../factories/DataTest';
import { BasePage } from '../../factories/BasePage';
import { TabView, TabViewItem } from "ui/tab-view";
import { ActionItem } from 'ui/action-bar';
import { topmost as Topmost } from 'ui/frame';
import { Page, ShownModallyData } from 'ui/page'
import { confirm as Confirm } from 'ui/dialogs';
import {Observable, EventData} from "data/observable";


var page = new BasePage();
var tab = new TabView();
page.mainContent = tab;
var context: Context;
var closeModal:any;
page.fnOnShownModally = function (args: ShownModallyData) {
    closeModal = args.closeCallback;
    console.log('----------------------------------------------------- fnOnShownModally')
    var newContext = <Context>args.context;
    console.log(newContext.plant.id);
    if (!newContext || !newContext.schema || !newContext.plant || !newContext.record) {
        args.closeCallback('error');
        return;
    }

    if (context && context.record && newContext.schema.id === context.schema.id && newContext.plant.id === context.plant.id) {
        console.log('Modal Same')
        return;
    } else {
        console.log('Modal Different')
        context = newContext;
        makeView(context);
    }

    function makeView(context:Context) {
        var plant = context.plant;
        var record = context.record;
        var schema = context.schema;
        var callbackSaveRecord = function () {
            context.record = record;
        }

        //**********************************

        var tabsItems = [];

        var infoComp = new InfoComponent();
        infoComp.nameEvaluation = schema.properties.listViewLabel;
        infoComp.ubicacion = plant.getUbicación();
        infoComp.evalDescription = schema.description;
        infoComp.codigos = plant.id + '\n' + plant.getAttribute('57c3583bc8307cd5b82f447d').value;

        var infoTab = new TabViewItem();
        infoTab.title = 'información';
        infoTab.view = infoComp.getView();
        tabsItems.push(infoTab);

        for (var index = 0; index < record.schema.listAttrIds.length; index++) {
            //5808de89832db50010d3192c
            let a = record.schema.listAttrIds[index];
            let item = new TabViewItem();
            let attr = record.getAttribute(a);

            if (!attr) { continue; };
            item.title = <string>attr.attrSchm.properties.shortName;

            let inputId = attr.attrSchm.inputRef;
            //console.log(a + ' => ' + inputId);
            var view: BaseInputComponent;
            switch (inputId) {
                //	selection_list
                case '57fe942a45be360010073dbc':
                    view = new SelectionList(record.getAttribute(a));
                    break;
                // simple_text
                case '57c3202cc8307cd5b82f4465':
                    view = new SimpleText(record.getAttribute(a));
                    break;
                //	NumberList
                case '5808d0fdd48d17001006e43b':
                    view = new NumberList(record.getAttribute(a));
                    break;
                //	MultipleSelection
                case '5808dc55832db50010d3192b':
                    view = new MultipleSelection(record.getAttribute(a));
                    break;
                //	Scann
                case '57c431d5c8307cd5b82f448a':
                    //view = new Scanner(record.getAttribute(a));
                    break;
                //fotos
                case '581a34e95c0eac001077ad6d':
                    view = new PictureComponent(record.getAttribute(a));
                    view.onChangeDataCallback = callbackSaveRecord;
                    break;
            }

            if (view) {
                item.view = view.getView();
                tabsItems.push(item);
            }
        }
        var saveComp = new SaveComponent();
        var saveTab = new TabViewItem();
        saveTab.title = 'guardar';
        saveTab.view = saveComp.getView();
        tabsItems.push(saveTab);

        saveComp.callback = function (ok) {
            if (!ok) {
                args.closeCallback();
            } else {
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

                    Confirm(options).then((result: boolean) => {
                        // result can be true/false/undefined
                        //console.log(result);
                        if (result) {
                            let saveRequest = new SaveRecord(record);
                            saveRequest.save().then(s => {
                                context =<Context>{};
                                args.closeCallback('ok', plant.id);
                            })
                        } else {
                            saveComp.toggleSaveBtn();
                            //args.closeCallback('error');
                        }
                    });
                }
            }
        }


        function attrValueChecker(record: Record) {
            let attrs = record.schema.listAttrIds;
            var list = [];
            for (var index = 0; index < attrs.length; index++) {
                var attr = attrs[index];
                let value = record.getAttribute(attr).value;
                if (value === undefined) {
                    list.push(record.getAttribute(attr).attrSchm.properties.shortName);
                }
            }
            if (list.length) {
                return 'Falta por registrar los siguientes atributos: \n\n\n' + list.join('\n------------------------\n') + '\n------------------------'
            } else {
                return '';
            }

        }

        tab.items = tabsItems;

    }

}/*********** end fnOnLoad ********************/

page.fnOnUnLoaded = function(args:EventData){
    context = <Context>{};
    var p = <Page>args.object;
    if(closeModal){
        closeModal();
    }
    p.closeModal();
    page.mainContent = new TabView();
}

export = page;