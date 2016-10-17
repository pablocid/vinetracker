"use strict";
var makeRequest = require('./requestMaker.service');
var IndividuoSchm = require("./schms-test");
var RecordFactory = require('./record.factory');
var urlQueryConfig = require('./helper.service');
var Request_1 = require('./Request');
var QueryParser_1 = require('../factories/QueryParser');
var BaseFind = (function () {
    function BaseFind(config, method) {
        this._config = config;
        this._method = method;
        this._factory = false;
    }
    BaseFind.prototype.makeObj = function (a) {
        return a;
    };
    BaseFind.prototype._setQueryParser = function () {
        this._queryParser = new QueryParser_1.QueryParser(this._config);
    };
    BaseFind.prototype.find = function () {
        var self = this;
        this._setQueryParser();
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        return r.make().then(function (a) {
            if (self._factory) {
                return self.makeObj(a);
            }
            else {
                return a;
            }
        });
    };
    return BaseFind;
}());
exports.BaseFind = BaseFind;
exports.FindOne = function (config) {
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    if (config.id) {
        config.dir += '/' + config.id;
    }
    else {
        return null;
    }
    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method: 'GET',
    };
    return makeRequest.makeRequest(options).then(function (data) {
        //console.log("request realizado")
        if (data.length > 1) {
            console.log('ASDJLASKDJ - Existe más de un registro para este identificador');
        }
        var RecordConstructor = RecordFactory.RecordFactory(IndividuoSchm.Individuo(), data.schema);
        return new RecordConstructor(data.record);
    });
};
var FindRecord = (function (_super) {
    __extends(FindRecord, _super);
    function FindRecord(config) {
        _super.call(this, config, 'GET');
        this._config.url = 'api/records';
        this._factory = true;
    }
    FindRecord.prototype.makeObj = function (a) {
        //var obj = new Record(a.schema, a.record );
        return a;
    };
    return FindRecord;
}(BaseFind));
exports.FindRecord = FindRecord;
var FindPlant = (function (_super) {
    __extends(FindPlant, _super);
    function FindPlant() {
        _super.apply(this, arguments);
    }
    FindPlant.prototype.makeObj = function (a) {
        //var obj = new Plant(a.schema, a.record );
        return a;
    };
    return FindPlant;
}(FindRecord));
exports.FindPlant = FindPlant;
exports.Find = function (config) {
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    var qp = new QueryParser_1.QueryParser(config);
    var opt = new Request_1.RequestOpts(qp.parse(), 'GET');
    var options = {
        //url: urlQueryConfig.urlQueryConfig(config),
        url: qp.parse(),
        method: 'GET',
    };
    var req = new Request_1.Request(opt);
    return req.make().then(function (x) {
        var RecordConstructor = RecordFactory.RecordFactory(null, x.schema);
        x.items = x.items.map(function (x) { return new RecordConstructor(x); });
        return x;
    });
    /*
    return makeRequest.makeRequest(options).then(function (data) {
        var RecordConstructor = RecordFactory.RecordFactory( null, data.schema );
        data.items = data.items.map(x=>new RecordConstructor(x));
        return data;

    });
    */
};
/*
    exports.FindSchm = function(config){
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryConfig
        config.dir = 'api/schemas';
        var qp = new QueryParser(config);
        var opt = new RequestOpts();
        opt.url = qp.parse();
        opt.method = 'GET';
    
        var options = {
            url: urlQueryConfig.urlQueryConfig(config),
            method : 'GET',
        }
        var req = new Request(opt);
        return req.make();
    }
*/
/*
export class FindSchm extends BaseFind{
    constructor(config:QueryConfig){
        super(config,'GET');
        this._config.url = 'api/schemas';
    }
}
*/
var FindSchm = (function () {
    function FindSchm(config) {
        this._config = config;
        this._config.url = 'api/schemas';
        this._queryParser = new QueryParser_1.QueryParser(this._config);
        this._method = 'GET';
    }
    FindSchm.prototype.find = function () {
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        return r.make();
    };
    return FindSchm;
}());
exports.FindSchm = FindSchm;
exports.FindPop = function (config) {
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    // debe existir la propiedad config.attrId
    if (!config.attrId) {
        console.log("Error: la propidad config.attrId no existe");
        return null;
    }
    ;
    config.dir = 'api/records';
    var options = {
        url: urlQueryConfig.urlQueryConfig(config),
        method: 'GET',
    };
    return makeRequest.makeRequest(options).then(function (data) {
        var RecordConstructor = RecordFactory.RecordFactory(null, data.schema);
        var RecordConstructorPop = RecordFactory.RecordFactory(null, data.schemaPopulated);
        data.items = data.items.map(function (x) {
            var item = new RecordConstructor(x);
            var reference = item.getAttr(config.attrId);
            if (!reference) {
                return item;
            }
            if (!data.itemsPopulated || !data.itemsPopulated.length) {
                return item;
            }
            var index = data.itemsPopulated.map(function (x) { return x._id; }).indexOf(reference);
            if (index !== -1) {
                item[config.attrId] = new RecordConstructorPop(data.itemsPopulated[index]);
            }
            return item;
        });
        return data;
    });
};
exports.createNewRecord = function (schm, id) {
    if (schm) {
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
        var config = { dir: '', id: '' };
        config.dir = 'api/schemas';
        config.id = schm;
        if (config.id) {
            config.dir += '/' + config.id;
        }
        else {
            return null;
        }
        var options = {
            url: urlQueryConfig.urlQueryFindOne(config),
            method: 'GET',
        };
        return makeRequest.makeRequest(options).then(function (data) {
            //console.log(data)
            var RecordConstructor = RecordFactory.RecordFactory(null, data);
            var record = new RecordConstructor();
            record.schm = schm;
            return record;
        });
    }
    if (id) {
        // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
        var config = { dir: '', id: '' };
        config.dir = 'api/records';
        config.id = id;
        if (config.id) {
            config.dir += '/' + config.id;
        }
        else {
            return null;
        }
        var options = {
            url: urlQueryConfig.urlQueryFindOne(config),
            method: 'GET',
        };
        return makeRequest.makeRequest(options).then(function (data) {
            //console.log(data)
            var RecordConstructor = RecordFactory.RecordFactory(null, data.schema);
            return new RecordConstructor(data.record);
        });
    }
};
exports.saveRecord = function (record) {
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    var dir = 'api/records';
    var method = 'POST';
    if (record && record.schm) {
        if (record._id) {
            dir += '/' + record._id;
            method = 'PUT';
        }
    }
    else {
        console.log("No se guardó el registro");
        return null;
    }
    var options = {
        url: dir,
        method: method,
        content: JSON.stringify(record)
    };
    //console.log(JSON.stringify(record) );
    return makeRequest.makeRequest(options).then(function (data) {
        //console.log(data._id);
        return data;
    });
};
//# sourceMappingURL=record.service.js.map