"use strict";
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var frame_1 = require('ui/frame');
var SideDrawerComponent = (function (_super) {
    __extends(SideDrawerComponent, _super);
    function SideDrawerComponent() {
        var _this = this;
        _super.call(this);
        this._theme.addChild(builder_1.load({
            path: '~/PlantDashboard/Components/SideDrawer',
            name: 'theme.xml'
        }));
        this._options = [
            { label: 'dashboard', link: 'PlantDashboard/index' },
            { label: 'evaluaciones', link: 'PlantDashboard/Evaluations/index' },
            { label: 'login', link: 'login/index' },
        ];
        this._viewModel.set('items', this._options);
        this._viewModel.set('title', 'menú');
        this._viewModel.set('onTap', function (args) {
            //this._onTap(args.index);
            //console.log(JSON.stringify(args.index))
            var opt = {
                moduleName: _this._options[args.index].link,
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 380,
                    curve: "easeOut"
                }
            };
            frame_1.topmost().navigate(opt);
        });
    }
    SideDrawerComponent.prototype._onTap = function (index) {
        console.log(index);
    };
    return SideDrawerComponent;
}(BaseComponent_1.BaseComponent));
exports.SideDrawerComponent = SideDrawerComponent;
//# sourceMappingURL=index.js.map