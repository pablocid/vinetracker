"use strict";
var Context = (function () {
    function Context() {
    }
    Object.defineProperty(Context.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (schm) {
            this._schema = schm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "record", {
        get: function () {
            return this._record;
        },
        set: function (value) {
            this._record = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "plant", {
        get: function () {
            return this._plant;
        },
        set: function (value) {
            this._plant = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "hilera", {
        get: function () {
            return this._hilera;
        },
        set: function (value) {
            this._hilera = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "espaldera", {
        get: function () {
            return this._espaldera;
        },
        set: function (value) {
            this._espaldera = value;
        },
        enumerable: true,
        configurable: true
    });
    return Context;
}());
exports.Context = Context;
//# sourceMappingURL=index.js.map