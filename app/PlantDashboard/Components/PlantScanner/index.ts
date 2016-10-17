
import { load as Load, LoadOptions } from 'ui/builder';
import { View } from 'ui/core/view';
import { GridLayout } from 'ui/layouts/grid-layout';
import { PropertyChangeData } from 'data/observable';
import { topmost as Topmost} from 'ui/frame';
import { Observable } from 'data/observable';
import { SchmSchemaObj } from '../../../factories/Schema';
import { Context } from '../../../factories/Context';
import { QueryConfig, Filter } from '../../../factories/QueryParser';
import { FindSchm, FindRecord, FindPlant } from '../../../services/record.service';
import { Record, Plant } from '../../../factories/Record';
import { ScanOptions, BarcodeScanner, BarcodeResult } from '../../../interfaces';
import { action as Action, ActionOptions, alert as Alert, AlertOptions} from 'ui/dialogs';
//cb('683(10).6');
//cb('57a8d8dfef44961377526953');
var barcodescanner = <BarcodeScanner>require("nativescript-barcodescanner");

export class PlantScanner{
    private _viewModel:Observable;
    private _theme:View;

    private _config:QueryConfig;
    private _listItems: SchmSchemaObj[];
    private _filter: Filter;
    private _barcode:BarcodeScanner;
    private _barcordeOpts:ScanOptions;
    private _findOne:FindPlant;

    private _callback:any;
    private _callbackData:any;
    private _evaluatedActionCallback:any;

    private _evaluatedCheck:boolean;
    private _schmEvaluation:string;
    private _attrEvaluation:string;


    constructor(code? : string){

        this._theme = Load({ name:'theme', path:'~/PlantDashboard/Components/ScanHStatus' });
        this._barcode = barcodescanner;

        this._viewModel = new Observable();
        this._viewModel.set('onScan',(args)=>{ this._onTapScan(args) });
        this._viewModel.set('description', 'Escanea una planta para establecer la hilera');
        this._viewModel.set('loading', false);
        this._viewModel.set('code','');
        this._viewModel.set('ubicacion', '');
        
        this._theme.bindingContext = this._viewModel;

        this._hastPermission();
        this._setScanOpts();

        if(code){ this._findRecord({text:code})}

        //set _evaluatedActionCallback
        this._evaluatedActionCallback = this._unsetViewModelData;
    }

	public get evaluatedCheck(): boolean {
		return this._evaluatedCheck;
	}

	public set evaluatedCheck(value: boolean) {
		this._evaluatedCheck = value;
	}

	public get schmEvaluation(): string {
		return this._schmEvaluation;
	}

	public set schmEvaluation(value: string) {
		this._schmEvaluation = value;
	}

	public get attrEvaluation(): string {
		return this._attrEvaluation;
	}

	public set attrEvaluation(value: string) {
		this._attrEvaluation = value;
	}
    
	public get callback() {
		return this._callback;
	}
    /**
     * Para setear una función como callback.
     * El valor que retorna es un objeto < :Record >
     */
	public set callback(value) {
		this._callback = value;
	}

	public get callbackData(): any {
		return this._callbackData;
	}
    /**
     * Set callback for view forms
     */
	public set callbackData(value: any) {
		this._callbackData = value;
	}

	public get evaluatedActionCallback(): any {
		return this._evaluatedActionCallback;
	}
    /**
     * This callback has no parameters. _unsetViewModelData (code and ubicacion variable viewModel erase) is the default function that execute;
     */
	public set evaluatedActionCallback(value: any) {
		this._evaluatedActionCallback = value;
	}
    
    public set description(value:string){
        this._viewModel.set('description',value);
    }

    private _hastPermission():void{
        this._barcode.hasCameraPermission().then(granted=>{
            if(!granted){
                this._barcode.requestCameraPermission().then(permission=>{
                    if(permission){ 
                        console.log('permiso concedido')
                    }else{
                        console.log('permiso denegado')
                    }

                });
            }
        });
    }

