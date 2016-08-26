"use strict";
var page;
var label;
function pageLoaded(args) {
    page = args.object;
    label = page.getViewById("label");
}
exports.pageLoaded = pageLoaded;
function onTap(args) {
    var fullscreen = args.object.text.indexOf("(full-screen)") !== -1;
    page.showModal("testmodal/login-page", "context", function (username, password) {
        console.log(username + "/" + password);
        label.text = username + "/" + password;
    }, fullscreen);
}
exports.onTap = onTap;
//# sourceMappingURL=modal-view.js.map