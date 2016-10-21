"use strict";
var Schema_1 = require('../Schema');
var Record_1 = require('../Record');
var schmFull = require('./schmFull.json');
var plantRaw = require('./plantRaw.json');
var plantRaws = require('./plantRaws.json');
var schmFen0 = require('./schmFeno0.json');
var PlantTest = (function () {
    function PlantTest() {
        this._schemafull = schmFull;
        this._plantRaw = plantRaw;
        this._plantRaws = plantRaws;
        this._schm = schmFen0;
    }
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
    return PlantTest;
}());
exports.PlantTest = PlantTest;
//# sourceMappingURL=index.js.map