var http = require('http');
var appSet = require("application-settings");
var dialogs = require("ui/dialogs");
exports.GetAccess = function(email, password){
    return http.request({
            url: "https://pmg-restful-dev.herokuapp.com/auth/local",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ email: email, password: password })
        }).then(function (response) {
            //guardar el token
            if(response.content.toJSON().message){
                appSet.remove("Authorization");
                console.log('borrar authorization');
            }
            console.log(response.content.toJSON().token);
            return response;
        }, function (e) {
             console.log("Error: "+ e.toJSON());
             appSet.remove("Authorization");
             return e;
        });
}

exports.ReqAuth = function(){
    return {
        setAuth:function(tk){
            appSet.setString("Authorization",'Bearer '+tk);
        },
        getAuth: function(){
            return appSet.getString("Authorization");
        },
        isAuth: function () {
            Auth.isLogged(function(code){
                if(code===200){
                    //console.log('El usuario esta logeado');
                dialogs.confirm("El usuario esta logeado").then(function (result) {
                    console.log("Dialog result: " + result);
                    });
                }
                if(code===401){
                    //console.log('No autorizado');
                    dialogs.alert("El usuario no esta logeado")
                    .then(function() {
                        console.log("Dialog closed!");
                    });
                }
            });
        }
    };
}

exports.isLogged = function(cbOK,cbErr){
    console.log(' isLogged execute ...')
    http.request({
        url: "https://pmg-restful-dev.herokuapp.com/api/users/me",
        method:"GET",
        headers: {"Authorization":appSet.getString("Authorization")}
    }).then(function(res){
        cbOK(res.statusCode);
    }, function (e) {
        if(cbErr){
            cbErr(e.toJSON());
        }
    });
}

exports.checkLogin = function(cbOK,cbErr){

    http.request({
        url: "https://pmg-restful-dev.herokuapp.com/api/users/me",
        method:"GET",
        headers: {"Authorization":appSet.getString("Authorization")}
    }).then(function(res){
        if(res.statusCode===200){ cbOK(true); }
        if(res.statusCode===401){ cbOK(false);}
        
    }, function (e) {
        if(cbErr){
            cbErr(e.toJSON());
        }
    });
}

exports.login = function(email, password, cbOK, cbErr){
    http.request({
            url: "https://pmg-restful-dev.herokuapp.com/auth/local",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ email: email, password: password })
        }).then(function (response) {
            //guardar el token
            if(response.content.toJSON().message){
                appSet.remove("Authorization");
                dialogs.confirm("Error: "+response.content.toJSON().message).then(function (result) {
                    cbErr(response.content.toJSON().message);
                });
            }
            if(response.content.toJSON().token){
                appSet.setString("Authorization",'Bearer '+response.content.toJSON().token);
                cbOK();
            }else{
                cbErr("Error: the token property is undefind");
            }

        }, function (e) {
            dialogs.confirm("email or password don't match").then(function (result) {
                console.log("Error: "+ e.toJSON());
            });
            cbErr(e);
            appSet.remove("Authorization");
        });
};

exports.logout = function(cb){
    appSet.remove("Authorization");
    cb();
}