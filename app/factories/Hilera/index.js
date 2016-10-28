"use strict";
var observable_array_1 = require('data/observable-array');
var observable_1 = require('data/observable');
var q = require('q');
var HileraFactory = (function () {
    function HileraFactory(list) {
        var _this = this;
        this._mainList = new observable_array_1.ObservableArray(list);
        this._noEvaluated = new observable_array_1.ObservableArray(list);
        this._evaluated = new observable_array_1.ObservableArray(this._mainList.getItem(0));
        this._evaluated.pop();
        this._observable = new observable_1.Observable();
        this._observable.on(observable_1.Observable.propertyChangeEvent, function (args) {
            //console.log('trigger propertyChangeEvent')
            if (args.propertyName === 'idRestrictions' && _this._idRestrictions) {
                //console.log('restricciones')
                _this._applyingRestrictions();
            }
            if (args.propertyName === 'idEvaluated' && _this._idEvaluated) {
                //console.log('idEvaluated')
                _this._applyingEvaluated();
            }
            if (args.propertyName === 'sort') {
                console.log('sortingggg ');
                _this._sortList(_this._noEvaluated, _this.sort);
                _this._sortList(_this._evaluated, _this.sort);
            }
            if (_this._callbackOnChangeList) {
                _this._callbackOnChangeList();
            }
        });
        this.sort = 'asc';
    }
    HileraFactory.prototype._applyingRestrictions = function () {
        var _this = this;
        this.idRestrictions.forEach(function (d) {
            var index = _this._noEvaluated.map(function (x) { return x.id; }).indexOf(d);
            if (index !== -1) {
                _this._noEvaluated.splice(index, 1);
            }
        });
        this._sortList(this._noEvaluated, this._observable.get('sort'));
    };
    HileraFactory.prototype._applyingEvaluated = function () {
        var _this = this;
        this.idEvaluated.forEach(function (d) {
            //revisar si existe previamente la planta en la lista evaluados
            var indexEv;
            if (_this._evaluated && _this._evaluated.length) {
                indexEv = _this._evaluated.map(function (x) { return x.id; }).indexOf(d);
            }
            else {
                indexEv = -1;
            }
            //tomar planta desde main list
            var indexMain = _this._mainList.map(function (x) { return x.id; }).indexOf(d);
            var currentPlant;
            if (indexMain !== -1) {
                currentPlant = _this._mainList.getItem(indexMain);
            }
            //revisar y eliminar si la planta esta en la lista de no evaluados
            var indexNoEv = _this._noEvaluated.map(function (x) { return x.id; }).indexOf(d);
            if (indexNoEv !== -1) {
                _this._noEvaluated.splice(indexNoEv, 1);
            }
            //insertar planta evaluada en lista evaluated
            if (indexEv === -1) {
                _this._evaluated.push(currentPlant);
            }
        });
        this._sortList(this._evaluated, this._observable.get('sort'));
    };
    HileraFactory.prototype.reverse = function () {
        this._noEvaluated.reverse();
        this._noEvaluated.push(this._noEvaluated.getItem(0));
        this._noEvaluated.pop();
        this.evaluated.reverse();
        this.evaluated.push(this.evaluated.getItem(0));
        this.evaluated.pop();
    };
    HileraFactory.prototype._sortList = function (arr, direction) {
        if (!arr || arr.length === 0) {
            return;
        }
        if (direction !== 'asc' && direction !== 'desc') {
            direction = 'asc';
        }
        if (direction === 'asc') {
            arr.sort(function (a, b) {
                if (a.position < b.position) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }
        if (direction === 'desc') {
            arr.sort(function (a, b) {
                if (a.position > b.position) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }
        this._noEvaluated.push(this._noEvaluated.getItem(0));
        this._noEvaluated.pop();
    };
    Object.defineProperty(HileraFactory.prototype, "sort", {
        get: function () {
            return this._observable.get('sort');
        },
        set: function (value) {
            this._observable.set('sort', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "observable", {
        get: function () {
            return this._observable;
        },
        set: function (value) {
            this._observable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "idRestrictions", {
        get: function () {
            return this._idRestrictions;
        },
        set: function (value) {
            if (value && Array.isArray(value)) {
                this._idRestrictions = new observable_array_1.ObservableArray(value);
                var pass = [];
                for (var index = 0; index < this._idRestrictions.length; index++) {
                    var element = this._idRestrictions.getItem(index);
                    var indexNoEv = this._noEvaluated.map(function (x) { return x.id; }).indexOf(element);
                    if (indexNoEv !== -1) {
                        pass.push(this._noEvaluated.getItem(indexNoEv));
                    }
                }
                while (this._noEvaluated.length) {
                    this._noEvaluated.pop();
                }
                for (var i = 0; i < pass.length; i++) {
                    this._noEvaluated.push(pass[i]);
                }
                //this._noEvaluated.push(this._noEvaluated.getItem(0));
                //this._noEvaluated.pop();
                if (this._callbackOnChangeList) {
                    this._callbackOnChangeList();
                }
                this._sortList(this._noEvaluated, this._observable.get('sort'));
                console.log(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "addEvaluated", {
        set: function (value) {
            this._idEvaluated.push(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "idEvaluated", {
        get: function () {
            return this._idEvaluated;
        },
        set: function (value) {
            var _this = this;
            if (value && Array.isArray(value)) {
                this._idEvaluated = new observable_array_1.ObservableArray(value);
                //TODO: cambiar esto por for loop
                this._idEvaluated.forEach(function (d) {
                    //revisar si existe previamente la planta en la lista evaluados
                    var indexEv;
                    if (_this._evaluated && _this._evaluated.length) {
                        indexEv = _this._evaluated.map(function (x) { return x.id; }).indexOf(d);
                    }
                    else {
                        indexEv = -1;
                    }
                    //tomar planta desde main list
                    var indexMain = _this._mainList.map(function (x) { return x.id; }).indexOf(d);
                    var currentPlant;
                    if (indexMain !== -1) {
                        currentPlant = _this._mainList.getItem(indexMain);
                    }
                    //revisar y eliminar si la planta esta en la lista de no evaluados
                    var indexNoEv = _this._noEvaluated.map(function (x) { return x.id; }).indexOf(d);
                    if (indexNoEv !== -1) {
                        _this._noEvaluated.splice(indexNoEv, 1);
                    }
                    //insertar planta evaluada en lista evaluated
                    if (indexEv === -1 && currentPlant) {
                        _this._evaluated.push(currentPlant);
                    }
                });
                if (this._callbackOnChangeList) {
                    this._callbackOnChangeList();
                }
                this._sortList(this._evaluated, this._observable.get('sort'));
                this._idEvaluated.on(observable_array_1.ObservableArray.propertyChangeEvent, function (args) {
                    if (args.eventName === 'propertyChange') {
                        _this._idEvaluated.forEach(function (d) {
                            //revisar si existe previamente la planta en la lista evaluados
                            var indexEv;
                            if (_this._evaluated && _this._evaluated.length) {
                                indexEv = _this._evaluated.map(function (x) { return x.id; }).indexOf(d);
                            }
                            else {
                                indexEv = -1;
                            }
                            //tomar planta desde main list
                            var indexMain = _this._mainList.map(function (x) { return x.id; }).indexOf(d);
                            var currentPlant;
                            if (indexMain !== -1) {
                                currentPlant = _this._mainList.getItem(indexMain);
                            }
                            //revisar y eliminar si la planta esta en la lista de no evaluados
                            var indexNoEv = _this._noEvaluated.map(function (x) { return x.id; }).indexOf(d);
                            if (indexNoEv !== -1) {
                                _this._noEvaluated.splice(indexNoEv, 1);
                            }
                            //insertar planta evaluada en lista evaluated
                            if (indexEv === -1 && currentPlant) {
                                _this._evaluated.push(currentPlant);
                            }
                        });
                        if (_this._callbackOnChangeList) {
                            _this._callbackOnChangeList();
                        }
                        _this._sortList(_this._evaluated, _this._observable.get('sort'));
                    }
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "evaluated", {
        get: function () {
            return this._evaluated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "noEvaluated", {
        get: function () {
            return this._noEvaluated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "evTabTitle", {
        get: function () {
            return this._evaluated.length + ' ' + this._evTabTitle;
        },
        set: function (value) {
            this._evTabTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "NoEvTabTitle", {
        get: function () {
            return this._noEvaluated.length + ' ' + this._NoEvTabTitle;
        },
        set: function (value) {
            this._NoEvTabTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HileraFactory.prototype, "callbackOnChangeList", {
        get: function () {
            return this._callbackOnChangeList;
        },
        set: function (value) {
            this._callbackOnChangeList = value;
        },
        enumerable: true,
        configurable: true
    });
    return HileraFactory;
}());
exports.HileraFactory = HileraFactory;
//# sourceMappingURL=index.js.map