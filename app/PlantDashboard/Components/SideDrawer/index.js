"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var SideDrawerComponent = (function (_super) {
    __extends(SideDrawerComponent, _super);
    function SideDrawerComponent() {
        _super.call(this);
        this._theme.addChild(builder_1.load({
            path: '~/PlantDashboard/Components/SideDrawer',
            name: 'theme.xml'
        }));
        this._options = [
            { label: 'PlantDashboard', link: 'PlantDashboard/index' },
            { label: 'Login', link: 'login/index' },
            { label: 'Logout', link: '' },
        ];
        this._viewModel.set('items', [1, 2, 3, 4]);
        this._viewModel.set('title', 'Menú');
        this._viewModel.set('onTap', function (args) {
            //this._onTap(args.index);
            //console.log(JSON.stringify(args))
        });
    }
    SideDrawerComponent.prototype._onTap = function (index) {
        console.log(index);
    };
    return SideDrawerComponent;
}(BaseComponent_1.BaseComponent));
exports.SideDrawerComponent = SideDrawerComponent;
//# sourceMappingURL=index.js.map