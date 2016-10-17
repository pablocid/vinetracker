import {RecordAttribute} from '../../../factories/Record';
import {NumberListAttrProps} from '../../../interfaces';
import {BaseInputComponent} from '../BaseComponent';
import { parse as Parse, load as Load } from 'ui/builder';
import { Observable, PropertyChangeData , EventData} from 'data/observable';


export class NumberList extends BaseInputComponent{
    private _props: NumberListAttrProps;
    private _integers: number[];
    private _integersView: string[];
    private _float:number[];
    private _floatView:string[];
    private _unit:string[];

    constructor(attr: RecordAttribute){
        super(attr);
        this._props = <NumberListAttrProps>this._properties;
        this._setIntegers();
        this._setFloat();

        /*** template ***/
        var dropDown = Load({
            path:'~/PlantDashboard/Components/NumberList',
            name:'theme'
        });
        this._theme.addChild(dropDown);

        //change listener 
        this._onChange();

        this._setValue();
    }
    private _setIntegers(){
        this._integers = [];
        this._integersView = [];
        let min = this._props.minVal || 0;
        let max = this._props.maxVal || 10;
        for (var index = min; index <= max; index++) {
            let optView = index + ' ' + this._props.unit;
            this._integers.push(index);
            this._integersView.push(optView);
        }
        this._viewModel.set('integerItems',this._integers);
    }

    private _setFloat(){
        if(!this._props.floatOpt){ return;}

        this._float = [];
        this._floatView = [];
        this._viewModel.set('isItemVisible',true);

        switch(this._props.floatOpt){
            case 'even':
                this._setEvenFloat();
                break;
            case 'odd':
                this._setOddFloat();
                break;
            case 'half':
                this._setHalfFloat();
                break;
            case 'all':
                this._setAllFloat();
            default:
                this._setAllFloat();
        }

        this._viewModel.set('floatItems',this._floatView);
    }
    
    private _onChange(){
        this._viewModel.on(Observable.propertyChangeEvent, (args:PropertyChangeData)=>{
            if(args.propertyName==='intIndex' || args.propertyName==='floatIndex'){
                let iF = this._viewModel.get('floatIndex');
                let iI = this._viewModel.get('intIndex');

                this._recordAttr.value = this._mergeValue(iI, iF);
                this._viewModel.set('value',this._recordAttr.value+' '+this._props.unit);
                console.log(JSON.stringify(this._recordAttr.data));
            }
        });
    }
    private _setEvenFloat(){
        for (var i = 0; i < 10; i++) {
            if(i%2 === 0){
                this._float.push(i);
                this._floatView.push('.'+i);
            }
        }
    }

    private _setOddFloat(){
        for (var i = 0; i < 10; i++) {
            if(i%2 !== 0){
                this._float.push(i);
                this._floatView.push('.'+i);
            }
        }
    }

    private _setHalfFloat(){
        let h = [0, 5];
        this._float = h;
        this._floatView = h.map(x=>'.'+x);
    }

    private _mergeValue(int, float){
        let intValue = this._integers[int];
        let floatValue;
        if(this._float && this._float.length){
            floatValue = this._float[float];
        }

        if(floatValue){
            return parseFloat(intValue+'.'+floatValue);
        }else{
            return parseInt(intValue+'');
        }
    }

    private _setAllFloat(){
        for (var i = 0; i < 10; i++) {
            this._float.push(i);
            this._floatView.push('.'+i);
        }
    }
    private _setValue (){
        if(this._recordAttr.value === undefined){return;}
        let value = this._recordAttr.value;
        this._viewModel.set('value',value+' '+this._props.unit);

        //number to string and separate the dot portion
        let vArr = value.toString().split('.');

        let iInt:number;
        let iFloat:number;

        if(vArr.length >0 ){
            iInt = this._integers.indexOf(parseInt(vArr[0]));
            if(iInt !== -1){
                this._viewModel.set('intIndex', iInt)
            }
            if(vArr.length === 2){
                iFloat = this._float.indexOf(parseInt(vArr[1]));
                if(iFloat !==-1){
                    this._viewModel.set('floatIndex', iFloat);
                }
            }
        }

    }
}