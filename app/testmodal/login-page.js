"use strict";
var context;
var closeCallback;
var page;
var usernameTextField;
var passwordTextField;
function onShownModally(args) {
    console.log("login-page.onShownModally, context: " + args.context);
    context = args.context;
    closeCallback = args.closeCallback;
}
exports.onShownModally = onShownModally;
function onLoaded(args) {
    console.log("login-page.onLoaded");
    page = args.object;
    usernameTextField = page.getViewById("username");
    passwordTextField = page.getViewById("password");
}
exports.onLoaded = onLoaded;
function onUnloaded() {
    console.log("login-page.onUnloaded");
}
exports.onUnloaded = onUnloaded;
function onLoginButtonTap() {
    console.log("login-page.onLoginButtonTap");
    closeCallback(usernameTextField.text, passwordTextField.text);
}
exports.onLoginButtonTap = onLoginButtonTap;
//# sourceMappingURL=login-page.js.map