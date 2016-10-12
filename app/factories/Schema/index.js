"use strict";
var Attributes = (function () {
    function Attributes(attr) {
        this._id = attr.id;
        this._string = attr.string || undefined;
        this._boolean = attr.boolean !== undefined ? attr.boolean : undefined;
        this._date = attr.date ? new Date(attr.date) : undefined;
        this._number = attr.number || undefined;
        this._reference = attr.reference || undefined;
        this._listOfObj = attr.listOfObject || undefined;
        this._list = attr.list && attr.list.length ? attr.list : undefined;
    }
    Object.defineProperty(Attributes.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "string", {
        get: function () {
            return this._string;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "boolean", {
        get: function () {
            return this._boolean;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "date", {
        get: function () {
            return this._date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "number", {
        get: function () {
            return this._number;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "reference", {
        get: function () {
            return this._reference;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "listOfObject", {
        get: function () {
            return this._listOfObj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attributes.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    Attributes.prototype.getValue = function () {
        //return this._string || this._boolean!== undefined? this._boolean: null || this._date || this._number!== undefined? this._number: null || this._reference || this._listOfObj || this._list;
        return this._string;
    };
    return Attributes;
}());
var SchmSchemaObj = (function () {
    function SchmSchemaObj(schm) {
        var _this = this;
        if (schm) {
            this._id = schm._id;
            this._type = schm.type;
            this._name = schm.name;
            this._created = new Date(schm.created);
            this._updated = schm.updated;
            this._attributes = [];
            if (schm.attributes && schm.attributes.length) {
                schm.attributes.forEach(function (x) {
                    _this._attributes.push(new Attributes(x));
                });
            }
        }
    }
    Object.defineProperty(SchmSchemaObj.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchmSchemaObj.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    SchmSchemaObj.prototype.getAttr = function (attrId, dt) {
        return this.findValueByVarHelper("id", attrId, dt);
    };
    SchmSchemaObj.prototype.findValueByVarHelper = function (key, value, target) {
        if (key === undefined && value === undefined) {
            return null;
        }
        var index = this._attributes.map(function (x) { return x[key]; }).indexOf(value);
        if (index === -1) {
            return null;
        }
        if (target === undefined) {
            return this._attributes[index];
        }
        return this._attributes[index][target];
    };
    return SchmSchemaObj;
}());
exports.SchmSchemaObj = SchmSchemaObj;
//# sourceMappingURL=index.js.map