import { ObservableArray, ChangedData } from 'data/observable-array';
import { Observable, EventData, PropertyChangeData } from "data/observable";
import { GridLayout } from 'ui/layouts/grid-layout';
import { ItemEventData } from 'ui/list-view';
import { View } from "ui/core/view";
import { parse as Parse, load as Load } from 'ui/builder';

export class BaseUIComponent {
    protected _viewModel: Observable;
    protected _theme: GridLayout;

    constructor() {
        this._viewModel = new Observable();
        this._theme = new GridLayout();
        this._theme.bindingContext = this._viewModel;
    }

    public getView(): View {
        return this._theme;
    }
}

interface ChangeListCallback {
    (args: ChangedData<Observable>): void;
}

export interface SelectItemListCallback {
    (index: number, item: Observable): void;
}
export class ListUIComponent extends BaseUIComponent {
    private _listRef: ObservableArray<Observable>;
    private _order: Observable;
    private _labelProperty: Observable;

    constructor() {
        super();
        this._listRef = new ObservableArray(new Observable);
        this._listRef.pop();
        this._theme.addChild(Load({
            path: '~/PlantDashboard/UIComponents/List',
            name: 'list'
        }));

        this._labelProperty = new Observable();
        this._labelProperty.set('ListViewPropertyLabel', 'name');
        this._labelProperty.on(Observable.propertyChangeEvent, (prop: PropertyChangeData) => {
            if (prop.propertyName === 'ListViewPropertyLabel') {
                this._setPropertyLabel();
            }
        });
        this._order = new Observable();
        this._order.on(Observable.propertyChangeEvent, (prop: PropertyChangeData) => {
            if (prop.propertyName === 'sort') {
                this._sortList();
            }
        })
    }


    public set items(value: any[]) {
        let itms = value.map(x => {
            return new Observable({ ListViewPropertyLabel: 'loading', item: x });
        });
        this._listRef.push(itms);
        this._viewModel.set('items', this._listRef);
        this._setPropertyLabel();
        this._sortList();
    }

    public get items(): any[] {
        return this._viewModel.get('items');
    }


	public get listRef(): ObservableArray<Observable> {
		return this._listRef;
	}

	public set listRef(value: ObservableArray<Observable>) {
		this._listRef = value;
	}
    

    public get labelProperty(): string {
        return this._labelProperty.get('ListViewPropertyLabel');
    }

    public set labelProperty(value: string) {
        this._labelProperty.set('ListViewPropertyLabel', value);
    }

    private _setPropertyLabel() {
        if (this._listRef) {
            this._listRef.map((x, i) => {
                let label = x.get('item')[this.labelProperty];
                if (label) { x.set('ListViewPropertyLabel', label); }
                return x;
            });
        }
    }

    public getItem(index: number): Observable {
        let items = <ObservableArray<Observable>>this._viewModel.get('items');
        return items.getItem(index);
    }

    public removeItem(index: number) {
        this._listRef.splice(index, 1);
    }

    public removeItemById(id: string) {
        let i = this._listRef.map(x => x.get('item')['id']).indexOf(id);
        if (i !== -1) { this.removeItem(i); }
    }

    public removeItems(items: any[], property: string) {
        if (!Array.isArray(items)) {
            console.log('ListUIComponent.removeItems: el argumento "items" no es un Array');
            return;
        }
        items.forEach(item => {
            let i = this._listRef.map(x => x.get('item')[property]).indexOf(item);
            if (i !== -1) { this.removeItem(i); }
        });
    }

    public removeAllItems(){
        let length = this._listRef.length;
        this._listRef.splice(0,length);
    }

    public addItem(value: any) {
        let item = new Observable({ListViewPropertyLabel:'name', item:value});
        let label = value.get('item')[this.labelProperty];
        if (label) { value.set('ListViewPropertyLabel', label); }

        this._listRef.push(value);
        this._sortList();
    }

    public sortByProp(direction?: string, property?: string) {
        if (!direction) { direction = this._order.get('sort') ? <string>this._order.get('sort').direction : 'asc'; }
        if (!property) { property = this._order.get('sort') ? <string>this._order.get('sort').property : 'ListViewPropertyLabel'; }

        this._order.set('sort', { direction: direction, property: property });
    }

    public set selectedOption(fn: SelectItemListCallback) {
        this._viewModel.set('selectedOption', (args: ItemEventData) => {
            fn(args.index, this.getItem(args.index).get('item'));
        });
    }

    private _sortList() {
        var array = this._listRef;
        var direction = this._order.get('sort') ? <string>this._order.get('sort').direction : 'asc';
        var property = this._order.get('sort') ? <string>this._order.get('sort').property : 'ListViewPropertyLabel';

        if (!array || array.length === 0) { return; }

        if (direction === 'asc') {
            array.sort((a, b) => {
                if (a.get('item')[property] < b.get('item')[property]) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }

        if (direction === 'desc') {
            array.sort((a, b) => {
                //console.log('sortByProp: '+ property+' - '+a.get(property))
                if (a.get('item')[property] > b.get('item')[property]) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }
        array.push(new Observable());
        array.pop();
    }
    public get length(): number {
        return this._listRef.length;
    }

    public set onChangeListCallback(fn: ChangeListCallback) {
        this._listRef.on(ObservableArray.changeEvent, (args: ChangedData<Observable>) => {
            fn(args);
        })
    }
}