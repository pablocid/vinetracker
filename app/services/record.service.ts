var makeRequest = require('./requestMaker.service');
var IndividuoSchm = require("./schms-test");
var  RecordFactory = require('./record.factory');
var urlQueryConfig = require('./helper.service');
import { Request, RequestOpts } from './Request';
import { QueryParser,QueryConfig } from '../factories/QueryParser';
import { Record, Plant } from '../factories/Record';
import { SchmSchemaObj } from '../factories/Schema';
import { FindOneResponse } from '../interfaces';

export class BaseFind {
    protected _config : QueryConfig;
    protected _queryParser : QueryParser;
    protected _method : string;
    protected _factory : boolean;

    constructor(config: QueryConfig, method:string){
        this._config = config;
        this._method = method;
        this._factory = false;
    }

    protected makeObj (a){
        return a;
    }

    private _setQueryParser(){
        this._queryParser = new QueryParser(this._config);
    }

    public find (){
        var self = this;
        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        return r.make().then(function(a){
            if(self._factory){
                return self.makeObj(a);
            }else{
                return a;
            }
        });
    }
}

exports.FindOne = function(config){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    if(config.id){
        config.dir +='/'+config.id;
    }else{ return null; }

    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        //console.log("request realizado")
        if(data.length > 1){console.log('ASDJLASKDJ - Existe más de un registro para este identificador'); }
        var RecordConstructor = RecordFactory.RecordFactory( IndividuoSchm.Individuo(), data.schema );
         return new RecordConstructor(data.record);
    });
}

export class FindRecord extends BaseFind {
    
    constructor(config:QueryConfig){
        super(config,'GET');
        this._config.url = 'api/records';
        this._factory = true;
    }

    protected makeObj(a:FindOneResponse){
        var obj = new Record(a.schema.map(x=>new SchmSchemaObj(x)), a.record );
        return obj;
    }
}

export class FindPlant extends FindRecord {
    protected makeObj(a:FindOneResponse){
        var obj = new Plant(a.schema.map(x=>new SchmSchemaObj(x)), a.record );
        return obj;
    }
}

exports.Find = function(config){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    var qp = new QueryParser(config);
    var opt = new RequestOpts(qp.parse(), 'GET');

    var options = {
        //url: urlQueryConfig.urlQueryConfig(config),
        url:qp.parse(),
        method : 'GET',
    }
    var req = new Request(opt);
    return req.make().then(x=>{
        var RecordConstructor = RecordFactory.RecordFactory( null, x.schema );
        x.items = x.items.map(x=>new RecordConstructor(x));
        return x;
    });
    /*
    return makeRequest.makeRequest(options).then(function (data) {
        var RecordConstructor = RecordFactory.RecordFactory( null, data.schema );
        data.items = data.items.map(x=>new RecordConstructor(x));
        return data;

    });
    */
}
/*
    exports.FindSchm = function(config){
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryConfig
        config.dir = 'api/schemas';
        var qp = new QueryParser(config);
        var opt = new RequestOpts();
        opt.url = qp.parse();
        opt.method = 'GET';
    
        var options = {
            url: urlQueryConfig.urlQueryConfig(config),
            method : 'GET',
        }
        var req = new Request(opt);
        return req.make(); 
    }
*/
/*
export class FindSchm extends BaseFind{
    constructor(config:QueryConfig){
        super(config,'GET');
        this._config.url = 'api/schemas';
    }
}
*/
export class FindSchm {
    private _config : QueryConfig;
    private _queryParser : QueryParser;
    private _method: string;

    constructor(config: QueryConfig){
        this._config = config;
        this._config.url = 'api/schemas';
        this._queryParser = new QueryParser(this._config);
        this._method = 'GET';
    }

    public find (){
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        return r.make();
    }
}
exports.FindPop = function(config){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    // debe existir la propiedad config.attrId
    if(!config.attrId){
        console.log("Error: la propidad config.attrId no existe"); 
        return null};
    config.dir = 'api/records';
    var options = {
        url: urlQueryConfig.urlQueryConfig(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        var RecordConstructor = RecordFactory.RecordFactory( null, data.schema );
        var RecordConstructorPop = RecordFactory.RecordFactory( null, data.schemaPopulated );
        data.items = data.items.map(x=>{
            var item = new RecordConstructor(x);
            var reference = item.getAttr(config.attrId);
            if(!reference){ return item;}
            if(!data.itemsPopulated || !data.itemsPopulated.length){ return item;}

            var index = data.itemsPopulated.map(x=>x._id).indexOf(reference);
            
            if(index !== -1 ){
                item[config.attrId] =  new RecordConstructorPop(data.itemsPopulated[index]);
                //console.log(  item.getPopAttr("57c42f77c8307cd5b82f4486","espaldera", "number")  )
            }
            return item;
        });
        return data;
    });
}

exports.createNewRecord = function(schm, id){
    if(schm){
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
        var config = {dir:'',id:''};
        config.dir = 'api/schemas';
        config.id = schm;
        if(config.id){
            config.dir +='/'+config.id;
        }else{ return null; }
    
        var options = {
            url: urlQueryConfig.urlQueryFindOne(config),
            method : 'GET',
        }
    
        return makeRequest.makeRequest(options).then(function (data) {
            //console.log(data)
            var RecordConstructor = RecordFactory.RecordFactory( null, data );
            var record = new RecordConstructor();
            record.schm = schm;
             return record;
        });
    }
    if(id){
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
        var config = {dir:'',id:''};
        config.dir = 'api/records';
        config.id = id;
        if(config.id){
            config.dir +='/'+config.id;
        }else{ return null; }
    
        var options = {
            url: urlQueryConfig.urlQueryFindOne(config),
            method : 'GET',
        }
    
        return makeRequest.makeRequest(options).then(function (data) {
            //console.log(data)
            var RecordConstructor = RecordFactory.RecordFactory( null, data.schema );
             return new RecordConstructor(data.record);
        });   
    }
}
exports.saveRecord = function(record){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    var dir = 'api/records';
    var method = 'POST';
    if(record && record.schm){
        if(record._id){
            dir +='/'+record._id;
            method = 'PUT';
        }
    }else{
        console.log("No se guardó el registro") 
        return null; 
    }

    var options = {
        url: dir,
        method : method,
        content: JSON.stringify(record)
    }
    //console.log(JSON.stringify(record) );
    
    return makeRequest.makeRequest(options).then(function (data) {
        //console.log(data._id);
        return data;
    });
    
}