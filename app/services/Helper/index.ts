export class ParamChecker{
    
    private _parameter:any;
    private _dataType:string;

    constructor(param, datatype:string){
        this._parameter = param;
        this._dataType = datatype;
    }
    private _string ():boolean{
        if(typeof this._parameter === 'string'){
            return true;
        }else{
            return false;
        }
    }
    private _number ():boolean{
        if(typeof this._parameter === 'number'){
          return true;
        }
        if(typeof this._parameter === 'string'){
          
          if(/^\d*$/.test( this._parameter )){
            return true;
          }else{
              return false;
          }
        }else{
            return false;
        }
    }
    private _oid (): boolean {
        if(/^[0-9a-f]{24}$/i.test(this._parameter)){
          return true;
        }
    }

    private _filter () : boolean {
            //checkeando si hay errores en el parseo a JSON
        try {
          let arr = JSON.parse(this._parameter);
          //check if is an Array and if is empty
          if(Array.isArray(arr) && arr.length){
            // verificando si los obj dentro del array tiene las propiedades key, datatype y value
            let isValid = true;
            for (let index = 0; index < arr.length; index++) {
              if(arr[index].key === null || arr[index].value === null || arr[index].datatype === null){
                isValid = false;
              }
            }
            return isValid;
          }
    
        } catch (err) {
          console.log('ParamChecker: invalid JSON filter');
          return false;
        }
    }

    private _list ():boolean{

        if(Array.isArray(this._parameter)){
          return true;
        }else{
            return false;
        }
    }

    private _date ():boolean {
        // el valor ingresado debe ser un ISOstring();
        //checkeando si hay errores en el parseo a Date()
        try {
          var date = new Date(this._parameter);
          //check if date === Date().toISOString()
          if(date.toISOString() === this._parameter){
            return true;
          }else{
              return false;
          }
    
        } catch (err) {
          console.log('ParamChecker: invalid Date')
          return false;
        }
    }
    public get check ():boolean{
        switch(this._dataType){
            case 'string':
                return this._string();
            case 'number':
                return this._number();
            case 'reference':
                return this._oid();
            case 'objectId':
                return this._oid();
            case 'filter':
                return this._filter();
            case 'list':
                return this._list();
        }
    }
}

