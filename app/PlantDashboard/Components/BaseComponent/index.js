"use strict";
var observable_1 = require('data/observable');
var grid_layout_1 = require('ui/layouts/grid-layout');
var BaseComponent = (function () {
    function BaseComponent() {
        this._viewModel = new observable_1.Observable();
        this._theme = new grid_layout_1.GridLayout();
        this._theme.bindingContext = this._viewModel;
    }
    BaseComponent.prototype.getView = function () {
        return this._theme;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
var BaseInputComponent = (function (_super) {
    __extends(BaseInputComponent, _super);
    function BaseInputComponent(attr) {
        _super.call(this);
        this._recordAttr = attr;
        //console.log(JSON.stringify(this._recordAttr.attrSchm.properties))
        this._properties = this._recordAttr.attrSchm.properties;
        this._viewModel.set('label', this._properties.label);
    }
    BaseInputComponent.prototype._callback = function (value) {
        if (this._onChangeDataCallback) {
            this._onChangeDataCallback(value);
        }
    };
    Object.defineProperty(BaseInputComponent.prototype, "onChangeDataCallback", {
        get: function () {
            return this._onChangeDataCallback;
        },
        set: function (value) {
            this._onChangeDataCallback = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseInputComponent.prototype, "onSaveDataCallback", {
        get: function () {
            return this._onSaveDataCallback;
        },
        set: function (value) {
            this._onSaveDataCallback = value;
        },
        enumerable: true,
        configurable: true
    });
    return BaseInputComponent;
}(BaseComponent));
exports.BaseInputComponent = BaseInputComponent;
//# sourceMappingURL=index.js.map