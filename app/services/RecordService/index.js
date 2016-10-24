"use strict";
var Schema_1 = require('../../factories/Schema');
var Request_1 = require('../Request');
var Record_1 = require('../../factories/Record');
var QueryParser_1 = require('../../factories/QueryParser');
var BaseFind = (function () {
    function BaseFind(config, method) {
        this._config = config;
        this._method = method;
    }
    BaseFind.prototype.makeObj = function (a) {
        return a;
    };
    BaseFind.prototype._setQueryParser = function () {
        this._queryParser = new QueryParser_1.QueryParser(this._config);
    };
    BaseFind.prototype.find = function () {
        var _this = this;
        this._setQueryParser();
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        console.log(JSON.stringify(o.url));
        console.log(JSON.stringify(o.options));
        return r.make().then(function (a) {
            if (_this._factory) {
                return _this.makeObj(a);
            }
            else {
                return a;
            }
        });
    };
    return BaseFind;
}());
exports.BaseFind = BaseFind;
var Aggregate = (function (_super) {
    __extends(Aggregate, _super);
    function Aggregate(config) {
        _super.call(this, config, 'GET');
    }
    Aggregate.prototype.find = function () {
        this._setQueryParser();
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        console.log(JSON.stringify(o.url));
        console.log(JSON.stringify(o.options));
        return r.make();
    };
    Aggregate.prototype.exist = function () {
        return this.find().then(function (x) {
            if (x && x.length) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    return Aggregate;
}(BaseFind));
exports.Aggregate = Aggregate;
var FindRecord = (function (_super) {
    __extends(FindRecord, _super);
    function FindRecord(config) {
        _super.call(this, config, 'GET');
        this._config.url = 'api/records';
        this._factory = true;
    }
    FindRecord.prototype.makeObj = function (a) {
        return new Record_1.Record(a.schema, a.record);
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
        var f = new Record_1.Plant(a.schema, a.record);
        console.log(f.id);
        return f;
    };
    return FindPlant;
}(FindRecord));
exports.FindPlant = FindPlant;
var FindPlants = (function (_super) {
    __extends(FindPlants, _super);
    function FindPlants() {
        _super.apply(this, arguments);
    }
    FindPlants.prototype.makeObj = function (a) {
        //let f = new Plant(a.schema, a.record );
        //console.log(" in FindPlants ...");
        //console.log(a.length);
        if (a.length === 0) {
            return [new Record_1.Plant(a.schema)];
        }
        return a.items.map(function (x) {
            //console.log('creating plants ...')
            return new Record_1.Plant(a.schema, x);
        });
    };
    FindPlants.prototype.finds = function () {
        var _this = this;
        this._setQueryParser();
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        console.log(JSON.stringify(o.url));
        console.log(JSON.stringify(o.options));
        return r.make().then(function (a) {
            if (_this._factory) {
                return _this.makeObj(a);
            }
            else {
                return a;
            }
        });
    };
    return FindPlants;
}(FindRecord));
exports.FindPlants = FindPlants;
var FindRecords = (function (_super) {
    __extends(FindRecords, _super);
    function FindRecords() {
        _super.apply(this, arguments);
    }
    FindRecords.prototype.makeObj = function (a) {
        if (a.length === 0) {
            return [new Record_1.Record(a.schema)];
        }
        return a.items.map(function (x) {
            //console.log('creating plants ...')
            return new Record_1.Record(a.schema, x);
        });
    };
    FindRecords.prototype.finds = function () {
        var _this = this;
        this._setQueryParser();
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        console.log(JSON.stringify(o.url));
        console.log(JSON.stringify(o.options));
        return r.make().then(function (a) {
            if (_this._factory) {
                return _this.makeObj(a);
            }
            else {
                return a;
            }
        });
    };
    return FindRecords;
}(FindRecord));
exports.FindRecords = FindRecords;
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
        return r.make().then(function (x) {
            if (x.items && x.items.length) {
                return x.items.map(function (x) { return new Schema_1.Schema(x); });
            }
            else {
                return [];
            }
        });
    };
    FindSchm.prototype.rawFind = function () {
        var url = this._queryParser.parse();
        var o = new Request_1.RequestOpts(url, this._method);
        var r = new Request_1.Request(o);
        return r.make();
    };
    return FindSchm;
}());
exports.FindSchm = FindSchm;
var SaveRecord = (function () {
    function SaveRecord(record) {
        this._config = new QueryParser_1.QueryConfig();
        this._config.url = 'api/records';
        this._content = JSON.stringify(record.data);
        if (record.id) {
            this._config.id = record.id;
            this._method = 'PUT';
        }
        else {
            this._method = 'POST';
        }
        this._queryParser = new QueryParser_1.QueryParser(this._config);
    }
    SaveRecord.prototype.save = function () {
        var url = this._queryParser.parse();
        var content = this._content;
        var o = new Request_1.RequestOpts(url, this._method, this._content);
        var r = new Request_1.Request(o);
        return r.make();
    };
    return SaveRecord;
}());
exports.SaveRecord = SaveRecord;
//# sourceMappingURL=index.js.map