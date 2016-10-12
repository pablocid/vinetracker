
class Attributes{
    private _id:string;
    private _string:string;
    private _boolean:boolean;
    private _date: Date;
    private _number: number;
    private _reference: string;
    private _listOfObj:any;
    private _list: string[];

    constructor( attr : any){
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

export class SchmSchemaObj{
    private _id:string;
    private _type:string;
    private _name:string;
    private _created:Date;
    private _updated:any;
    private _attributes:Attributes[];

    constructor(schm){
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
    get id(){
        return this._id;
    }
    get type(){
        return this._type;
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

}