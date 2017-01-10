import { AttrProps, ListOptionObject, SelectionListAttrProps } from '../../../interfaces';
import { BaseInputComponent } from '../BaseComponent';
import { Observable, PropertyChangeData } from 'data/observable';
import { ObservableArray } from "data/observable-array";
import { RecordAttribute } from '../../../factories/Record';
import { parse as Parse, load as Load } from 'ui/builder';
import { ItemEventData } from 'ui/list-view';


export class SelectionList extends BaseInputComponent {
    private _options: ObservableArray<ListOptionObject>;
    private _props: SelectionListAttrProps;

    constructor(attr: RecordAttribute) {
        super(attr);
        this._props = <SelectionListAttrProps>this._properties;
        this._options = new ObservableArray(this._props.options.map((x, i) => {
            return {
                backgroundColor: 'white',
                color: 'gray',
                value: x.string,
                key: x.id,
                index: i,
                img: this._setImgUrl(x.id)
            }

        })
        );
        this._viewModel.set('itemsDD', this._props.options.map(x => x.string));
        this._viewModel.set('items', this._options);

        var dropDown = Load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'dropdown'
        });

        var optionList = Load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'optionlist'
        });

        var imageList = Load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'imageList'
        });
        let ft = this._props.formType;
        console.log(ft);
        if (ft && ft === 'optionsList' || ft === 'dropDown' || ft === 'imageList') {
            if (this._props.formType === 'optionsList') { this._theme.addChild(optionList); }
            if (this._props.formType === 'dropDown') { this._theme.addChild(dropDown); }
            if (this._props.formType === 'imageList') { this._theme.addChild(imageList); }
        } else {
            this._theme.addChild(optionList);
        }


        this._viewModel.on(Observable.propertyChangeEvent, (args: PropertyChangeData) => {
            if (args.propertyName === 'selectedIndex' && args.value !== -1) {
                //console.log("PropertyChangeDataPropertyChangeDataPropertyChangeData   "+this._viewModel.get('selectedIndex') )
                let item = this._options.getItem(this._viewModel.get('selectedIndex'));
                console.log('item --------------------' + item.key);
                this._recordAttr.value = item.key;
                let imgUri = `~/img/${item.key}.png`;
                this._viewModel.set('selected', { key: item.key, value: item.value, img: imgUri });
                this._changeView(item.index);
            }
            this._callback();
            //console.log(JSON.stringify(this._recordAttr.data));
        });

        this._viewModel.set('selectedOption', (args: ItemEventData) => {
            let index = args.index;
            this._viewModel.set('selectedIndex', index);
        });

        this._viewModel.set('noSelection', () => {
            console.log('no selection')
            this._recordAttr.value='';
            this._viewModel.set('selectedIndex', -1);
            this._changeView();
        });

        this._setValue();

    }
    private _setImgUrl(name: string): string {
        return `~/img/${name}.png`;
    }

    private _setValue() {
        let index = this._options.map(x => x.key).indexOf(this._recordAttr.value);
        console.log('index SelectionList: ' + index)

        if (index !== -1) {
            console.log('enter')
            this._viewModel.set('selectedIndex', index);
        }
    }

    private _changeView(index?) {
        this._options.map(x => {
            x.backgroundColor = 'white';
            x.color = 'gray';
        });

        if (index !== undefined) {
            let opt = this._options.getItem(index);
            opt.color = 'white';
            opt.backgroundColor = '#f44242';
            this._options.setItem(index, opt);
        }else{
            let opt = this._options.getItem(0);
            opt.color = 'gray';
            opt.backgroundColor = 'white';
            this._options.setItem(index, opt);
        }


    }
}
