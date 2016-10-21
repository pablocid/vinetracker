import {BaseComponent} from '../BaseComponent';
import { parse as Parse, load as Load, LoadOptions } from 'ui/builder';

export class List extends BaseComponent{
    private _callbackOnTap:any;

    constructor(){
        super();
        this._viewModel.set('selectedOption', x=>{
            this._onTap(x.index);
        });
        this._theme.addChild(Load({
            path:'~/PlantDashboard/Components/List',
            name:'theme'
        }))

    }
    public set items (value: any[]){
        this._viewModel.set('items', value)
    }
    public get items ():any[]{
        return this._viewModel.get('items');
    }
    private _onTap(index){
        if(this._callbackOnTap){
            this._callbackOnTap(index);
        }
    }

	public get loading(): boolean {
		return this._viewModel.get('loading');
	}

	public set loading(value: boolean) {
		this._viewModel.set('loading',value);
	}
    

	public get callbackOnTap(): any {
		return this._callbackOnTap;
	}

	public set callbackOnTap(value: any) {
		this._callbackOnTap = value;
	}
    
}