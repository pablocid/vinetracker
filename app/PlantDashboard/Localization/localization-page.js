"use strict";
var RecordService_1 = require('../../services/RecordService');
var QueryParser_1 = require('../../factories/QueryParser');
var PlantScanner_1 = require('../Components/PlantScanner');
var observable_1 = require('data/observable');
var frame_1 = require('ui/frame');
var viewModel = new observable_1.Observable({ exampleText: 'lorem' });
var scanner = new PlantScanner_1.PlantScanner();
var pe = true;
var context;
function onLoaded(args) {
    console.log("localization-page.onLoaded");
    var page = args.object;
    page.bindingContext = viewModel;
    context = page.navigationContext;
    var sd = page.getViewById('mainContainer');
    if (pe) {
        sd.addChild(scanner.getView());
        pe = false;
    }
}
exports.onLoaded = onLoaded;
function onUnloaded() {
}
exports.onUnloaded = onUnloaded;
//var conFs = new ContextFS();
//conFs.schema = context.schema;
scanner.callback = function (plant) {
    //conFs.plant = plant;
    //loader.show(options);
    context.plant = plant;
    getMainList(plant).then(function (p) {
        //conFs.hilera = p;
        context.hilera = p;
        return p;
    }).then(function (x) {
        //loader.hide();
        var opt = {
            moduleName: 'PlantDashboard/HileraStatus/index',
            context: context,
            clearHistory: false,
            animated: false,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeOut"
            }
        };
        frame_1.topmost().navigate(opt);
    });
};
function getMainList(plant) {
    var qc = new QueryParser_1.QueryConfig();
    qc.items = "300";
    qc.schm = "57a4e02ec830e2bdff1a1608";
    // filtero espaldera
    var filter_espaldera = new QueryParser_1.Filter();
    filter_espaldera.key = "5807af5f31f55d0010aaffe4";
    filter_espaldera.value = plant.getAttribute("5807af5f31f55d0010aaffe4").value;
    filter_espaldera.datatype = "number";
    // filtero hilera
    var filter_hilera = new QueryParser_1.Filter();
    filter_hilera.key = "5807af9231f55d0010aaffe5";
    filter_hilera.value = plant.getAttribute("5807af9231f55d0010aaffe5").value;
    filter_hilera.datatype = "number";
    qc.filter = [filter_espaldera, filter_hilera];
    var plants = new RecordService_1.FindPlants(qc);
    return plants.finds();
}
//# sourceMappingURL=localization-page.js.map