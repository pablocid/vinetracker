"use strict";
var builder_1 = require('ui/builder');
var grid_layout_1 = require('ui/layouts/grid-layout');
var observable_1 = require('data/observable');
var QueryParser_1 = require('../../../factories/QueryParser');
var record_service_1 = require('../../../services/record.service');
var dialogs_1 = require('ui/dialogs');
//cb('683(10).6');
//cb('57a8d8dfef44961377526953');
var barcodescanner = require("nativescript-barcodescanner");
var PlantScanner = (function () {
    function PlantScanner(code) {
        var _this = this;
        this._theme = builder_1.load({ name: 'theme', path: '~/PlantDashboard/Components/ScanHStatus' });
        this._barcode = barcodescanner;
        this._viewModel = new observable_1.Observable();
        this._viewModel.set('onScan', function (args) { _this._onTapScan(args); });
        this._viewModel.set('description', 'Escanea una planta para establecer la hilera');
        this._viewModel.set('loading', false);
        this._viewModel.set('code', '');
        this._viewModel.set('ubicacion', '');
        this._theme.bindingContext = this._viewModel;
        this._hastPermission();
        this._setScanOpts();
        if (code) {
            this._findRecord({ text: code });
        }
        //set _evaluatedActionCallback
        this._evaluatedActionCallback = this._unsetViewModelData;
    }
    Object.defineProperty(PlantScanner.prototype, "evaluatedCheck", {
        get: function () {
            return this._evaluatedCheck;
        },
        set: function (value) {
            this._evaluatedCheck = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "schmEvaluation", {
        get: function () {
            return this._schmEvaluation;
        },
        set: function (value) {
            this._schmEvaluation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "attrEvaluation", {
        get: function () {
            return this._attrEvaluation;
        },
        set: function (value) {
            this._attrEvaluation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        /**
         * Para setear una función como callback.
         * El valor que retorna es un objeto < :Record >
         */
        set: function (value) {
            this._callback = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "callbackData", {
        get: function () {
            return this._callbackData;
        },
        /**
         * Set callback for view forms
         */
        set: function (value) {
            this._callbackData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "evaluatedActionCallback", {
        get: function () {
            return this._evaluatedActionCallback;
        },
        /**
         * This callback has no parameters. _unsetViewModelData (code and ubicacion variable viewModel erase) is the default function that execute;
         */
        set: function (value) {
            this._evaluatedActionCallback = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlantScanner.prototype, "description", {
        set: function (value) {
            this._viewModel.set('description', value);
        },
        enumerable: true,
        configurable: true
    });
    PlantScanner.prototype._hastPermission = function () {
        var _this = this;
        this._barcode.hasCameraPermission().then(function (granted) {
            if (!granted) {
                _this._barcode.requestCameraPermission().then(function (permission) {
                    if (permission) {
                        console.log('permiso concedido');
                    }
                    else {
                        console.log('permiso denegado');
                    }
                });
            }
        });
    };
    PlantScanner.prototype._setScanOpts = function () {
        this._barcordeOpts = {};
        this._barcordeOpts.orientation = 'portrait';
        this._barcordeOpts.cancelLabel = 'Stop scanning';
        this._barcordeOpts.formats = 'QR_CODE';
        this._barcordeOpts.message = 'Escanea etiqueta';
        this._barcordeOpts.preferFrontCamera = false;
        this._barcordeOpts.showFlipCameraButton = false;
    };
    PlantScanner.prototype._onTapScan = function (args) {
        var _this = this;
        this._barcode.scan(this._barcordeOpts).then(function (r) {
            _this._findRecord(r);
        });
    };
    PlantScanner.prototype._unsetViewModelData = function () {
        this._viewModel.set('ubicacion', '');
        this._viewModel.set('code', '');
    };
    PlantScanner.prototype._errorAlert = function () {
        var alertOpts = {};
        alertOpts.title = 'Planta no encontrada';
        alertOpts.message = 'El código escaneado no tiene referencia con ninguna planta en la base de datos.';
        alertOpts.okButtonText = 'entendido';
        alertOpts.cancelable = false;
        dialogs_1.alert(alertOpts);
    };
    PlantScanner.prototype._evaluatedAction = function () {
        var _this = this;
        var actionOpt = {};
        actionOpt.title = 'Planta evaluada!';
        actionOpt.message = 'Esta planta han sido previamente evaluados. ¿Deseas evaluarla nuevamente ?.';
        var opt1 = 'Si';
        var opt2 = 'No';
        actionOpt.actions = [opt1, opt2];
        actionOpt.cancelable = false;
        return dialogs_1.action(actionOpt).then(function (opt) {
            if (opt === opt2) {
                _this._evaluatedActionCallback();
                // existe pero se evalua: checkIfEvaluated => false;
                return false;
            }
            else {
                return true;
            }
        });
    };
    PlantScanner.prototype._findRecord = function (s) {
        var _this = this;
        this._viewModel.set('loading', true);
        this._viewModel.set("code", s.text);
        this._config = new QueryParser_1.QueryConfig();
        this._config.id = s.text;
        if (!/^[0-9a-f]{24}$/i.test(s.text)) {
            //plant schema
            this._config.schm = '57a4e02ec830e2bdff1a1608';
            // cod_indiv
            this._config.key = '57c3583bc8307cd5b82f447d';
            this._config.datatype = 'string';
        }
        this._findOne = new record_service_1.FindPlant(this._config);
        this._findOne.find().then(function (res) {
            _this._viewModel.set('loading', false);
            if (!res.id) {
                _this._errorAlert();
                _this._unsetViewModelData();
            }
            else {
                _this._viewModel.set("ubicacion", res.getUbicación());
                //chechear si el registro ha sido ingresado
                if (_this._evaluatedCheck && _this._attrEvaluation && _this._schmEvaluation) {
                    _this._viewModel.set('loading', true);
                    _this._checkIfEvaluated(res).then(function (value) {
                        if (!value) {
                            if (_this._callbackData) {
                                _this._callbackData(res.id);
                            }
                        }
                        _this._viewModel.set('loading', false);
                    });
                }
                else {
                    /**
                     * si no existe checkeo, el dato se asigna al callbackData;
                     */
                    if (_this._callbackData) {
                        _this._callbackData(res.id);
                    }
                }
                //callback call
                if (_this._callback) {
                    _this._callback(res);
                }
            }
        });
    };
    PlantScanner.prototype._checkIfEvaluated = function (plant) {
        var _this = this;
        if (!this._evaluatedCheck && this._attrEvaluation && this._schmEvaluation) {
            throw new Error('La propiedad _evaluatedCheck, _attrEvaluation o _schmEvaluation no está seteada.');
        }
        var opts = new QueryParser_1.QueryConfig();
        opts.id = plant.id;
        opts.schm = this._schmEvaluation;
        opts.key = this._attrEvaluation;
        opts.datatype = 'reference';
        var evaluationRecord = new record_service_1.FindRecord(opts);
        return evaluationRecord.find().then(function (record) {
            if (record.id) {
                return _this._evaluatedAction();
            }
            else {
                return false;
            }
        });
        //schm evaluation = 57c42f2fc8307cd5b82f4484
        //schm attributo referencia = 57c42f77c8307cd5b82f4486
        //
    };
    PlantScanner.prototype.getView = function () {
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(this._theme);
        return grid;
    };
    return PlantScanner;
}());
exports.PlantScanner = PlantScanner;
//# sourceMappingURL=index.js.map