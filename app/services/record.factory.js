var _ = require("lodash");

exports.RecordFactory = function (schema) {
    
    function RecordConstructor(record){
        _.assignIn(this,record);
    }

    RecordConstructor.prototype.schema = schema;

    RecordConstructor.prototype.getIdsForShow = function(showNull){

        var self = this;

        var idsArray = this.schema.attributes.map(x=>{
            var status = self.findValueByVarHelper(x.attributes, "id", "status", "value");
            var vis = self.findValueByVarHelper(x.attributes, "id", "visualization", "value");
            var dataType = self.findValueByVarHelper(x.attrSchm.input.attributes, "id", "dataType", "value");
            var attrValue;
            if(dataType){
                attrValue = self.findValueByVarHelper(self.attributes, "id", x.attrSchm.id, dataType);
            }

            //console.log(attrValue);
            if(showNull){ attrValue="";}
            if(status && vis && attrValue !==null){
                return x.attrSchm.id;
            }else{
                return null;
            }
            
        }).filter(x=>x);

        return idsArray;
    }
    RecordConstructor.prototype.getSchmAttr = function (attrId, key,type){
        var self = this;
        var schmItem = this.findValueByVarHelper(self.schema.attributes, "attrSchm.id", attrId, null);
        if(schmItem === null){ return null;}

        var value;
        // con la opcion type debe tener prioridad de ejecución -  implementación del input/output
        if(type === "input"){
            value = this.findValueByVarHelper(schmItem.attrSchm.input.attributes, "id", key, "value");
            if(value !== null){ 
                return value;
            }
        }

        if(type === "output"){
            value = this.findValueByVarHelper(schmItem.attrSchm.output.attributes, "id", key, "value");
            if(value !== null){ 
                return value;
            }
        }
        // prioridad 2 la tiene la implementación del schema
        value = this.findValueByVarHelper(schmItem.attributes, "id", key, "value");
        if(value != null ){ return value;}

        //prioridad 3 el la implementacion del atributo
        value = this.findValueByVarHelper(schmItem.attrSchm.attributes, "id", key, "value");
        if(value != null){ return value;}

        return null;
    }
    RecordConstructor.prototype.getAttr = function (key){
        var self = this;
        var dataType = this.getSchmAttr(key, "dataType", "input");
        if(dataType != null ){
            var dato = this.findValueByVarHelper(self.attributes, "id", key, dataType);
            //console.log(key+' - '+dataType+' - '+dato);
          return dato;
        }else{
            return null;
        }
    }

    RecordConstructor.prototype.getInputName = function (attrId){
        var self = this;
        var schmItem = this.findValueByVarHelper(self.schema.attributes, "id", attrId, null);
        if(schmItem === null){ return null;}
        if(!schmItem.attrSchm){ console.log("schmItem.attrSchm undefind")}
        if(!schmItem.attrSchm){ console.log("schmItem.attrSchm.input undefind")}
        if(!schmItem.attrSchm){ console.log("schmItem.attrSchm.input.name undefind")}
        
        return schmItem.attrSchm.input.name;
    }
    
    RecordConstructor.prototype.dottedKey= function(key, x){
        return key.split('.').reduce(function (obj,i) {return obj[i]}, x)
        
    }

    RecordConstructor.prototype.findValueByVarHelper = function(array, key, value, target){
        var self = this;
        if(!array.length){return null;}

        var index = array.map(x=> self.dottedKey(key, x) ).indexOf(value);
        if(index !== -1){
            if(target === null){
                return array[index];
            }else{
                return array[index][target];
            }
        }else{
            return null;
        }
    }
    return RecordConstructor;
}