import { FindOneResponse} from '../../interfaces';
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

    private _setQueryParser(){
        this._queryParser = new QueryParser(this._config);
    }

    public find ():Promise<Record>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        
        return r.make().then( (a)=>{
            if(this._factory){
                return this.makeObj(a);
            }else{
                return a;
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

    protected makeObj(a){
        return new Record(a.schema, a.record );
    }
}

export class FindPlant extends FindRecord {
    protected makeObj(a:FindOneResponse){
        return new Plant(a.schema, a.record );
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

    public find (){
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);
        return r.make();
    }
}