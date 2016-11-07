import {AttrProps, ListOptionObject, SelectionListAttrProps} from '../../../interfaces';
import { BaseInputComponent } from '../BaseComponent';
import { Observable, PropertyChangeData } from 'data/observable';
import { ObservableArray, ChangedData } from "data/observable-array";
import { RecordAttribute } from '../../../factories/Record';
import { parse as Parse, load as Load } from 'ui/builder';
import { ItemEventData } from 'ui/list-view';


export class MultipleSelection extends BaseInputComponent {
    private _options: ObservableArray<Observable>;
    private _props: SelectionListAttrProps;

    constructor(attr: RecordAttribute){
        super(attr);
        this._props = <SelectionListAttrProps>this._properties;
        let allowOptions = this._recordAttr.parent.schema.schm.properties['5808dc55832db50010d3192b'];
        let opt = [];
        if(allowOptions && allowOptions.length){
            for (var i = 0; i < allowOptions.length; i++) {
                var e = allowOptions[i];
                let index = this._props.options.map(x=>x.id).indexOf(e);
                if(index !== -1){
                    opt.push(this._props.options[index]);
                }
            }
        }else{
            opt = this._props.options;
        }
        this._options = new ObservableArray(opt.map( (x, i) =>{

            let o = new Observable();
            o.set('checked', false);
            o.set("value",x.string);
            o.on(Observable.propertyChangeEvent, (x:PropertyChangeData)=>{
                if(x.propertyName ==='checked'){ this._onChange(x, i); }
            });
            return o;
                
            })
        );

        this._viewModel.set('itemsDD', this._props.options.map(x=>x.string));
        this._viewModel.set('items', this._options);


        var dropDown = Load({
            path:'~/PlantDashboard/Components/SelectionList',
            name:'dropdown'
        });

        var optionList = Load({
            path:'~/PlantDashboard/Components/MultipleSelection',
            name:'theme'
        });

        var imageList  = Load({
            path:'~/PlantDashboard/Components/SelectionList',
            name:'imageList'
        });
        let ft = this._props.formType;
        console.log(ft);
        if(ft && ft === 'optionsList' || ft === 'dropDown' || ft === 'imageList' ){
            if(this._props.formType === 'optionsList'){ this._theme.addChild(optionList);}
            if(this._props.formType === 'dropDown'){ this._theme.addChild(dropDown);}
            if(this._props.formType === 'imageList'){ this._theme.addChild(imageList);}
        }else{
            this._theme.addChild(optionList);
        }
        
        this._setValue();

    }
    private _setImgUrl(name:string):string{
        return `~/img/${name}.png`;
    }
    private _onChange(args: PropertyChangeData, index:number){
        //console.log(args.eventName + ' at the index '+index+': '+args.value);
        let item = this._props.options[index].id;
        let value = args.value;

        if(!this._recordAttr.value){ this._recordAttr.value = [] }
        let i = this._recordAttr.value.indexOf(item);
        if(value){
            if(i === -1){
                this._recordAttr.value.push(item);
            }
        }else{
            if(i !== -1){
                this._recordAttr.value.splice(i,1);
            }
        }
        console.log(this._recordAttr.value);
    }

    private _setValue (){
        let items: string[] = this._recordAttr.value;
        if(items && items.length){
            items.forEach(x=>{
                let index = this._props.options.map(s=>s.id).indexOf(x);
                if(index !== -1){
                    this._options.getItem(index).set('checked',true);
                }

            });
        }
    }
    private _selectedOption(args : ItemEventData){
        //let index = args.index;
        console.log(args)
    }
}