    private _setScanOpts():void{
        this._barcordeOpts ={};
        this._barcordeOpts.orientation = 'portrait';
        this._barcordeOpts.cancelLabel = 'Stop scanning';
        this._barcordeOpts.formats = 'QR_CODE';
        this._barcordeOpts.message = 'Escanea etiqueta';
        this._barcordeOpts.preferFrontCamera = false;
        this._barcordeOpts.showFlipCameraButton = false;
    }

    private _onTapScan(args){
        this._barcode.scan(this._barcordeOpts).then(r=>{
            this._findRecord(r);
        })
    }
    private _unsetViewModelData(){
        this._viewModel.set('ubicacion','');
        this._viewModel.set('code','');
    }
    private _errorAlert(){
        let alertOpts: AlertOptions = {};
        alertOpts.title = 'Planta no encontrada';
        alertOpts.message = 'El código escaneado no tiene referencia con ninguna planta en la base de datos.'
        alertOpts.okButtonText = 'entendido';
        alertOpts.cancelable = false;
        Alert(alertOpts)
    }
    private _evaluatedAction() : Promise<boolean>{
        let actionOpt: ActionOptions = {};
        actionOpt.title = 'Planta evaluada!';
        actionOpt.message = 'Esta planta han sido previamente evaluados. ¿Deseas evaluarla nuevamente ?.'
        let opt1 = 'Si';
        let opt2 = 'No';
        actionOpt.actions = [opt1, opt2];
        actionOpt.cancelable = false;

        return Action(actionOpt).then( (opt) => {
            if(opt === opt2) { 
                this._evaluatedActionCallback();
                // existe pero se evalua: checkIfEvaluated => false;
                return false;
            }else{
                return true;
            }
        });
    }
    private _findRecord(s:BarcodeResult){
        this._viewModel.set('loading', true);
        this._viewModel.set("code",s.text);
        
        this._config = new QueryConfig();
        this._config.id = s.text;
        if(!/^[0-9a-f]{24}$/i.test(s.text)){
            //plant schema
            this._config.schm = '57a4e02ec830e2bdff1a1608';
            // cod_indiv
            this._config.key  = '57c3583bc8307cd5b82f447d';
            this._config.datatype = 'string';
        }
        
        this._findOne = new FindPlant(this._config);
        this._findOne.find().then( (res:Plant) => {
            this._viewModel.set('loading', false);
            if(!res.id){
                this._errorAlert();
                this._unsetViewModelData(); 
            }else{
                this._viewModel.set("ubicacion", res.getUbicación() );

                //chechear si el registro ha sido ingresado
                if(this._evaluatedCheck && this._attrEvaluation && this._schmEvaluation){
                    this._viewModel.set('loading', true);
                    this._checkIfEvaluated(res).then( (value) => {
                        if(!value){
                            if(this._callbackData){ this._callbackData(res.id)}
                        }
                        this._viewModel.set('loading', false);
                    });
                }else{
                    /**
                     * si no existe checkeo, el dato se asigna al callbackData;
                     */
                    if(this._callbackData){ this._callbackData(res.id)}
                }
                
                
                //callback call
                if(this._callback){ this._callback(res); }
            }

        });
    
    }
    private _checkIfEvaluated (plant:Plant) : Promise<boolean>{

        if(!this._evaluatedCheck && this._attrEvaluation && this._schmEvaluation){ 
           throw new Error('La propiedad _evaluatedCheck, _attrEvaluation o _schmEvaluation no está seteada.');
        }

        let opts = new QueryConfig();
        opts.id = plant.id;
        opts.schm = this._schmEvaluation;
        opts.key = this._attrEvaluation;
        opts.datatype = 'reference';
        let evaluationRecord = new FindRecord(opts);
        return evaluationRecord.find().then((record)=>{
            if(record.id){
                return this._evaluatedAction(); 
            }else{
                return false;
            }
        });
        //schm evaluation = 57c42f2fc8307cd5b82f4484
        //schm attributo referencia = 57c42f77c8307cd5b82f4486
        //
    }
    public getView(){
    
        var grid =  new GridLayout();
        grid.addChild(this._theme);
    
        return grid;
    }
}