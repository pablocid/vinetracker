"use strict";
//var frame = require('ui/frame');
var Page = require('ui/page');
//var StackLayout = require('ui/layouts/stack-layout');
//var Label = require('ui/label').Label;
//var Button = require('ui/button').Button;
var action_bar_1 = require("ui/action-bar");
var grid_layout_1 = require('ui/layouts/grid-layout');
//var reqAuth = require("../services/auth.service").ReqAuth;
//var appSet = require("application-settings");
var RecordService = require("../services/record.service");
var Builder = require("ui/builder");
var Frame = require('ui/frame');
exports.createPage = function () {
    var a = Builder.parse("\n        <ListView items=\"{{ items }}\" itemTap=\"{{selectedOption}}\">\n            <ListView.itemTemplate>\n                <GridLayout columns=\"30, *\" style=\"font-size:25; padding:10; padding-bottom:50; padding-top:50;\">\n                    <Label text=\"\" col=\"0\" />\n                    <Label text=\"{{ name }}\" col=\"0\" textWrap=\"true\" col=\"1\"/>\n                </GridLayout>\n            </ListView.itemTemplate>\n        </ListView>\n    ");
    var array = [
        { name: "Evaluación de grados brix", schema: "xxxxxxx12312312xxxxx" }
    ];
    function onTapItem(args) {
        console.log(args.index);
        var navigationOptions = {
            moduleName: 'evaluations/evaluation-records',
            context: {
                schema: array[args.index].schema
            }
        };
        Frame.topmost().navigate(navigationOptions);
    }
    a.bindingContext = { selectedOption: onTapItem, items: array };
    var grid = new grid_layout_1.GridLayout();
    grid.addChild(a);
    var navBtn = new action_bar_1.NavigationButton();
    var page = new Page.Page();
    page.actionBar.title = "Evaluaciones disponibles";
    page.actionBar.actionItems.addItem(navBtn);
    page.actionBar.setInlineStyle("background-color:#2196F3; color:white;");
    page.content = grid;
    return page;
};
//# sourceMappingURL=evaluation-availables.js.map