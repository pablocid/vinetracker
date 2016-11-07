import { Record } from '../../factories/Record';
import { SaveRecord } from '../../services/RecordService';
import { SaveComponent } from '../Components/SaveComponent';
import { PictureComponent } from '../Components/PictureComponent';
import { MultipleSelection } from '../Components/MultipleSelection';
import { SimpleText } from '../Components/SimpleText';
import { NumberList } from '../Components/NumberList';
import { SelectionList } from '../Components/SelectionList';
import { BaseInputComponent } from '../Components/BaseComponent';
import { InfoComponent } from '../Components/InfoComponent';
import { Context } from '../../factories/Context';
import { Page, ShownModallyData } from 'ui/page';
import textField = require("ui/text-field");
import observable = require("data/observable");
import { StackLayout } from 'ui/layouts/stack-layout';
import { GridLayout } from 'ui/layouts/grid-layout';
import { ScrollView } from 'ui/scroll-view';
import { parse as Parse, load as Load } from 'ui/builder';
import { TabView, TabViewItem } from "ui/tab-view";
import { confirm as Confirm } from 'ui/dialogs';


var context: Context;
var closeCallback: Function;

var page: Page;
var usernameTextField: textField.TextField;
var passwordTextField: textField.TextField;
var mainStack: StackLayout;
var Evaluation: TabView;

console.log('Creating modal page ............................................')

export function onShownModally(args: ShownModallyData) {
    console.log("login-page.onShownModally, context: " + args.context);
    var newContext = <Context>args.context;
    if (context && context.record && newContext.schema.id === context.schema.id && newContext.plant.id === context.plant.id) {
        console.log('Modal Same')
        return;
    } else {
        console.log('Modal Different')
        context = newContext;
        Evaluation = makeView(args, context);
    }

    //closeCallback = args.closeCallback;

    page = <Page>args.object;
    mainStack = page.getViewById<StackLayout>('mainContainer');
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

export function onLoaded(args: observable.EventData) {
    console.log("login-page.onLoaded");
    var p = <Page>args.object;

}

export function onUnloaded() {
    console.log("login-page.onUnloaded");
    context = <Context>{};
}

export function onLoginButtonTap() {
    console.log("login-page.onLoginButtonTap");
    closeCallback(usernameTextField.text, passwordTextField.text);
}

function makeView(args, context: Context): TabView {
    console.log('makeView calling...');
    var tab = new TabView();
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
                            context = <Context>{};
                            args.closeCallback('ok', plant.id);
                        })
                    } else {
                        args.closeCallback('error');
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
    return tab;

}