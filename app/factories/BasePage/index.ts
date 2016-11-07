import { SideDrawerComponent } from '../../PlantDashboard/Components/SideDrawer';
import { onLoaded } from '../../testmodal/login-page';

import { topmost as Topmost } from "ui/frame";
import { Page, ShownModallyData } from "ui/page";
import { Observable, EventData } from "data/observable";
import { View } from "ui/core/view";
import { NavigationButton, ActionItems, ActionItem, ActionBar, AndroidActionBarSettings, AndroidActionItemSettings } from "ui/action-bar";
import { parse as Parse, load as Load } from 'ui/builder';
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';

let appViewModel = new Observable({ selectedPage: "home" });
var sidedrawer = new RadSideDrawer();

export class BasePage {
    //implement this function in the inheriting pages to set their specific binding context
    //abstract mainContentLoaded(args:EventData);
    private _mainContent: View;
    private _sidedrawer: RadSideDrawer;
    private _navBtn: NavigationButton;
    private _actionBar: ActionBar;
    private _actionItem: ActionItem;
    private _page: Page;
    private _titleActionBar: string | View;
    private _fnOnLoad: any;
    private _fnOnShownModally: any;
    private _fnOnUnLoaded: any;
    private _created: boolean;

    constructor() {
        this._page = new Page();

        this._sidedrawer = new RadSideDrawer();
        this._navBtn = new NavigationButton();
        this._actionBar = new ActionBar();
        this._actionItem = new ActionItem();

        this._setSidedrawer();
        this._setNavigationBtn();
        this._setActionBar();


        /*************** ADDING ITEMS *******************/

        this._setPageContent();

        this._page.on(Page.shownModallyEvent, (args) => {
            if (this._fnOnShownModally) { this._fnOnShownModally(args); }
        });

        this._page.on(Page.navigatingToEvent, (args => {
            if (this._fnOnLoad) { this._fnOnLoad(args); }
        }));

        this._page.on(Page.unloadedEvent, (args) => {
            if (this._fnOnUnLoaded) { this._fnOnUnLoaded }
        });

        this._created = false;

    }

    public get page(): Page {
        return this._page;
    }

    /**
     * Parametros:
     * el parametro viewModel debe tener las propiedades title y subTitle
     */

    public setTitleActionBar(title: string, subTitle?: string, viewModel?: Observable) {
        let theme: View;
        if (subTitle) {
            theme = Parse(`
                    <StackLayout>
                        <Label text="{{title}}" style="font-size:18;"/>
                        <Label text="{{subTitle}}" style="font-size:12;"/>
                    </StackLayout>
            `)
        } else {
            theme = Parse(`
                    <StackLayout>
                        <Label text="{{title}}" style="font-size:20;"/>
                    </StackLayout>
            `)
        }
        if (viewModel) {
            theme.bindingContext = viewModel;
        } else {
            theme.bindingContext = { title: title, subTitle: subTitle };
        }

        this._actionBar.titleView = theme;
    }


    private _setActionBar() {
        this._actionBar.titleView = Parse(`
                <StackLayout>
                    <Label text="Plant Dashboard" style="font-size:24;"/>
                    <Label text="menú principal" style="font-size:14;"/>
                </StackLayout>
        `)
        this._actionBar.setInlineStyle('background-color:#2196F3; color:white;');
    }

    public get mainContent(): View {
        return this._mainContent;
    }

    public set mainContent(value: View) {
        this._mainContent = value;
        this._sidedrawer.mainContent = value;
    }

    private _setNavigationBtn() {
        this._navBtn.android.position = "actionBar";
        this._navBtn.icon = "res://ic_menu";
        this._navBtn.on(NavigationButton.tapEvent, (args: EventData) => {
            console.log("click sidebar")
            this._sidedrawer.toggleDrawerState();
        });
        this._actionBar.navigationButton = this._navBtn;
    }

    public addActionItem(item: ActionItem) {

        this._actionBar.actionItems.addItem(item);
    }

    private _setSidedrawer(): void {
        let sd = new SideDrawerComponent();
        this._sidedrawer.drawerContent = sd.getView();
    }

    private _setMainContent() {
        this._sidedrawer.mainContent = this._mainContent;
    }

    public setMainContent() {
        //this._setMainContent();
    }

    private _setPageContent() {
        this._page.actionBar = this._actionBar;
        this._page.content = this._sidedrawer;
    }

    public get fnOnLoad(): any {
        return this._fnOnLoad;
    }

    public set fnOnLoad(value: any) {
        this._fnOnLoad = value;
    }

    public get fnOnShownModally(): any {
        return this._fnOnShownModally;
    }

    public set fnOnShownModally(value: any) {
        this._fnOnShownModally = value;
    }

    public get fnOnUnLoaded(): any {
        return this._fnOnUnLoaded;
    }

    public set fnOnUnLoaded(value: any) {
        this._fnOnUnLoaded = value;
    }

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
    createPage(args) {
        console.log(this._created);
        if (!this._created) {
            //this._setMainContent();
            this._created = true;
        }
        console.log('creating a page: ---------------------------------------____> this._setMainContent();')
        //this._page.on(Page.navigatedToEvent, x=>{ this.onNavigatedTo(x) });
        //this._page.on(Page.loadedEvent, x=>{ if(this._fnOnLoad){ this._fnOnLoad(x); } }) ;

        return this._page;
    }
}

