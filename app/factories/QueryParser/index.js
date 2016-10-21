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
    Object.defineProperty(QueryConfig.prototype, "query", {
        get: function () {
            return this._query;
        },
        set: function (value) {
            this._query = value;
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
            if (config.query) {
                this._query = config.query;
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
        var query = [this._query, this._parsePage(), this._parseItems(), this._parseSchm(), this._parseKey(), this._parseDatatype(), this._parseFilter()].filter(function (x) { return x !== ''; });
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
    QueryParser.prototype._parseQuery = function () {
        if (this._query) {
            return 'query=' + this._query;
        }
        else {
            return '';
        }
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
//# sourceMappingURL=index.js.map