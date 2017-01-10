"use strict";
var BaseComponent_1 = require('../BaseComponent');
var observable_1 = require('data/observable');
var observable_array_1 = require("data/observable-array");
var builder_1 = require('ui/builder');
var SelectionList = (function (_super) {
    __extends(SelectionList, _super);
    function SelectionList(attr) {
        var _this = this;
        _super.call(this, attr);
        this._props = this._properties;
        this._options = new observable_array_1.ObservableArray(this._props.options.map(function (x, i) {
            return {
                backgroundColor: 'white',
                color: 'gray',
                value: x.string,
                key: x.id,
                index: i,
                img: _this._setImgUrl(x.id)
            };
        }));
        this._viewModel.set('itemsDD', this._props.options.map(function (x) { return x.string; }));
        this._viewModel.set('items', this._options);
        var dropDown = builder_1.load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'dropdown'
        });
        var optionList = builder_1.load({
            path: '~/PlantDashboard/Components/SelectionList',
            name: 'optionlist'
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
        this._viewModel.on(observable_1.Observable.propertyChangeEvent, function (args) {
            if (args.propertyName === 'selectedIndex' && args.value !== -1) {
                //console.log("PropertyChangeDataPropertyChangeDataPropertyChangeData   "+this._viewModel.get('selectedIndex') )
                var item = _this._options.getItem(_this._viewModel.get('selectedIndex'));
                console.log('item --------------------' + item.key);
                _this._recordAttr.value = item.key;
                var imgUri = "~/img/" + item.key + ".png";
                _this._viewModel.set('selected', { key: item.key, value: item.value, img: imgUri });
                _this._changeView(item.index);
            }
            _this._callback();
            //console.log(JSON.stringify(this._recordAttr.data));
        });
        this._viewModel.set('selectedOption', function (args) {
            var index = args.index;
            _this._viewModel.set('selectedIndex', index);
        });
        this._viewModel.set('noSelection', function () {
            console.log('no selection');
            _this._recordAttr.value = '';
            _this._viewModel.set('selectedIndex', -1);
            _this._changeView();
        });
        this._setValue();
    }
    SelectionList.prototype._setImgUrl = function (name) {
        return "~/img/" + name + ".png";
    };
    SelectionList.prototype._setValue = function () {
        var index = this._options.map(function (x) { return x.key; }).indexOf(this._recordAttr.value);
        console.log('index SelectionList: ' + index);
        if (index !== -1) {
            console.log('enter');
            this._viewModel.set('selectedIndex', index);
        }
    };
    SelectionList.prototype._changeView = function (index) {
        this._options.map(function (x) {
            x.backgroundColor = 'white';
            x.color = 'gray';
        });
        if (index !== undefined) {
            var opt = this._options.getItem(index);
            opt.color = 'white';
            opt.backgroundColor = '#f44242';
            this._options.setItem(index, opt);
        }
        else {
            var opt = this._options.getItem(0);
            opt.color = 'gray';
            opt.backgroundColor = 'white';
            this._options.setItem(index, opt);
        }
    };
    return SelectionList;
}(BaseComponent_1.BaseInputComponent));
exports.SelectionList = SelectionList;
//# sourceMappingURL=index.js.map