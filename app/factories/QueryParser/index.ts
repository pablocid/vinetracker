export class QueryConfig{
    private _url:string;
    private _page:string;
    private _items:string;
    private _schm:string;
    private _populate:string;
    private _query:string;

    private _filter:Filter[];

    private _id:string;
    private _key:string;
    private _datatype:string;    

	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
	}

	public get key(): string {
		return this._key;
	}

	public set key(value: string) {
		this._key = value;
	}

	public get datatype(): string {
		return this._datatype;
	}

	public set datatype(value: string) {
		this._datatype = value;
	}

	public get url(): string {
		return this._url;
	}

	public set url(value: string) {
		this._url = value;
	}

	public get page(): string {
		return this._page;
	}

	public set page(value: string) {
		this._page = value;
	}

	public get items(): string {
		return this._items;
	}

	public set items(value: string) {
		this._items = value;
	}

	public get schm(): string {
		return this._schm;
	}

	public set schm(value: string) {
		this._schm = value;
	}

	public get populate(): string {
		return this._populate;
	}

	public set populate(value: string) {
		this._populate = value;
	}

	public get filter(): Filter[] {
		return this._filter;
	}

	public set filter(value: Filter[]) {
		this._filter = value;
	}

	public get query(): string {
		return this._query;
	}

	public set query(value: string) {
		this._query = value;
	}
    
    public queryExist():boolean{
        if(this._filter || this._items || this._page || this._populate || this._schm){
            return true;
        }
        return false;
    }
}
export class Filter{
    private _key:string;
    private _value:any;
    private _datatype:string;

	public get key(): string {
		return this._key;
	}

	public set key(value: string) {
		this._key = value;
	}

	public get value(): any {
		return this._value;
	}

	public set value(value: any) {
        if(/^[\[|\{](\s|.*|\w)*[\]|\}]$/.test(value) && typeof value === 'string'){
            //console.log('El valor '+value+' es un JSONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN ****************************************')
            this._value = JSON.parse(value);
        }else{
            this._value = value;
        }
		
	}

	public get datatype(): string {
		return this._datatype;
	}

	public set datatype(value: string) {
		this._datatype = value;
	}

    public getData (){
        return {
            key:this._key,
            value: this._value,
            datatype:this._datatype
        }
    } 
}
export class QueryParser{
    private _url:string;
    private _page:string;
    private _items:string;
    private _schm:string;
    private _populate:string;
    private _filter:Filter[];
    private _id:string;
    private _query:string;

    private _key:string;
    private _datatype:string;

    constructor(config:QueryConfig){
        this._url = config.url;
        if( true ){
            if(config.page){ this._page = config.page; }
            if(config.items){ this._items = config.items; }
            if(config.schm){ this._schm = config.schm; }
            if(config.populate){ this._populate = config.populate; }
            if(config.filter && config.filter.length){ this._filter = config.filter; }
            if(config.query ){ this._query = config.query; }
            
            if(config.id){ this._id = config.id; }
            if(config.key){ this._key = config.key; }
            if(config.datatype){ this._datatype = config.datatype; }
        }

    }

    public parse ():string{
        let query:string[] = [this._query, this._parsePage(), this._parseItems(), this._parseSchm(), this._parseKey(), this._parseDatatype(),this._parseFilter()].filter((x)=>x!=='');

        var joined:string;
        if(query.length){ joined = query.join('&'); }

        if(this._id){
            this._url += '/'+this._id;
        }
        console.log(this._url+'?'+joined)
        return this._url+'?'+joined;
    }

    private _parseQuery (){
        if(this._query){
            return 'query='+this._query;
        }else{
            return '';
        }
    }

    private _parseKey():string{
        if(this._key){
            return 'key=' + this._key;
        }else{
            return '';
        }
    }

    private _parseDatatype():string {
        if(this._datatype){
            return 'datatype=' + this._datatype;
        }else{
            return '';
        }
    }

    private _parsePage():string{
        if(this._page){
            return 'page=' + this._page;
        }else{
            return '';
        }
    }

    private _parseItems():string{
        if(this._items){
            return 'items='+this._items;
        }else{
            return '';
        }
    }

    private _parseSchm():string{
        if(this._schm){
            return 'schm='+this._schm;
        }else{
            return '';
        }
    }

    private _parseFilter():string{
        if(this._filter){
            let arr = this._filter;
            let isValid:boolean = true;
            for (var index = 0; index < arr.length; index++) {
                if(arr[index].key === undefined || arr[index].value === undefined || arr[index].datatype === undefined){
                    isValid = false;
                }
            }
            if(isValid){
                return "filter="+JSON.stringify(arr.map(x=>x.getData()));
            }else{
                console.log("Query Error: Filter -  Error al checkear la lista de objetos - key; value; datatype;")
                return '';
            }
        }else{
            return '';
        }
    }

}