import { View } from 'ui/core/view';
import { Observable, PropertyChangeData } from 'data/observable';
import { Record, Plant, Record2, RecordAttribute } from '../../../factories/Record';
import { Schema } from '../../../factories/Schema';
import { GridLayout, ItemSpec } from 'ui/layouts/grid-layout';

import { parse as Parse, load as Load } from 'ui/builder';
import { ListView , ItemEventData } from 'ui/list-view';
import { SelectionListAttrProps } from '../../../interfaces';

import {Color} from 'color';

import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import { RadListView } from 'nativescript-telerik-ui/listview';
var sdf =  require('nativescript-drop-down');

import { ObservableArray } from "data/observable-array";

export class BaseComponent {
    protected _viewModel:Observable;
    protected _theme:GridLayout;
    
    constructor(){
        this._viewModel = new Observable();
        this._theme = new GridLayout();
        this._theme.bindingContext = this._viewModel;
    }

    public  getView() : View {
        return this._theme;
    }
}

export class BaseInputComponent extends BaseComponent {
    protected _recordAttr : RecordAttribute;
    protected _properties : any;

    private _onChangeDataCallback:any;
    private _onSaveDataCallback:any;
    
    constructor(attr: RecordAttribute){
        super();
        this._recordAttr = attr;
        console.log(JSON.stringify(this._recordAttr.attrSchm.properties))
        this._properties = this._recordAttr.attrSchm.properties;
        this._viewModel.set('label',this._properties.label);
    }

    protected _callback (){
        if(this._onChangeDataCallback){ 
            this._onChangeDataCallback(); 
        }
    }

	public get onChangeDataCallback(): any {
		return this._onChangeDataCallback;
	}

	public set onChangeDataCallback(value: any) {
		this._onChangeDataCallback = value;
	}

	public get onSaveDataCallback(): any {
		return this._onSaveDataCallback;
	}

	public set onSaveDataCallback(value: any) {
		this._onSaveDataCallback = value;
	}
    
}
