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
        var RecordConstructor = RecordFactory.RecordFactory( null, data );
         return new RecordConstructor();
    });
}