"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var observable_1 = require('data/observable');
var SimpleText = (function (_super) {
    __extends(SimpleText, _super);
    function SimpleText(attr) {
        var _this = this;
        _super.call(this, attr);
        this._props = this._properties;
        var viewTemplate = builder_1.load({
            path: '~/PlantDashboard/Components/SimpleText',
            name: 'theme'
        });
        this._theme.addChild(viewTemplate);
        this._viewModel.set('label', this._props.label);
        this._viewModel.set('value', this._recordAttr.value);
        this._viewModel.on(observable_1.Observable.propertyChangeEvent, function (x) {
            if (x.propertyName === 'value') {
                _this._recordAttr.value = x.value || '';
            }
        });
    }
    return SimpleText;
}(BaseComponent_1.BaseInputComponent));
exports.SimpleText = SimpleText;
//# sourceMappingURL=index.js.map