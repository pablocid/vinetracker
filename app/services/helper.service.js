
exports.urlQueryConfig = function urlConfig(config) {
    // ULR config ********************************************/
    var url = '';
    // if dir is set, add to url var
    if(config.dir){ url += config.dir; }
    // query
    if(config.query){
        url += "?";
        if(config.query.page){ url += "page="+config.query.page+"&"}
        if(config.query.items){ url += "items="+config.query.page+"&"}
        if(config.query.schm){ url += "schm="+ config.query.schm+"&"}
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