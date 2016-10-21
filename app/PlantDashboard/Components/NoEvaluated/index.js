"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var NoEvaluated = (function (_super) {
    __extends(NoEvaluated, _super);
    function NoEvaluated() {
        var _this = this;
        _super.call(this);
        this._viewModel.set('selectedOption', function (x) {
            _this._onTap(x.index);
        });
        this._theme.addChild(builder_1.load({
            path: '~/PlantDashboard/Components/NoEvaluated',
            name: 'theme'
        }));
    }
    Object.defineProperty(NoEvaluated.prototype, "items", {
        get: function () {
            return this._viewModel.get('items');
        },
        set: function (value) {
            this._viewModel.set('items', value);
        },
        enumerable: true,
        configurable: true
    });
    NoEvaluated.prototype._onTap = function (index) {
        if (this._callbackOnTap) {
            this._callbackOnTap(index);
        }
    };
    Object.defineProperty(NoEvaluated.prototype, "loading", {
        get: function () {
            return this._viewModel.get('loading');
        },
        set: function (value) {
            this._viewModel.set('loading', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoEvaluated.prototype, "callbackOnTap", {
        get: function () {
            return this._callbackOnTap;
        },
        set: function (value) {
            this._callbackOnTap = value;
        },
        enumerable: true,
        configurable: true
    });
    return NoEvaluated;
}(BaseComponent_1.BaseComponent));
exports.NoEvaluated = NoEvaluated;
//# sourceMappingURL=index.js.map