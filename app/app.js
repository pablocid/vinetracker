var application = require("application");
var appSet = require("application-settings");


application.start({ moduleName: "main-page" });

application.on("suspend",function(event){
    console.log("La aplicación se suspendió");
});

application.on("resume",function(){
    console.log("La aplicación volvió de la suspención");
});

application.on("launch",function () {
    console.log("aplicacion lanzada");
});

application.on("exit",function () {
    console.log("Aplicación cerrada");
});

application.on("lowMemory",function () {
    console.log("Baja memoria");
});

application.on("uncaughError",function () {
    console.log("aplicacion -- uncaughError ");
});

appSet.setString('baseUrl','https://pmg-restful-dev.herokuapp.com/');