

export class Attributes{
    private _id:string;
    private _string:string;
    private _boolean:boolean;
    private _date: string;
    private _number: number;
    private _reference: string;
    private _listOfObj:any;
    private _list: string[];

    constructor(attr?){
        this._id = attr.id;
        this._string = attr.string || undefined;
        this._boolean = attr.boolean!== undefined? attr.boolean: undefined;
        this._date = attr.date || undefined;
        this._number = attr.number|| undefined;
        this._reference = attr.reference || undefined;
        this._listOfObj = attr.listOfObj || undefined;
        this._list = attr.list && attr.list.length ? attr.list: undefined;
    }

	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
	}
    
    public get string (){
        return this._string;
    }
    public get boolean (){
        return this._boolean;
    }
    public get date () :Date {
        return new Date(this._date);
    }
    public set date (value : Date){
        this._date = new Date(this._date).toISOString();
    }
    get number(){
        return this._number;
    }
    get reference (){
        return this._reference;
    }
    get listOfObj(){
        return this._listOfObj
    }
    get list (){
        return this._list;
    }
    public get data(){
        let data = {};
        data['id'] = this._id;

        if( this._string ){ data['string'] = this._string; }
        if( this._boolean ){ data['boolean'] = this._boolean; }
        if( this._date ){ data['date'] = this._date; }
        if( this._number ){ data['number'] = this._number; }
        if( this._reference ){ data['reference'] = this._reference; }
        if( this._listOfObj ){ data['listOfObj'] = this._listOfObj; }
        if( this._list ){ data['list'] = this._list; }

        return data; 
    }
}



export class Updated{
    private _user:string;
    private _date:Date;
    
    constructor(update?){
        if( update.user ){ this._user = update.user; }
        if( update.date ) { this._date = new Date(update.date); }
        
    }


	public get user(): string {
		return this._user;
	}

	public set user(value: string) {
		this._user = value;
	}

	public get date(): Date {
		return this._date;
	}

	public set date(value: Date) {
		this._date = value;
	}
    
    public get data(){
        return {
            user:this._user,
            date:this._date
        }
    }
}

export class BaseSchema{
    protected _id:string;
    protected _created:string;
    protected _updated:Updated[];


	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
	}

	public get created(): Date {
		return new Date(this._created);
	}

	public set created(value: Date) {
		this._created = value.toISOString();
	}

    public update(value : Updated){
        if(this._updated){
            this._updated.push(value);
        }else{
            this._updated = [];
            this._updated.push(value);
        }
    }
    
}
export class Schema extends BaseSchema {
    protected _type:string;
    protected _name:string;
    protected _attributes: Attributes[];
    
    constructor(schm?:any){
        super();
        this._setData(schm);
    }

    public get name () :string {
        return this.getAttr('name', 'string');
    }

    public get description () :string {
        return this.getAttr('description', 'string');
    }

	public get type(): string {
		return this._type;
	}

	public set type(value: string) {
		this._type = value;
	}

    
    private _setData( schm:any ){
        if(schm){
            this._id = schm._id;
            this._type = schm.type;
            this._name = schm.name;
            this._created = schm.created;
            this._updated = schm.updated;
            this._attributes = [];
            if(schm.attributes && schm.attributes.length){
                this._attributes = schm.attributes.map(x=>new Attributes(x));
            }
        }
    }
    public getAttr (attrId:string, target?:string, key?:string ){
        if(!key){key = 'id'};
        if(key===undefined && attrId === undefined){ return null;}

        var index = this._attributes.map(x=>x[key]).indexOf(attrId);
        if(index === -1){return null}

        if(target === undefined){ return this._attributes[index];}

        return this._attributes[index][target];
    }

