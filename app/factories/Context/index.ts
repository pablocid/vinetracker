import {Plant, Record} from '../Record';
import {Schema} from '../Schema';

export class Context{
    private _schema:Schema;
    private _record:Record;
    private _plant:Plant;

    constructor(){}
    public set schema(schm:Schema){
        this._schema = schm;
    }
    public get schema():Schema{
        return this._schema;
    }

	public get record(): Record {
		return this._record;
	}

	public set record(value: Record) {
		this._record = value;
	}

	public get plant(): Plant {
		return this._plant;
	}

	public set plant(value: Plant) {
		this._plant = value;
	}
    
}