var Observable = require("data/observable").Observable;

var http = require('http');
var camera = require("camera");
var dialogs = require("ui/dialogs");
var frame = require('ui/frame');
var CheckLogin = require("./services/auth.service").checkLogin;
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
 
// optional options 
var options = {
  message: 'check if is loggin',
  progress: 0.65,
  android: {
    indeterminate: true,
    cancelable: true,
    max: 100,
    progressNumberFormat: "%1d/%2d",
    progressPercentFormat: 0.53,
    progressStyle: 1,
    secondaryProgress: 1
  }
};
function createViewModel() {
    frame.topmost().navigate("PlantDashboard/index");
    //frame.topmost().navigate("PlantDashboard/Evaluations/index");

    //frame.topmost().navigate('login/index');
    //frame.topmost().navigate('PlantDashboard/Localization/index');
    //frame.topmost().navigate('PlantDashboard/Localization/localization-page');
    //frame.topmost().navigate('PlantDashboard/HileraStatus/index');
    //frame.topmost().navigate('PlantDashboard/HileraStatus/hstatus-page');
    //frame.topmost().navigate('PlantDashboard/Evaluation/index');
    
    //frame.topmost().navigate({moduleName:'evaluations/evaluation-records',context:{schema: "57c42f2fc8307cd5b82f4484",listViewAttr:"57c84628ab66902c2208a855"}});
    //frame.topmost().navigate("evaluations/evaluation-create");
    //frame.topmost().navigate("records/record-identifier");
    //frame.topmost().navigate("testmodal/modal-view");

    /** Test routes */
    //frame.topmost().navigate("factories/DataTest/Test_selectionList/index");
    //frame.topmost().navigate("factories/DataTest/Test_hilera/index");
    //frame.topmost().navigate("factories/DataTest/Test_Picturecomponent/index");
    //frame.topmost().navigate("factories/DataTest/Test_list/index");
    
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
        loader.show(options);
        CheckLogin(function(isLog){
            loader.hide();
            if(isLog){
                frame.topmost().navigate(navigationEntry);
            }else{
                frame.topmost().navigate("login/login-page");
            }
        });
    };

    return viewModel;
}

exports.createViewModel = createViewModel;