var createViewModel = require("./login-view-model").createViewModel;
var gestures = require("ui/gestures");

function onNavigatingTo(args) {
    var page = args.object;
    var textField = page.getViewById("passTF");
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;