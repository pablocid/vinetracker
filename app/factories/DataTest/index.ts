import {Schema} from '../Schema';
import {Plant} from '../Record';
var schmFull = require('./schmFull.json');
var plantRaw = require('./plantRaw.json');
var plantRaws = require('./plantRaws.json');
var schmFen0 = require('./schmFeno0.json');
export class PlantTest {
    private _schemafull:any;
    private _plantRaw:any;
    private _plantRaws:any[];
    private _schm:any;

    constructor(){
        this._schemafull = schmFull;
        this._plantRaw = plantRaw;
        this._plantRaws = plantRaws;
        this._schm = schmFen0;
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
}