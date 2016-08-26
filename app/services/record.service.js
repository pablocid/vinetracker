var makeRequest = require('./requestMaker.service');
var IndividuoSchm = require("./schms-test");
var RecordFactory = require('./record.factory');
var urlQueryConfig = require('./helper.service');
exports.FindOne = function (config) {
    // config debe tener un id:string y un query:obj -  aparte debe tener la propiedad dir antes de entrar en urlQueryFindOne
    config.dir = 'api/records';
    if (config.id) {
        config.dir += '/' + config.id;
    }
    else {
        return null;
    }
    var options = {
        url: urlQueryConfig.urlQueryFindOne(config),
        method: 'GET',
    };
    return makeRequest.makeRequest(options).then(function (data) {
        //if(data.totalLength > 1){console.log('Existe más de un registro para este identificador'); }
        var RecordConstructor = RecordFactory.RecordFactory(IndividuoSchm.Individuo());
        return new RecordConstructor(data.record);
    });
};
//# sourceMappingURL=record.service.js.map