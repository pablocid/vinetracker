"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var SaveComponent = (function (_super) {
    __extends(SaveComponent, _super);
    function SaveComponent() {
        var _this = this;
        _super.call(this);
        this._viewModel.set('description', 'Guardar registro');
        this._viewModel.set('onSave', function () {
            if (_this._callback) {
                console.log('on trigger callback');
                _this.saveBtnDisabled();
                _this._callback(true);
            }
        });
        this._viewModel.set('enabledBackground', '#0D47A1');
        this._viewModel.set('enabledColor', 'white');
        this.saveBtnEnabled();
        this._viewModel.set('onCancel', function () {
            if (_this._callback) {
                console.log('on trigger callback');
                _this._callback(false);
            }
        });
        this._theme.addChild(builder_1.load({ name: 'theme', path: '~/PlantDashboard/Components/SaveComponent' }));
    }
    Object.defineProperty(SaveComponent.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        set: function (value) {
            this._callback = value;
        },
        enumerable: true,
        configurable: true
    });
    SaveComponent.prototype.saveBtnEnabled = function () {
        this._viewModel.set('enabledBtn', true);
        this._viewModel.set('saveBtnText', 'guardar');
    };
    SaveComponent.prototype.saveBtnDisabled = function () {
        this._viewModel.set('enabledBtn', false);
        this._viewModel.set('saveBtnText', 'guardando ...');
    };
    SaveComponent.prototype.toggleSaveBtn = function () {
        if (this._viewModel.get('enabledBtn')) {
            this._viewModel.set('enabledBtn', false);
            this._viewModel.set('saveBtnText', 'guardando ...');
        }
        else {
            this._viewModel.set('enabledBtn', true);
            this._viewModel.set('saveBtnText', 'guardar');
        }
    };
    return SaveComponent;
}(BaseComponent_1.BaseComponent));
exports.SaveComponent = SaveComponent;
//# sourceMappingURL=index.js.map