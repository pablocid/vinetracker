import {onLoaded} from '../../testmodal/login-page';

import {topmost} from "ui/frame";
import {Page} from "ui/page";
import {Observable, EventData} from "data/observable";
import {View} from "ui/core/view";
import {NavigationButton, ActionItems, ActionItem ,ActionBar, AndroidActionBarSettings, AndroidActionItemSettings} from "ui/action-bar";
import { parse as Parse, load as Load } from 'ui/builder';
import {RadSideDrawer} from 'nativescript-telerik-ui/sidedrawer';

let appViewModel = new Observable({selectedPage: "home"});
var sidedrawer = new RadSideDrawer();

export class BasePage {
    //implement this function in the inheriting pages to set their specific binding context
    //abstract mainContentLoaded(args:EventData);
    private _mainContent:View;
    private _sidedrawer:RadSideDrawer;
    private _navBtn:NavigationButton;
    private _actionBar:ActionBar;
    private _actionItem:ActionItem;
    private _page:Page;
    private _titleActionBar:string | View;
    private _fnOnLoad:any;

    constructor(){
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

    }

	public setTitleActionBar(title : string, subTitle ?: string) {
        let theme;
        if(subTitle){
            theme = Parse(`
                    <StackLayout>
                        <Label text="${title}" style="font-size:18;"/>
                        <Label text="${subTitle}" style="font-size:12;"/>
                    </StackLayout>
            `)
        }else{
            theme = Parse(`
                    <StackLayout>
                        <Label text="${title}" style="font-size:20;"/>
                    </StackLayout>
            `)
        }
        
        this._actionBar.titleView = theme;
	}
    
    
    private _setActionBar(){
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
	}

    private _setNavigationBtn(){
        this._navBtn.android.position = "actionBar";
        this._navBtn.icon = "res://ic_menu";
        this._navBtn.on(NavigationButton.tapEvent, (args: EventData)=>{
            console.log("click sidebar")
            this._sidedrawer.toggleDrawerState();
        });
        this._actionBar.navigationButton = this._navBtn;
    }

    public addActionItem(item:ActionItem){

        this._actionBar.actionItems.addItem(item);
    }

    private _setSidedrawer():void{
        this._sidedrawer.drawerContent = Parse(`
            <StackLayout style="background-color:green; font-size: 20; color:white;">
                <StackLayout style="font-size: 40;">
                    <Label text="Header"/>
                </StackLayout>
                <StackLayout>
                    <Label text="Item 1"/>
                    <Label text="Item 2"/>
                    <Label text="Item 3"/>
                    <Label text="Item 4"/>
                </StackLayout>
            </StackLayout>
        `);
    }

    private _setMainContent(){
        this._sidedrawer.mainContent = this._mainContent;
    }

    private _setPageContent(){
        this._page.actionBar = this._actionBar;
        this._page.content = this._sidedrawer;
    }

	public get fnOnLoad(): any {
		return this._fnOnLoad;
	}

	public set fnOnLoad(value: any) {
		this._fnOnLoad = value;
	}
    onNavigatedTo (args:EventData){
        console.log('onNavigatedTo');
        if(this._fnOnLoad){ this._fnOnLoad(); }
    }

    onLoaded (args:EventData){
        console.log('onLoaded');
    }
    onShownModally ( args:EventData){
        console.log('onShownModally');
    }
    onNavigatingTo ( args:EventData){
        console.log('navigatingTo');
    }
    createPage(){
        this._setMainContent();
        this._page.on(Page.navigatedToEvent, x=>{ this.onNavigatedTo(x) });
        this._page.on(Page.loadedEvent, x=>{ this.onLoaded(x) }) ;
        this._page.on(Page.shownModallyEvent, x=>{ this.onLoaded(x) } );
        this._page.on(Page.navigatingToEvent, x=>{ this.onNavigatingTo(x) } );
        return this._page;
    }
}

