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
            {label:'dashboard', link:'PlantDashboard/index'},
            {label:'evaluaciones', link:'PlantDashboard/Evaluations/index'},
            {label:'login', link:'login/index'},
            //{label:'Logout', link:''},
        ];
        
        this._viewModel.set('items',this._options);
        this._viewModel.set('title','menú');
        this._viewModel.set('onTap', (args)=>{
            //this._onTap(args.index);
            //console.log(JSON.stringify(args.index))
            let opt = {
                moduleName:this._options[args.index].link,
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 380,
                    curve: "easeOut"
                }
            }
            Topmost().navigate(opt)
        })

    }
    private _onTap(index:number ){
        console.log(index);
    }
}