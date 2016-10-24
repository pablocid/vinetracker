import {Schema} from '../Schema';
import {FindPlants, FindRecords} from '../../services/RecordService';
import {Filter, QueryConfig} from '../QueryParser';
import {Plant} from '../Record';

interface EvaluatedItems{
    name:string,
    id:string,
    position:number,
    plant:Plant
} 

export class Hilera {
    private _plant:Plant;
    private _schmEvaluation: Schema;
    private _rowPlants:Plant[];
    private _idRestricction:string[];
    private _idEvaluated:string[];
    private _restriction:any[];

    constructor(){
        /**** testing */
            this._restriction = [{id:'schm',string:'580c05b412e1240010cd9d62'}]
        /***** */
    }
    

	public get plant(): Plant {
		return this._plant;
	}

	public set plant(value: Plant) {
		this._plant = value;
	}

	public get restriction(): any[] {
		return this._restriction;
	}

	public set restriction(value: any[]) {
		this._restriction = value;
	}

	public get schmEvaluation(): Schema {
		return this._schmEvaluation;
	}

	public set schmEvaluation(value: Schema) {
		this._schmEvaluation = value;
	}

    private ubicationSort(a:Plant,b:Plant){
        if(a.getAttribute('5807afe331f55d0010aaffe6').value > b.getAttribute('5807afe331f55d0010aaffe6').value){
          return 1;
        }else{
          return -1;
        }
        
    }
    
    public getMainList():Promise<Plant[]>{
        if(!this._plant.id){ throw new Error("Hilera Class: No se ha seteado 'plant' antes de llamar a getMainList")}
        if(!this._plant.getAttribute("5807af5f31f55d0010aaffe4").value === undefined){ throw new Error("Hilera Class: 'plant' no tiene el attributo espaldera")}
        if(!this._plant.getAttribute("5807af9231f55d0010aaffe5").value === undefined){ throw new Error("Hilera Class: 'plant' no tiene el attributo hilera")}

        var qc = new QueryConfig();
        qc.items = "300";
        qc.schm = "57a4e02ec830e2bdff1a1608";
        // filtero espaldera
        var filter_espaldera = new Filter();
        filter_espaldera.key = "5807af5f31f55d0010aaffe4";
        filter_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;
        filter_espaldera.datatype = "number";
        
        // filtero hilera
        var filter_hilera = new Filter();
        filter_hilera.key = "5807af9231f55d0010aaffe5";
        filter_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;
        filter_hilera.datatype = "number";
        
        qc.filter = [ filter_espaldera, filter_hilera];
        var plants = new FindPlants(qc);

        return plants.finds().then(x=>{
            let a = x.sort(this.ubicationSort);
            //this._rowPlants = a;
            return a;
        }).then(x=>{
            console.log('applying restriction')
            return this._applyRestriction(x);
        });
    }

    private _applyRestriction(plants : Plant[]):any{
        if(!this._restriction || this._restriction.length === 0){
            this._rowPlants = plants;
            return plants;
        }
        console.log('este esquema tiene restricciones restriction')
        let qcRecords = new QueryConfig();
        qcRecords.items = "100";
        qcRecords.filter = [];
        
        let f0_espaldera = new Filter();
        f0_espaldera.key = "espaldera";
        f0_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;;
        f0_espaldera.datatype = "number";
        qcRecords.filter.push(f0_espaldera);
        
        let f0_hilera = new Filter();
        f0_hilera.key  = 'hilera';
        f0_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;;
        f0_hilera.datatype = "number";
        qcRecords.filter.push(f0_hilera);

        for (var index = 0; index < this._restriction.length; index++) {
            var element = this._restriction[index];
            if(element.id === 'schm'){
                qcRecords.schm = element.string;
            }

            if(element.id==='filter'){
                let f = new Filter();
                let set = element.string.split('|');
                console.log('/*****************************************************************************/')
                console.log(set);
                f.key =set[0];
                f.value=set[1];
                f.datatype = set[2];
                qcRecords.filter.push(f)
            }
            
        }
        
        let records = new FindRecords(qcRecords);
        //57c42f77c8307cd5b82f4486 es el individuo ref
        return records.finds()
            .then(d=>{
                //console.log('respuesta*********************************************************************')
                //console.log(JSON.stringify(d));
                //console.log(d.length);
                //console.log('/*****************************************************************************/')
                return d;
            })
            .then(x=>x.map(i=>i.getAttribute("57c42f77c8307cd5b82f4486").value)).then(r=>{
            let pass = [];
            for (var w = 0; w < plants.length; w++) {
                var index = r.indexOf(plants[w].id);
                //console.log('/*****************************************************************************/')
                //console.log('INDEX '+index);
                if(index !== -1){
                    pass.push(plants[w]);
                }
                
            }
            this._rowPlants = pass;
            return pass;
        });
    }

    public getEvaluatedId():Promise<string[]>{
        let qcRecords = new QueryConfig();
        qcRecords.items = "100";
        // fenotipado 0
        qcRecords.schm = this._schmEvaluation.id;
        
        let f0_espaldera = new Filter();
        f0_espaldera.key = "espaldera";
        f0_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;;
        f0_espaldera.datatype = "number";
        
        let f0_hilera = new Filter();
        f0_hilera.key  = 'hilera';
        f0_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;;
        f0_hilera.datatype = "number";
        qcRecords.filter = [f0_espaldera, f0_hilera];
        
        let records = new FindRecords(qcRecords);
        //57c42f77c8307cd5b82f4486 es el individuo ref
        return records.finds().then(x=>x.map(i=>i.getAttribute("57c42f77c8307cd5b82f4486").value));

    }
    public getEvandNoev():Promise<{evaluados:EvaluatedItems[], noEvaluados:EvaluatedItems[]}>{
        if(this._rowPlants){
            return this.getEvaluatedId().then(ids=>{
                let ev=[];
                let noev = [];
                for (var e = 0; e < this._rowPlants.length; e++) {
                    let index = ids.indexOf(this._rowPlants[e].id);
                    let curr = {
                        name:this._rowPlants[e].getUbicación(), 
                        id:this._rowPlants[e].id, 
                        position: this._rowPlants[e].getAttribute('5807afe331f55d0010aaffe6').value,
                        plant:this._rowPlants[e]
                    };
                    if(index === -1){
                    noev.push(curr);
                    }else{
                    ev.push(curr);
                    }
                    
                }
        
                return {
                    evaluados:ev,
                    noEvaluados:noev
                }
            })   
        }else{
            return this.getMainList().then(w=>{
                return this.getEvaluatedId().then(ids=>{
                    let ev=[];
                    let noev = [];
                    for (var e = 0; e < this._rowPlants.length; e++) {
                        let index = ids.indexOf(this._rowPlants[e].id);
                        let curr = {
                            name:this._rowPlants[e].getUbicación(),
                            id:this._rowPlants[e].id, 
                            position: this._rowPlants[e].getAttribute('5807afe331f55d0010aaffe6').value,
                            plant:this._rowPlants[e]
                        };
                        if(index === -1){
                        noev.push(curr);
                        }else{
                        ev.push(curr);
                        }
                        
                    }
            
                    return {
                        evaluados:ev,
                        noEvaluados:noev
                    }
                })
            });
        }
        
    }

}