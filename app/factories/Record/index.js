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
exports.Attributes = Attributes;
var Updated = (function () {
    function Updated() {
    }
    Object.defineProperty(Updated.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (id) {
            // check if $oid
            this._user = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Updated.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (isoDate) {
            this._date = isoDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Updated.prototype, "data", {
        get: function () {
            return {
                user: this._user,
                date: this._date
            };
        },
        enumerable: true,
        configurable: true
    });
    return Updated;
}());
exports.Updated = Updated;
var Record = (function () {
    function Record(schm, record) {
        this.setData(record);
        if (schm.filter(function (x) { return x.type === 'schema'; })[0]) {
            this._schema = schm.filter(function (x) { return x.type === 'schema'; })[0];
        }
        else {
            throw new Error('No existe el objeto tipo schema en el array SchmSchemaObj');
        }
        this._attributeSchms = schm.filter(function (x) { return x.type === 'attribute'; });
        this._schmAttrInputConfSchms = schm.filter(function (x) { return x.type === 'schmAttrInputConf'; });
        this._attrInputConfSchms = schm.filter(function (x) { return x.type === 'attrInputConf'; });
    }
    Object.defineProperty(Record.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "schm", {
        get: function () {
            return this._schm;
        },
        set: function (value) {
            this._schm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (value) {
            this._schema = value;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.setData = function (record) {
        if (record) {
            this._id = record._id;
            this._schm = record._schm;
            this._created = new Date(record.created);
            this._updated = record.updated;
            this._attributes = [];
            if (record.attributes && record.attributes.length) {
                this._attributes = record.attributes.map(function (x) { return new Attributes(x); });
            }
        }
    };
    Record.prototype.getAttr = function (attrId, dt) {
        return this.findValueByVarHelper("id", attrId, dt);
    };
    Record.prototype.findValueByVarHelper = function (key, value, target) {
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
    Record.prototype.getData = function () {
        var data = {};
        if (this._id) {
            data._id = this._id;
        }
        data.schm = this._schm;
        //estas propiedades deberían ser seteadas en el backend
        data.created = this._created;
        data.updated = this._updated;
        /**+++++++++++++++++++++++++++++++++++++++++++++++++++ */
        data.attributes = this._attributes;
        return data;
    };
    return Record;
}());
exports.Record = Record;
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant() {
        _super.apply(this, arguments);
    }
    Plant.prototype.getUbicación = function () {
        var espaldera = this.getAttr('espaldera', 'number');
        var hilera = this.getAttr('hilera', 'number');
        var posicion = this.getAttr('posicion', 'number') || '-';
        if (espaldera && hilera) {
            return "E" + espaldera + " H" + hilera + " P" + posicion;
        }
        return 'sin información de ubicación';
    };
    return Plant;
}(Record));
exports.Plant = Plant;
//# sourceMappingURL=index.js.map