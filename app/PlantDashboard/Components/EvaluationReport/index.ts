import {FindSchm} from '../../../services/RecordService';

import { load as Load, LoadOptions } from 'ui/builder';
import {View} from 'ui/core/view';
import {GridLayout} from 'ui/layouts/grid-layout';
import { PropertyChangeData } from 'data/observable';
import {topmost as Topmost} from 'ui/frame';
import { Observable } from 'data/observable';
import { SchmSchemaObj } from '../../../factories/Schema';
import { Context } from '../../../factories/Context';
import { QueryConfig, Filter } from '../../../factories/QueryParser';

export class SumaryReport{
    private _config:QueryConfig;
    private _viewModel:Observable;
    private _listItems: SchmSchemaObj[];
    private _theme:View;
    private _filter: Filter;
    private _loadOpt: LoadOptions;

    constructor(){
        this._loadOpt = {
            name:'theme',
            path:'~/PlantDashboard/Components/EvaluationReport'
        };
        this._theme = Load(this._loadOpt);

        this._config = new QueryConfig();
        this._filter = new Filter();
        this._filter.key = 'attributes';
        this._filter.value = {$in: ['57c42f77c8307cd5b82f4486'] };
        this._filter.datatype = 'list';
        this._config.filter = [this._filter];

        this._viewModel = new Observable();
        var self = this;
        this._viewModel.on(Observable.propertyChangeEvent,
            function(args:PropertyChangeData){
                if(args.propertyName==='selectedIndex'){
                    console.log(self._viewModel.get('enteros')[args.value]);
                }
            }
        )
        this._viewModel.set('loading',true);
        this._viewModel.set('enteros',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
        this._viewModel.set('selectedOption', args=>{
            let index = args.index;
            this._onTapItem(index);
        })
        this._theme.bindingContext = this._viewModel;

    }

    private _onTapItem(index){
        var context = new Context();
        let navOpts = {
            moduleName:"PlantDashboard/index",
            context:context
        }
        Topmost().navigate(navOpts);
     }

     private _setUpView(data){

     }
    public onLoadedPage(){
        let rs = new FindSchm(this._config);
         this._viewModel.set('loading',true);
     }
     public getView(){
         var grid =  new GridLayout();
         grid.addChild(this._theme);

         return grid;
     }

}
