/**
 * En esta seccion se listan todas las evaluaciones que estan actualmente disponibles para introducir datos
 */
import {Page} from 'ui/page';
import {EventData} from 'data/observable';
var RecordService = require("../../services/record.service");
import {HelperViewer} from  "../../services/helperViewer/";
import {SchmSchemaObj} from '../../factories/Schema';
import {Context} from '../../factories/Context';
import {topmost as Topmost} from 'ui/frame';

function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    var context = <Context>page.navigationContext;
    var schemaRecord = context.schema;
    var view = new HelperViewer();
    view.theme = `
        <ListView items="{{ items }}" itemTap="{{selectedOption}}">
            <ListView.itemTemplate>
                <GridLayout columns="30, *" style="font-size:20; padding:10; padding-bottom:50; padding-top:50;">
                    <Label text="" col="0" />
                    <Label text="{{ name }}" col="0" textWrap="true" col="1"/>
                </GridLayout>
            </ListView.itemTemplate>
        </ListView>
    `;
    function onTapItem(args){
        let index = args.index;
        let selection = view.listItems[index];
        let navOpts = {
            moduleName:selection.link,
            context:context
        }
        Topmost().navigate(navOpts);
    }
    var items = [
            {name:"Plantas evaluadas", link:"PlantDashboard/Evaluations/Evaluated/index"},
            {name:"Plantas no evaluadas", link:"PlantDashboard/Evaluations/NotEvaluated/index"}
            ];
    view.listItems = items;
    view.setBindingContext({
        selectedOption:onTapItem, 
        items:view.listItems
    })
    page.content = view.getContent();
}

exports.createPage = function createPage() {
    var page = new Page();
    page.on(Page.navigatedToEvent, onNavigatedTo);
    return page;
}