var Observable = require("data/observable").Observable;
var getAccess = require("../services/auth.service").GetAccess;
var reqAuth = require("../services/auth.service").ReqAuth;
var frame = require('ui/frame');

function createViewModel() {
    var viewModel = new Observable();

    //set credentials
    viewModel.set("email", "admin@agroinformatica.cl");
    viewModel.set("password", "admin");
    viewModel.set("messageError", "");

    viewModel.set("loging", false);
    viewModel.login = function(){
        
        if(this.get('email')==="" && this.get('password')===""){ return null;}

        viewModel.set("loging", true);
        getAccess(this.get('email'), this.get('password'))
            .then(
                function (res) {
                    var response = res.content.toJSON();
                     viewModel.set("loging", false);
                    if(response.message){
                        viewModel.set('messageError', response.message);
                    }else{
                        reqAuth().setAuth(response.token);
                        frame.topmost().navigate("Dashboard/dash-page");
                    }
                    
                },
                function (e) {
                    viewModel.set('messageError', "Error en el servidor");
                }
            );

    };

    return viewModel;
}

exports.createViewModel = createViewModel;