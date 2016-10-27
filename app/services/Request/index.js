"use strict";
var http = require('http');
var application_settings_1 = require('application-settings');
var q = require('q');
var frame_1 = require('ui/frame');
var RequestOpts = (function () {
    function RequestOpts(url, method, content) {
        if (url === '') {
            throw new Error('url is undefined');
        }
        if (method === '') {
            throw new Error('method is undefined');
        }
        this._options = {
            url: application_settings_1.getString('baseUrl') + url,
            method: method,
            headers: { "Content-Type": "application/json", "Authorization": application_settings_1.getString("Authorization") },
            content: content
        };
        //console.log(JSON.stringify(this._options))
    }
    Object.defineProperty(RequestOpts.prototype, "url", {
        get: function () {
            return this._options.url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOpts.prototype, "method", {
        get: function () {
            return this._options.method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestOpts.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    return RequestOpts;
}());
exports.RequestOpts = RequestOpts;
var Request = (function () {
    function Request(opts) {
        this._requestOptions = opts;
        //console.log(JSON.stringify(this._requestOptions.options));
    }
    Request.prototype.make = function () {
        var def = q.defer();
        http.request(this._requestOptions.options)
            .then(function (res) {
            if (res.statusCode >= 400) {
                console.log(res.statusCode);
                if (res.statusCode === 401) {
                    console.log('Es unauthorized');
                    def.reject({ msg: 'Esta petición no esta autorizada', statusCode: res.statusCode });
                }
                else {
                    def.reject({ mgs: 'Error ', statusCode: res.statusCode });
                }
            }
            else if (res.statusCode >= 200) {
                def.resolve(res.content.toJSON());
            }
            else {
                console.log('Authorized request');
                def.reject({ mg: ' Unresolve request', statusCode: res.statusCode });
            }
        }, function (err) {
            def.reject({ msg: err, statusCode: 500 });
        });
        return def.promise.then(function (data) { return data; }, function (err) {
            if (err.statusCode === 401) {
                //redireccionamiento hacia la pagina de login
                //Topmost().navigate('login/login-page');
                frame_1.topmost().navigate('login/index');
            }
            else {
                console.log('Error de codigo ' + err.statusCode + ' no manejado');
                console.log(JSON.stringify(err));
                throw new Error(err);
            }
        });
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=index.js.map