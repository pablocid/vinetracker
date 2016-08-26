"use strict";
var observable_1 = require("data/observable");
var Auth = require("../services/auth.service");
var Frame = require('ui/frame');
var dialogs = require("ui/dialogs");
exports.createViewModel = function createViewModel() {
    var viewModel = new observable_1.Observable();
    var options = [
        { name: "Consultar datos de plantas", link: "records/record-identifier" },
        { name: "Ver evaluaciones disponibles" },
    ];
    viewModel.set('items', options);
    function selectedOption(args) {
        var itemIndex = args.index;
        if (itemIndex === 0) {
            Frame.topmost().navigate('records/record-identifier');
        }
    }
    viewModel.set('selectedOption', selectedOption);
    function isLogin() {
        Auth.checkLogin(function (isLog) {
            if (isLog) {
                dialogs.alert("the user is logged");
            }
            else {
                dialogs.alert("the user is NOT logged");
            }
        });
    }
    ;
    viewModel.set('isLogin', isLogin);
    function toEvaluation() {
        Frame.topmost().navigate('form/formbuilder');
    }
    ;
    viewModel.set('toEvaluation', toEvaluation);
    function logout() {
        Auth.logout(function () {
            Frame.topmost().navigate('main-page');
        });
    }
    viewModel.set('logout', logout);
    function goBack() {
        Frame.topmost().goBack();
    }
    viewModel.set('goBack', goBack);
    return viewModel;
};
//# sourceMappingURL=dash-view-model.js.map