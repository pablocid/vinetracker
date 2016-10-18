"use strict";
var http = require('http');
var AppSet = require("application-settings");
var frame_1 = require('ui/frame');
var dialogs_1 = require('ui/dialogs');
var BaseRequest = (function () {
    function BaseRequest() {
    }
    BaseRequest.prototype._setRequestOpts = function () {
        this._requestOpts = {
            url: this._url,
            method: this._method,
            headers: this._headers,
            content: this._content
        };
    };
    BaseRequest.prototype._requestModifier = function (response) {
        return response;
    };
    BaseRequest.prototype._errorHandler = function (e) {
        return e;
    };
    BaseRequest.prototype.request = function () {
        var _this = this;
        this._setRequestOpts();
        return http.request(this._requestOpts).then(function (res) {
            return _this._requestModifier(res);
        }, function (e) {
            return _this._errorHandler(e);
        });
    };
    BaseRequest.prototype._redirect = function (path) {
        frame_1.topmost().navigate(path);
    };
    return BaseRequest;
}());
exports.BaseRequest = BaseRequest;
var Access = (function (_super) {
    __extends(Access, _super);
    function Access(email, password) {
        _super.call(this);
        this._email = email;
        this._password = password;
        this._headers = { "Content-Type": "application/json" };
        this._content = JSON.stringify({ email: email, password: password });
        this._url = AppSet.getString('baseUrl') + 'auth/local';
        this._method = 'POST';
    }
    Object.defineProperty(Access.prototype, "showErrDialog", {
        get: function () {
            return this._showErrDialog;
        },
        set: function (value) {
            this._showErrDialog = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Access.prototype, "registerRedirect", {
        get: function () {
            return this._registerRedirect;
        },
        set: function (value) {
            this._registerRedirect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Access.prototype, "callbackRegiser", {
        get: function () {
            return this._callbackRegiser;
        },
        set: function (value) {
            this._callbackRegiser = value;
        },
        enumerable: true,
        configurable: true
    });
    Access.prototype._setToken = function (token) {
        AppSet.setString('Authorization', 'Bearer ' + token);
    };
    Access.prototype._requestModifier = function (response) {
        if (response.content.toJSON().message) {
            AppSet.remove("Authorization");
            console.log('token delete');
        }
        if (response && response.content && response.content.toJSON && response.content.toJSON().token) {
            this._setToken(response.content.toJSON().token);
        }
        return response;
    };
    Access.prototype._errorHandler = function (e) {
        console.log("Error: " + e.toJSON());
        AppSet.remove("Authorization");
        return e;
    };
    Access.prototype.register = function () {
        var _this = this;
        return this.request().then(function (res) {
            if (res && res.content && res.content.toJSON && res.content.toJSON().token) {
                if (_this._registerRedirect) {
                    _this._redirect(_this._registerRedirect);
                }
                if (_this._callbackRegiser) {
                    _this._callbackRegiser();
                }
                return true;
            }
            else {
                if (_this._showErrDialog) {
                    dialogs_1.alert(res.content.toJSON());
                }
                return false;
            }
        });
    };
    return Access;
}(BaseRequest));
exports.Access = Access;
var Logged = (function (_super) {
    __extends(Logged, _super);
    function Logged() {
        _super.call(this);
        this._url = AppSet.getString('baseUrl') + 'api/users/me';
        this._method = 'GET';
        this._headers = { "Authorization": AppSet.getString("Authorization") };
    }
    Object.defineProperty(Logged.prototype, "checkRedirect", {
        get: function () {
            return this._checkRedirect;
        },
        set: function (value) {
            this._checkRedirect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logged.prototype, "logoutRedirect", {
        get: function () {
            return this._logoutRedirect;
        },
        set: function (value) {
            this._logoutRedirect = value;
        },
        enumerable: true,
        configurable: true
    });
    Logged.prototype.check = function () {
        var _this = this;
        return this.request().then(function (value) {
            if (value.statusCode === 200) {
                if (_this._checkRedirect) {
                    _this._redirect(_this._checkRedirect);
                }
                return true;
            }
            if (value.statusCode === 401) {
                return false;
            }
        });
    };
    Logged.prototype.logout = function () {
        AppSet.remove("Authorization");
        if (this._logoutRedirect) {
            this._redirect(this._logoutRedirect);
        }
    };
    return Logged;
}(BaseRequest));
exports.Logged = Logged;
//# sourceMappingURL=index.js.map