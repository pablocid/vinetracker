var http = require('http');
var appSet = require("application-settings");

exports.GetAccess = function(email, password){
    console.log(email);
    console.log(password);
    
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
            if(appSet.getString("Authorization")){
                return true;
            }else{
                return false;
            }
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

exports.logout = function(){
    appSet.remove("Authorization");
}