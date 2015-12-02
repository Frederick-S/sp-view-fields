var isGuid = require('is-guid');
var each = require('sp-each');
var contextHelper = require('sp-context-helper');

module.exports = function (options, done, error) {
    var contextWrapper = contextHelper(options.webUrl, options.useAppContextSite);
    var clientContext = contextWrapper.clientContext;
    var web = contextWrapper.web;
    var list = isGuid(options.list) ? web.get_lists().getById(options.list) : web.get_lists().getByTitle(options.list);
    var view = isGuid(options.view) ? list.get_views().getById(new SP.Guid(options.view)) : list.get_views().getByTitle(options.view);
    var listFields = list.get_fields();
    var viewFields = view.get_viewFields();

    clientContext.load(viewFields);
    clientContext.load(listFields);
    clientContext.executeQueryAsync(function () {
        var fields = [];

        each(listFields, function (listField) {
            each(viewFields, function (viewField) {
                if (listField.get_internalName() === viewField) {
                    fields.push(listField);
                }
            });
        });

        done(fields);
    }, function (sender, args) {
        error(args.get_message());
    });
};
