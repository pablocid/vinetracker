import {ListView, ItemEventData} from 'ui/list-view';
import { BaseComponent } from '../BaseComponent';
import { parse as Parse, load as Load } from 'ui/builder';
import { Color } from  'color';
import {Observable, EventData} from "data/observable";

export class SideDrawerComponent extends BaseComponent{
    private _options:any[];
    constructor(){
        super();
        this._theme.addChild(Load({
            path:'~/PlantDashboard/Components/SideDrawer',
            name:'theme.xml'
        }));
        this._options = [
            {label:'PlantDashboard', link:'PlantDashboard/index'},
            {label:'Login', link:'login/index'},
            {label:'Logout', link:''},
        ];
        
        this._viewModel.set('items',[1,2,3,4]);
        this._viewModel.set('title','Menú');
        this._viewModel.set('onTap', (args: ItemEventData)=>{
            //this._onTap(args.index);
            //console.log(JSON.stringify(args))
        })

    }
    private _onTap(index:number ){
        console.log(index);
    }
}


