"use strict";
var Schema_1 = require('../Schema');
var Record_1 = require('../Record');
var schmFull = require('./schmFull.json');
var plantRaw = require('./plantRaw.json');
var plantRaws = require('./plantRaws.json');
var schmFen0 = require('./schmFeno0.json');
var schmFen0_full = require('./feno0_schmFull.json');
var schmFeno1_full = require('./feno1Schmfull.json');
var PlantTest = (function () {
    function PlantTest() {
        this._schemafull = schmFull;
        this._plantRaw = plantRaw;
        this._plantRaws = plantRaws;
        this._schm = schmFen0;
        this._schmF1 = schmFeno1_full;
    }
    Object.defineProperty(PlantTest.prototype, "schmF1", {
        get: function () {
            return this._schmF1;
        },
        set: function (value) {
            this._schmF1 = value;
        },
        enumerable: true,
        configurable: true
    });
    PlantTest.prototype.getPlant = function () {
        return new Record_1.Plant(this._schemafull, this._plantRaw);
    };
    PlantTest.prototype.getPlants = function () {
        var _this = this;
        return this._plantRaws.map(function (x) { return new Record_1.Plant(_this._schemafull, x); });
    };
    PlantTest.prototype.getSchm = function () {
        return new Schema_1.Schema(this._schm);
    };
    PlantTest.prototype.getRecordFen0 = function () {
        return new Record_1.Record(schmFen0_full);
    };
    return PlantTest;
}());
exports.PlantTest = PlantTest;
//# sourceMappingURL=index.js.map