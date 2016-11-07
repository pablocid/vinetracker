import {Context} from '../../factories/Context';
import { ContextFS } from '../../factories/ContextFS';
import { FindPlants } from '../../services/RecordService';
import { Filter, QueryConfig } from '../../factories/QueryParser';
import { Plant } from '../../factories/Record';
import { PlantScanner } from '../Components/PlantScanner';
import { DrawerPage } from 'nativescript-telerik-ui/sidedrawer/drawerpage';
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import { SideDrawerComponent } from '../Components/SideDrawer';
import { Observable, EventData } from 'data/observable';
import { Page } from 'ui/page';
import { StackLayout } from 'ui/layouts/stack-layout';
import { GridLayout } from 'ui/layouts/grid-layout';
import { topmost as Topmost } from 'ui/frame';


var viewModel = new Observable({ exampleText: 'lorem' });
var scanner = new PlantScanner();
var pe = true;
var context:Context;

export function onLoaded(args: EventData) {
    console.log("localization-page.onLoaded");
    var page = <Page>args.object;
    page.bindingContext = viewModel;
    context = page.navigationContext;

    var sd = page.getViewById<GridLayout>('mainContainer');

    if (pe) {
        sd.addChild(scanner.getView());
        pe = false;
    }
}

export function onUnloaded() {

}

//var conFs = new ContextFS();
//conFs.schema = context.schema;
scanner.callback = function (plant: Plant) {
    //conFs.plant = plant;

    //loader.show(options);
    context.plant = plant;
    getMainList(plant).then(p => {
        //conFs.hilera = p;
        context.hilera = p;
        return p;
    }).then(x => {
        //loader.hide();
        let opt = {
            moduleName: 'PlantDashboard/HileraStatus/index',
            context: context,
            clearHistory: false,
            animated: false,
            transition: {
                name: "slide",
                duration: 380,
                curve: "easeOut"
            }
        }
        Topmost().navigate(opt);

    })
}

function getMainList(plant: Plant) {
    var qc = new QueryConfig();
    qc.items = "300";
    qc.schm = "57a4e02ec830e2bdff1a1608";
    // filtero espaldera
    var filter_espaldera = new Filter();
    filter_espaldera.key = "5807af5f31f55d0010aaffe4";
    filter_espaldera.value = plant.getAttribute("5807af5f31f55d0010aaffe4").value;
    filter_espaldera.datatype = "number";

    // filtero hilera
    var filter_hilera = new Filter();
    filter_hilera.key = "5807af9231f55d0010aaffe5";
    filter_hilera.value = plant.getAttribute("5807af9231f55d0010aaffe5").value;
    filter_hilera.datatype = "number";

    qc.filter = [filter_espaldera, filter_hilera];
    var plants = new FindPlants(qc);

    return plants.finds();
}