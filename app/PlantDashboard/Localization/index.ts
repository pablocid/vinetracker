
import { BasePage } from '../../factories/BasePage';
import { parse as Parse, load as Load } from 'ui/builder';
import { EventData } from 'data/observable';
import { topmost as Topmost} from 'ui/frame';
import { TabView, TabViewItem } from 'ui/tab-view';
import { StackLayout } from 'ui/layouts/stack-layout';
import { SumaryReport } from '../Components/EvaluationReport';
import { ScanHStatus } from '../Components/ScanHStatus';

var tab = new TabView();
var resumenView = new SumaryReport();

/**************** tabitems: SCAN ********************/
var scan = new TabViewItem();
scan.title = 'scan';
var scanView = new ScanHStatus();

scan.view = scanView.getView();

/**************** tabitems: Ubicacion ********************/
var ubicacion = new TabViewItem();
ubicacion.title = 'ubicación';
var sl = new StackLayout();
sl.addChild(Parse(`
<StackLayout>
    <Label text="Localization"></Label>
</StackLayout>
`))
ubicacion.view = sl;

var resumen = new TabViewItem();
resumen.title = 'resumen';
resumen.view = resumenView.getView();

tab.items = [scan, ubicacion, resumen];

var localization = new BasePage();
localization.mainContent = tab;
localization.setTitleActionBar('Localización','Elige la hilera que quires evaluar');

export = localization;