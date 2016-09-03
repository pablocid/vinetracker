var makeRequest = require('./requestMaker.service');
var IndividuoSchm = require("./schms-test");
var  RecordFactory = require('./record.factory');
var urlQueryConfig = require('./helper.service');

exports.FindOne = function(config){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    if(config.id){
        config.dir +='/'+config.id;
    }else{ return null; }

    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        //console.log("request realizado")
        if(data.length > 1){console.log('ASDJLASKDJ - Existe más de un registro para este identificador'); }
        var RecordConstructor = RecordFactory.RecordFactory( IndividuoSchm.Individuo(), data.schema );
         return new RecordConstructor(data.record);
    });
}

exports.Find = function(config){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';

    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        var RecordConstructor = RecordFactory.RecordFactory( IndividuoSchm.Individuo(), data.schema );
        data.items = data.items.map(x=>new RecordConstructor(x));
        return data;

    });
}

exports.createNewRecord = function(schm){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    var config = {dir:'',id:''};
    config.dir = 'api/schemas';
    config.id = schm;
    if(config.id){
        config.dir +='/'+config.id;
    }else{ return null; }

    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        console.log(data)
        var RecordConstructor = RecordFactory.RecordFactory( null, data );
        var record = new RecordConstructor();
        record.schm = schm;
         return record;
    });
}
exports.saveRecord = function(record){
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    var dir = 'api/records';
    var method = 'POST';
    if(record && record.schm){
        if(record._id){
            dir +='/'+record._id;
            method = 'PUT';
        }
    }else{
        console.log("No se guardó el registro") 
        return null; 
    }

    var options = {
        url: dir,
        method : method,
        content: JSON.stringify(record)
    }
    console.log(JSON.stringify(record) );
    
    return makeRequest.makeRequest(options).then(function (data) {
        console.log(data._id);
        return data;
    });
    
}