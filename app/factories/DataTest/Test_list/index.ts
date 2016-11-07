import { ListUIComponent } from '../../../PlantDashboard/UIComponents/List';
import { BasePage } from '../../BasePage';
import { ObservableArray, ChangedData } from 'data/observable-array';
import { Observable, EventData } from "data/observable";
import { ActionItem } from 'ui/action-bar';

var list = new BasePage();

var listComp = new ListUIComponent();

var arr = [
    { id: 9, name: 'P2' },
    { id: 8, name: 'P3' },
    { id: 7, name: 'P4' },
    { id: 10, name: 'P1' }
]
var obsArr = arr.map(x => new Observable(x));


listComp.items = obsArr;

var title = new Observable();
title.set('title','Hilera Test');
title.set('subTitle',listComp.length);

list.setTitleActionBar('ok','ok', title);

listComp.selectedOption = function (index: number, item: Observable) {
    console.log(index);
    console.log(item.get('label'));
    listComp.removeItem(index);
}

list.mainContent = listComp.getView();

var desc = new ActionItem();
desc.text = 'desc';
desc.android.position = 'popup';
desc.on('tap', () => {
    listComp.sortByProp('desc');
});
list.addActionItem(desc);

var asc = new ActionItem();
asc.text = 'asc';
asc.android.position = 'popup';
asc.on('tap', () => {
    listComp.sortByProp('asc');
});
list.addActionItem(asc);

var add = new ActionItem();
add.text = 'add';
add.android.position = 'popup';
add.on('tap', () => {
    listComp.addItem(new Observable({ "id": 11, "name": "P0" }));
    listComp.addItem(new Observable({ "id": 9, "name": "P2" }));
    listComp.addItem(new Observable({ "id": 6, "name": "P5" }));
    listComp.addItem(new Observable({ "id": 5, "name": "P8" }));
});
list.addActionItem(add);

var label = new ActionItem();
label.text = 'label';
label.android.position = 'popup';
label.on('tap', () => {
    listComp.labelProperty = 'id';
});
list.addActionItem(label);

var rm = new ActionItem();
rm.text = 'remove';
rm.android.position = 'popup';
rm.on('tap', () => {
    listComp.removeItems([11,9,6,5],'id');
});
list.addActionItem(rm);
export = list;