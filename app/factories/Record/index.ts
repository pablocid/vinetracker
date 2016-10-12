import {SchmSchemaObj} from '../Schema';

export class Attributes{
    private _id:string;
    private _string:string;
    private _boolean:boolean;
    private _date: Date;
    private _number: number;
    private _reference: string;
    private _listOfObj:any;
    private _list: string[];

    constructor(attr){
        this._id = attr.id;
        this._string = attr.string || undefined;
        this._boolean = attr.boolean!== undefined? attr.boolean: undefined;
        this._date = attr.date ? new Date(attr.date): undefined;
        this._number = attr.number|| undefined;
        this._reference = attr.reference || undefined;
        this._listOfObj = attr.listOfObject || undefined;
        this._list = attr.list && attr.list.length ? attr.list: undefined;
    }
    get id (){
        return this._id;
    }
    public get string (){
        return this._string;
    }
    public get boolean (){
        return this._boolean;
    }
    get date (){
        return this._date;
    }
    get number(){
        return this._number;
    }
    get reference (){
        return this._reference;
    }
    get listOfObject(){
        return this._listOfObj
    }
    get list (){
        return this._list;
    }
    public getValue(){
        //return this._string || this._boolean!== undefined? this._boolean: null || this._date || this._number!== undefined? this._number: null || this._reference || this._listOfObj || this._list;
        return this._string; 
    }
}
export class Updated{
    private _user:string;
    private _date:Date;
    
    constructor(){}

    set user(id:string){
        // check if $oid
        this._user = id;
    }
    get user(){
        return this._user;
    }
    set date(isoDate: Date){
        this._date = isoDate;
    }
    get date(){
        return this._date;
    }
    get data(){
        return {
            user:this._user,
            date:this._date
        }
    }
}
export class Record{
    private _id:string;
    private _schm:string;
    private _created:Date;
    private _updated:Updated[];
    private _attributes:Attributes[];

    private _schema:SchmSchemaObj;
    private _attributeSchms:SchmSchemaObj[];
    private _schmAttrInputConfSchms:SchmSchemaObj[];
    private _attrInputConfSchms:SchmSchemaObj[];
    
    constructor(schm : SchmSchemaObj[], record:any ){

        this.setData(record);
        
        if(schm.filter(x=>x.type==='schema')[0]){
            this._schema = schm.filter(x=>x.type==='schema')[0];
        }else{
            throw new Error ('No existe el objeto tipo schema en el array SchmSchemaObj');
        }

        this._attributeSchms = schm.filter(x=>x.type ==='attribute');
        this._schmAttrInputConfSchms = schm.filter(x=>x.type ==='schmAttrInputConf');
        this._attrInputConfSchms = schm.filter(x=>x.type ==='attrInputConf');
    }

	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
	}

	public get schm(): string {
		return this._schm;
	}

	public set schm(value: string) {
		this._schm = value;
	}

	public get schema(): SchmSchemaObj {
		return this._schema;
	}

	public set schema(value: SchmSchemaObj) {
		this._schema = value;
	}

    public setData( record:any ){
        if(record){
            this._id = record._id;
            this._schm = record._schm;
            this._created = new Date(record.created);
            this._updated = record.updated;
            this._attributes = [];
            if(record.attributes && record.attributes.length){
                this._attributes = record.attributes.map(x=>new Attributes(x));
            }
        }
    }
        

    public getAttr (attrId:string, dt:string){
        return this.findValueByVarHelper("id", attrId, dt);
    }

    private findValueByVarHelper(key, value, target){
        if(key===undefined && value === undefined){ return null;}

        var index = this._attributes.map(x=>x[key]).indexOf(value);
        if(index === -1){return null}

        if(target === undefined){ return this._attributes[index];}

        return this._attributes[index][target];

    }
    public getData(){
        let data : any = {};
        if(this._id){ data._id = this._id; }
        data.schm = this._schm;
        //estas propiedades deberían ser seteadas en el backend
        data.created = this._created;
        data.updated = this._updated;
        /**+++++++++++++++++++++++++++++++++++++++++++++++++++ */
        data.attributes = this._attributes;
        return data;
    }

}

export class Plant extends Record {
    public getUbicación():string{
        let espaldera = this.getAttr('espaldera','number');
        let hilera = this.getAttr('hilera','number');
        let posicion = this.getAttr('posicion','number') || '-';
        if(espaldera && hilera){
            return `E${espaldera} H${hilera} P${posicion}`;
        }
        return 'sin información de ubicación';
    }
}