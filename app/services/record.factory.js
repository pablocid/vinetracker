var _ = require("lodash");

exports.RecordFactory = function (schema) {
    
    function RecordConstructor(record){
        _.assignIn(this,record);
    }

    RecordConstructor.prototype.schema = schema;

    RecordConstructor.prototype.getListOfAttr = function(){

        //filtrar por status;
        var inputs = this.schema.inputs.filter(x=>x.status);
        return inputs.map(x => x.description + " - " + this.getValueByIdAndDataType(x.id, x.dataType) );
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

    return RecordConstructor;
}