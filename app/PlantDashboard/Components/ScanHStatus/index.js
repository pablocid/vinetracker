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
var ScanHStatus = (function () {
    function ScanHStatus(code) {
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
    }
    Object.defineProperty(ScanHStatus.prototype, "callback", {
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
    Object.defineProperty(ScanHStatus.prototype, "callbackData", {
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
    Object.defineProperty(ScanHStatus.prototype, "description", {
        set: function (value) {
            this._viewModel.set('description', value);
        },
        enumerable: true,
        configurable: true
    });
    ScanHStatus.prototype._hastPermission = function () {
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
    ScanHStatus.prototype._setScanOpts = function () {
        this._barcordeOpts = {};
        this._barcordeOpts.orientation = 'portrait';
        this._barcordeOpts.cancelLabel = 'Stop scanning';
        this._barcordeOpts.formats = 'QR_CODE';
        this._barcordeOpts.message = 'Escanea etiqueta';
        this._barcordeOpts.preferFrontCamera = false;
        this._barcordeOpts.showFlipCameraButton = false;
    };
    ScanHStatus.prototype._onTapScan = function (args) {
        var _this = this;
        this._barcode.scan(this._barcordeOpts).then(function (r) {
            _this._findRecord(r);
        });
    };
    ScanHStatus.prototype._unsetViewModelData = function () {
        this._viewModel.set('ubicacion', '');
        this._viewModel.set('code', '');
    };
    ScanHStatus.prototype._errorAlert = function () {
        var alertOpts = {};
        alertOpts.title = 'Planta no encontrada';
        alertOpts.message = 'El código escaneado no tiene referencia con ninguna planta en la base de datos.';
        alertOpts.okButtonText = 'entendido';
        alertOpts.cancelable = false;
        dialogs_1.alert(alertOpts);
    };
    ScanHStatus.prototype._findRecord = function (s) {
        this._viewModel.set('loading', true);
        this._viewModel.set("code", s.text);
        this._config = new QueryParser_1.QueryConfig();
        this._config.id = s.text;
        if (!/^[0-9a-f]{24}$/i.test(s.text)) {
            this._config.schm = '57a4e02ec830e2bdff1a1608';
            this._config.key = '57c3583bc8307cd5b82f447d';
            this._config.datatype = 'string';
        }
        var self = this;
        this._findOne = new record_service_1.FindPlant(this._config);
        this._findOne.find().then(function (res) {
            if (!res.id) {
                self._errorAlert();
                self._unsetViewModelData();
            }
            else {
                self._viewModel.set("ubicacion", res.getUbicación());
                //chechear si el registro ha sido ingresado
                // check code ...
                //self._checkIfEvaluated();
                //callback call
                if (self._callback) {
                    self._callback(res);
                }
                if (self._callbackData) {
                    self._callbackData(res.id);
                }
            }
            self._viewModel.set('loading', false);
        });
    };
    ScanHStatus.prototype._checkIfEvaluated = function () {
    };
    ScanHStatus.prototype.getView = function () {
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(this._theme);
        return grid;
    };
    return ScanHStatus;
}());
exports.ScanHStatus = ScanHStatus;
//# sourceMappingURL=index.js.map