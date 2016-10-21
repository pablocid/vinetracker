import {Schema} from '../../factories/Schema';
import {FindOneResponse, FindRecordsResponse} from '../../interfaces';
import { RequestOpts, Request} from '../Request';
import { Plant, Record} from '../../factories/Record';
import { QueryConfig, QueryParser} from '../../factories/QueryParser';

export class BaseFind {
    protected _config : QueryConfig;
    protected _queryParser : QueryParser;
    protected _method : string;
    protected _factory : boolean;

    constructor(config: QueryConfig, method:string){
        this._config = config;
        this._method = method;
    }

    protected makeObj (a){
        return a;
    }

    protected _setQueryParser(){
        this._queryParser = new QueryParser(this._config);
    }

    public find ():Promise<Record>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        console.log(JSON.stringify(o.url))
        console.log(JSON.stringify(o.options))

        return r.make().then( (a)=>{
            if(this._factory){
                return this.makeObj(a);
            }else{
                return a;
            }
        });
    }
}

export class Aggregate extends BaseFind {

    constructor(config: QueryConfig){
        super(config, 'GET');
    }
    public find ():Promise<any>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        console.log(JSON.stringify(o.url))
        console.log(JSON.stringify(o.options))

        return r.make();
    }

    public exist (): Promise<boolean> {
        return this.find().then(x=>{
            if(x && x.length){
                return true;
            }else{
                return false;
            }
        });
    }
}

export class FindRecord extends BaseFind {
    
    constructor(config:QueryConfig){
        super(config,'GET');
        this._config.url = 'api/records';
        this._factory = true;
    }

    protected makeObj(a):any{
        return new Record(a.schema, a.record );
    }
}

export class FindPlant extends FindRecord {
    protected makeObj(a:FindOneResponse){
        let f = new Plant(a.schema, a.record );
        console.log(f.id);
        return f
    }
}

export class FindPlants extends FindRecord {
    protected makeObj(a:FindRecordsResponse):Plant[]{
        //let f = new Plant(a.schema, a.record );
        //console.log(" in FindPlants ...");
        //console.log(a.length);
        if(a.length === 0){
            return [new Plant(a.schema)];
        }
        return a.items.map(x=>{
            //console.log('creating plants ...')
            return new Plant(a.schema, x );
        });
    }
    public finds ():Promise<Plant[]>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        console.log(JSON.stringify(o.url))
        console.log(JSON.stringify(o.options))

        return r.make().then( (a)=>{
            if(this._factory){
                return this.makeObj(a);
            }else{
                return a;
            }
        });
    }
}

export class FindRecords extends FindRecord {
    protected makeObj(a:FindRecordsResponse):Record[]{
        if(a.length === 0){
            return [new Record(a.schema)];
        }
        return a.items.map(x=>{
            //console.log('creating plants ...')
            return new Record(a.schema, x );
        });
    }
    public finds ():Promise<Record[]>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        console.log(JSON.stringify(o.url))
        console.log(JSON.stringify(o.options))

        return r.make().then( (a)=>{
            if(this._factory){
                return this.makeObj(a);
            }else{
                return a;
            }
        });
    }
}

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

    public find ():Promise<Schema[]>{
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        return r.make().then(x=>{
            if(x.items && x.items.length){
                return x.items.map(x => new Schema(x));
            }else{
                return [];
            }
        });
    }

    public rawFind (){
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        return r.make();
    }
}