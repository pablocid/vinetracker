var makeRequest = require('./requestMaker.service');
var IndividuoSchm = require("./schms-test");
var  RecordFactory = require('./record.factory');
var urlQueryConfig = require('./helper.service');

exports.FindOne = function(config){

    var options = {
        url: urlQueryConfig.urlQueryConfig(config),
        method : 'GET',
    }

    return makeRequest.makeRequest(options).then(function (data) {
        if(data.totalLength > 1){console.log('Existe más de un registro para este identificador'); }
        var RecordConstructor = RecordFactory.RecordFactory( IndividuoSchm.Individuo() );
         return new RecordConstructor(data.items[0]);
    });
}
