"use strict";
var Record_1 = require('../../Record');
var _1 = require('../');
var SelectionList_1 = require('../../../PlantDashboard/Components/SelectionList');
var BasePage_1 = require('../../BasePage');
var page = new BasePage_1.BasePage();
var plant = new _1.PlantTest();
var record = new Record_1.Record(plant.schmF1);
var sl = new SelectionList_1.SelectionList(record.getAttribute('580c121390cc2700100db1d3'));
page.mainContent = sl.getView();
page.fnOnLoad = function () {
};
module.exports = page;
//# sourceMappingURL=index.js.map