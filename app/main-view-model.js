var Observable = require("data/observable").Observable;

var http = require('http');
var camera = require("camera");
var dialogs = require("ui/dialogs");
var frame = require('ui/frame');
var reqAuth = require("./services/auth.service").ReqAuth;

function createViewModel() {
    //frame.topmost().navigate("records/record-identifier");
    var viewModel = new Observable();
    var navigationEntry = {
        moduleName: "Dashboard/dash-page",
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: "easeIn"
        }
    };

    viewModel.toLoginPage = function () {
        if(reqAuth().isAuth()){
            frame.topmost().navigate(navigationEntry);
        }else{
            frame.topmost().navigate("login/login-page");
        }
        
    };

    return viewModel;
}

exports.createViewModel = createViewModel;