import { Plant, Record } from '../Record';
import { Schema } from '../Schema';

export class Context {
	private _schema: Schema;
	private _record: Record;
	private _plant: Plant;
	private _hilera: Plant[];
	private _espaldera: number;

	constructor() { }
	public set schema(schm: Schema) {
		this._schema = schm;
	}
	public get schema(): Schema {
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

	public get hilera(): Plant[] {
		return this._hilera;
	}

	public set hilera(value: Plant[]) {
		this._hilera = value;
	}

	public get espaldera(): number {
		return this._espaldera;
	}

	public set espaldera(value: number) {
		this._espaldera = value;
	}


}