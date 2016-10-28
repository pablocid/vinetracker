import {ObservableArray, ChangedData} from 'data/observable-array';
import {Observable , PropertyChangeData,  EventData} from 'data/observable';
import {ContextFS} from '../ContextFS';
import {Schema} from '../Schema';
import {FindPlants, FindRecords} from '../../services/RecordService';
import {Filter, QueryConfig} from '../QueryParser';
import {Plant} from '../Record';
var q = require('q');

interface EvaluatedItems{
    name:string,
    id:string,
    position:number,
    plant:Plant
}

export class HileraFactory{
    private _mainList:ObservableArray<Plant>;
    private _observable: Observable;
    private _noEvaluated: ObservableArray<Plant>;
    private _evaluated: ObservableArray<Plant>;
    private _evTabTitle:string;
    private _NoEvTabTitle:string;
    private _callbackOnChangeList:any;

    private _idRestrictions: ObservableArray<string>;
    private _idEvaluated: ObservableArray<string>;

    constructor(list:Plant[]){
        this._mainList = new ObservableArray(list);
        this._noEvaluated = new ObservableArray(list);
        this._evaluated = new ObservableArray(this._mainList.getItem(0));
        this._evaluated.pop();

        this._observable = new Observable();
        this._observable.on(Observable.propertyChangeEvent, (args:PropertyChangeData)=>{
            //console.log('trigger propertyChangeEvent')
            if(args.propertyName ==='idRestrictions' && this._idRestrictions){
                //console.log('restricciones')
                this._applyingRestrictions();
            }
            if(args.propertyName ==='idEvaluated' && this._idEvaluated ){
                //console.log('idEvaluated')
                this._applyingEvaluated();
            }

            if(args.propertyName === 'sort'){
                console.log('sortingggg ');
                this._sortList(this._noEvaluated,this.sort);
                this._sortList(this._evaluated, this.sort);
            }

            if(this._callbackOnChangeList){ this._callbackOnChangeList(); }

        });

        this.sort = 'asc';
    }

    private _applyingRestrictions(){
        this.idRestrictions.forEach(d=>{
            let index = this._noEvaluated.map(x=>x.id).indexOf(d);
            if(index !== -1){
                this._noEvaluated.splice(index,1);
            }
        });
        this._sortList(this._noEvaluated, this._observable.get('sort'));
    }

    private _applyingEvaluated(){
        this.idEvaluated.forEach(d=>{
            //revisar si existe previamente la planta en la lista evaluados
            let indexEv;
            if(this._evaluated && this._evaluated.length){
                indexEv = this._evaluated.map(x=>x.id).indexOf(d);
            }else{ indexEv = -1;}

            //tomar planta desde main list
            let indexMain = this._mainList.map(x=>x.id).indexOf(d);
            let currentPlant:Plant;
            if(indexMain !== -1){
                currentPlant = this._mainList.getItem(indexMain);
            }

            //revisar y eliminar si la planta esta en la lista de no evaluados
            let indexNoEv = this._noEvaluated.map(x=>x.id).indexOf(d);
            if(indexNoEv !== -1){
                this._noEvaluated.splice(indexNoEv,1);
            }

            //insertar planta evaluada en lista evaluated
            if(indexEv === -1){
                this._evaluated.push(currentPlant);
            }
            
        });

        this._sortList(this._evaluated,this._observable.get('sort'));
    }

    public reverse(){
        this._noEvaluated.reverse();
        this._noEvaluated.push(this._noEvaluated.getItem(0));
        this._noEvaluated.pop();

        this.evaluated.reverse();
        this.evaluated.push(this.evaluated.getItem(0));
        this.evaluated.pop();
    }

    private _sortList(arr, direction?:string){
        if(!arr || arr.length ===0){return;}

        if(direction !== 'asc' && direction !== 'desc'){
            direction = 'asc';
        }
        
        if(direction === 'asc'){
            arr.sort( (a:Plant, b:Plant)=>{
                if(a.position < b.position){
                    return -1;
                }else{
                    return 1;
                }
            });
        }

        if(direction === 'desc'){
            arr.sort( (a:Plant, b:Plant)=>{
                if(a.position > b.position){
                    return -1;
                }else{
                    return 1;
                }
            });
        }
        this._noEvaluated.push(this._noEvaluated.getItem(0));
        this._noEvaluated.pop();
    }


	public get sort(): string {
		return this._observable.get('sort');
	}

	public set sort(value: string) {
		this._observable.set('sort',value);
	}

	public get observable(): Observable {
		return this._observable;
	}

	public set observable(value: Observable) {
		this._observable = value;
	}
    

