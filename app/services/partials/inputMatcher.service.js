var SimpleText = require("./inputs/simple_text");
var SimpleRef = require("./inputs/simple_ref");
//mode < EditView | TabView | ListView>
exports.build = function (conf) {
    var record = conf.record;
    var attrId = conf.attrId;
    var mode = conf.mode || "TabView";
    var View;
    switch (record.getInputAttr(attrId, "_id")) {
        case "57c431d5c8307cd5b82f448a":
            console.log("simple_ref");
            View = new SimpleRef[mode](conf).getView(); //SimpleRef.Scan(conf);
            break;
        case "57c0c508c8307cd5b82f445a":
            View = new SimpleText.TabView(conf).getView();
            break;
        case "57c3202cc8307cd5b82f4465":
            View = new SimpleText.TabView(conf).getView();
            break;
        //case "wwwwwwwwwwwwwwwwwwwwww": // simple_brix
        //    View = new SimpleBrix.TabView(conf).getView();
        //    break;
        default:
            View = new SimpleText.TabView(conf).getView();
    }
    return View;
};
//# sourceMappingURL=inputMatcher.service.js.map