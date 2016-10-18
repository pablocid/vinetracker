import { BaseComponent } from '../PlantDashboard/Components/BaseComponent';
import { Access } from '../services/Auth';
import { BasePage } from '../factories/BasePage';
import { Observable } from 'data/observable';
import { parse as Parse, load as Load } from 'ui/builder';

var loginPage = new BasePage();

class LoginComponent extends BaseComponent{
    private _reDirPath:string;
    private _showErrDialog:boolean;

    constructor(){
        super();
        this._viewModel.set("loging", false);
        this._viewModel.set("email", "admin@agroinformatica.cl");
        this._viewModel.set("password", "admin");
        this._viewModel.set("messageError", "");
        this._viewModel.set('login',()=>{
            this._login();
        });

        this._theme.addChild(Load({
            path:'~/login',
            name:'theme'
        }));
    }

	public get reDirPath(): string {
		return this._reDirPath;
	}

	public set reDirPath(value: string) {
		this._reDirPath = value;
	}

	public get showErrDialog(): boolean {
		return this._showErrDialog;
	}

	public set showErrDialog(value: boolean) {
		this._showErrDialog = value;
	}
    
    private _login (){
        this._viewModel.set("loging", true);
        if(this._viewModel.get('email')==="" && this._viewModel.get('password')===""){ return ;}
    
        var access = new Access(this._viewModel.get('email'),this._viewModel.get('password'));
        
        if(this._reDirPath){ access.registerRedirect = this._reDirPath; }
        if(this._showErrDialog) { access.showErrDialog = true;}
        access.register().then(x=>{
            if(x){
                this._viewModel.set('messageError', 'Loggeado con éxito');
            }else{
                this._viewModel.set('messageError', 'Error de acceso');
            }
            this._viewModel.set("loging", false);
        })
    }
}


var logComp = new LoginComponent();

logComp.reDirPath = 'PlantDashboard/index';
logComp.showErrDialog = true;
loginPage.mainContent = logComp.getView();
loginPage.setTitleActionBar('Login','Registrate con tu email y contraseña');

export = loginPage;