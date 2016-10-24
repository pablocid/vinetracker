"use strict";
var RecordService_1 = require('../../services/RecordService');
var QueryParser_1 = require('../QueryParser');
var Hilera = (function () {
    function Hilera() {
        /**** testing */
        this._restriction = [{ id: 'schm', string: '580c05b412e1240010cd9d62' }];
        /***** */
    }
    Object.defineProperty(Hilera.prototype, "plant", {
        get: function () {
            return this._plant;
        },
        set: function (value) {
            this._plant = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hilera.prototype, "restriction", {
        get: function () {
            return this._restriction;
        },
        set: function (value) {
            this._restriction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hilera.prototype, "schmEvaluation", {
        get: function () {
            return this._schmEvaluation;
        },
        set: function (value) {
            this._schmEvaluation = value;
        },
        enumerable: true,
        configurable: true
    });
    Hilera.prototype.ubicationSort = function (a, b) {
        if (a.getAttribute('5807afe331f55d0010aaffe6').value > b.getAttribute('5807afe331f55d0010aaffe6').value) {
            return 1;
        }
        else {
            return -1;
        }
    };
    Hilera.prototype.getMainList = function () {
        var _this = this;
        if (!this._plant.id) {
            throw new Error("Hilera Class: No se ha seteado 'plant' antes de llamar a getMainList");
        }
        if (!this._plant.getAttribute("5807af5f31f55d0010aaffe4").value === undefined) {
            throw new Error("Hilera Class: 'plant' no tiene el attributo espaldera");
        }
        if (!this._plant.getAttribute("5807af9231f55d0010aaffe5").value === undefined) {
            throw new Error("Hilera Class: 'plant' no tiene el attributo hilera");
        }
        var qc = new QueryParser_1.QueryConfig();
        qc.items = "300";
        qc.schm = "57a4e02ec830e2bdff1a1608";
        // filtero espaldera
        var filter_espaldera = new QueryParser_1.Filter();
        filter_espaldera.key = "5807af5f31f55d0010aaffe4";
        filter_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;
        filter_espaldera.datatype = "number";
        // filtero hilera
        var filter_hilera = new QueryParser_1.Filter();
        filter_hilera.key = "5807af9231f55d0010aaffe5";
        filter_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;
        filter_hilera.datatype = "number";
        qc.filter = [filter_espaldera, filter_hilera];
        var plants = new RecordService_1.FindPlants(qc);
        return plants.finds().then(function (x) {
            var a = x.sort(_this.ubicationSort);
            //this._rowPlants = a;
            return a;
        }).then(function (x) {
            console.log('applying restriction');
            return _this._applyRestriction(x);
        });
    };
    Hilera.prototype._applyRestriction = function (plants) {
        var _this = this;
        if (!this._restriction || this._restriction.length === 0) {
            this._rowPlants = plants;
            return plants;
        }
        console.log('este esquema tiene restricciones restriction');
        var qcRecords = new QueryParser_1.QueryConfig();
        qcRecords.items = "100";
        qcRecords.filter = [];
        var f0_espaldera = new QueryParser_1.Filter();
        f0_espaldera.key = "espaldera";
        f0_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;
        ;
        f0_espaldera.datatype = "number";
        qcRecords.filter.push(f0_espaldera);
        var f0_hilera = new QueryParser_1.Filter();
        f0_hilera.key = 'hilera';
        f0_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;
        ;
        f0_hilera.datatype = "number";
        qcRecords.filter.push(f0_hilera);
        for (var index = 0; index < this._restriction.length; index++) {
            var element = this._restriction[index];
            if (element.id === 'schm') {
                qcRecords.schm = element.string;
            }
            if (element.id === 'filter') {
                var f = new QueryParser_1.Filter();
                var set = element.string.split('|');
                console.log('/*****************************************************************************/');
                console.log(set);
                f.key = set[0];
                f.value = set[1];
                f.datatype = set[2];
                qcRecords.filter.push(f);
            }
        }
        var records = new RecordService_1.FindRecords(qcRecords);
        //57c42f77c8307cd5b82f4486 es el individuo ref
        return records.finds()
            .then(function (d) {
            //console.log('respuesta*********************************************************************')
            //console.log(JSON.stringify(d));
            //console.log(d.length);
            //console.log('/*****************************************************************************/')
            return d;
        })
            .then(function (x) { return x.map(function (i) { return i.getAttribute("57c42f77c8307cd5b82f4486").value; }); }).then(function (r) {
            var pass = [];
            for (var w = 0; w < plants.length; w++) {
                var index = r.indexOf(plants[w].id);
                //console.log('/*****************************************************************************/')
                //console.log('INDEX '+index);
                if (index !== -1) {
                    pass.push(plants[w]);
                }
            }
            _this._rowPlants = pass;
            return pass;
        });
    };
    Hilera.prototype.getEvaluatedId = function () {
        var qcRecords = new QueryParser_1.QueryConfig();
        qcRecords.items = "100";
        // fenotipado 0
        qcRecords.schm = this._schmEvaluation.id;
        var f0_espaldera = new QueryParser_1.Filter();
        f0_espaldera.key = "espaldera";
        f0_espaldera.value = this._plant.getAttribute("5807af5f31f55d0010aaffe4").value;
        ;
        f0_espaldera.datatype = "number";
        var f0_hilera = new QueryParser_1.Filter();
        f0_hilera.key = 'hilera';
        f0_hilera.value = this._plant.getAttribute("5807af9231f55d0010aaffe5").value;
        ;
        f0_hilera.datatype = "number";
        qcRecords.filter = [f0_espaldera, f0_hilera];
        var records = new RecordService_1.FindRecords(qcRecords);
        //57c42f77c8307cd5b82f4486 es el individuo ref
        return records.finds().then(function (x) { return x.map(function (i) { return i.getAttribute("57c42f77c8307cd5b82f4486").value; }); });
    };
    Hilera.prototype.getEvandNoev = function () {
        var _this = this;
        if (this._rowPlants) {
            return this.getEvaluatedId().then(function (ids) {
                var ev = [];
                var noev = [];
                for (var e = 0; e < _this._rowPlants.length; e++) {
                    var index = ids.indexOf(_this._rowPlants[e].id);
                    var curr = {
                        name: _this._rowPlants[e].getUbicación(),
                        id: _this._rowPlants[e].id,
                        position: _this._rowPlants[e].getAttribute('5807afe331f55d0010aaffe6').value,
                        plant: _this._rowPlants[e]
                    };
                    if (index === -1) {
                        noev.push(curr);
                    }
                    else {
                        ev.push(curr);
                    }
                }
                return {
                    evaluados: ev,
                    noEvaluados: noev
                };
            });
        }
        else {
            return this.getMainList().then(function (w) {
                return _this.getEvaluatedId().then(function (ids) {
                    var ev = [];
                    var noev = [];
                    for (var e = 0; e < _this._rowPlants.length; e++) {
                        var index = ids.indexOf(_this._rowPlants[e].id);
                        var curr = {
                            name: _this._rowPlants[e].getUbicación(),
                            id: _this._rowPlants[e].id,
                            position: _this._rowPlants[e].getAttribute('5807afe331f55d0010aaffe6').value,
                            plant: _this._rowPlants[e]
                        };
                        if (index === -1) {
                            noev.push(curr);
                        }
                        else {
                            ev.push(curr);
                        }
                    }
                    return {
                        evaluados: ev,
                        noEvaluados: noev
                    };
                });
            });
        }
    };
    return Hilera;
}());
exports.Hilera = Hilera;
//# sourceMappingURL=index.js.map