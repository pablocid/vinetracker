"use strict";
var RecordService_1 = require('../../../services/RecordService');
var builder_1 = require('ui/builder');
var grid_layout_1 = require('ui/layouts/grid-layout');
var frame_1 = require('ui/frame');
var observable_1 = require('data/observable');
var Context_1 = require('../../../factories/Context');
var QueryParser_1 = require('../../../factories/QueryParser');
var SumaryReport = (function () {
    function SumaryReport() {
        var _this = this;
        this._loadOpt = {
            name: 'theme',
            path: '~/PlantDashboard/Components/EvaluationReport'
        };
        this._theme = builder_1.load(this._loadOpt);
        this._config = new QueryParser_1.QueryConfig();
        this._filter = new QueryParser_1.Filter();
        this._filter.key = 'attributes';
        this._filter.value = { $in: ['57c42f77c8307cd5b82f4486'] };
        this._filter.datatype = 'list';
        this._config.filter = [this._filter];
        this._viewModel = new observable_1.Observable();
        var self = this;
        this._viewModel.on(observable_1.Observable.propertyChangeEvent, function (args) {
            if (args.propertyName === 'selectedIndex') {
                console.log(self._viewModel.get('enteros')[args.value]);
            }
        });
        this._viewModel.set('loading', true);
        this._viewModel.set('enteros', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this._viewModel.set('selectedOption', function (args) {
            var index = args.index;
            _this._onTapItem(index);
        });
        this._theme.bindingContext = this._viewModel;
    }
    SumaryReport.prototype._onTapItem = function (index) {
        var context = new Context_1.Context();
        var navOpts = {
            moduleName: "PlantDashboard/index",
            context: context
        };
        frame_1.topmost().navigate(navOpts);
    };
    SumaryReport.prototype._setUpView = function (data) {
    };
    SumaryReport.prototype.onLoadedPage = function () {
        var rs = new RecordService_1.FindSchm(this._config);
        this._viewModel.set('loading', true);
    };
    SumaryReport.prototype.getView = function () {
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(this._theme);
        return grid;
    };
    return SumaryReport;
}());
exports.SumaryReport = SumaryReport;
//# sourceMappingURL=index.js.map