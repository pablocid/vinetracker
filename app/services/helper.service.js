/**
 * Objeto config
 * ```
 * {
 *  dir:'adsf/asdf',
 *  query:{
 *    page:
 *    items:
 *    schm:
 *    populate:
 *    filter:
 *  } 
 * }
 * ```
 */
exports.urlQueryConfig = function urlConfig(config) {
    var url = '';
    // ULR config ********************************************/
    // if dir is set, add to url var
    if(config.dir){ url += config.dir; }
    // query
    if(config.query){
        url += "?";
        if(config.query.page){ url += "page="+config.query.page+"&"}
        if(config.query.items){ url += "items="+config.query.page+"&"}
        if(config.query.schm){ url += "schm="+ config.query.schm+"&"}
        if(config.query.populate){ url += "populate="+ config.query.populate+"&"}
        if(config.query.filter && config.query.filter.length){
            var arr = config.query.filter;
            var isValid = true;
            for (var index = 0; index < arr.length; index++) {
                if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
                    isValid = false;
                }
            }
            if(isValid){
                url += "filter="+JSON.stringify(arr)+"&";
            }else{
                console.log("Query Error: Filter -  Error al checkear la lista de objetos - key; value; datatype;")
            }
        }
    }
    // ULR config ********************************************/
    return url;
}

exports.urlQueryFindOne = function urlConfig(config) {
    // ULR config ********************************************/
    var url = '';
    // if dir is set, add to url var
    if(config.dir){ url += config.dir; }
    // query
    if(config.query){
        url += "?";
        if(config.query.schm){ url += "schm="+ config.query.schm+"&"}else{console.log("no schema")}
        if(config.query.key){ url += "key="+ config.query.key+"&"}else{console.log("no key")}
        if(config.query.datatype){ url += "datatype="+ config.query.datatype+"&"}else{console.log("no datatype")}
    }
    // ULR config ********************************************/
    return url;
}

exports.checkParam = function (param, dataType) {

  if(param === null){ return false; }
  var response = false;
  
  if(dataType === 'string'){
    if(typeof param === 'string' && param.length>0){
      response = true;
    }
  }

  if(dataType === 'number'){
    //console.log('chequea numero')
    if(typeof param === 'number'){
      response = true;
    }
    if(typeof param === 'string'){
      
      if(/^\d*$/.test( param )){
        //console.log('es  numero')
        response = true;
      }
    }
  }

  if(dataType === 'objectId'){
    if(/^[0-9a-f]{24}$/i.test(param)){
      response = true;
    }
  }

  if(dataType === 'reference'){
    if(/^[0-9a-f]{24}$/i.test(param)){
      response = true;
    }
  }

  //filtro de registros
  if (dataType === 'filter') {
    //checkeando si hay errores en el parseo a JSON
    try {
      var arr = JSON.parse(param);
      //check if is an Array and if is empty
      if(arr.length){
        // verificando si los obj dentro del array tiene las propiedades key, datatype y value
        var isValid = true;
        for (var index = 0; index < arr.length; index++) {
          if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
            isValid = false;
          }
        }
        response = isValid;
      }

    } catch (err) {
      response = false;
      console.log('invalid JSON')
    }
  }
  if(dataType === 'list'){
    if(Array.isArray(param)){
      response = true;
    }
  }

  if (dataType === 'date') {
    // el valor ingresado debe ser un ISOstring();
    //checkeando si hay errores en el parseo a Date()
    try {
      var date = new Date(param);
      //check if date === Date().toISOString()
      if(date.toISOString() === param){
        response = true;
      }

    } catch (err) {
      response = false;
      console.log('invalid JSON')
    }
  }

  return response;
}
