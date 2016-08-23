import { Observable  } from "data/observable";
var Auth = require("../services/auth.service");
import Frame =require('ui/frame');
import { ObservableArray } from "data/observable-array";
import http = require('http');
import dialogs = require("ui/dialogs");
import appSet = require("application-settings");

exports.createViewModel = function createViewModel() {
    var viewModel = new Observable();
    /*
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
    */
    var options = [
        {name: "Consultar datos de plantas", link:"records/record-identifier"},
        {name: "Ver evaluaciones disponibles"},
    ];
    viewModel.set('items',options);
    function selectedOption (args) {
        var itemIndex = args.index;
        if(itemIndex === 0){
            Frame.topmost().navigate('records/record-identifier');
        }
        //console.log(itemIndex);
    }
    
    viewModel.set('selectedOption',selectedOption);
    function isLogin (){
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
    viewModel.set('isLogin', isLogin);

    function toEvaluation (){
        Frame.topmost().navigate('form/formbuilder');
    };

    viewModel.set('toEvaluation', toEvaluation);

    function logout (){
        Auth.logout();
        Frame.topmost().navigate('main-page');
    }
    viewModel.set('logout', logout);

    function goBack (){
        Frame.topmost().goBack();
    }

    viewModel.set('goBack', goBack);
    return viewModel;
}
