import {BaseComponent} from '../BaseComponent';
import { load as Load, LoadOptions } from 'ui/builder';

export class SaveComponent extends BaseComponent{
    private _callback:any;
    constructor(){
        super();
        this._viewModel.set('description', 'Guardar registro');
        this._viewModel.set('onSave', ()=>{
            if(this._callback){
                console.log('on trigger callback')
                this._callback(true);
            }
        });
        this._viewModel.set('onCancel', ()=>{
            if(this._callback){
                console.log('on trigger callback')
                this._callback(false);
            }
        });

        this._theme.addChild(Load({ name:'theme', path:'~/PlantDashboard/Components/SaveComponent' }));
    }


	public get callback(): any {
		return this._callback;
	}

	public set callback(value: any) {
		this._callback = value;
	}
    
}