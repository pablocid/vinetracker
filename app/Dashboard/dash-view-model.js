var Observable = require("data/observable").Observable;
var Auth = require("../services/auth.service");
var frame = require('ui/frame');
var ObsArray = require("data/observable-array").ObservableArray;
var http = require('http');
var dialogs = require("ui/dialogs");

function createViewModel() {
    var viewModel = new Observable();
    http.request({
            url: "https://pmg-restful-dev.herokuapp.com/api/things",
            method: "GET"
        }).then(function (response) {
        	//var items = new ObsArray(response.content.toJSON());
            var items = response.content.toJSON();
    		viewModel.set('items',items);
        }, function (e) {
             console.log("Error: "+ e.toJSON());
             appSet.remove("Authorization");
             return e;
        });
    viewModel.isLogin = function(){
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
    };

    viewModel.toEvaluation = function(){
        frame.topmost().navigate('form/formbuilder');
    };

    viewModel.logout = function(){
        Auth.logout();
        frame.topmost().navigate('main-page');
    }

    viewModel.goBack = function(){
        frame.topmost().goBack();
    }
    return viewModel;
}

exports.createViewModel = createViewModel;