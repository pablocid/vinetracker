"use strict";
var UploadService_1 = require('../../../services/UploadService');
var BaseComponent_1 = require('../BaseComponent');
var builder_1 = require('ui/builder');
var camera_1 = require('camera');
var http = require('http');
var file_system_1 = require('file-system');
var image_source_1 = require('image-source');
var enums_1 = require('ui/enums');
var nativescript_background_http_1 = require('nativescript-background-http');
var observable_1 = require('data/observable');
var application_settings_1 = require('application-settings');
var image_cache_1 = require('ui/image-cache');
var PictureComponent = (function (_super) {
    __extends(PictureComponent, _super);
    function PictureComponent(attr) {
        var _this = this;
        _super.call(this, attr);
        this._props = this._properties;
        this._width = this._props.width | 500;
        this._quality = this._props.quality | 80;
        this._numOfPics = this._props.numOfPics | 1;
        this._fileBaseName = this._recordAttr.parent.schema.schm.id + '_' + this._recordAttr.id + '_' + new Date().getTime() + '_';
        if (!this._recordAttr.value || !this._recordAttr.value.length) {
            this._recordAttr.value = [];
        }
        this._pictures = [];
        for (var i = 0; i < this._numOfPics; i++) {
            if (this._recordAttr.value[i]) {
                this._pictures.push(this._recordAttr.value[i]);
            }
            else {
                this._recordAttr.value[i] = '';
                this._pictures.push('no_image.jpg');
            }
        }
        this._viewModel.set('description', 'Toma una foto');
        this._theme.addChild(builder_1.load({
            path: '~/PlantDashboard/Components/PictureComponent',
            name: 'theme'
        }));
        this._baseUrl = application_settings_1.getString('bucketUrl');
        var it = this._pictures.map(function (x, i) {
            return {
                img: x,
                label: (i + 1) + 'agrega una foto'
            };
        });
        this._cache = new image_cache_1.Cache();
        this._cache.placeholder = image_source_1.fromFile("~/img/no_image.jpg");
        this._cache.maxRequests = 5;
        this._cache.enableDownload();
        this._items = it.map(function (x) { return new observable_1.Observable(x); });
        this._items.forEach(function (itm) {
            //itm.set('img',"https://github.com/NativeScript.png");
            /*
                        let imgSouce:ImageSource;
                        let name = itm.get('img');
                        let url = this._baseUrl+name;
                        let image = this._cache.get(url);
                        if (image) {
                            imgSouce = FromNativeSource(image);
                        }
                        else {
                            // If not present -- request its download.
                            this._cache.push({
                                key: url,
                                url: url,
                                completed: (image: any, key: string) => {
                                    if (url === key) {
                                        imgSouce = FromNativeSource(image);
                                    }
                                }
                            });
                        }
                        
                        let cache = new ImageCacheIt();
                        cache.imageUri = url;
                        cache.placeHolder = "~/img/no_image.png";
                        //cache.errorHolder = "~/assets/images/ph.png";
                        cache.resize = "200,200";
                        cache.centerCrop = true;
                        cache.stretch = "aspectFit";
                        //cache.
            */
            var name = itm.get('img');
            var url = _this._baseUrl + name;
            itm.set('img', url);
        });
        this._viewModel.set('items', this._items);
        this._viewModel.set('selectedOption', function (args) {
            console.log(args.index);
            var filename = _this._fileBaseName + (args.index + 1) + '.jpg';
            var item = _this._items[args.index];
            _this._takePic(filename).then(function (obj) {
                var task = obj.task;
                _this._recordAttr.value[args.index] = task.description;
                if (_this._callback) {
                }
                item.set('maxValue', task.totalUpload);
                task.on("progress", function (x) {
                    item.set('progress', x.currentBytes);
                    item.set('status', task.status);
                });
                task.on("error", _this._logEvent);
                task.on("complete", function (d) {
                    item.set('img', _this._baseUrl + task.description);
                });
            });
        });
        this._viewModel.set('onTapBtn', function () {
            camera_1.takePicture(_this._getCameraOpts()).then(function (picture) {
                //this._base64(picture);
                _this._bghttp(picture);
            });
        });
    } // end constructor
    PictureComponent.prototype._getCameraOpts = function () {
        this._cameraOpts = {};
        this._cameraOpts.width = this._width;
        this._cameraOpts.keepAspectRatio = true;
        //this._cameraOpts.saveToGallery = true;
        return this._cameraOpts;
    };
    PictureComponent.prototype._takePic = function (filename) {
        var _this = this;
        return camera_1.takePicture(this._cameraOpts).then(function (picture) {
            var imageSave = new UploadService_1.UploadImage(picture, _this._quality);
            imageSave.filename = filename;
            //picture.android.gc();
            return imageSave.upload();
        });
    };
    PictureComponent.prototype._base64 = function (picture) {
        var content = picture.toBase64String('jpeg');
        var formData = new FormData();
        formData.append('file', content);
        formData.append('name', 'fotoqr.jpg');
        formData.append('base64', true);
        http.request({
            url: "http://192.168.1.223:9000/api/uploads",
            method: "POST",
            content: formData
        }).then(function (x) {
            console.log(x);
        }).catch(function (x) {
            console.log(x);
        });
    };
    PictureComponent.prototype._bghttp = function (picture) {
        /*
                var is = new ImageSource();
                is.fromFile( KF.documents().getFile('img_1478013240521.jpg').path );
                this._viewModel.set('img', is)
        
                console.log("Saving");
                    var session = Session("image-upload");
                    var request = {
                        url: "http://192.168.1.223:9000/api/uploads",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/octet-stream",
                            "File-Name": "img_1478013240521.jpg"
                        },
                        description: "{ 'uploading': 'img_1478013240521.jpg' }"
                    };
        
                    var task = session.uploadFile(KF.documents().getFile('img_1478013240521.jpg').path, request);
        
                    task.on("progress", this._logEvent);
                    task.on("error", this._logEvent);
                    task.on("complete", this._logEvent);
        */
        var _this = this;
        var savepath = file_system_1.knownFolders.documents().path;
        var filename = 'img_' + new Date().getTime() + '.jpg';
        var filepath = file_system_1.path.join(savepath, filename);
        console.log(filepath);
        var picsaved = picture.saveToFile(filepath, enums_1.ImageFormat.jpeg);
        console.log('bghttp: Saving the image ...');
        if (picsaved) {
            console.log("Saving");
            var session = nativescript_background_http_1.session("image-upload");
            var request = {
                url: "http://192.168.1.223:9000/api/uploads",
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": filename
                },
                description: "{ 'uploading': '" + filename + "' }"
            };
            var task = session.uploadFile(filepath, request);
            this._viewModel.set('maxValue', task.totalUpload);
            task.on("progress", function (x) {
                _this._viewModel.set('progress', task.upload);
                _this._viewModel.set('status', task.status);
            });
            task.on("error", this._logEvent);
            task.on("complete", function (d) {
                console.log(d);
                _this._onComplete(filename);
            });
        }
        else {
            console.log("Failed To Save");
        }
    };
    PictureComponent.prototype._logEvent = function (e) {
        console.log(e.error);
        console.log(e.eventName);
    };
    PictureComponent.prototype._onComplete = function (filename) {
        this._viewModel.set('img', this._baseUrl + 'api/uploads/' + filename);
    };
    return PictureComponent;
}(BaseComponent_1.BaseInputComponent));
exports.PictureComponent = PictureComponent;
//# sourceMappingURL=index.js.map