"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var InfoComponent = (function (_super) {
    __extends(InfoComponent, _super);
    function InfoComponent() {
        _super.call(this);
        this._viewModel.set('description', 'Información del registro');
        this._theme.addChild(builder_1.load({ name: 'theme', path: '~/PlantDashboard/Components/InfoComponent' }));
    }
    Object.defineProperty(InfoComponent.prototype, "nameEvaluation", {
        get: function () {
            return this._viewModel.get('evalName');
        },
        set: function (value) {
            this._viewModel.set('evalName', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoComponent.prototype, "evalDescription", {
        set: function (value) {
            this._viewModel.set('evalDescript', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoComponent.prototype, "ubicacion", {
        get: function () {
            return this._viewModel.get('ubicacion');
        },
        set: function (value) {
            this._viewModel.set('ubicacion', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoComponent.prototype, "codigos", {
        set: function (value) {
            this._viewModel.set('codigos', value);
        },
        enumerable: true,
        configurable: true
    });
    return InfoComponent;
}(BaseComponent_1.BaseComponent));
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=index.js.map