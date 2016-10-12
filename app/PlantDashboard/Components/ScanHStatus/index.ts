
import { load as Load, LoadOptions } from 'ui/builder';
import {View} from 'ui/core/view';
import {GridLayout} from 'ui/layouts/grid-layout';
import { PropertyChangeData } from 'data/observable';
import {topmost as Topmost} from 'ui/frame';
import { Observable } from 'data/observable';
import { SchmSchemaObj } from '../../../factories/Schema';
import { Context } from '../../../factories/Context';
import { QueryConfig, Filter } from '../../../factories/QueryParser';
import { FindSchm, FindRecord, FindPlant } from '../../../services/record.service';
import { Record, Plant } from '../../../factories/Record';
import { ScanOptions, BarcodeScanner, BarcodeResult } from '../../../interfaces';
import { action as Action, alert as Alert, AlertOptions} from 'ui/dialogs';
//cb('683(10).6');
//cb('57a8d8dfef44961377526953');
var barcodescanner = <BarcodeScanner>require("nativescript-barcodescanner");

export class ScanHStatus{
    private _config:QueryConfig;
    private _viewModel:Observable;
    private _listItems: SchmSchemaObj[];
    private _theme:View;
    private _filter: Filter;
    private _barcode:BarcodeScanner;
    private _barcordeOpts:ScanOptions;
    private _findOne:FindPlant;
    private _callback:any;
    private _callbackData:any;

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
    private _findRecord(s:BarcodeResult){
        this._viewModel.set('loading', true);
        this._viewModel.set("code",s.text);
        
        this._config = new QueryConfig();
        this._config.id = s.text;
        if(!/^[0-9a-f]{24}$/i.test(s.text)){
            this._config.schm = '57a4e02ec830e2bdff1a1608';
            this._config.key  = '57c3583bc8307cd5b82f447d';
            this._config.datatype = 'string';
        }
        
        var self = this;
        this._findOne = new FindPlant(this._config);
        this._findOne.find().then(function(res:Plant){
            if(!res.id){ 
                self._errorAlert();
                self._unsetViewModelData(); 
            }else{
                self._viewModel.set("ubicacion", res.getUbicación() );

                
                //chechear si el registro ha sido ingresado
                // check code ...
                //self._checkIfEvaluated();
                
                //callback call
                if(self._callback){ self._callback(res); }
                if(self._callbackData){ self._callbackData(res.id)}
            }

            self._viewModel.set('loading', false);
        });
    
    }
    private _checkIfEvaluated (){

    }
    public getView(){
    
        var grid =  new GridLayout();
        grid.addChild(this._theme);
    
        return grid;
    }
}