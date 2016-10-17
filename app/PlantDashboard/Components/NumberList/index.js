"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var observable_1 = require('data/observable');
var NumberList = (function (_super) {
    __extends(NumberList, _super);
    function NumberList(attr) {
        _super.call(this, attr);
        this._props = this._properties;
        this._setIntegers();
        this._setFloat();
        /*** template ***/
        var dropDown = builder_1.load({
            path: '~/PlantDashboard/Components/NumberList',
            name: 'theme'
        });
        this._theme.addChild(dropDown);
        //change listener 
        this._onChange();
        this._setValue();
    }
    NumberList.prototype._setIntegers = function () {
        this._integers = [];
        this._integersView = [];
        var min = this._props.minVal || 0;
        var max = this._props.maxVal || 10;
        for (var index = min; index <= max; index++) {
            var optView = index + ' ' + this._props.unit;
            this._integers.push(index);
            this._integersView.push(optView);
        }
        this._viewModel.set('integerItems', this._integers);
    };
    NumberList.prototype._setFloat = function () {
        if (!this._props.floatOpt) {
            return;
        }
        this._float = [];
        this._floatView = [];
        this._viewModel.set('isItemVisible', true);
        switch (this._props.floatOpt) {
            case 'even':
                this._setEvenFloat();
                break;
            case 'odd':
                this._setOddFloat();
                break;
            case 'half':
                this._setHalfFloat();
                break;
            case 'all':
                this._setAllFloat();
            default:
                this._setAllFloat();
        }
        this._viewModel.set('floatItems', this._floatView);
    };
    NumberList.prototype._onChange = function () {
        var _this = this;
        this._viewModel.on(observable_1.Observable.propertyChangeEvent, function (args) {
            if (args.propertyName === 'intIndex' || args.propertyName === 'floatIndex') {
                var iF = _this._viewModel.get('floatIndex');
                var iI = _this._viewModel.get('intIndex');
                _this._recordAttr.value = _this._mergeValue(iI, iF);
                _this._viewModel.set('value', _this._recordAttr.value + ' ' + _this._props.unit);
                console.log(JSON.stringify(_this._recordAttr.data));
            }
        });
    };
    NumberList.prototype._setEvenFloat = function () {
        for (var i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                this._float.push(i);
                this._floatView.push('.' + i);
            }
        }
    };
    NumberList.prototype._setOddFloat = function () {
        for (var i = 0; i < 10; i++) {
            if (i % 2 !== 0) {
                this._float.push(i);
                this._floatView.push('.' + i);
            }
        }
    };
    NumberList.prototype._setHalfFloat = function () {
        var h = [0, 5];
        this._float = h;
        this._floatView = h.map(function (x) { return '.' + x; });
    };
    NumberList.prototype._mergeValue = function (int, float) {
        var intValue = this._integers[int];
        var floatValue;
        if (this._float && this._float.length) {
            floatValue = this._float[float];
        }
        if (floatValue) {
            return parseFloat(intValue + '.' + floatValue);
        }
        else {
            return parseInt(intValue + '');
        }
    };
    NumberList.prototype._setAllFloat = function () {
        for (var i = 0; i < 10; i++) {
            this._float.push(i);
            this._floatView.push('.' + i);
        }
    };
    NumberList.prototype._setValue = function () {
        if (this._recordAttr.value === undefined) {
            return;
        }
        var value = this._recordAttr.value;
        this._viewModel.set('value', value + ' ' + this._props.unit);
        //number to string and separate the dot portion
        var vArr = value.toString().split('.');
        var iInt;
        var iFloat;
        if (vArr.length > 0) {
            iInt = this._integers.indexOf(parseInt(vArr[0]));
            if (iInt !== -1) {
                this._viewModel.set('intIndex', iInt);
            }
            if (vArr.length === 2) {
                iFloat = this._float.indexOf(parseInt(vArr[1]));
                if (iFloat !== -1) {
                    this._viewModel.set('floatIndex', iFloat);
                }
            }
        }
    };
    return NumberList;
}(BaseComponent_1.BaseInputComponent));
exports.NumberList = NumberList;
//# sourceMappingURL=index.js.map