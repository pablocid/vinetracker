import { View } from 'ui/core/view';
import { Observable } from 'data/observable';
import { RecordAttribute } from '../../../factories/Record';
import { GridLayout } from 'ui/layouts/grid-layout';

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
