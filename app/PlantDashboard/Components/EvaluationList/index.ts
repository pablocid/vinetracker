import {FindSchm} from '../../../services/RecordService';
import {Schema} from '../../../factories/Schema';
import { parse as Parse, load as Load, LoadOptions } from 'ui/builder';
import { View } from 'ui/core/view';
import { GridLayout } from 'ui/layouts/grid-layout';
import { EventData } from 'data/observable';
import { topmost as Topmost } from 'ui/frame';
import { Observable } from 'data/observable';
import { Context } from '../../../factories/Context';
import { QueryConfig, Filter } from '../../../factories/QueryParser';
import {action as Action} from 'ui/dialogs';

export class EvaluationListView {

    private _config:QueryConfig;
    private _viewModel:Observable;
    public _test:string;
    private _listItems: Schema[];
    private _theme:View;
    private _filter: Filter;
    private _context: Context;

    constructor(){

        this._theme = Load({
            name:'theme',
            path:'~/PlantDashboard/Components/EvaluationList'
        });
        this._config = new QueryConfig();
        this._context = new Context();

        this._filter = new Filter();
        this._filter.key = 'attributes';
        this._filter.value = {$in: ['57c42f77c8307cd5b82f4486'] };
        this._filter.datatype = 'list';
        this._config.filter = [this._filter];

        this._viewModel = new Observable();
        this._viewModel.set('loading',true);
        this._viewModel.set('selectedOption', args=>{
            let index = args.index;
            this._onTapItem(index);
        })
        this._theme.bindingContext = this._viewModel;

    }

    private _onTapItem(index) : void {
        var evaluacion = this._listItems[index];
        this._context.schema = evaluacion;
        //console.log("evaluacion.id "+evaluacion.id);

        var msg = "Evaluar "+evaluacion.getAttr("listViewLabel", "string")+ ' por ...';
        var opt1 = "hilera";
        var opt2 = "planta (Código QR)";
        
        let navOpts = {
            moduleName:"PlantDashboard/Localization/index",
            context:this._context
        }
        Topmost().navigate(navOpts);
        /*
        Action({
          message: msg,
          cancelButtonText: "cancelar",
          actions: [opt1, opt2]
        }).then(result => {
            if(result === opt1){
                console.log("La primera opción");
                let navOpts = {
                    moduleName:"PlantDashboard/Localization/index",
                    context:this._context
                }
                Topmost().navigate(navOpts);
            }
            if(result === opt2){
                console.log("La segunda opción")
            }
        });
        */
     }

     private _setUpView(items : Schema[]) : void {
        
        //filtrar items por createble
        this._listItems =  items.filter(u=> u.getAttr("creatable","boolean"));
        this._viewModel.set('loading',false);

        let listItemsView = this._listItems.map( s=>{    return { name:s.getAttr("listViewLabel", "string") }    } );
        this._viewModel.set('items', listItemsView);
     }

     public onLoadedPage(){
         this._viewModel.set('loading',true);
        let rs = new FindSchm(this._config);
         rs.find().then(x=>this._setUpView(x));
     }

     public getView() : View {
         var grid =  new GridLayout();
         grid.addChild(this._theme);

         return grid;
     }

}
