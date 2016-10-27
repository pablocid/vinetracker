import {Schema} from '../../factories/Schema';
import {Filter, QueryConfig, QueryParser} from '../../factories/QueryParser';
import {FindOneResponse, FindRecordsResponse} from '../../interfaces';
import { RequestOpts, Request} from '../Request';
import { Plant, Record} from '../../factories/Record';
var q = require('q');

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

    public raw ():Promise<any>{

        this._setQueryParser();
        let url = this._queryParser.parse();
        let o = new RequestOpts(url,this._method);
        let r = new Request(o);

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

export class SaveRecord {
    private _config : QueryConfig;
    private _queryParser : QueryParser;
    private _method: string;
    private _content:string;

    constructor(record:Record){
        this._config = new QueryConfig();
        this._config.url = 'api/records';
        this._content = JSON.stringify(record.data);
        if(record.id){
            this._config.id = record.id;
            this._method = 'PUT';
        }else{
            this._method = 'POST'
        }
        this._queryParser = new QueryParser(this._config);
    }

    public save ():Promise<any>{
        let url = this._queryParser.parse();
        let content = this._content
        let o = new RequestOpts(url,this._method, this._content);
        let r = new Request(o);
        return r.make()
    }
}

export class FindPlantIds {

    public getEvaluatedId(schm:Schema, plant:Plant):Promise<string[]>{
        let qcRecords = new QueryConfig();
        qcRecords.items = "100";
        // fenotipado 0
        qcRecords.schm = schm.id;
        
        let f0_espaldera = new Filter();
        f0_espaldera.key = "espaldera";
        f0_espaldera.value = plant.espaldera
        f0_espaldera.datatype = "number";
        
        let f0_hilera = new Filter();
        f0_hilera.key  = 'hilera';
        f0_hilera.value = plant.hilera;
        f0_hilera.datatype = "number";
        qcRecords.filter = [f0_espaldera, f0_hilera];
        
        let records = new FindRecords(qcRecords);
        //57c42f77c8307cd5b82f4486 es el individuo ref
        return records.finds().then(x=>x.map(i=>i.getAttribute("57c42f77c8307cd5b82f4486").value));

    }
    
    private _callgetRestricionIds(restriction:any[], schm:Schema, plant:Plant){
        let qcRecords = new QueryConfig();
            qcRecords.items = "100";
            qcRecords.filter = [];
            
            let f0_espaldera = new Filter();
            f0_espaldera.key = "espaldera";
            f0_espaldera.value = plant.espaldera;
            f0_espaldera.datatype = "number";
            qcRecords.filter.push(f0_espaldera);
            
            let f0_hilera = new Filter();
            f0_hilera.key  = 'hilera';
            f0_hilera.value = plant.hilera;
            f0_hilera.datatype = "number";
            qcRecords.filter.push(f0_hilera);
    
            for (var index = 0; index < restriction.length; index++) {
                var element = restriction[index];
                if(element.id === 'schm'){
                    qcRecords.schm = element.string;
                }
    
                if(element.id==='filter'){
                    let f = new Filter();
                    let set = element.string.split('|');
                    f.key =set[0];
                    f.value=set[1];
                    f.datatype = set[2];
                    qcRecords.filter.push(f)
                }
                
            }
            
            let records = new FindRecords(qcRecords);
            //57c42f77c8307cd5b82f4486 es el individuo ref
            return records.finds()
                        .then(
                            x=>x.map(i=>i.getAttribute("57c42f77c8307cd5b82f4486").value)
                        );
    }
    public getRestrictionIds(schm:Schema, plant: Plant):any{
        var def = q.defer();
        var restrictions = schm.properties.restriction;
        
        if(restrictions && restrictions.length){
            this._callgetRestricionIds(restrictions, schm, plant).then(x=>{
                def.resolve(x);
            })
        }else{ def.resolve([]); }

        return def.promise;
    }
}

export class FindForEvaluation{
    
    public record(schm:Schema, plant:Plant):Promise<Record>{
        let qc = new QueryConfig();
        qc.id = plant.id;
        qc.schm = schm.id;
        qc.key = '57c42f77c8307cd5b82f4486';
        qc.datatype = 'reference';
      
        return new FindRecord(qc).find();
    }
}