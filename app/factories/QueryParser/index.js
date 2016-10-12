"use strict";
var QueryConfig = (function () {
    function QueryConfig() {
    }
    Object.defineProperty(QueryConfig.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "datatype", {
        get: function () {
            return this._datatype;
        },
        set: function (value) {
            this._datatype = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this._page = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "schm", {
        get: function () {
            return this._schm;
        },
        set: function (value) {
            this._schm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "populate", {
        get: function () {
            return this._populate;
        },
        set: function (value) {
            this._populate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryConfig.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = value;
        },
        enumerable: true,
        configurable: true
    });
    QueryConfig.prototype.queryExist = function () {
        if (this._filter || this._items || this._page || this._populate || this._schm) {
            return true;
        }
        return false;
    };
    return QueryConfig;
}());
exports.QueryConfig = QueryConfig;
var Filter = (function () {
    function Filter() {
    }
    Object.defineProperty(Filter.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "datatype", {
        get: function () {
            return this._datatype;
        },
        set: function (value) {
            this._datatype = value;
        },
        enumerable: true,
        configurable: true
    });
    Filter.prototype.getData = function () {
        return {
            key: this._key,
            value: this._value,
            datatype: this._datatype
        };
    };
    return Filter;
}());
exports.Filter = Filter;
var QueryParser = (function () {
    function QueryParser(config) {
        this._url = config.url;
        if (true) {
            if (config.page) {
                this._page = config.page;
            }
            if (config.items) {
                this._items = config.items;
            }
            if (config.schm) {
                this._schm = config.schm;
            }
            if (config.populate) {
                this._populate = config.populate;
            }
            if (config.filter && config.filter.length) {
                this._filter = config.filter;
            }
            if (config.id) {
                this._id = config.id;
            }
            if (config.key) {
                this._key = config.key;
            }
            if (config.datatype) {
                this._datatype = config.datatype;
            }
        }
    }
    QueryParser.prototype.parse = function () {
        var query = [this._parsePage(), this._parseItems(), this._parseSchm(), this._parseKey(), this._parseDatatype(), this._parseFilter()].filter(function (x) { return x !== ''; });
        var joined;
        if (query.length) {
            joined = query.join('&');
        }
        if (this._id) {
            this._url += '/' + this._id;
        }
        console.log(this._url + '?' + joined);
        return this._url + '?' + joined;
    };
    QueryParser.prototype._parseKey = function () {
        if (this._key) {
            return 'key=' + this._key;
        }
        else {
            return '';
        }
    };
    QueryParser.prototype._parseDatatype = function () {
        if (this._datatype) {
            return 'datatype=' + this._datatype;
        }
        else {
            return '';
        }
    };
    QueryParser.prototype._parsePage = function () {
        if (this._page) {
            return 'page=' + this._page;
        }
        else {
            return '';
        }
    };
    QueryParser.prototype._parseItems = function () {
        if (this._items) {
            return 'items=' + this._items;
        }
        else {
            return '';
        }
    };
    QueryParser.prototype._parseSchm = function () {
        if (this._schm) {
            return 'schm=' + this._schm;
        }
        else {
            return '';
        }
    };
    QueryParser.prototype._parseFilter = function () {
        if (this._filter) {
            var arr = this._filter;
            var isValid = true;
            for (var index = 0; index < arr.length; index++) {
                if (arr[index].key === null || arr[index].value === null || arr[index].datatype === null) {
                    isValid = false;
                }
            }
            if (isValid) {
                return "filter=" + JSON.stringify(arr.map(function (x) { return x.getData(); }));
            }
            else {
                console.log("Query Error: Filter -  Error al checkear la lista de objetos - key; value; datatype;");
                return '';
            }
        }
        else {
            return '';
        }
    };
    return QueryParser;
}());
exports.QueryParser = QueryParser;
/*
exports.urlQueryConfig = function urlConfig(config) {
    var url = '';
    // ULR config
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
    // ULR config ********************************************
    return url;
}


exports.urlQueryFindOne = function urlConfig(config) {
    // ULR config ********************************************
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
    // ULR config ********************************************
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

  return response;
}
*/ 
//# sourceMappingURL=index.js.map