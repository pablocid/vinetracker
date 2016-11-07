import {ImageSource} from 'image-source';
import { knownFolders as KF, path as Path , FileSystemEntity, File, Folder } from 'file-system';
import { ImageFormat } from 'ui/enums';
import { session as Session,Task, Request } from 'nativescript-background-http';
import { getString } from 'application-settings';
import { Cache } from 'ui/image-cache';

export class UploadImage {
    private _imageSrc:ImageSource;
    private _format:string;
    private _filename:string;
    private _savePath:string;

    private _request: Request;
    private _url:string;
    private _quality:number;

    constructor(picture:ImageSource, quality?:number){
        this._quality = quality | 80;
        this._imageSrc = picture;
        //default values
        this._format = ImageFormat.jpeg;
        this._filename = 'img_' + new Date().getTime() + '.'+this._format;
        this._savePath = KF.documents().path;
        this._url = getString('baseUrl')+'api/uploads';
    }

	public get filename(): string {
		return this._filename;
	}

	public set filename(value: string) {
		this._filename = value;
	}
    

    private get _path ():string{
        return Path.join(this._savePath, this._filename);
    }

    private _getRequest(): Request{
        return {
            url: this._url,
            method: 'POST',
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": this._filename,
                "Authorization":getString("Authorization")
            },
            description: this._filename
        }
    }

    public upload(){
        var picsaved = this._imageSrc.saveToFile(this._path, ImageFormat.jpeg, this._quality);
        delete this._imageSrc;
        if(picsaved){
            
            return {
                task:Session("image-upload").uploadFile(this._path, this._getRequest()),
                gc: function(){}
            }
        }
    }

    public url ():string{
        return this._url+'/'+this._filename;
    }
}
