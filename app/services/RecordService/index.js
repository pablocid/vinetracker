"use strict";
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
        return new Record_1.Plant(a.schema, a.record);
    };
    return FindPlant;
}(FindRecord));
exports.FindPlant = FindPlant;
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
//# sourceMappingURL=index.js.map