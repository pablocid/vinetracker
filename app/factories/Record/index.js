"use strict";
var Schema_1 = require('../Schema');
var checkParam = require('../../services/helper.service').checkParam;
var Record2 = (function (_super) {
    __extends(Record2, _super);
    function Record2(schm, record) {
        if (!schm || schm.length === 0) {
            throw new Error('no se pudo crear el Record porque el array schema esta vacío.');
        }
        _super.call(this);
        this._schema = new Schema_1.SchemaFull(schm);
        this._setData(record);
    }
    Object.defineProperty(Record2.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (value) {
            this._schema = value;
        },
        enumerable: true,
        configurable: true
    });
    Record2.prototype._setData = function (record) {
        var _this = this;
        if (record) {
            this._id = record._id;
            this._created = record.created;
            this._updated = record.updated;
        }
        this._schm = this._schema.schm.id;
        this._attributes = [];
        this._schema.listAttrIds.forEach(function (l) {
            var indexSchm = _this._schema.attrSchms.map(function (s) { return s.id; }).indexOf(l);
            var indexAttr;
            if (record && record.attributes && record.attributes.length) {
                indexAttr = record.attributes.map(function (s) { return s.id; }).indexOf(l);
            }
            else {
                indexAttr = -1;
            }
            if (indexSchm !== -1) {
                if (indexAttr !== -1) {
                    _this._attributes.push(new RecordAttribute(_this._schema.attrSchms[indexSchm], record.attributes[indexAttr]));
                }
                else {
                    _this._attributes.push(new RecordAttribute(_this._schema.attrSchms[indexSchm]));
                }
            }
        });
    };
    Object.defineProperty(Record2.prototype, "data", {
        get: function () {
            var data = {};
            if (this._id) {
                data['_id'] = this._id;
            }
            data['schm'] = this._schm;
            data['created'] = this._created;
            data['updated'] = this._updated;
            if (this._attributes && this._attributes.length) {
                data['attributes'] = this._attributes.map(function (x) { return x.data; });
            }
            return data;
        },
        set: function (record) {
            this._setData(record);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * El attributo '(value:string)' corresponde a _id del attribute
     */
    Record2.prototype.getAttribute = function (value) {
        var index = this._attributes.map(function (x) { return x.id; }).indexOf(value);
        if (index !== -1) {
            return this._attributes[index];
        }
    };
    return Record2;
}(Schema_1.BaseSchema));
exports.Record2 = Record2;
var Record = (function () {
    function Record(schm, record) {
        this.setData(record);
        var raw = schm.filter(function (x) { return x.type === 'schema'; })[0];
        if (raw) {
            this._schema = new Schema_1.SchmSchemaObj(raw);
        }
        else {
            throw new Error('No existe el objeto tipo schema en el array SchmSchemaObj');
        }
        this._attrConfs = schm.filter(function (x) { return x.type === 'attribute'; }).map(function (x) { return new Schema_1.AttrSchm(x); });
        /*
        this._schmAttrInputConf = schm.filter(x=>x.type ==='schmAttrInputConf');
        this._attrInputConf = schm.filter(x=>x.type ==='attrInputConf');
        this._inputSchms = schm.filter(x=>x.type ==='input');
        */
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
    Record.prototype.attrSchema = function (attrId) {
        var as = this._attrConfs.filter(function (x) { return x.id === attrId; });
        if (as && as.length) {
            return 'adf';
        }
    };
    Record.prototype.setData = function (record) {
        if (record) {
            this._id = record._id;
            this._schm = record._schm;
            this._created = new Date(record.created);
            this._updated = record.updated;
            this._attributes = [];
            if (record.attributes && record.attributes.length) {
                this._attributes = record.attributes.map(function (x) { return new Schema_1.Attributes(x); });
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
var RecordAttribute = (function () {
    function RecordAttribute(attrSchm, attr) {
        this._attrSchm = attrSchm;
        this._setAttribute(attr);
    }
    RecordAttribute.prototype._setAttribute = function (attr) {
        if (attr && attr.id === this._attrSchm.id) {
            this._value = attr[this.dataType];
        }
    };
    Object.defineProperty(RecordAttribute.prototype, "attrSchm", {
        get: function () {
            return this._attrSchm;
        },
        set: function (value) {
            this._attrSchm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordAttribute.prototype, "dataType", {
        get: function () {
            return this._attrSchm.input.dataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordAttribute.prototype, "name", {
        get: function () {
            return this._attrSchm.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordAttribute.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            //check if value match dataType
            if (checkParam(v, this.dataType)) {
                this._value = v;
            }
            else {
                throw new Error('El valor ' + v + ' asignado al attributo ' + this.name + ' con el _id ' + this.id + ' no coincide con el dataType ' + this.dataType);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordAttribute.prototype, "id", {
        get: function () {
            return this._attrSchm.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordAttribute.prototype, "data", {
        get: function () {
            var d = {};
            d['id'] = this.id;
            d[this.dataType] = this.value;
            return d;
        },
        enumerable: true,
        configurable: true
    });
    return RecordAttribute;
}());
exports.RecordAttribute = RecordAttribute;
//# sourceMappingURL=index.js.map