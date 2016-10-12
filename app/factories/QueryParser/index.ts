export class QueryConfig{
    private _url:string;
    private _page:string;
    private _items:string;
    private _schm:string;
    private _populate:string;
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
		this._value = value;
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
            
            if(config.id){ this._id = config.id; }
            if(config.key){ this._key = config.key; }
            if(config.datatype){ this._datatype = config.datatype; }
        }

    }

    public parse ():string{
        let query:string[] = [this._parsePage(), this._parseItems(), this._parseSchm(), this._parseKey(), this._parseDatatype(),this._parseFilter()].filter((x)=>x!=='');

        var joined:string;
        if(query.length){ joined = query.join('&'); }

        if(this._id){
            this._url += '/'+this._id;
        }
        console.log(this._url+'?'+joined)
        return this._url+'?'+joined;
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
                if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
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

/*
exports.urlQueryConfig = function urlConfig(config) {
    var url = '';
    // ULR config 
    // if dir is set, add to url var
    if(config.dir){ url += config.dir; }
    // query
    if(config.query){
        url += "?";
        if(config.query.page){ url += "page="+config.query.page+"&"}
        if(config.query.items){ url += "items="+config.query.page+"&"}
        if(config.query.schm){ url += "schm="+ config.query.schm+"&"}
        if(config.query.populate){ url += "populate="+ config.query.populate+"&"}
        if(config.query.filter && config.query.filter.length){
            var arr = config.query.filter;
            var isValid = true;
            for (var index = 0; index < arr.length; index++) {
                if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
                    isValid = false;
                }
            }
            if(isValid){
                url += "filter="+JSON.stringify(arr)+"&";
            }else{
                console.log("Query Error: Filter -  Error al checkear la lista de objetos - key; value; datatype;")
            }
        }
    }
    // ULR config ********************************************
    return url;
}


exports.urlQueryFindOne = function urlConfig(config) {
    // ULR config ********************************************
    var url = '';
    // if dir is set, add to url var
    if(config.dir){ url += config.dir; }
    // query
    if(config.query){
        url += "?";
        if(config.query.schm){ url += "schm="+ config.query.schm+"&"}else{console.log("no schema")}
        if(config.query.key){ url += "key="+ config.query.key+"&"}else{console.log("no key")}
        if(config.query.datatype){ url += "datatype="+ config.query.datatype+"&"}else{console.log("no datatype")}
    }
    // ULR config ********************************************
    return url;
}

exports.checkParam = function (param, dataType) {

  if(param === null){ return false; }
  var response = false;
  
  if(dataType === 'string'){
    if(typeof param === 'string' && param.length>0){
      response = true;
    }
  }

  if(dataType === 'number'){
    //console.log('chequea numero')
    if(typeof param === 'number'){
      response = true;
    }
    if(typeof param === 'string'){
      
      if(/^\d*$/.test( param )){
        //console.log('es  numero')
        response = true;
      }
    }
  }

  if(dataType === 'objectId'){
    if(/^[0-9a-f]{24}$/i.test(param)){
      response = true;
    }
  }

  //filtro de registros
  if (dataType === 'filter') {
    //checkeando si hay errores en el parseo a JSON
    try {
      var arr = JSON.parse(param);
      //check if is an Array and if is empty
      if(arr.length){
        // verificando si los obj dentro del array tiene las propiedades key, datatype y value
        var isValid = true;
        for (var index = 0; index < arr.length; index++) {
          if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
            isValid = false;
          }
        }
        response = isValid;
      }

    } catch (err) {
      response = false;
      console.log('invalid JSON')
    }
  }

  return response;
}
*/