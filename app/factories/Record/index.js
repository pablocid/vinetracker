"use strict";
var Schema_1 = require('../Schema');
var checkParam = require('../../services/helper.service').checkParam;
var Record = (function (_super) {
    __extends(Record, _super);
    function Record(schm, record) {
        if (!schm || schm.length === 0) {
            throw new Error('no se pudo crear el Record porque el array schema esta vacío.');
        }
        _super.call(this);
        this._schema = new Schema_1.SchemaFull(schm);
        this._setData(record);
    }
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
    Record.prototype._setData = function (record) {
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
                    _this._attributes.push(new RecordAttribute(_this, _this._schema.attrSchms[indexSchm], record.attributes[indexAttr]));
                }
                else {
                    _this._attributes.push(new RecordAttribute(_this, _this._schema.attrSchms[indexSchm]));
                }
            }
        });
    };
    Object.defineProperty(Record.prototype, "data", {
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
    Record.prototype.getAttribute = function (value) {
        var index = this._attributes.map(function (x) { return x.id; }).indexOf(value);
        if (index !== -1) {
            return this._attributes[index];
        }
    };
    return Record;
}(Schema_1.BaseSchema));
exports.Record = Record;
var Plant = (function (_super) {
    __extends(Plant, _super);
    function Plant() {
        _super.apply(this, arguments);
    }
    Plant.prototype.getUbicación = function () {
        console.log('Plant - getUbicación');
        /*
        let espaldera = this.getAttribute('espaldera').value;
        let hilera = this.getAttribute('hilera').value;
        let posicion = this.getAttribute('posicion').value || '-';
        if(espaldera && hilera){
            return `E${espaldera} H${hilera} P${posicion}`;
        }
        */
        return 'ubicación ***';
    };
    return Plant;
}(Record));
exports.Plant = Plant;
var RecordAttribute = (function () {
    function RecordAttribute(reference, attrSchm, attr) {
        this._attrSchm = attrSchm;
        this._reference = reference;
        this._setAttribute(attr);
    }
    Object.defineProperty(RecordAttribute.prototype, "parent", {
        get: function () {
            return this._reference;
        },
        enumerable: true,
        configurable: true
    });
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
            console.log('checking parameter');
            if (checkParam(v, this.dataType)) {
                console.log('parameter OK');
                this._value = v;
            }
            else {
                console.log('parameter wrong');
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