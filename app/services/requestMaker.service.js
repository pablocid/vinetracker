"use strict";
var http = require('http');
var appSet = require("application-settings");
var q = require('q');
var frame = require('ui/frame');
exports.makeRequest = function makeRequest(opts) {
    opts.url = appSet.getString('baseUrl') + opts.url;
    if (!opts.method) {
        opts.method = 'GET';
    }
    //if(!opts.headers){ opts.headers = { "Content-Type": "application/json" }
    //if(!opts.content){ delete opts.content; }
    opts.headers = { "Content-Type": "application/json", "Authorization": appSet.getString("Authorization") };
    console.log(JSON.stringify(opts));
    var def = q.defer();
    http.request(opts)
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
            frame.topmost().navigate('login/login-page');
        }
        else {
            console.log('Error de codigo ' + err.statusCode + ' no manejado');
            throw new Error('Error de codigo ' + err.statusCode + ' no manejado');
        }
    });
};
//# sourceMappingURL=requestMaker.service.js.map