var makeRequest = require('./requestMaker.service').makeRequest;
var IndividuoSchm = require("./schms-test").Individuo;
var RecordFactory = require('./record.factory').RecordFactory;
var urlQueryConfig = require('./helper.service').urlQueryConfig;

exports.FindOne = function(config){

    var options = {
        url: urlQueryConfig(config),
        method : 'GET',
    }

    return makeRequest(options).then(function (data) {
        if(data.totalLength > 1){console.log('Existe más de un registro para este identificador'); }
        var RecordConstructor = RecordFactory( IndividuoSchm() );
         return new RecordConstructor(data.items[0]);
    });
}
