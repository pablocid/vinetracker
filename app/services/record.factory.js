var _ = require("lodash");

exports.RecordFactory = function (schema, newschema) {
    
    function RecordConstructor(record){
        if(record){
            _.assignIn(this,record);
        }
    }

    //RecordConstructor.prototype.schema = schema;
    
    RecordConstructor.prototype.newschema = newschema;

    RecordConstructor.prototype.getIdsForShow = function(){
        // los attributos a mostrar dependen del key "attributes" dentro de schema.attributes y del key "visualization" en schmAttrInputConf.attributes
        var self = this;
        //1.- encontrar el registro schema
        var schema = self.findValueByVarHelper(self.newschema,"type","schema"); // suponiendo que hay solo un schema en el array
        //2.- obtener las referencias de los attributos registrados para el schema
        var attrRefs = self.findValueByVarHelper(schema.attributes,"id","attributes","list");
        //3.- obtener los schmAttrInputConf > filtrar por visualization > mapear por attribute
        var saic = self.newschema.filter(x=>x.type==="schmAttrInputConf")
                        .filter(x=>self.findValueByVarHelper(x.attributes, "id", "visualization","boolean")? true || undefined || null === true : false)
                        .map(x=>self.findValueByVarHelper(x.attributes,'id','attribute','reference'));
        //4.- filtar attrRefs con respecto a saic
        return attrRefs.filter(x=>saic.indexOf(x)!==-1);
    }

    RecordConstructor.prototype.getIdsForEdit = function(){
        // los attributos a mostrar dependen del key "attributes" dentro de schema.attributes y del key "visualization" en schmAttrInputConf.attributes
        var self = this;
        //1.- encontrar el registro schema
        var schema = self.findValueByVarHelper(self.newschema,"type","schema"); // suponiendo que hay solo un schema en el array
        //2.- obtener las referencias de los attributos registrados para el schema
        var attrRefs = self.findValueByVarHelper(schema.attributes,"id","attributes","list");
        //3.- obtener los schmAttrInputConf > filtrar por visualization > mapear por attribute
        var saic = self.newschema.filter(x=>x.type==="schmAttrInputConf")
                        .filter(x=>self.findValueByVarHelper(x.attributes, "id", "visualization","boolean")? true || undefined || null === true : false)
                        .map(x=>self.findValueByVarHelper(x.attributes,'id','attribute','reference'));
        //4.- filtar attrRefs con respecto a saic
        return attrRefs.filter(x=>saic.indexOf(x)!==-1);
    }
    RecordConstructor.prototype.getSchmAttr = function (key){

        var self = this;
        //console.log("RecordConstructor.prototype.getSchmAttr=> Key "+key)
        var schema = self.findValueByVarHelper(self.newschema,"type","schema");
        //console.log("RecordConstructor.prototype.getSchmAttr=> schema._id "+schema._id);
        //console.log("RecordConstructor.prototype.getSchmAttr=> schema.attributes.length "+schema.attributes.length);
        var indexKeys = schema.attributes.map(x=>x.id).indexOf("keys")
        //console.log("indexKeys: "+indexKeys)
        var keys = self.findValueByVarHelper(schema.attributes, "id","keys","listOfObj")
        //console.log("RecordConstructor.prototype.getSchmAttr=> keys "+keys);
        var dt = self.findValueByVarHelper(keys,"id",key,"string");

        return self.findValueByVarHelper(schema.attributes,"id",key,dt);    
    }
    RecordConstructor.prototype.getAttrInputConf = function (attrId, key){
        //entrega datos de configuración del input asociados a un attributo
        var self = this;
        //encontrar el id del input asociado al attribute
        var Attr = self.findValueByVarHelper(self.newschema,"_id",attrId);
        var inputRef = self.findValueByVarHelper(Attr.attributes,"id","input","reference");

        // filtrar por attrInputConf type
        var attrInputConf = self.newschema
                .filter(x=>x.type==="attrInputConf")
                .filter(x=>self.findValueByVarHelper(x.attributes, "id", "attribute","reference")===attrId)
                .filter(x=>self.findValueByVarHelper(x.attributes, "id", "input","reference")===inputRef);
        //obtener el objeto
        attrInputConf = attrInputConf.length > 0 ? attrInputConf[0] : null;
        //obtener el data type que esta en el input
        var keyDeclarations = self.getInputAttr(attrId, "attrInputConf");
        var dt = self.findValueByVarHelper(keyDeclarations,"id",key, "string");
        
        return self.findValueByVarHelper(attrInputConf.attributes, "id", key, dt);

    }
    RecordConstructor.prototype.getSchmAttrInputConf = function (attrId, key){
        //entrega datos de configuración del input asociados a un attributo
        var self = this;
        //encontrar el id del input asociado al attribute
        var attribute = self.findValueByVarHelper(self.newschema,"_id",attrId);
        var inputRef = self.findValueByVarHelper(attribute.attributes,"id","input","reference");

        //encontrar el id del schema asociado
        var schema = self.findValueByVarHelper(self.newschema,"type","schema"); // suponiendo que hay solo un schema en el array
        // filtrar por attrInputConf type
        var schmAttrInputConf = self.newschema
                .filter(x=>x.type==="schmAttrInputConf")
                .filter(x=>self.findValueByVarHelper(x.attributes, "id", "schema","reference")===schema._id)
                .filter(x=>self.findValueByVarHelper(x.attributes, "id", "attribute","reference")===attrId)
                .filter(x=>self.findValueByVarHelper(x.attributes, "id", "input","reference")===inputRef);
        
        //obtener el objeto
        schmAttrInputConf = schmAttrInputConf.length > 0 ? schmAttrInputConf[0] : null;
        //obtener el data type que esta en el input
        var keyDeclarations = self.getInputAttr(attrId, "schmAttrInputConf");
        var dt = self.findValueByVarHelper(keyDeclarations,"id",key, "string");

        return self.findValueByVarHelper(schmAttrInputConf.attributes, "id", key, dt);

    }
    RecordConstructor.prototype.getInputAttr = function (attrId, key){
        var self = this;
        // el input tiene 4 keys fijos porque es el que se implementa: 2 dt string y 2 dt listofObj //ahora 3 listfOfObj
        // obtener el Attribute (type)
        var Attr = self.findValueByVarHelper(self.newschema,"_id",attrId);
        var inputRef = self.findValueByVarHelper(Attr.attributes,"id","input", "reference");
        var input = self.findValueByVarHelper(self.newschema,"_id",inputRef);

        if(key==="_id"){return input._id;}
        
        var dt = key==="name" || key==="dataType"? "string":"listOfObj";

        return self.findValueByVarHelper(input.attributes,"id",key,dt);
    }
    RecordConstructor.prototype.getAttr = function (attrId){
        var self = this;
        var dataType = self.getInputAttr(attrId, "dataType");
        console.log("dataType : "+dataType + " -  attrId: "+attrId)
        if(dataType != null ){
            var dato = this.findValueByVarHelper(self.attributes, "id", attrId, dataType);
          return dato;
        }else{
            return null;
        }

    }
    RecordConstructor.prototype.setAttr = function (attrId, value){
        var self = this;
        var dataType = self.getInputAttr(attrId, "dataType");
        if(dataType != null ){
            if(!this.attributes){ this.attributes = []}
            var index = this.attributes.map(x=>x.id).indexOf(attrId);
            if(index !== -1){
                this.attributes[index][dataType] = value;
            }else{
                var attr = {id:attrId}
                attr[dataType] = value;
                this.attributes.push(attr);
            }
            var dato = this.findValueByVarHelper(self.attributes, "id", attrId, dataType);
          return dato;
        }else{
            console.log("Error al ingresar el valor: "+value+" al attributo :"+ attrId);
            return null;
        }
    }
   
    RecordConstructor.prototype.dottedKey= function(key, x){
        return key.split('.').reduce(function (obj,i) {return obj[i]}, x)
        
    }

    RecordConstructor.prototype.findValueByVarHelper = function(array, key, value, target){
        var self = this;
        if(!Array.isArray(array)){return null;}

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