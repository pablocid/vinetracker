import http = require('http');
import { getString } from 'application-settings';
import appSet = require("application-settings");
var q = require('q');
import { topmost as Topmost} from 'ui/frame';

export class RequestOpts{

    private _options: http.HttpRequestOptions;

    constructor(url:string, method: string, content?:string){
        if(url===''){ throw new Error('url is undefined');}
        if(method===''){ throw new Error('method is undefined');}
        this._options = {
            url:getString('baseUrl') + url,
            method: method,
            headers: { "Content-Type": "application/json", "Authorization":getString("Authorization")},
            content:content
        };
        //console.log(JSON.stringify(this._options))
    }

	public get url(): string {
		return this._options.url;
	}

	public get method(): string {
		return this._options.method;
	}
    
    public get options():http.HttpRequestOptions{
        return this._options;
    }
}

export class Request{
    private _requestOptions: RequestOpts;
    
    constructor(opts:RequestOpts){
        this._requestOptions = opts;
        //console.log(JSON.stringify(this._requestOptions.options));
    }
    public make (){
        var def = q.defer();
        http.request(this._requestOptions.options)
            .then(
                function(res){

                    if(res.statusCode >= 400){
                       console.log(res.statusCode);
                       if(res.statusCode === 401){
                           console.log('Es unauthorized')
                           def.reject({msg:'Esta petición no esta autorizada', statusCode:res.statusCode}); 
                       }else{
                           def.reject({mgs: 'Error ', statusCode: res.statusCode});
                       } 
                    }else if(res.statusCode >= 200){
                        def.resolve(res.content.toJSON() );
                    }else{
                        console.log('Authorized request');
                        def.reject({mg:' Unresolve request', statusCode:res.statusCode})
                    }
                },
                function(err){
                    def.reject({msg:err, statusCode:500})
                }
            );
        return def.promise.then(
            function(data){ return data},
            function(err){ 
                if(err.statusCode === 401){
                    //redireccionamiento hacia la pagina de login
                    //Topmost().navigate('login/login-page');
                    Topmost().navigate('login/index');
                }else{
                    console.log('Error de codigo '+err.statusCode+ ' no manejado');
                    throw new Error(err);
                }
            }
        );
    }

}
