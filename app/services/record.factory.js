var _ = require("lodash");

exports.RecordFactory = function (schema) {
    
    function RecordConstructor(record){
        _.assignIn(this,record);
    }

    RecordConstructor.prototype.schema = schema;

    RecordConstructor.prototype.getListOfAttr = function(){

        //filtrar por status;
        var inputs = this.schema.inputs.filter(x=>x.status);
        return inputs.map(x => {
            return {
                description : x.description,
                value: this.getValueByIdAndDataType(x.id, x.dataType) 
            }  
        } );
    }

    RecordConstructor.prototype.getValueByIdAndDataType = function(id, dt){
        var index = this.attributes.map(x=>x.id).indexOf(id);
        if(index ===-1){ return false;}
        return this.attributes[index][dt];
    }

    RecordConstructor.prototype.getListOfKeyAttrs = function () {

        return this.getInputIds();
    }
    RecordConstructor.prototype.getAttrById = function(id){
        var index = this.attributes.map(x=>x.id).indexOf(id);
        if(index ===-1){ return null;}
        
        return this.attributes[index];
    }
    RecordConstructor.prototype.getDataTypeAttrById = function(id){
        return this.getInputIds();
    }

    RecordConstructor.prototype.getInputIds = function(){
        var keys =[];
        for (var i = 0; i < this.schema.inputs.length; i++) {
            var element = this.schema.inputs[i];
            keys.push(element.id);
        }
        return keys;
    }

    RecordConstructor.prototype.getDataTypeById = function(id){
        console.log('getDataTypeById');
        var index = this.schema.inputs.map(x=>x.id).indexOf(id);
        if(index !==-1){
            console.log(this.schema.inputs[index].dataType)
            return this.schema.inputs[index].dataType;
        }else{
            return null;
        }
    }

    RecordConstructor.prototype.getIdsForShow = function(){

        var self = this;

        var idsArray = this.schema.attributes.map(x=>{
            var status = self.findValueByVarHelper(x.attributes, "id", "status", "value");
            var vis = self.findValueByVarHelper(x.attributes, "id", "visualization", "value");
            var dataType = self.findValueByVarHelper(x.attrSchm.input.attributes, "id", "dataType", "value");
            var attrValue;
            if(dataType){
                attrValue = self.findValueByVarHelper(self.attributes, "id", x.id, dataType);
            }

            //console.log(attrValue);
            if(status && vis && attrValue !==null){
                return x.id;
            }else{
                return null;
            }
            
        }).filter(x=>x);

        return idsArray;
    }
    RecordConstructor.prototype.getSchmAttr = function (attrId, key,type){
        var self = this;
        var schmItem = this.findValueByVarHelper(self.schema.attributes, "id", attrId, null);
        if(schmItem === null){ return null;}

        var value;

        value = this.findValueByVarHelper(schmItem.attributes, "id", key, "value");
        if(value != null ){ return value;}

        value = this.findValueByVarHelper(schmItem.attrSchm.attributes, "id", key, "value");
        if(value != null){ return value;}
        
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

    RecordConstructor.prototype.findValueByVarHelper = function(array, key, value, target){
        if(!array.length){return null;}
        var index = array.map(x=>x[key]).indexOf(value);
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