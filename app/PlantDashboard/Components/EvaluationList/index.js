"use strict";
var RecordService_1 = require('../../../services/RecordService');
var builder_1 = require('ui/builder');
var grid_layout_1 = require('ui/layouts/grid-layout');
var observable_1 = require('data/observable');
var QueryParser_1 = require('../../../factories/QueryParser');
var EvaluationListView = (function () {
    function EvaluationListView() {
        var _this = this;
        this._theme = builder_1.load({
            name: 'theme',
            path: '~/PlantDashboard/Components/EvaluationList'
        });
        this._config = new QueryParser_1.QueryConfig();
        this._filter = new QueryParser_1.Filter();
        this._filter.key = 'attributes';
        this._filter.value = { $in: ['57c42f77c8307cd5b82f4486'] };
        this._filter.datatype = 'list';
        this._config.filter = [this._filter];
        this._viewModel = new observable_1.Observable();
        this._viewModel.set('loading', true);
        this._viewModel.set('selectedOption', function (args) {
            var index = args.index;
            _this._onTapItem(index);
        });
        this._theme.bindingContext = this._viewModel;
    }
    EvaluationListView.prototype._onTapItem = function (index) {
        var evaluacion = this._listItems[index];
        if (this._callbackOnSelection) {
            this._callbackOnSelection(evaluacion);
        }
    };
    EvaluationListView.prototype._setUpView = function (items) {
        //filtrar items por createble
        this._listItems = items.filter(function (u) { return u.getAttr("creatable", "boolean"); });
        this._viewModel.set('loading', false);
        var listItemsView = this._listItems.map(function (s) { return { name: s.getAttr("listViewLabel", "string") }; });
        this._viewModel.set('items', listItemsView);
    };
    EvaluationListView.prototype.onLoadedPage = function () {
        var _this = this;
        this._viewModel.set('loading', true);
        var rs = new RecordService_1.FindSchm(this._config);
        rs.find().then(function (x) { return _this._setUpView(x); });
    };
    EvaluationListView.prototype.getView = function () {
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(this._theme);
        return grid;
    };
    Object.defineProperty(EvaluationListView.prototype, "callbackOnSelection", {
        get: function () {
            return this._callbackOnSelection;
        },
        set: function (value) {
            this._callbackOnSelection = value;
        },
        enumerable: true,
        configurable: true
    });
    return EvaluationListView;
}());
exports.EvaluationListView = EvaluationListView;
//# sourceMappingURL=index.js.map