var frame = require('ui/frame');
var Page = require('ui/page').Page;
var StackLayout = require('ui/layouts/stack-layout').StackLayout;
var Label = require('ui/label').Label;
var Button = require('ui/button').Button;

exports.createPage = function () {
    var page = new Page();
    var layout = new StackLayout();
    var welcomLabel = new Label();
    var backButton = new Button();

    page.actionBar.title = "Settings";
    welcomLabel.text = "Estas en la página de settings";
    
    backButton.text = "Go back";
    backButton.on('tap',function(){
        frame.topmost().goBack();
    })

    layout.addChild(welcomLabel);
    layout.addChild(backButton);

    page.content = layout;

    return page;
};