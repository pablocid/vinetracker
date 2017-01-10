"use strict";
var Attributes = (function () {
    function Attributes(attr) {
        this._id = attr.id;
        this._string = attr.string || undefined;
        this._boolean = attr.boolean !== undefined ? attr.boolean : undefined;
        this._date = attr.date || undefined;
        this._number = attr.number || undefined;
        this._reference = attr.reference || undefined;
        this._listOfObj = attr.listOfObj || undefined;
        this._list = attr.list && attr.list.length ? attr.list : undefined;
    }
    Object.defineProperty(Attributes.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
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
            return new Date(this._date);
        },
        set: function (value) {
            this._date = new Date(this._date).toISOString();
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
    Object.defineProperty(Attributes.prototype, "listOfObj", {
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
    Object.defineProperty(Attributes.prototype, "data", {
        get: function () {
            var data = {};
            data['id'] = this._id;
            if (this._string) {
                data['string'] = this._string;
            }
            if (this._boolean !== undefined) {
                data['boolean'] = this._boolean;
            }
            if (this._date) {
                data['date'] = this._date;
            }
            if (this._number !== undefined) {
                data['number'] = this._number;
            }
            if (this._reference) {
                data['reference'] = this._reference;
            }
            if (this._listOfObj) {
                data['listOfObj'] = this._listOfObj;
            }
            if (this._list) {
                data['list'] = this._list;
            }
            return data;
        },
        enumerable: true,
        configurable: true
    });
    return Attributes;
}());
exports.Attributes = Attributes;
var Updated = (function () {
    function Updated(update) {
        if (update.user) {
            this._user = update.user;
        }
        if (update.date) {
            this._date = new Date(update.date);
        }
    }
    Object.defineProperty(Updated.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Updated.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
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
var BaseSchema = (function () {
    function BaseSchema() {
    }
    Object.defineProperty(BaseSchema.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSchema.prototype, "created", {
        get: function () {
            return new Date(this._created);
        },
        set: function (value) {
            this._created = value.toISOString();
        },
        enumerable: true,
        configurable: true
    });
    BaseSchema.prototype.update = function (value) {
        if (this._updated) {
            this._updated.push(value);
        }
        else {
            this._updated = [];
            this._updated.push(value);
        }
    };
    return BaseSchema;
}());
exports.BaseSchema = BaseSchema;
var Schema = (function (_super) {
    __extends(Schema, _super);
    function Schema(schm) {
        _super.call(this);
        this._setData(schm);
    }
    Object.defineProperty(Schema.prototype, "name", {
        get: function () {
            return this.getAttr('name', 'string');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "description", {
        get: function () {
            return this.getAttr('description', 'string');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Schema.prototype._setData = function (schm) {
        if (schm) {
            this._id = schm._id;
            this._type = schm.type;
            this._name = schm.name;
            this._created = schm.created;
            this._updated = schm.updated;
            this._attributes = [];
            if (schm.attributes && schm.attributes.length) {
                this._attributes = schm.attributes.map(function (x) { return new Attributes(x); });
            }
        }
    };
    Schema.prototype.getAttr = function (attrId, target, key) {
        if (!key) {
            key = 'id';
        }
        ;
        if (key === undefined && attrId === undefined) {
            return null;
        }
        var index = this._attributes.map(function (x) { return x[key]; }).indexOf(attrId);
        if (index === -1) {
            return null;
        }
        if (target === undefined) {
            return this._attributes[index];
        }
        return this._attributes[index][target];
    };
    Object.defineProperty(Schema.prototype, "data", {
        get: function () {
            var data = {};
            if (this._id) {
                data['_id'] = this._id;
            }
            data['type'] = this._type;
            data['name'] = this._name;
            data['created'] = this._created;
            data['updated'] = this._updated;
            if (this._attributes && this._attributes.length) {
                data['attributes'] = this._attributes.map(function (x) { return x.data; });
            }
            return data;
        },
        set: function (record) {
            if (record) {
                this._id = record._id;
                this._type = record.type;
                this._name = record.name;
                this._created = record.created;
                this._updated = record.updated;
                this._attributes = [];
                if (record.attributes && record.attributes.length) {
                    this._attributes = record.attributes.map(function (x) { return new Attributes(x); });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "properties", {
        get: function () {
            var keyObj = this.getAttr('keys', 'listOfObj');
            if (!keyObj || keyObj.legth === 0) {
                return {};
            }
            var data = {};
            for (var index = 0; index < keyObj.length; index++) {
                var id = keyObj[index]['id'];
                var value = keyObj[index]['string'];
                data[id] = this.getAttr(id, value);
            }
            return data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "listAttrIds", {
        get: function () {
            return this.getAttr('attributes', 'list');
        },
        enumerable: true,
        configurable: true
    });
    return Schema;
}(BaseSchema));
exports.Schema = Schema;
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
    Object.defineProperty(SchmSchemaObj.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        set: function (value) {
            this._attributes = value;
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
var AttrSchm = (function (_super) {
    __extends(AttrSchm, _super);
    function AttrSchm() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AttrSchm.prototype, "inputRef", {
        get: function () {
            return this.getAttr('input', 'reference');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttrSchm.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
        },
        enumerable: true,
        configurable: true
    });
    return AttrSchm;
}(Schema));
exports.AttrSchm = AttrSchm;
var InputSchm = (function (_super) {
    __extends(InputSchm, _super);
    function InputSchm() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(InputSchm.prototype, "dataType", {
        get: function () {
            return this.getAttr('dataType', 'string');
        },
        enumerable: true,
        configurable: true
    });
    return InputSchm;
}(Schema));
exports.InputSchm = InputSchm;
var SchemaFull = (function () {
    function SchemaFull(schema) {
        this._data = schema;
        this._setInputSchms(schema);
        this._setSchema(schema);
        // esta función requiere de que los _inputs esten seteados;
        this._setAttrSchms(schema);
    }
    Object.defineProperty(SchemaFull.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaFull.prototype, "schm", {
        get: function () {
            return this._schm;
        },
        set: function (value) {
            this._schm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaFull.prototype, "listAttrIds", {
        get: function () {
            return this.schm.listAttrIds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaFull.prototype, "attrSchms", {
        get: function () {
            return this._attrSchms;
        },
        set: function (value) {
            this._attrSchms = value;
        },
        enumerable: true,
        configurable: true
    });
    SchemaFull.prototype._setSchema = function (values) {
        var schema = values.filter(function (x) { return x.type === 'schema'; });
        if (schema.length) {
            this._schm = new Schema(schema[0]);
        }
    };
    SchemaFull.prototype._setAttrSchms = function (values) {
        var _this = this;
        var attrConfs = values.filter(function (x) { return x.type === 'attribute'; });
        if (attrConfs.length) {
            this._attrSchms = attrConfs.map(function (x) {
                var a = new AttrSchm(x);
                var index = _this._inputs.map(function (i) { return i.id; }).indexOf(a.inputRef);
                if (index !== -1) {
                    a.input = _this._inputs[index];
                }
                else {
                    console.log('El attributo no hizo match con un input. Cuidadooooo !!!!!!');
                }
                return a;
            });
        }
    };
    SchemaFull.prototype._setInputSchms = function (values) {
        var attrConfs = values.filter(function (x) { return x.type === 'input'; });
        if (attrConfs.length) {
            this._inputs = attrConfs.map(function (x) { return new InputSchm(x); });
        }
    };
    return SchemaFull;
}());
exports.SchemaFull = SchemaFull;
//# sourceMappingURL=index.js.map