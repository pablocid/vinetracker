"use strict";
var builder_1 = require('ui/builder');
var grid_layout_1 = require('ui/layouts/grid-layout');
var record_service_1 = require('../../../services/record.service');
var frame_1 = require('ui/frame');
var observable_1 = require('data/observable');
var Schema_1 = require('../../../factories/Schema');
var Context_1 = require('../../../factories/Context');
var QueryParser_1 = require('../../../factories/QueryParser');
var dialogs_1 = require('ui/dialogs');
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
        var context = new Context_1.Context();
        var evaluacion = this._listItems[index];
        context.schema = evaluacion;
        console.log("evaluacion.id " + evaluacion.id);
        var msg = "Evaluar " + evaluacion.getAttr("listViewLabel", "string") + ' por ...';
        var opt1 = "hilera";
        var opt2 = "planta (Código QR)";
        dialogs_1.action({
            message: msg,
            cancelButtonText: "cancelar",
            actions: [opt1, opt2]
        }).then(function (result) {
            if (result === opt1) {
                console.log("La primera opción");
                var navOpts = {
                    moduleName: "PlantDashboard/Localization/index",
                    context: context
                };
                frame_1.topmost().navigate(navOpts);
            }
            if (result === opt2) {
                console.log("La segunda opción");
            }
        });
    };
    EvaluationListView.prototype._setUpView = function (data) {
        var items = data.items;
        //construcción de objeto SchmSchema
        items = items.map(function (c) { return new Schema_1.SchmSchemaObj(c); });
        //filtrar items por createble
        this._listItems = items.filter(function (u) { return u.getAttr("creatable", "boolean"); });
        this._viewModel.set('loading', false);
        var listItemsView = this._listItems.map(function (s) { return { name: s.getAttr("listViewLabel", "string") }; });
        this._viewModel.set('items', listItemsView);
    };
    EvaluationListView.prototype.getView = function () {
        var _this = this;
        var rs = new record_service_1.FindSchm(this._config);
        rs.find().then(function (x) { return _this._setUpView(x); });
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(this._theme);
        return grid;
    };
    return EvaluationListView;
}());
exports.EvaluationListView = EvaluationListView;
//# sourceMappingURL=index.js.map