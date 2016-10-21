import {AttrProps} from '../../../interfaces';
import {RecordAttribute} from '../../../factories/Record';
import {BaseComponent, BaseInputComponent} from '../BaseComponent';
import { parse as Parse, load as Load } from 'ui/builder';
import { Observable, PropertyChangeData } from 'data/observable';



export class SimpleText extends BaseInputComponent{
    private _props: AttrProps;
    constructor(attr: RecordAttribute){
        super(attr);
        this._props = <AttrProps>this._properties;
        let viewTemplate =  Load({
            path:'~/PlantDashboard/Components/SimpleText',
            name:'theme'
        });
        this._theme.addChild(viewTemplate);
        this._viewModel.set('label', this._props.label);
        this._viewModel.set('value', this._recordAttr.value);
        this._viewModel.on(Observable.propertyChangeEvent, (x : PropertyChangeData)=>{
            if(x.propertyName === 'value'){
                this._recordAttr.value = x.value || '';
            }
        });
    }
}