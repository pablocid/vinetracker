"use strict";
var ParamChecker = (function () {
    function ParamChecker(param, datatype) {
        this._parameter = param;
        this._dataType = datatype;
    }
    ParamChecker.prototype._string = function () {
        if (typeof this._parameter === 'string') {
            return true;
        }
        else {
            return false;
        }
    };
    ParamChecker.prototype._number = function () {
        if (typeof this._parameter === 'number') {
            return true;
        }
        if (typeof this._parameter === 'string') {
            if (/^\d*$/.test(this._parameter)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    ParamChecker.prototype._oid = function () {
        if (/^[0-9a-f]{24}$/i.test(this._parameter)) {
            return true;
        }
    };
    ParamChecker.prototype._filter = function () {
        //checkeando si hay errores en el parseo a JSON
        try {
            var arr = JSON.parse(this._parameter);
            //check if is an Array and if is empty
            if (Array.isArray(arr) && arr.length) {
                // verificando si los obj dentro del array tiene las propiedades key, datatype y value
                var isValid = true;
                for (var index = 0; index < arr.length; index++) {
                    if (arr[index].key === null || arr[index].value === null || arr[index].datatype === null) {
                        isValid = false;
                    }
                }
                return isValid;
            }
        }
        catch (err) {
            console.log('ParamChecker: invalid JSON filter');
            return false;
        }
    };
    ParamChecker.prototype._list = function () {
        if (Array.isArray(this._parameter)) {
            return true;
        }
        else {
            return false;
        }
    };
    ParamChecker.prototype._date = function () {
        // el valor ingresado debe ser un ISOstring();
        //checkeando si hay errores en el parseo a Date()
        try {
            var date = new Date(this._parameter);
            //check if date === Date().toISOString()
            if (date.toISOString() === this._parameter) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log('ParamChecker: invalid Date');
            return false;
        }
    };
    Object.defineProperty(ParamChecker.prototype, "check", {
        get: function () {
            switch (this._dataType) {
                case 'string':
                    return this._string();
                case 'number':
                    return this._number();
                case 'reference':
                    return this._oid();
                case 'objectId':
                    return this._oid();
                case 'filter':
                    return this._filter();
                case 'list':
                    return this._list();
            }
        },
        enumerable: true,
        configurable: true
    });
    return ParamChecker;
}());
exports.ParamChecker = ParamChecker;
//# sourceMappingURL=index.js.map