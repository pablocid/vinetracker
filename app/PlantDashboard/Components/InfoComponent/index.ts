import {BaseComponent} from '../BaseComponent';
import { load as Load, LoadOptions } from 'ui/builder';

export class InfoComponent extends BaseComponent{

    constructor(){
        super();
        this._viewModel.set('description', 'Información del registro');
        this._theme.addChild(Load({ name:'theme', path:'~/PlantDashboard/Components/InfoComponent' }));
    }
    
    public set nameEvaluation(value:string){
        this._viewModel.set('evalName', value);
    }

    public get nameEvaluation():string{
        return this._viewModel.get('evalName');
    }

    public set evalDescription(value:string){
        this._viewModel.set('evalDescript', value);
    }

    public set ubicacion(value:string){
        this._viewModel.set('ubicacion', value);
    }

    public get ubicacion():string{
        return this._viewModel.get('ubicacion');
    }

    public set codigos (value:string){
        this._viewModel.set('codigos',value);
    }
    
}