	public get idRestrictions(): any[] {
		return this._idRestrictions;
	}

	public set idRestrictions(value: any[]) {

		if(value && Array.isArray(value)){
            this._idRestrictions = new ObservableArray(value);
            let pass =[];
            for (var index = 0; index < this._idRestrictions.length; index++) {
                var element = this._idRestrictions.getItem(index);
                let indexNoEv = this._noEvaluated.map(x=>x.id).indexOf(element);
                if(indexNoEv !== -1){
                    pass.push(this._noEvaluated.getItem(indexNoEv));
                }
                
            }

            while(this._noEvaluated.length){
                this._noEvaluated.pop();
            }

            for (var i = 0; i < pass.length; i++) {
                this._noEvaluated.push(pass[i]);
                
            }

            
            //this._noEvaluated.push(this._noEvaluated.getItem(0));
            //this._noEvaluated.pop();
            if(this._callbackOnChangeList){ this._callbackOnChangeList(); }
            this._sortList(this._noEvaluated,this._observable.get('sort'));
            console.log(value);
        }
	}

    public set addEvaluated(value:string){
        this._idEvaluated.push(value);
    }

	public get idEvaluated() {
		return this._idEvaluated;
	}

	public set idEvaluated(value:any[]) {
		if(value && Array.isArray(value)){
            this._idEvaluated = new ObservableArray(value);
            //TODO: cambiar esto por for loop
            this._idEvaluated.forEach(d=>{
                //revisar si existe previamente la planta en la lista evaluados
                let indexEv;
                if(this._evaluated && this._evaluated.length){
                    indexEv = this._evaluated.map(x=>x.id).indexOf(d);
                }else{ indexEv = -1;}
        
                //tomar planta desde main list
                let indexMain = this._mainList.map(x=>x.id).indexOf(d);
                let currentPlant:Plant;
                if(indexMain !== -1){
                    currentPlant = this._mainList.getItem(indexMain);
                }
        
                //revisar y eliminar si la planta esta en la lista de no evaluados
                let indexNoEv = this._noEvaluated.map(x=>x.id).indexOf(d);
                if(indexNoEv !== -1){
                    this._noEvaluated.splice(indexNoEv,1);
                }
        
                //insertar planta evaluada en lista evaluated
                if(indexEv === -1 && currentPlant){
                    this._evaluated.push(currentPlant);
                }
                
            });

            if(this._callbackOnChangeList){ this._callbackOnChangeList(); }

            this._sortList(this._evaluated,this._observable.get('sort'));

            this._idEvaluated.on(ObservableArray.propertyChangeEvent, (args: ChangedData<string>)=>{
                if(args.eventName === 'propertyChange'){
                    this._idEvaluated.forEach(d=>{
                        //revisar si existe previamente la planta en la lista evaluados
                        let indexEv;
                        if(this._evaluated && this._evaluated.length){
                            indexEv = this._evaluated.map(x=>x.id).indexOf(d);
                        }else{ indexEv = -1;}
                
                        //tomar planta desde main list
                        let indexMain = this._mainList.map(x=>x.id).indexOf(d);
                        let currentPlant:Plant;
                        if(indexMain !== -1){
                            currentPlant = this._mainList.getItem(indexMain);
                        }
                
                        //revisar y eliminar si la planta esta en la lista de no evaluados
                        let indexNoEv = this._noEvaluated.map(x=>x.id).indexOf(d);
                        if(indexNoEv !== -1){
                            this._noEvaluated.splice(indexNoEv,1);
                        }
                
                        //insertar planta evaluada en lista evaluated
                        if(indexEv === -1 && currentPlant){
                            this._evaluated.push(currentPlant);
                        }
                        
                    });
        
                    if(this._callbackOnChangeList){ this._callbackOnChangeList(); }
        
                    this._sortList(this._evaluated,this._observable.get('sort'));
                }
            });
        }
	}


    public get evaluated(){
        return this._evaluated;
    }

    public get noEvaluated(){
        return this._noEvaluated;
    }
    
    public set evTabTitle(value:string){
        this._evTabTitle = value;
    }
    public get evTabTitle(){
        return this._evaluated.length +' '+this._evTabTitle;
    }

    public set NoEvTabTitle(value:string){
        this._NoEvTabTitle = value;
    }
    public get NoEvTabTitle(){
        return this._noEvaluated.length +' '+this._NoEvTabTitle;
    }
    

	public get callbackOnChangeList(): any {
		return this._callbackOnChangeList;
	}

	public set callbackOnChangeList(value: any) {
		this._callbackOnChangeList = value;
	}
    

}
