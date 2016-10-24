import {ListView, ItemEventData} from 'ui/list-view';
import { BaseComponent } from '../BaseComponent';
import { parse as Parse, load as Load } from 'ui/builder';
import { Color } from  'color';
import {Observable, EventData} from "data/observable";
import {topmost as Topmost} from 'ui/frame';
import {View} from 'ui/core/view';
export class SideDrawerComponent extends BaseComponent{
    private _options:any[];
    constructor(){
        super();
        this._theme.addChild(Load({
            path:'~/PlantDashboard/Components/SideDrawer',
            name:'theme.xml'
        }));
        this._options = [
            {label:'Dashboard', link:'PlantDashboard/index'},
            {label:'Evaluaciones', link:'PlantDashboard/Evaluations/index'},
            {label:'Login', link:'login/index'},
            //{label:'Logout', link:''},
        ];
        
        this._viewModel.set('items',this._options);
        this._viewModel.set('title','Menú');
        this._viewModel.set('onTap', (args)=>{
            //this._onTap(args.index);
            //console.log(JSON.stringify(args.index))
            Topmost().navigate(this._options[args.index].link)
        })

    }
    private _onTap(index:number ){
        console.log(index);
    }
}


