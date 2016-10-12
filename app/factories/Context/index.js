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
    Object.defineProperty(Context.prototype, "schemaList", {
        get: function () {
            return this._schemaList;
        },
        set: function (schms) {
            this._schemaList = schms;
        },
        enumerable: true,
        configurable: true
    });
    return Context;
}());
exports.Context = Context;
//# sourceMappingURL=index.js.map