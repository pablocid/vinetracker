"use strict";
var page_1 = require("ui/page");
var observable_1 = require("data/observable");
var action_bar_1 = require("ui/action-bar");
var builder_1 = require('ui/builder');
var sidedrawer_1 = require('nativescript-telerik-ui/sidedrawer');
var appViewModel = new observable_1.Observable({ selectedPage: "home" });
var sidedrawer = new sidedrawer_1.RadSideDrawer();
var BasePage = (function () {
    function BasePage() {
        this._page = new page_1.Page();
        this._sidedrawer = new sidedrawer_1.RadSideDrawer();
        this._navBtn = new action_bar_1.NavigationButton();
        this._actionBar = new action_bar_1.ActionBar();
        this._actionItem = new action_bar_1.ActionItem();
        this._setSidedrawer();
        this._setNavigationBtn();
        this._setActionBar();
        /*************** ADDING ITEMS *******************/
        this._setPageContent();
    }
    BasePage.prototype.setTitleActionBar = function (title, subTitle) {
        var theme;
        if (subTitle) {
            theme = builder_1.parse("\n                    <StackLayout>\n                        <Label text=\"" + title + "\" style=\"font-size:18;\"/>\n                        <Label text=\"" + subTitle + "\" style=\"font-size:12;\"/>\n                    </StackLayout>\n            ");
        }
        else {
            theme = builder_1.parse("\n                    <StackLayout>\n                        <Label text=\"" + title + "\" style=\"font-size:20;\"/>\n                    </StackLayout>\n            ");
        }
        this._actionBar.titleView = theme;
    };
    BasePage.prototype._setActionBar = function () {
        this._actionBar.titleView = builder_1.parse("\n                <StackLayout>\n                    <Label text=\"Plant Dashboard\" style=\"font-size:24;\"/>\n                    <Label text=\"men\u00FA principal\" style=\"font-size:14;\"/>\n                </StackLayout>\n        ");
        this._actionBar.setInlineStyle('background-color:#2196F3; color:white;');
    };
    Object.defineProperty(BasePage.prototype, "mainContent", {
        get: function () {
            return this._mainContent;
        },
        set: function (value) {
            this._mainContent = value;
        },
        enumerable: true,
        configurable: true
    });
    BasePage.prototype._setNavigationBtn = function () {
        var _this = this;
        this._navBtn.android.position = "actionBar";
        this._navBtn.icon = "res://ic_menu";
        this._navBtn.on(action_bar_1.NavigationButton.tapEvent, function (args) {
            console.log("click sidebar");
            _this._sidedrawer.toggleDrawerState();
        });
        this._actionBar.navigationButton = this._navBtn;
    };
    BasePage.prototype.addActionItem = function (item) {
        this._actionBar.actionItems.addItem(item);
    };
    BasePage.prototype._setSidedrawer = function () {
        this._sidedrawer.drawerContent = builder_1.parse("\n            <StackLayout style=\"background-color:green; font-size: 20; color:white;\">\n                <StackLayout style=\"font-size: 40;\">\n                    <Label text=\"Header\"/>\n                </StackLayout>\n                <StackLayout>\n                    <Label text=\"Item 1\"/>\n                    <Label text=\"Item 2\"/>\n                    <Label text=\"Item 3\"/>\n                    <Label text=\"Item 4\"/>\n                </StackLayout>\n            </StackLayout>\n        ");
    };
    BasePage.prototype._setMainContent = function () {
        this._sidedrawer.mainContent = this._mainContent;
    };
    BasePage.prototype._setPageContent = function () {
        this._page.actionBar = this._actionBar;
        this._page.content = this._sidedrawer;
    };
    BasePage.prototype.onLoadPage = function (args) {
        var page = args.object;
        //if(!this._mainContent){ throw new Error(" the mainView is not set");}
        //this._sidedrawer.mainContent = this._mainContent;
        //page.content = this._sidedrawer;
    };
    BasePage.prototype.createPage = function () {
        this._setMainContent();
        //page.on(Page.navigatedToEvent, this.onLoadPage);
        //page.on(Page.loadedEvent, this.onLoadPage)
        //page.on(Page.shownModallyEvent, onShownModally);
        return this._page;
    };
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=index.js.map