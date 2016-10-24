import {Schema} from '../Schema';
import {Plant, Record} from '../Record';
var schmFull = require('./schmFull.json');
var plantRaw = require('./plantRaw.json');
var plantRaws = require('./plantRaws.json');
var schmFen0 = require('./schmFeno0.json');
var schmFen0_full = require('./feno0_schmFull.json')
var schmFeno1_full = require('./feno1Schmfull.json');

export class PlantTest {
    private _schemafull:any;
    private _plantRaw:any;
    private _plantRaws:any[];
    private _schm:any;
    private _schmF1:any;

    constructor(){
        this._schemafull = schmFull;
        this._plantRaw = plantRaw;
        this._plantRaws = plantRaws;
        this._schm = schmFen0;
        this._schmF1 = schmFeno1_full;
    }

	public get schmF1(): any {
		return this._schmF1;
	}

	public set schmF1(value: any) {
		this._schmF1 = value;
	}
    
    public getPlant():Plant{
        return new Plant(this._schemafull, this._plantRaw);
    }
    public getPlants():Plant[]{
        return this._plantRaws.map(x=>new Plant(this._schemafull, x));
    }
    public getSchm():Schema{
        return new Schema(this._schm);
    }
    public getRecordFen0(){
        return new Record(schmFen0_full);
    }
}