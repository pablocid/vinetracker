import {Plant, Record} from '../Record';
import {Schema} from '../Schema';
import fs = require("file-system");
import { knownFolders as KF, path , FileSystemEntity, File, Folder } from 'file-system';

interface DataJSON {
    schema:any;
    plant:{data:any, schm:any};
    record:{data:any, schm:any};
    hilera:{data:any, schm:any}[];
    allowedPlantsId:string[];
}

export class ContextFS{
    private _schema:Schema;
    private _record:Record;
    private _plant:Plant;
    private _data:DataJSON;
    private _file:File;

    constructor(){        
        var documents = fs.knownFolders.documents();
        this._file = documents.getFile("schemas.json");
        this._data = <DataJSON>JSON.parse(this._file.readTextSync());
        if(!this._data.schema){
            this._data.schema = {};
        }
        if(!this._data.record || !this._data.record.data || !this._data.record.schm){
            this._data.record = {data:'',schm:''}
        }
        if(!this._data.plant || !this._data.plant.data || !this._data.plant.schm){
            this._data.plant = {data:'',schm:''}
        }
    }

    public clean (){
        this._data = <DataJSON>{};
        this._dataSaveToFile();
    }

	public get allowedPlantsId(): string[] {
		return this._data.allowedPlantsId;
	}

	public set allowedPlantsId(value: string[]) {
        this._data.allowedPlantsId = value;
		this._dataSaveToFile();
	}
    
	public set hilera(value: Plant[]) {
        this._data.hilera = value.map(x=>{
            return {schm:x.schema.data, data:x.data}
        })
        this._dataSaveToFile();
	}

    public get hilera(): Plant[] {
        if(this._data.hilera){
            return this._data.hilera.map(x=>new Plant(x.schm,x.data));
        }else{
            return [];
        }
	}
    
    private _dataSaveToFile(){
        this._file.writeText(JSON.stringify(this._data));
    }

    public set schema(schm:Schema){
        this._data.schema = schm.data;
        this._dataSaveToFile();
    }
    public get schema():Schema{
        return new Schema(this._data.schema);
    }

	public get record(): Record {
        if(this._data.record){
            return new Record(this._data.record.schm, this._data.record.data);
        }else{
            return;
        }
	}

	public set record(value: Record) {
        this._data.record = {
            data: value.data,
            schm: value.schema.data
        }
		this._dataSaveToFile();
	}

	public get plant(): Plant {

		return new Plant(this._data.plant.schm, this._data.plant.data);
	}

	public set plant(value: Plant) {
        this._data.plant.data = value.data;
        this._data.plant.schm = value.schema.data;
		this._dataSaveToFile();
	}
    
}