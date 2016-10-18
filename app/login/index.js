"use strict";
var BaseComponent_1 = require('../PlantDashboard/Components/BaseComponent');
var Auth_1 = require('../services/Auth');
var BasePage_1 = require('../factories/BasePage');
var builder_1 = require('ui/builder');
var loginPage = new BasePage_1.BasePage();
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent() {
        var _this = this;
        _super.call(this);
        this._viewModel.set("loging", false);
        this._viewModel.set("email", "admin@agroinformatica.cl");
        this._viewModel.set("password", "admin");
        this._viewModel.set("messageError", "");
        this._viewModel.set('login', function () {
            _this._login();
        });
        this._theme.addChild(builder_1.load({
            path: '~/login',
            name: 'theme'
        }));
    }
    Object.defineProperty(LoginComponent.prototype, "reDirPath", {
        get: function () {
            return this._reDirPath;
        },
        set: function (value) {
            this._reDirPath = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "showErrDialog", {
        get: function () {
            return this._showErrDialog;
        },
        set: function (value) {
            this._showErrDialog = value;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype._login = function () {
        var _this = this;
        this._viewModel.set("loging", true);
        if (this._viewModel.get('email') === "" && this._viewModel.get('password') === "") {
            return;
        }
        var access = new Auth_1.Access(this._viewModel.get('email'), this._viewModel.get('password'));
        if (this._reDirPath) {
            access.registerRedirect = this._reDirPath;
        }
        if (this._showErrDialog) {
            access.showErrDialog = true;
        }
        access.register().then(function (x) {
            if (x) {
                _this._viewModel.set('messageError', 'Loggeado con éxito');
            }
            else {
                _this._viewModel.set('messageError', 'Error de acceso');
            }
            _this._viewModel.set("loging", false);
        });
    };
    return LoginComponent;
}(BaseComponent_1.BaseComponent));
var logComp = new LoginComponent();
logComp.reDirPath = 'PlantDashboard/index';
logComp.showErrDialog = true;
loginPage.mainContent = logComp.getView();
loginPage.setTitleActionBar('Login', 'Registrate con tu email y contraseña');
module.exports = loginPage;
//# sourceMappingURL=index.js.map