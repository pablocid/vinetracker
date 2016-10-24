import {Record} from '../../Record';
import {PlantTest} from '../';
import {SelectionList} from '../../../PlantDashboard/Components/SelectionList';
import {BasePage} from '../../BasePage';


var page = new BasePage();
var plant = new PlantTest()

var record = new Record(plant.schmF1);
var sl = new SelectionList(record.getAttribute('580c121390cc2700100db1d3'));
    page.mainContent = sl.getView();

page.fnOnLoad = function(){
    
}



export = page;