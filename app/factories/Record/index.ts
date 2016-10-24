import {ParamChecker} from '../../services/Helper';
import {AttrSchm, Attributes, SchemaFull, Updated, BaseSchema, Schema, InputSchm } from '../Schema';

export class Record extends BaseSchema {
    private _schm: string;
    private _schema: SchemaFull;
    protected _attributes: RecordAttribute[];
    private _espaldera:number;
    private _hilera:number;
    private _posicion:number;

    constructor(schm:any[], record?:any){
        if(!schm || schm.length === 0){ throw new Error('no se pudo crear el Record porque el array schema esta vacío.')}
        super();
        
        this._schema = new SchemaFull(schm);
        this._setData(record);

    }

	public get espaldera(): number {
		return this._espaldera;
	}

	public set espaldera(value: number) {
		this._espaldera = value;
	}

	public get hilera(): number {
		return this._hilera;
	}

	public set hilera(value: number) {
		this._hilera = value;
	}

	public get posicion(): number {
		return this._posicion;
	}

	public set posicion(value: number) {
		this._posicion = value;
	}
    

    public get schema ():SchemaFull{
        return this._schema;
    }

    public set schema (value : SchemaFull){
        this._schema = value;
    }

    private _setData( record:any ){
        if(record){
            this._id = record._id;
            this._created = record.created;
            this._updated = record.updated;
        }

        this._schm = this._schema.schm.id;

        this._attributes = [];

        this._schema.listAttrIds.forEach( l => {

            let indexSchm = this._schema.attrSchms.map(s => s.id).indexOf(l);
            let indexAttr:any;
            if(record && record.attributes && record.attributes.length){
               indexAttr =  record.attributes.map( s => s.id ).indexOf(l);
            }else{
                indexAttr = -1;
            }

            if(indexSchm !== -1 ){
                if(indexAttr !== -1){
                    this._attributes.push(
                        new RecordAttribute(this, this._schema.attrSchms[indexSchm] , record.attributes[indexAttr])
                    );
                }else{
                    this._attributes.push(
                        new RecordAttribute(this, this._schema.attrSchms[indexSchm])
                    );
                }
            }
        });


        
    }

    public get data (): any{
        let data = {};
        if(this._id){ 
            data['_id'] =  this._id
        }
        data['schm'] = this._schm;
        data['created'] = this._created;
        data['updated'] = this._updated;
        
        if(this._attributes && this._attributes.length){
            data['attributes'] = this._attributes.map(x=>x.data);
        }
        if(this._espaldera){
            data['attributes'].push({id:'espaldera', number:this._espaldera})
        }
        if(this._hilera){
            data['attributes'].push({id:'hilera', number:this._hilera})
        }
        if(this._posicion){
            data['attributes'].push({id:'posicion', number:this._posicion})
        }

        return data;
    }
    public set data( record:any ){
        this._setData(record);
    }
    /**
     * El attributo '(value:string)' corresponde a _id del attribute 
     */
    public getAttribute (value:string):RecordAttribute{

        let index = this._attributes.map( x => x.id).indexOf(value);
        if(index !== -1 ){
            return this._attributes[index];
        }
    }
}

export class Plant extends Record {
    public getUbicación():string{
        //console.log('Plant - getUbicación');
        let espaldera = this.getAttribute('5807af5f31f55d0010aaffe4').value;
        let hilera = this.getAttribute('5807af9231f55d0010aaffe5').value;
        let posicion = this.getAttribute('5807afe331f55d0010aaffe6').value || '-';
        if(espaldera && hilera){
            return `E${espaldera} H${hilera} P${posicion}`;
        }
        
        return 'ubicación ***';
    }
}

export class RecordAttribute {
    private _value : any;
    private _attrSchm:AttrSchm;
    private _reference:Record;

    constructor(reference:Record, attrSchm:AttrSchm, attr?){
        this._attrSchm = attrSchm;
        this._reference = reference;
        
        this._setAttribute(attr);
    }

    public get parent (){
        return this._reference;
    }

    private _setAttribute (attr){
        if(attr && attr.id === this._attrSchm.id){
            this._value = attr[this.dataType];
        }
    }

	public get attrSchm(): AttrSchm {
		return this._attrSchm;
	}

	public set attrSchm(value: AttrSchm) {
		this._attrSchm = value;
	}

    public get dataType (){
        return this._attrSchm.input.dataType;
    }

    public get name ():string{
        return this._attrSchm.name;
    }

    public get value (){
        return this._value;
    }

    public set value (v){
        let pcheck = new ParamChecker(v, this.dataType);
        if(pcheck.check){ 
            this._value = v; 
        }else{
            console.log(`
                Parameter wrong | El valor ${v} asignado al attributo ${this.name} 
                con el _id ${this.id} no coincide con el dataType ${this.dataType}
            `);
        }

    }

    public get id ():string {
        return this._attrSchm.id;
    }

    public get data(){
        var d = {};
        d['id'] = this.id;
        d[this.dataType] = this.value;

        return d;
    }
    
}