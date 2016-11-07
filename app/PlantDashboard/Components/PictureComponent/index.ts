import {PictureComponentProps} from '../../../interfaces';
import {RecordAttribute} from '../../../factories/Record';
import {UploadImage} from '../../../services/UploadService';
import {BaseComponent, BaseInputComponent} from '../BaseComponent';
import { parse as Parse, load as Load } from 'ui/builder';
import {takePicture,isAvailable, CameraOptions } from 'camera';
import { Image } from 'ui/image';
import http = require('http');
import { knownFolders as KF, path as Path , FileSystemEntity, File, Folder } from 'file-system';
import {ImageSource, fromUrl as FromUrl, fromFile as FromFile, fromNativeSource as FromNativeSource} from 'image-source';
import { ImageFormat } from 'ui/enums';
import { session as Session,Task, ProgressEventData, ErrorEventData } from 'nativescript-background-http';
import { Observable, PropertyChangeData , EventData} from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { getString } from 'application-settings';
import { Cache } from 'ui/image-cache';

export class PictureComponent extends BaseInputComponent{
    private _numOfPics:number;
    private _cameraOpts: CameraOptions;
    private _items : Observable[];
    private _fileBaseName: string;
    private _pictures:string[];
    private _baseUrl:string;
    private _quality:number;
    private _width:number;
    private _props: PictureComponentProps;
    private _cache:Cache;
    
    constructor(attr: RecordAttribute){
        super(attr);
        this._props = <PictureComponentProps>this._properties;
        this._width = this._props.width | 500;
        this._quality = this._props.quality | 80;
        this._numOfPics = this._props.numOfPics | 1;
        this._fileBaseName = this._recordAttr.parent.schema.schm.id+'_'+this._recordAttr.id+'_'+new Date().getTime()+'_';
        
        if(!this._recordAttr.value || !this._recordAttr.value.length){
            this._recordAttr.value = [];
        }

        this._pictures = [];
        for (var i = 0; i < this._numOfPics; i++) {
            if(this._recordAttr.value[i]){
                this._pictures.push(this._recordAttr.value[i]);
            }else{
                this._recordAttr.value[i] = '';
                this._pictures.push('no_image.jpg')
            }
        }

        this._viewModel.set('description','Toma una foto');
        this._theme.addChild(Load({
            path:'~/PlantDashboard/Components/PictureComponent',
            name:'theme'
        }));
        this._baseUrl = getString('bucketUrl');

        let it = this._pictures.map( (x,i)=>{
            return {
                img:x,
                label: (i+1)+'agrega una foto'
            }
        });

        this._cache = new Cache();
        this._cache.placeholder = FromFile( `~/img/no_image.jpg`);
        this._cache.maxRequests = 5;
        
        this._cache.enableDownload();

        this._items = it.map( x=> new Observable(x) );
        this._items.forEach(itm=>{
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



            let name = itm.get('img');
            let url = this._baseUrl+name;
            itm.set('img',url);


        });
        
        this._viewModel.set('items',this._items);

        this._viewModel.set('selectedOption', (args)=>{
            
            console.log(args.index)
            var filename = this._fileBaseName+(args.index+1)+'.jpg';
            var item = this._items[args.index];

            this._takePic(filename).then(obj=>{
                let task = obj.task;
                this._recordAttr.value[args.index] = task.description;
                if(this._callback){
                    //this._callback();
                }

                item.set('maxValue', task.totalUpload);
                
                task.on("progress", (x:ProgressEventData)=>{
                    item.set('progress', x.currentBytes);
                    item.set('status', task.status);
                });
                task.on("error", this._logEvent);
                task.on("complete", (d)=>{
                    item.set('img', this._baseUrl+task.description);
                   
                });
            });
        });


        this._viewModel.set('onTapBtn',()=>{
            takePicture(this._getCameraOpts()).then( (picture:ImageSource ) => {
                //this._base64(picture);
                this._bghttp(picture);
                
            });
        });

    }// end constructor
    
     private _getCameraOpts():CameraOptions{
        this._cameraOpts = {};
        this._cameraOpts.width = this._width;
        this._cameraOpts.keepAspectRatio = true;
        //this._cameraOpts.saveToGallery = true;
        return this._cameraOpts;
     }
    private _takePic(filename:string): Promise<any>{
        return takePicture(this._cameraOpts).then( (picture:ImageSource ) => {
                var imageSave = new UploadImage(picture,this._quality);
                imageSave.filename = filename;
                //picture.android.gc();
                return imageSave.upload();
                
            })
    }


    private _base64(picture:ImageSource){
        var content = picture.toBase64String('jpeg');

        var formData = new FormData();

        formData.append('file',content);
        formData.append('name','fotoqr.jpg');
        formData.append('base64', true);

        http.request({
            url: "http://192.168.1.223:9000/api/uploads",
            method: "POST",
            content:formData
        }).then(x=>{
            console.log(x);
        }).catch(x=>{
            console.log(x);
        });  
    }

    private _bghttp(picture:ImageSource){
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
        
        var savepath = KF.documents().path;
        var filename = 'img_' + new Date().getTime() + '.jpg';
        var filepath = Path.join(savepath, filename);
        console.log(filepath)


        var picsaved = picture.saveToFile(filepath, ImageFormat.jpeg);
        console.log('bghttp: Saving the image ...')

        if(picsaved) {
            console.log("Saving");
            var session = Session("image-upload");
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

            task.on("progress", (x)=>{
                this._viewModel.set('progress', task.upload);
                this._viewModel.set('status', task.status);
            });
            task.on("error", this._logEvent);
            task.on("complete", (d)=>{
                console.log(d)
                this._onComplete(filename);
            });
        } else {
            console.log("Failed To Save");
        }

    }

    private _logEvent(e: ErrorEventData){
        console.log(e.error)
        console.log(e.eventName);
    }

    private _onComplete(filename){
        this._viewModel.set('img', this._baseUrl+'api/uploads/'+filename);
    }

}