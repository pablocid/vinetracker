"use strict";
var file_system_1 = require('file-system');
var enums_1 = require('ui/enums');
var nativescript_background_http_1 = require('nativescript-background-http');
var application_settings_1 = require('application-settings');
var UploadImage = (function () {
    function UploadImage(picture, quality) {
        this._quality = quality | 80;
        this._imageSrc = picture;
        //default values
        this._format = enums_1.ImageFormat.jpeg;
        this._filename = 'img_' + new Date().getTime() + '.' + this._format;
        this._savePath = file_system_1.knownFolders.documents().path;
        this._url = application_settings_1.getString('baseUrl') + 'api/uploads';
    }
    Object.defineProperty(UploadImage.prototype, "filename", {
        get: function () {
            return this._filename;
        },
        set: function (value) {
            this._filename = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadImage.prototype, "_path", {
        get: function () {
            return file_system_1.path.join(this._savePath, this._filename);
        },
        enumerable: true,
        configurable: true
    });
    UploadImage.prototype._getRequest = function () {
        return {
            url: this._url,
            method: 'POST',
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": this._filename,
                "Authorization": application_settings_1.getString("Authorization")
            },
            description: this._filename
        };
    };
    UploadImage.prototype.upload = function () {
        var picsaved = this._imageSrc.saveToFile(this._path, enums_1.ImageFormat.jpeg, this._quality);
        delete this._imageSrc;
        if (picsaved) {
            return {
                task: nativescript_background_http_1.session("image-upload").uploadFile(this._path, this._getRequest()),
                gc: function () { }
            };
        }
    };
    UploadImage.prototype.url = function () {
        return this._url + '/' + this._filename;
    };
    return UploadImage;
}());
exports.UploadImage = UploadImage;
//# sourceMappingURL=index.js.map