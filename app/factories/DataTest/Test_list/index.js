"use strict";
var List_1 = require('../../../PlantDashboard/UIComponents/List');
var BasePage_1 = require('../../BasePage');
var observable_1 = require("data/observable");
var action_bar_1 = require('ui/action-bar');
var list = new BasePage_1.BasePage();
var listComp = new List_1.ListUIComponent();
var arr = [
    { id: 9, name: 'P2' },
    { id: 8, name: 'P3' },
    { id: 7, name: 'P4' },
    { id: 10, name: 'P1' }
];
var obsArr = arr.map(function (x) { return new observable_1.Observable(x); });
listComp.items = obsArr;
var title = new observable_1.Observable();
title.set('title', 'Hilera Test');
title.set('subTitle', listComp.length);
list.setTitleActionBar('ok', 'ok', title);
listComp.selectedOption = function (index, item) {
    console.log(index);
    console.log(item.get('label'));
    listComp.removeItem(index);
};
list.mainContent = listComp.getView();
var desc = new action_bar_1.ActionItem();
desc.text = 'desc';
desc.android.position = 'popup';
desc.on('tap', function () {
    listComp.sortByProp('desc');
});
list.addActionItem(desc);
var asc = new action_bar_1.ActionItem();
asc.text = 'asc';
asc.android.position = 'popup';
asc.on('tap', function () {
    listComp.sortByProp('asc');
});
list.addActionItem(asc);
var add = new action_bar_1.ActionItem();
add.text = 'add';
add.android.position = 'popup';
add.on('tap', function () {
    listComp.addItem(new observable_1.Observable({ "id": 11, "name": "P0" }));
    listComp.addItem(new observable_1.Observable({ "id": 9, "name": "P2" }));
    listComp.addItem(new observable_1.Observable({ "id": 6, "name": "P5" }));
    listComp.addItem(new observable_1.Observable({ "id": 5, "name": "P8" }));
});
list.addActionItem(add);
var label = new action_bar_1.ActionItem();
label.text = 'label';
label.android.position = 'popup';
label.on('tap', function () {
    listComp.labelProperty = 'id';
});
list.addActionItem(label);
var rm = new action_bar_1.ActionItem();
rm.text = 'remove';
rm.android.position = 'popup';
rm.on('tap', function () {
    listComp.removeItems([11, 9, 6, 5], 'id');
});
list.addActionItem(rm);
module.exports = list;
//# sourceMappingURL=index.js.map