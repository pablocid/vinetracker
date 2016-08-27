var _ = require("lodash");

exports.RecordFactory = function (schema, newschema) {
    
    function RecordConstructor(record){
        _.assignIn(this,record);
    }

    RecordConstructor.prototype.schema = schema;
    
    RecordConstructor.prototype.newschema = newschema;

    RecordConstructor.prototype.getIdsForShow = function(showNull){

        var self = this;
        return this.newschema
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","type", "string") ==='attrConfig' && self.findValueByVarHelper(o.attributes, "id", "visualization","boolean") === true)
        .map(x=>self.findValueByVarHelper(x.attributes,'id','attribute','reference') );
    }
    RecordConstructor.prototype.getSchmAttr = function (key){
        var self = this;
        
        var dataTypes =  this.newschema
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","type", "string") ==='attrDatatype');
        if(dataTypes.length === 1 && dataTypes[0].attributes){
            dataTypes = dataTypes[0].attributes;
        }else{
            console.log("Error, error en los datatypes");
            return null;
        }
        
        var schmAttr =  this.newschema
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","type", "string") ==='schema');
        if(schmAttr.length === 1 && schmAttr[0].attributes){
            schmAttr = schmAttr[0].attributes;
        }else{
            console.log("Error, error en los schmAttr");
            return null;
        }

        return self.findValueByVarHelper(schmAttr, "id", key, self.findValueByVarHelper(dataTypes, "id", key, "string") );
       
    }
    RecordConstructor.prototype.getInputAttr = function (attrId, key){
        var self = this;
        
        var dataTypes =  this.newschema
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","type", "string") ==='attrDatatype');
        if(dataTypes.length === 1 && dataTypes[0].attributes){
            dataTypes = dataTypes[0].attributes;
        }else{
            console.log("Error, error en los datatypes");
            return null;
        }
        
        var attrConf = this.newschema
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","type", "string") ==='attrConfig')
        .filter(o=>self.findValueByVarHelper(o.attributes, "id","attribute", "reference") ===attrId);
        
        if(attrConf.length===1 && attrConf[0].attributes){
            attrConf = attrConf[0].attributes;
            attrConf = self.findValueByVarHelper(attrConf, "id", key, self.findValueByVarHelper(dataTypes, "id", key, "string") );
        }else { attrConf = false; }

        var inputId = self.findValueByVarHelper(self.newschema,"_id", attrId ,"attributes");
        inputId = self.findValueByVarHelper(inputId,"id","input","reference");

        var inputAttr = self.findValueByVarHelper(self.newschema,"_id", inputId, "attributes" );

        if(inputAttr.length){
            inputAttr = self.findValueByVarHelper(inputAttr, "id", key, self.findValueByVarHelper(dataTypes, "id", key, "string") );
        }else { inputAttr = false; }

        return attrConf || inputAttr || null;

    }
    RecordConstructor.prototype.getAttr = function (key){
        var self = this;
        var dataType = this.getInputAttr(key, "dataType");
        if(dataType != null ){
            var dato = this.findValueByVarHelper(self.attributes, "id", key, dataType);
          return dato;
        }else{
            return null;
        }
    }
   
    RecordConstructor.prototype.dottedKey= function(key, x){
        return key.split('.').reduce(function (obj,i) {return obj[i]}, x)
        
    }

    RecordConstructor.prototype.findValueByVarHelper = function(array, key, value, target){
        var self = this;
        if(!array.length){return null;}

        var index = array.map(x=> self.dottedKey(key, x) ).indexOf(value);
        
        if(index !== -1){
            if(target === undefined){
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