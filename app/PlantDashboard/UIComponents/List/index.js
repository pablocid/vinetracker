"use strict";
var observable_array_1 = require('data/observable-array');
var observable_1 = require("data/observable");
var grid_layout_1 = require('ui/layouts/grid-layout');
var builder_1 = require('ui/builder');
var BaseUIComponent = (function () {
    function BaseUIComponent() {
        this._viewModel = new observable_1.Observable();
        this._theme = new grid_layout_1.GridLayout();
        this._theme.bindingContext = this._viewModel;
    }
    BaseUIComponent.prototype.getView = function () {
        return this._theme;
    };
    return BaseUIComponent;
}());
exports.BaseUIComponent = BaseUIComponent;
var ListUIComponent = (function (_super) {
    __extends(ListUIComponent, _super);
    function ListUIComponent() {
        var _this = this;
        _super.call(this);
        this._listRef = new observable_array_1.ObservableArray(new observable_1.Observable);
        this._listRef.pop();
        this._theme.addChild(builder_1.load({
            path: '~/PlantDashboard/UIComponents/List',
            name: 'list'
        }));
        this._labelProperty = new observable_1.Observable();
        this._labelProperty.set('ListViewPropertyLabel', 'name');
        this._labelProperty.on(observable_1.Observable.propertyChangeEvent, function (prop) {
            if (prop.propertyName === 'ListViewPropertyLabel') {
                _this._setPropertyLabel();
            }
        });
        this._order = new observable_1.Observable();
        this._order.on(observable_1.Observable.propertyChangeEvent, function (prop) {
            if (prop.propertyName === 'sort') {
                _this._sortList();
            }
        });
    }
    Object.defineProperty(ListUIComponent.prototype, "items", {
        get: function () {
            return this._viewModel.get('items');
        },
        set: function (value) {
            var itms = value.map(function (x) {
                return new observable_1.Observable({ ListViewPropertyLabel: 'loading', item: x });
            });
            this._listRef.push(itms);
            this._viewModel.set('items', this._listRef);
            this._setPropertyLabel();
            this._sortList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListUIComponent.prototype, "listRef", {
        get: function () {
            return this._listRef;
        },
        set: function (value) {
            this._listRef = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListUIComponent.prototype, "labelProperty", {
        get: function () {
            return this._labelProperty.get('ListViewPropertyLabel');
        },
        set: function (value) {
            this._labelProperty.set('ListViewPropertyLabel', value);
        },
        enumerable: true,
        configurable: true
    });
    ListUIComponent.prototype._setPropertyLabel = function () {
        var _this = this;
        if (this._listRef) {
            this._listRef.map(function (x, i) {
                var label = x.get('item')[_this.labelProperty];
                if (label) {
                    x.set('ListViewPropertyLabel', label);
                }
                if (x.get('item').record) {
                    var record = x.get('item').record;
                    if (record.isWarn()) {
                        x.set('icon', String.fromCharCode(parseInt('f079', 16)));
                    }
                }
                return x;
            });
        }
    };
    ListUIComponent.prototype.getItem = function (index) {
        var items = this._viewModel.get('items');
        return items.getItem(index);
    };
    ListUIComponent.prototype.removeItem = function (index) {
        this._listRef.splice(index, 1);
    };
    ListUIComponent.prototype.removeItemById = function (id) {
        var i = this._listRef.map(function (x) { return x.get('item')['id']; }).indexOf(id);
        if (i !== -1) {
            this.removeItem(i);
        }
    };
    ListUIComponent.prototype.removeItems = function (items, property) {
        if (!Array.isArray(items)) {
            console.log('ListUIComponent.removeItems: el argumento "items" no es un Array');
            return;
        }
        /*
        items.forEach(item => {
            let i = this._listRef.map(x => x.get('item')[property]).indexOf(item);
            if (i !== -1) { this.removeItem(i); }
        });*/
        for (var index = 0; index < items.length; index++) {
            var i = this._listRef.map(function (x) { return x.get('item')[property]; }).indexOf(items[index]);
            if (i !== -1) {
                this.removeItem(i);
            }
        }
    };
    ListUIComponent.prototype.skipThisItems = function (items, property) {
        var _this = this;
        if (!Array.isArray(items)) {
            console.log('ListUIComponent.removeItems: el argumento "items" no es un Array');
            return;
        }
        var fil = this._listRef.filter(function (x) {
            for (var e = 0; e < items.length; e++) {
                if (items[e] === x.get('item')[property]) {
                    return true;
                }
            }
            return false;
        });
        this.removeAllItems();
        fil.forEach(function (s) {
            _this._listRef.push(s);
        });
    };
    ListUIComponent.prototype.removeAllItems = function () {
        var length = this._listRef.length;
        this._listRef.splice(0, length);
    };
    ListUIComponent.prototype.addItem = function (value) {
        console.log('-------------------------------- addItem => ---------------------------------------');
        var item = new observable_1.Observable({ ListViewPropertyLabel: 'name', item: value });
        console.log('-------------------------------- addItem => ---------------------------------------');
        var label = item.get('item')[this.labelProperty];
        console.log('-------------------------------- addItem => ---------------------------------------');
        if (label) {
            item.set('ListViewPropertyLabel', label);
        }
        if (item.get('item').record) {
            var record = item.get('item').record;
            if (record.isWarn()) {
                item.set('icon', String.fromCharCode(parseInt('f079', 16)));
            }
        }
        console.log('-------------------------------- addItem => before push: ' + this.listRef.length);
        this._listRef.push(item);
        console.log(' -------------------------------- addItem => after push: ' + this.listRef.length);
        this._sortList();
    };
    ListUIComponent.prototype.updateItem = function (id, record) {
        var index = this._listRef.map(function (x) { return x.get('item').id; }).indexOf(id);
        if (index !== -1) {
            var item = this._listRef.getItem(index);
            var plant = item.get('item');
            plant.record = record;
            if (record.isWarn()) {
                item.set('icon', String.fromCharCode(parseInt('f079', 16)));
            }
            else {
                item.set('icon', '');
            }
        }
    };
    ListUIComponent.prototype.sortByProp = function (direction, property) {
        if (!direction) {
            direction = this._order.get('sort') ? this._order.get('sort').direction : 'asc';
        }
        if (!property) {
            property = this._order.get('sort') ? this._order.get('sort').property : 'ListViewPropertyLabel';
        }
        this._order.set('sort', { direction: direction, property: property });
    };
    Object.defineProperty(ListUIComponent.prototype, "selectedOption", {
        set: function (fn) {
            var _this = this;
            this._viewModel.set('selectedOption', function (args) {
                fn(args.index, _this.getItem(args.index).get('item'));
            });
        },
        enumerable: true,
        configurable: true
    });
    ListUIComponent.prototype._sortList = function () {
        var array = this._listRef;
        var direction = this._order.get('sort') ? this._order.get('sort').direction : 'asc';
        var property = this._order.get('sort') ? this._order.get('sort').property : 'ListViewPropertyLabel';
        if (!array || array.length === 0) {
            return;
        }
        if (direction === 'asc') {
            array.sort(function (a, b) {
                if (a.get('item')[property] < b.get('item')[property]) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }
        if (direction === 'desc') {
            array.sort(function (a, b) {
                //console.log('sortByProp: '+ property+' - '+a.get(property))
                if (a.get('item')[property] > b.get('item')[property]) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }
        array.push(new observable_1.Observable());
        array.pop();
    };
    Object.defineProperty(ListUIComponent.prototype, "length", {
        get: function () {
            return this._listRef.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListUIComponent.prototype, "onChangeListCallback", {
        set: function (fn) {
            this._listRef.on(observable_array_1.ObservableArray.changeEvent, function (args) {
                fn(args);
            });
        },
        enumerable: true,
        configurable: true
    });
    return ListUIComponent;
}(BaseUIComponent));
exports.ListUIComponent = ListUIComponent;
//# sourceMappingURL=index.js.map