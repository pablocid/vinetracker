import { Plant, Record } from '../../../factories/Record';
import { ListUIComponent, SelectItemListCallback } from '../../UIComponents/List';
import { BaseComponent } from '../BaseComponent';
import { TabView, TabViewItem } from "ui/tab-view";
import { Observable, EventData, PropertyChangeData } from "data/observable";
import { ObservableArray, ChangedData } from 'data/observable-array';


export class HileraComponent extends BaseComponent {
    private _tabView: TabView;
    private _evaluated: ListUIComponent;
    private _nonEvaluated: ListUIComponent;

    private _evTab: TabViewItem;
    private _nonTab: TabViewItem;
    private _evTabTitle: string;
    private _nonEvTabTitle: string;

    private _evSelectItemCb: SelectItemListCallback;
    private _nonEvSelectItemCb: SelectItemListCallback;

    private _mainList: Plant[];

    constructor() {
        super();
        this._tabView = new TabView();
        this._theme.addChild(this._tabView);

        //******** end tab titles


        this._evaluated = new ListUIComponent();
        this._evaluated.labelProperty = 'ubicacion';
        this._evaluated.sortByProp('asc', 'position');
        this._evaluated.onChangeListCallback = (args) => {
            this._updateTabTitles();
        };
        this._evaluated.selectedOption = (index, item) => {
            if (this._evSelectItemCb) {
                this._evSelectItemCb(index, item);
            }
        };


        this._nonEvaluated = new ListUIComponent();
        this._nonEvaluated.labelProperty = 'ubicacion';
        this._nonEvaluated.sortByProp('asc', 'position');
        this._nonEvaluated.onChangeListCallback = (args) => {
            this._updateTabTitles();
        };
        this._nonEvaluated.selectedOption = (index, item) => {
            if (this._nonEvSelectItemCb) {
                this._nonEvSelectItemCb(index, item);
            }
        };

        this._evTab = new TabViewItem();
        this._evTab.view = this._evaluated.getView();
        this.evTabTitle = 'evaluados';


        this._nonTab = new TabViewItem();
        this._nonTab.view = this._nonEvaluated.getView();
        this.nonEvTabTitle = 'no evaluados';

        this._tabView.items = [this._nonTab, this._evTab];


    }

    private _updateTabTitles() {
        this._evTab.title = this._evaluated.length + ' ' + this.evTabTitle;
        this._nonTab.title = this._nonEvaluated.length + ' ' + this.nonEvTabTitle;
    }

    public removeAllItems(){
        this._mainList=[];
        this._evaluated.removeAllItems();
        this._nonEvaluated.removeAllItems();
    }

    public get evTabTitle(): string {
        return this._evTabTitle;
    }

    public set evTabTitle(value: string) {
        this._evTabTitle = value;
    }

    public get nonEvTabTitle(): string {
        return this._nonEvTabTitle;
    }

    public set nonEvTabTitle(value: string) {
        this._nonEvTabTitle = value;
    }


    public get evSelectItemCb(): SelectItemListCallback {
        return this._evSelectItemCb;
    }

    public set evSelectItemCb(value: SelectItemListCallback) {
        this._evSelectItemCb = value;
    }

    public get nonEvSelectItemCb(): SelectItemListCallback {
        return this._nonEvSelectItemCb;
    }

    public set nonEvSelectItemCb(value: SelectItemListCallback) {
        this._nonEvSelectItemCb = value;
    }


    public get mainList(): Plant[] {
        return this._mainList;
    }

    public set mainList(value: Plant[]) {
        this._mainList = value;
        this._nonEvaluated.items = value;
    }

    public setOrder(value: string) {
        if (value === 'asc' || value === 'desc') {
            this._nonEvaluated.sortByProp(value);
            this._evaluated.sortByProp(value);
        }
    }

    public set restrictionItems(values: string[]) {
        this._nonEvaluated.skipThisItems(values, 'id');
    }

    public set evaluatedItems(values: string[]) {
        console.log('Largo de evaluadas: ------------------- '+values.length)
        if (!this._mainList || this._mainList.length === 0) { return; }
        this._nonEvaluated.removeItems(values, 'id');

        let evList = this._mainList.map(x => x.id);
        let ev = [];
        let noev = []
        for (var i = 0; i < values.length; i++) {
            let ei = evList.indexOf(values[i]);
            if (ei !== -1) {
                ev.push(this._mainList[ei])
            } else {
                noev.push(this._mainList[ei]);
            }
        }
        this._evaluated.items = ev;
    }
    //las plantas registradas deberán tener el registro asociado en la propiedad 'record'
    public set evaluatedItems2(values: Record[]) {
        if (!this._mainList || this._mainList.length === 0) { return; }
        this._nonEvaluated.removeItems(values.map(i=>i.getAttribute("57c42f77c8307cd5b82f4486").value), 'id');

        let evList = this._mainList.map(x => x.id);
        let ev = [];

        for (var i = 0; i < values.length; i++) {
            console.log(values[i].id)
            let ei = evList.indexOf(values[i].getAttribute("57c42f77c8307cd5b82f4486").value);
            if (ei !== -1) {
                let plant = this._mainList[ei];
                plant.record = values[i];
                ev.push(plant);
            }
        }
        console.log(ev.length)
        this._evaluated.items = ev;
    }


    public evaluatedItem(value: string, record?:Record) {
        if (!this._mainList || this._mainList.length === 0) { return; }
        this._nonEvaluated.removeItems([value], 'id');

        //**********************

        let index = this._mainList.map(x => x.id).indexOf(value);
        let evIndex = this._evaluated.listRef.map(x=>x.get('item')['id']).indexOf(value);

        if(index !== -1 && evIndex === -1){
            let plant = this._mainList[index];
            plant.record = record;
            this._evaluated.addItem(plant);
        }
        if(evIndex !== -1){
            this._evaluated.updateItem(value,record);
        }
    }

}