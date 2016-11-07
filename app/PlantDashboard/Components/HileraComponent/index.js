"use strict";
var List_1 = require('../../UIComponents/List');
var BaseComponent_1 = require('../BaseComponent');
var tab_view_1 = require("ui/tab-view");
var HileraComponent = (function (_super) {
    __extends(HileraComponent, _super);
    function HileraComponent() {
        var _this = this;
        _super.call(this);
        this._tabView = new tab_view_1.TabView();
        this._theme.addChild(this._tabView);
        //******** end tab titles
        this._evaluated = new List_1.ListUIComponent();
        this._evaluated.labelProperty = 'ubicacion';
        this._evaluated.sortByProp('asc', 'position');
        this._evaluated.onChangeListCallback = function (args) {
            _this._updateTabTitles();
        };
        this._evaluated.selectedOption = function (index, item) {
            if (_this._evSelectItemCb) {
                _this._evSelectItemCb(index, item);
            }
        };
        this._nonEvaluated = new List_1.ListUIComponent();
        this._nonEvaluated.labelProperty = 'ubicacion';
        this._nonEvaluated.sortByProp('asc', 'position');
        this._nonEvaluated.onChangeListCallback = function (args) {
            _this._updateTabTitles();
        };
        this._nonEvaluated.selectedOption = function (index, item) {
            if (_this._nonEvSelectItemCb) {
                _this._nonEvSelectItemCb(index, item);
            }
        };
        this._evTab = new tab_view_1.TabViewItem();
        this._evTab.view = this._evaluated.getView();
        this.evTabTitle = 'evaluados';
        this._nonTab = new tab_view_1.TabViewItem();
        this._nonTab.view = this._nonEvaluated.getView();
        this.nonEvTabTitle = 'no evaluados';
        this._tabView.items = [this._nonTab, this._evTab];
    }
    HileraComponent.prototype._updateTabTitles = function () {
        this._evTab.title = this._evaluated.length + ' ' + this.evTabTitle;
        this._nonTab.title = this._nonEvaluated.length + ' ' + this.nonEvTabTitle;
    };
    HileraComponent.prototype.removeAllItems = function () {
        this._mainList = [];
        this._evaluated.removeAllItems();
        this._nonEvaluated.removeAllItems();
    };
    Object.defineProperty(HileraComponent.prototype, "evTabTitle", {
        get: function () {
            return this._evTabTitle;
        },
        set: function (value) {
            this._evTabTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraComponent.prototype, "nonEvTabTitle", {
        get: function () {
            return this._nonEvTabTitle;
        },
        set: function (value) {
            this._nonEvTabTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraComponent.prototype, "evSelectItemCb", {
        get: function () {
            return this._evSelectItemCb;
        },
        set: function (value) {
            this._evSelectItemCb = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraComponent.prototype, "nonEvSelectItemCb", {
        get: function () {
            return this._nonEvSelectItemCb;
        },
        set: function (value) {
            this._nonEvSelectItemCb = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraComponent.prototype, "mainList", {
        get: function () {
            return this._mainList;
        },
        set: function (value) {
            this._mainList = value;
            this._nonEvaluated.items = value;
        },
        enumerable: true,
        configurable: true
    });
    HileraComponent.prototype.setOrder = function (value) {
        if (value === 'asc' || value === 'desc') {
            this._nonEvaluated.sortByProp(value);
            this._evaluated.sortByProp(value);
        }
    };
    Object.defineProperty(HileraComponent.prototype, "restrictionItems", {
        set: function (values) {
            this._nonEvaluated.removeItems(values, '_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraComponent.prototype, "evaluatedItems", {
        set: function (values) {
            if (!this._mainList || this._mainList.length === 0) {
                return;
            }
            this._nonEvaluated.removeItems(values, '_id');
            var evList = this._mainList.map(function (x) { return x.id; });
            var ev = [];
            var noev = [];
            for (var i = 0; i < values.length; i++) {
                var ei = evList.indexOf(values[i]);
                if (ei !== -1) {
                    ev.push(this._mainList[ei]);
                }
                else {
                    noev.push(this._mainList[ei]);
                }
            }
            this._evaluated.items = ev;
        },
        enumerable: true,
        configurable: true
    });
    return HileraComponent;
}(BaseComponent_1.BaseComponent));
exports.HileraComponent = HileraComponent;
//# sourceMappingURL=index.js.map