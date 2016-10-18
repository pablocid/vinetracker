import http = require('http');
import AppSet = require("application-settings");
import { topmost as Topmost} from 'ui/frame';
import {alert as Alert} from 'ui/dialogs';

import {HttpRequestOptions, HttpContent, HttpResponse, Headers} from 'http';

export class BaseRequest {
    protected _requestOpts : HttpRequestOptions;
    protected _headers : Headers;
    protected _content: string;
    protected _url:string;
    protected _method:string;

    private _setRequestOpts(){
        this._requestOpts = {
            url:this._url,
            method:this._method,
            headers:this._headers,
            content:this._content
        };
    }
    protected _requestModifier (response: HttpResponse):HttpResponse{
        return response;
    }
    protected _errorHandler (e){
        return e;
    }
    public request():Promise<HttpResponse>{
        this._setRequestOpts();

        return http.request(this._requestOpts).then((res) =>{
            return this._requestModifier(res);
        }, (e) => {
             return this._errorHandler(e);
        });
    }
    protected _redirect(path:string){
        Topmost().navigate(path);
    }

}

export class Access extends BaseRequest{
    private _email:string;
    private _password:string;
    private _registerRedirect:string;
    private _callbackRegiser:any;
    private _showErrDialog:boolean;
   
    constructor(email:string, password:string){
        super();
        this._email= email;
        this._password = password;
        this._headers = {"Content-Type": "application/json"};
        this._content = JSON.stringify({ email: email, password: password });
        this._url = AppSet.getString('baseUrl')+'auth/local'
        this._method = 'POST';

    }

	public get showErrDialog(): boolean {
		return this._showErrDialog;
	}

	public set showErrDialog(value: boolean) {
		this._showErrDialog = value;
	}
    
	public get registerRedirect(): string {
		return this._registerRedirect;
	}

	public set registerRedirect(value: string) {
		this._registerRedirect = value;
	}

	public get callbackRegiser(): any {
		return this._callbackRegiser;
	}

	public set callbackRegiser(value: any) {
		this._callbackRegiser = value;
	}

    private _setToken(token){
        AppSet.setString('Authorization', 'Bearer '+token);
    }
    
    protected _requestModifier (response: HttpResponse):HttpResponse{
        if(response.content.toJSON().message){ 
            AppSet.remove("Authorization");
            console.log('token delete'); 
        }
        if(response && response.content && response.content.toJSON && response.content.toJSON().token){
            this._setToken(response.content.toJSON().token);
            //console.log('token set: '+ AppSet.getString('Authorization'))
        }
        return response;
    }

    protected _errorHandler (e){

        console.log("Error: "+ e.toJSON());
        AppSet.remove("Authorization");
        return e;
    }
    public register(): Promise<boolean>{

        return this.request().then((res) => {
            if(res && res.content && res.content.toJSON && res.content.toJSON().token){
                if(this._registerRedirect){this._redirect(this._registerRedirect)}
                if(this._callbackRegiser) {this._callbackRegiser();}
                return true;
            }else{
                if(this._showErrDialog){
                    Alert(res.content.toJSON());
                }
                return false;
            }
        })
    }

}

export class Logged extends BaseRequest{
    private _checkRedirect:string;
    private _logoutRedirect:string;

    constructor(){
        super();
        this._url = AppSet.getString('baseUrl')+'api/users/me';
        this._method = 'GET';
        this._headers = {"Authorization":AppSet.getString("Authorization")}
    }

	public get checkRedirect(): string {
		return this._checkRedirect;
	}

	public set checkRedirect(value: string) {
		this._checkRedirect = value;
	}

	public get logoutRedirect(): string {
		return this._logoutRedirect;
	}

	public set logoutRedirect(value: string) {
		this._logoutRedirect = value;
	}

    public check ():Promise<boolean>{
        return this.request().then( (value)=>{
            if(value.statusCode === 200){
                if(this._checkRedirect){ this._redirect(this._checkRedirect)}
                return true;
            }
            if(value.statusCode === 401){ return false;}
        });
    }

    public logout(){
        AppSet.remove("Authorization");
        if(this._logoutRedirect){ this._redirect(this._logoutRedirect)}
    }

}
