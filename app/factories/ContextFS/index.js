"use strict";
var Record_1 = require('../Record');
var Schema_1 = require('../Schema');
var fs = require("file-system");
var ContextFS = (function () {
    function ContextFS() {
        var documents = fs.knownFolders.documents();
        this._file = documents.getFile("schemas.json");
        if (!this._file.readTextSync()) {
            this._file.writeTextSync('{}');
        }
        this._data = JSON.parse(this._file.readTextSync());
        if (!this._data.schema) {
            this._data.schema = {};
        }
        if (!this._data.record || !this._data.record.data || !this._data.record.schm) {
            this._data.record = { data: '', schm: '' };
        }
        if (!this._data.plant || !this._data.plant.data || !this._data.plant.schm) {
            this._data.plant = { data: '', schm: '' };
        }
    }
    ContextFS.prototype.clean = function () {
        this._data = {};
        this._file.writeTextSync('{}');
    };
    Object.defineProperty(ContextFS.prototype, "allowedPlantsId", {
        get: function () {
            return this._data.allowedPlantsId;
        },
        set: function (value) {
            this._data.allowedPlantsId = value;
            this._dataSaveToFile();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextFS.prototype, "hilera", {
        get: function () {
            if (this._data.hilera) {
                return this._data.hilera.map(function (x) { return new Record_1.Plant(x.schm, x.data); });
            }
            else {
                return [];
            }
        },
        set: function (value) {
            this._data.hilera = value.map(function (x) {
                return { schm: x.schema.data, data: x.data };
            });
            this._dataSaveToFile();
        },
        enumerable: true,
        configurable: true
    });
    ContextFS.prototype._dataSaveToFile = function () {
        this._file.writeText(JSON.stringify(this._data));
    };
    Object.defineProperty(ContextFS.prototype, "schema", {
        get: function () {
            if (this._data.schema) {
                return new Schema_1.Schema(this._data.schema);
            }
        },
        set: function (schm) {
            this._data.schema = schm.data;
            this._dataSaveToFile();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextFS.prototype, "record", {
        get: function () {
            if (this._data.record) {
                return new Record_1.Record(this._data.record.schm, this._data.record.data);
            }
            else {
                return;
            }
        },
        set: function (value) {
            this._data.record = {
                data: value.data,
                schm: value.schema.data
            };
            this._dataSaveToFile();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextFS.prototype, "plant", {
        get: function () {
            if (this._data.plant && this._data.plant.schm) {
                return new Record_1.Plant(this._data.plant.schm, this._data.plant.data);
            }
        },
        set: function (value) {
            this._data.plant.data = value.data;
            this._data.plant.schm = value.schema.data;
            this._dataSaveToFile();
        },
        enumerable: true,
        configurable: true
    });
    return ContextFS;
}());
exports.ContextFS = ContextFS;
//# sourceMappingURL=index.js.map