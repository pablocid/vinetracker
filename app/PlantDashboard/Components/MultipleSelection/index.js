"use strict";
var BaseComponent_1 = require('../BaseComponent');
var observable_1 = require('data/observable');
var observable_array_1 = require("data/observable-array");
var builder_1 = require('ui/builder');
var MultipleSelection = (function (_super) {
    __extends(MultipleSelection, _super);
    function MultipleSelection(attr) {
        var _this = this;
        _super.call(this, attr);
        this._props = this._properties;
        this._options = new observable_array_1.ObservableArray(this._props.options.map(function (x, i) {
            var o = new observable_1.Observable();
            o.set('checked', false);
            o.set("value", x.string);
            o.on(observable_1.Observable.propertyChangeEvent, function (x) {
                if (x.propertyName === 'checked') {
                    _this._onChange(x, i);
                }
            });
            return o;
        }));
        this._viewModel.set('itemsDD', this._props.options.map(function (x) { return x.string; }));
        this._viewModel.set('items', this._options);
        var dropDown = builder_1.load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'dropdown'
        });
        var optionList = builder_1.load({
            path: '~/PlantDashboard/Components/MultipleSelection',
            name: 'theme'
        });
        var imageList = builder_1.load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'imageList'
        });
        var ft = this._props.formType;
        console.log(ft);
        if (ft && ft === 'optionsList' || ft === 'dropDown' || ft === 'imageList') {
            if (this._props.formType === 'optionsList') {
                this._theme.addChild(optionList);
            }
            if (this._props.formType === 'dropDown') {
                this._theme.addChild(dropDown);
            }
            if (this._props.formType === 'imageList') {
                this._theme.addChild(imageList);
            }
        }
        else {
            this._theme.addChild(optionList);
        }
        this._setValue();
    }
    MultipleSelection.prototype._setImgUrl = function (name) {
        return "~/img/" + name + ".png";
    };
    MultipleSelection.prototype._onChange = function (args, index) {
        //console.log(args.eventName + ' at the index '+index+': '+args.value);
        var item = this._props.options[index].id;
        var value = args.value;
        if (!this._recordAttr.value) {
            this._recordAttr.value = [];
        }
        var i = this._recordAttr.value.indexOf(item);
        if (value) {
            if (i === -1) {
                this._recordAttr.value.push(item);
            }
        }
        else {
            if (i !== -1) {
                this._recordAttr.value.splice(i, 1);
            }
        }
        console.log(this._recordAttr.value);
    };
    MultipleSelection.prototype._setValue = function () {
        var _this = this;
        var items = this._recordAttr.value;
        if (items && items.length) {
            items.forEach(function (x) {
                var index = _this._props.options.map(function (s) { return s.id; }).indexOf(x);
                if (index !== -1) {
                    _this._options.getItem(index).set('checked', true);
                }
            });
        }
    };
    MultipleSelection.prototype._selectedOption = function (args) {
        //let index = args.index;
        console.log(args);
    };
    return MultipleSelection;
}(BaseComponent_1.BaseInputComponent));
exports.MultipleSelection = MultipleSelection;
//# sourceMappingURL=index.js.map