"use strict";
var SideDrawer_1 = require('../../PlantDashboard/Components/SideDrawer');
var page_1 = require("ui/page");
var observable_1 = require("data/observable");
var action_bar_1 = require("ui/action-bar");
var builder_1 = require('ui/builder');
var sidedrawer_1 = require('nativescript-telerik-ui/sidedrawer');
var appViewModel = new observable_1.Observable({ selectedPage: "home" });
var sidedrawer = new sidedrawer_1.RadSideDrawer();
var BasePage = (function () {
    function BasePage() {
        var _this = this;
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
        this._page.on(page_1.Page.shownModallyEvent, function (args) {
            if (_this._fnOnShownModally) {
                _this._fnOnShownModally(args);
            }
        });
        this._page.on(page_1.Page.navigatingToEvent, (function (args) {
            if (_this._fnOnLoad) {
                _this._fnOnLoad(args);
            }
        }));
        this._page.on(page_1.Page.unloadedEvent, function (args) {
            if (_this._fnOnUnLoaded) {
                _this._fnOnUnLoaded;
            }
        });
        this._created = false;
    }
    Object.defineProperty(BasePage.prototype, "page", {
        get: function () {
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Parametros:
     * el parametro viewModel debe tener las propiedades title y subTitle
     */
    BasePage.prototype.setTitleActionBar = function (title, subTitle, viewModel) {
        var theme;
        if (subTitle) {
            theme = builder_1.parse("\n                    <StackLayout>\n                        <Label text=\"{{title}}\" style=\"font-size:18;\"/>\n                        <Label text=\"{{subTitle}}\" style=\"font-size:12;\"/>\n                    </StackLayout>\n            ");
        }
        else {
            theme = builder_1.parse("\n                    <StackLayout>\n                        <Label text=\"{{title}}\" style=\"font-size:20;\"/>\n                    </StackLayout>\n            ");
        }
        if (viewModel) {
            theme.bindingContext = viewModel;
        }
        else {
            theme.bindingContext = { title: title, subTitle: subTitle };
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
            this._sidedrawer.mainContent = value;
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
        var sd = new SideDrawer_1.SideDrawerComponent();
        this._sidedrawer.drawerContent = sd.getView();
    };
    BasePage.prototype._setMainContent = function () {
        this._sidedrawer.mainContent = this._mainContent;
    };
    BasePage.prototype.setMainContent = function () {
        //this._setMainContent();
    };
    BasePage.prototype._setPageContent = function () {
        this._page.actionBar = this._actionBar;
        this._page.content = this._sidedrawer;
    };
    Object.defineProperty(BasePage.prototype, "fnOnLoad", {
        get: function () {
            return this._fnOnLoad;
        },
        set: function (value) {
            this._fnOnLoad = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "fnOnShownModally", {
        get: function () {
            return this._fnOnShownModally;
        },
        set: function (value) {
            this._fnOnShownModally = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePage.prototype, "fnOnUnLoaded", {
        get: function () {
            return this._fnOnUnLoaded;
        },
        set: function (value) {
            this._fnOnUnLoaded = value;
        },
        enumerable: true,
        configurable: true
    });
    /*
    onNavigatedTo (args:EventData){
        //console.log('onNavigatedTo');
        //if(this._fnOnLoad){ this._fnOnLoad(args); }
    }

    onPageLoaded (args:EventData){
        //console.log('onLoaded');
        if(this._fnOnLoad){ this._fnOnLoad(args); }
    }
    onShownModally ( args:EventData){
        //console.log('onShownModally');
        if(this._fnOnShownModally){ this._fnOnShownModally(args); }
    }
    onNavigatingTo ( args:EventData){
        //console.log('navigatingTo');
    }
    */
    BasePage.prototype.createPage = function (args) {
        console.log(this._created);
        if (!this._created) {
            //this._setMainContent();
            this._created = true;
        }
        console.log('creating a page: ---------------------------------------____> this._setMainContent();');
        //this._page.on(Page.navigatedToEvent, x=>{ this.onNavigatedTo(x) });
        //this._page.on(Page.loadedEvent, x=>{ if(this._fnOnLoad){ this._fnOnLoad(x); } }) ;
        return this._page;
    };
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=index.js.map