    public get data (): any{
        let data = {};
        if(this._id){ 
            data['_id'] =  this._id
        }
        data['type'] = this._type;
        data['name'] = this._name;
        data['created'] = this._created;
        data['updated'] = this._updated;
        
        if(this._attributes && this._attributes.length){
            data['attributes'] = this._attributes.map(x=>x.data);
        }

        return data;
    }
    public set data( record:any ){
        if(record){
            this._id = record._id;
            this._type = record.type;
            this._name = record.name;
            this._created = record.created;
            this._updated = record.updated;
            this._attributes = [];
            if(record.attributes && record.attributes.length){
                this._attributes = record.attributes.map(x=>new Attributes(x));
            }
        }
    }
    public get properties(){
        
        var keyObj = this.getAttr('keys', 'listOfObj'); 
        
        if( !keyObj || keyObj.legth === 0){ return {}; }

        var data = {};
        for (var index = 0; index < keyObj.length; index++) {
            let id = keyObj[index]['id'];
            let value = keyObj[index]['string'];

            data[id] = this.getAttr(id,value);
        }

        return data;
    }
    public get listAttrIds ():string[] {
        return this.getAttr('attributes', 'list');
    }
}
export class SchmSchemaObj{
    private _id:string;
    private _type:string;
    private _name:string;
    private _created:Date;
    private _updated:any;
    private _attributes:Attributes[];

    constructor(schm?){
        if(schm){
            this._id = schm._id;
            this._type=schm.type;
            this._name = schm.name;
            this._created = new Date(schm.created);
            this._updated = schm.updated;
            this._attributes = [];
            if(schm.attributes && schm.attributes.length){

                schm.attributes.forEach(x=>{
                    this._attributes.push(new Attributes(x));
                })
                //this._attributes=schm.attributes;
            }
        }
    }
    public get id(){
        return this._id;
    }
    public get type(){
        return this._type;
    }

	public get attributes(): Attributes[] {
		return this._attributes;
	}

	public set attributes(value: Attributes[]) {
		this._attributes = value;
	}
    
    public getAttr (attrId:string, dt:string){
        return this.findValueByVarHelper("id", attrId, dt);
    }

    protected findValueByVarHelper(key, value, target?){
        if(key===undefined && value === undefined){ return null;}

        var index = this._attributes.map(x=>x[key]).indexOf(value);
        if(index === -1){return null}

        if(target === undefined){ return this._attributes[index];}

        return this._attributes[index][target];

    }

}

export class AttrSchm extends Schema{
    private _input: InputSchm;
    public get inputRef () : string {
        return this.getAttr('input','reference');
    }

	public get input(): InputSchm {
		return this._input;
	}

	public set input(value: InputSchm) {
		this._input = value;
	}
    
}

export class InputSchm extends Schema{
    public get dataType () : string {
        return this.getAttr('dataType','string');
    }
}

export class SchemaFull {
    private _schm: Schema;
    private _attrSchms : AttrSchm[];
    private _inputs : InputSchm[];

    constructor(schema:any[]){
        this._setInputSchms(schema);
        this._setSchema(schema);

        // esta función requiere de que los _inputs esten seteados;
        this._setAttrSchms(schema);
        
    }
    

	public get schm(): Schema {
		return this._schm;
	}

	public set schm(value: Schema) {
		this._schm = value;
	}

    public get listAttrIds () : string[] {
        return this.schm.listAttrIds;
    }

	public get attrSchms(): AttrSchm[] {
		return this._attrSchms;
	}

	public set attrSchms(value: AttrSchm[]) {
		this._attrSchms = value;
	}

    private _setSchema(values : any[]){
        let schema = values.filter(x=>x.type==='schema');
        if(schema.length){
            this._schm = new Schema(schema[0]);

            //console.log(JSON.stringify(this._schema))
        }
    }

    private _setAttrSchms( values: any[]) {
        let attrConfs = values.filter(x=>x.type ==='attribute');
        if(attrConfs.length){
            this._attrSchms = attrConfs.map( x => {
                let a = new AttrSchm(x);
                let index = this._inputs.map( i => i.id).indexOf(a.inputRef);
                if(index !== -1 ){
                    a.input = this._inputs[index];
                }else{
                    console.log('El attributo no hizo match con un input. Cuidadooooo !!!!!!');
                }
                return a;

            } );
        }
    }

    private _setInputSchms( values: any[]) {
        let attrConfs = values.filter(x=>x.type ==='input');
        if(attrConfs.length){
            this._inputs = attrConfs.map( x => new InputSchm(x) );
        }
    }
    
}