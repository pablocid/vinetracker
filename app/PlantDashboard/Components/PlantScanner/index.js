"use strict";
var RecordService_1 = require('../../../services/RecordService');
var nativescript_barcodescanner_1 = require('nativescript-barcodescanner');
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var grid_layout_1 = require('ui/layouts/grid-layout');
var frame_1 = require('ui/frame');
var observable_1 = require('data/observable');
var QueryParser_1 = require('../../../factories/QueryParser');
var dialogs_1 = require('ui/dialogs');
var Q = require('q');
var Scanner = (function (_super) {
    __extends(Scanner, _super);
    function Scanner(attr) {
        var _this = this;
        _super.call(this, attr);
        /**** optino default */
        this._evaluatedCheck = true;
        /**** */
        this._props = this._properties;
        this._barcodescanner = new nativescript_barcodescanner_1.BarcodeScanner();
        this._barcodeOpts = {
            orientation: 'portrait',
            cancelLabel: 'Stop scannig',
            formats: 'QR_CODE',
            message: 'Escanea una etiqueta',
            preferFrontCamera: false,
            showFlipCameraButton: false
        };
        this._theme.addChild(builder_1.load({ name: 'theme', path: '~/PlantDashboard/Components/PlantScanner' }));
        this._viewModel.set('onScan', function (args) { _this._onTapScan(args); });
        this._viewModel.set('description', this._props.label);
        this._hastPermission();
        this.onLoadedPage();
        this._setValue();
    }
    Scanner.prototype._setValue = function () {
        var value = this._recordAttr.value;
        if (value) {
            this._findRecord(value);
        }
    };
    Scanner.prototype.onLoadedPage = function () {
    };
    Scanner.prototype._onTapScan = function (args) {
        var _this = this;
        console.log("_onTapScan");
        this._barcodescanner.scan(this._barcodeOpts).then(function (r) {
            _this._findRecord(r.text);
        });
    };
    Scanner.prototype._findRecord = function (code) {
        var _this = this;
        this._viewModel.set('loading', true);
        var config = new QueryParser_1.QueryConfig();
        config.id = code;
        if (!/^[0-9a-f]{24}$/i.test(code)) {
            //plant schema
            config.schm = '57a4e02ec830e2bdff1a1608';
            // cod_indiv
            config.key = '57c3583bc8307cd5b82f447d';
            config.datatype = 'string';
        }
        var findOne = new RecordService_1.FindPlant(config);
        findOne.find().then(function (res) {
            _this._viewModel.set('loading', false);
            console.log(JSON.stringify(res.data));
            if (!res.id) {
                _this._errorAlert();
                _this._unsetViewModelData();
            }
            else {
                _this._viewModel.set('code', res.getAttribute('57c3583bc8307cd5b82f447d').value);
                _this._viewModel.set('ubicacion', res.getUbicación());
                //checkIfEvaluated
                if (_this._evaluatedCheck) {
                    _this._checkIfEvaluated(res.id).then(function (x) {
                        if (x) {
                            // alert si se queriere evaluar denuevo o no
                            console.log(' ya se realizó la evaluación');
                            _this._evaluatedAction();
                        }
                        else {
                            console.log('planta nunca antes evaluada');
                            //checkear si cumple con las restrincciones impuestas en el schema
                            _this._restrictionChecker().then(function (x) {
                                if (x) {
                                    _this._saveValue(res.id);
                                }
                                else {
                                    dialogs_1.alert('Esta planta no cumple con las restricciones impuestas por la evaluación anterios').then(function (x) {
                                        frame_1.topmost().goBack();
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    _this._saveValue(res.id);
                }
            }
        });
    };
    Scanner.prototype._restrictionChecker = function () {
        var deffered = Q.defer();
        var filter = this._recordAttr.parent.schema.schm.getAttr('restriction_filter', 'string');
        if (filter) {
            //reemplazar _(id_plant)_
            var f = filter.replace('_(id_plant)_', this._recordAttr.parent.id);
            this._aggregateRequest(f).then(function (x) {
                if (x) {
                    deffered.resolve(true);
                }
                else {
                    deffered.resolve(false);
                }
            });
        }
        else {
            deffered.resolve(true);
        }
        return deffered.promise;
    };
    Scanner.prototype._saveValue = function (value) {
        this._recordAttr.value = value;
        console.log(JSON.stringify(this._recordAttr.data));
    };
    Scanner.prototype._aggregateRequest = function (query) {
        var opts = new QueryParser_1.QueryConfig();
        opts.query = query;
        opts.id = 'aggregate';
        return new RecordService_1.Aggregate(opts).exist();
    };
    Scanner.prototype._unsetViewModelData = function () {
        this._viewModel.set('ubicacion', '');
        this._viewModel.set('code', '');
    };
    Scanner.prototype._errorAlert = function () {
        var alertOpts = {};
        alertOpts.title = 'Planta no encontrada';
        alertOpts.message = 'El código escaneado no tiene referencia con ninguna planta en la base de datos.';
        alertOpts.okButtonText = 'entendido';
        alertOpts.cancelable = false;
        dialogs_1.alert(alertOpts);
    };
    Scanner.prototype._evaluatedAction = function () {
        var opt = {};
        opt.cancelable = false;
        opt.title = '¿Deseas evaluar esta planta nuevamente ?';
        opt.actions = ['Si', 'No'];
        dialogs_1.action(opt).then(function (value) {
            if (value === 'Si') {
            }
            else {
                frame_1.topmost().goBack();
            }
        });
    };
    Scanner.prototype._hastPermission = function () {
        var _this = this;
        this._barcodescanner.hasCameraPermission().then(function (granted) {
            if (!granted) {
                _this._barcodescanner.requestCameraPermission().then(function (permission) {
                    if (permission) {
                        console.log('permiso a la cámara concedido');
                    }
                    else {
                        console.log('permiso a la cámara denegado');
                    }
                });
            }
        });
    };
    Scanner.prototype._checkIfEvaluated = function (id) {
        console.log('_checkIfEvaluated');
        var opts = new QueryParser_1.QueryConfig();
        opts.id = id;
        opts.schm = this._recordAttr.parent.schema.schm.id;
        opts.key = this._recordAttr.id;
        opts.datatype = 'reference';
        var evaluationRecord = new RecordService_1.FindRecord(opts);
        return evaluationRecord.find().then(function (record) {
            if (record.id) {
                return true;
            }
            else {
                return false;
            }
        });
        //schm evaluation = 57c42f2fc8307cd5b82f4484
        //schm attributo referencia = 57c42f77c8307cd5b82f4486
        //
    };
    return Scanner;
}(BaseComponent_1.BaseInputComponent));
exports.Scanner = Scanner;
var PlantScanner = (function () {
    function PlantScanner(code) {
        var _this = this;
        this._theme = builder_1.load({ name: 'theme', path: '~/PlantDashboard/Components/PlantScanner' });
        this._barcode = new nativescript_barcodescanner_1.BarcodeScanner();
        this._viewModel = new observable_1.Observable();
        this._viewModel.set('img', '~/img/qrcode.png');
        this._viewModel.set('onScan', function (args) {
            //console.log('onScan')
            _this._onTapScan(args);
        });
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
            console.log('_onTapScan');
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
        this._findOne = new RecordService_1.FindPlant(this._config);
        this._findOne.find().then(function (res) {
            //console.log(JSON.stringify(res))
            _this._viewModel.set('loading', false);
            if (!res.id) {
                _this._errorAlert();
                _this._unsetViewModelData();
            }
            else {
                _this._viewModel.set("ubicacion", res.getUbicación());
                _this._callback(res);
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
        var evaluationRecord = new RecordService_1.FindRecord(opts);
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