"use strict";
var RecordService_1 = require('../../services/RecordService');
var MultipleSelection_1 = require('../Components/MultipleSelection');
var NumberList_1 = require('../Components/NumberList');
var SimpleText_1 = require('../Components/SimpleText');
var SelectionList_1 = require('../Components/SelectionList');
var BasePage_1 = require('../../factories/BasePage');
var tab_view_1 = require("ui/tab-view");
var action_bar_1 = require('ui/action-bar');
var frame_1 = require('ui/frame');
var page = new BasePage_1.BasePage();
var tab = new tab_view_1.TabView();
page.mainContent = tab;
page.fnOnLoad = function () {
    var context = page.page.navigationContext;
    /**** for testing */
    /*
    var plantTest = new PlantTest();
    var context = new Context();
    context.plant = plantTest.getPlant();
    context.schema = plantTest.getSchm();
    context.record = plantTest.getRecordFen0();
    */
    /**** */
    //console.log(context.schema.listAttrIds);
    //console.log(context.record.getAttribute("5808de89832db50010d3192c").attrSchm.input.id)
    var tabsItems = [];
    for (var index = 0; index < context.record.schema.listAttrIds.length; index++) {
        //5808de89832db50010d3192c
        var a = context.record.schema.listAttrIds[index];
        var item = new tab_view_1.TabViewItem();
        var attr = context.record.getAttribute(a);
        if (!attr) {
            continue;
        }
        ;
        item.title = attr.attrSchm.properties.shortName;
        var inputId = attr.attrSchm.inputRef;
        console.log(a + ' => ' + inputId);
        var view;
        switch (inputId) {
            //	selection_list
            case '57fe942a45be360010073dbc':
                //context.record.getAttribute(a).value = 'basal';
                view = new SelectionList_1.SelectionList(context.record.getAttribute(a));
                break;
            // simple_text
            case '57c3202cc8307cd5b82f4465':
                view = new SimpleText_1.SimpleText(context.record.getAttribute(a));
                break;
            //	NumberList
            case '5808d0fdd48d17001006e43b':
                //context.record.getAttribute(a).value  = 10;
                view = new NumberList_1.NumberList(context.record.getAttribute(a));
                break;
            //	MultipleSelection
            case '5808dc55832db50010d3192b':
                //context.record.getAttribute(a).value = ['dead_pant']
                view = new MultipleSelection_1.MultipleSelection(context.record.getAttribute(a));
                break;
            //	Scann
            case '57c431d5c8307cd5b82f448a':
                //view = new Scanner(context.record.getAttribute(a));
                break;
        }
        if (view) {
            item.view = view.getView();
            tabsItems.push(item);
        }
    }
    tab.items = tabsItems;
    page.setTitleActionBar(context.plant.getUbicación(), context.record.schema.schm.name);
}; /*********** end fnOnLoad ********************/
var save = new action_bar_1.ActionItem();
save.android.systemIcon = 'ic_menu_save';
save.on('tap', function (x) {
    var context = page.page.navigationContext;
    var plant = context.plant;
    var record = context.record;
    record.getAttribute("57c42f77c8307cd5b82f4486").value = plant.id;
    record.espaldera = plant.getAttribute('5807af5f31f55d0010aaffe4').value;
    record.hilera = plant.getAttribute('5807af9231f55d0010aaffe5').value;
    record.posicion = plant.getAttribute('5807afe331f55d0010aaffe6').value;
    console.log(JSON.stringify(record.data));
    var saveRequest = new RecordService_1.SaveRecord(record);
    saveRequest.save().then(function (s) {
        console.log('Saved ....');
        console.log(JSON.stringify(s));
        frame_1.topmost().navigate({
            moduleName: 'PlantDashboard/HileraStatus/index',
            context: context
        });
    });
});
page.addActionItem(save);
module.exports = page;
//# sourceMappingURL=index.js.map