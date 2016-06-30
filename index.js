/// <reference path="./typings/index.d.ts"/>
"use strict";
var is_guid_1 = require('is-guid');
var sp_each_1 = require('sp-each');
var sp_context_helper_1 = require('sp-context-helper');
function getViewFields(options, success, error) {
    var contextWrapper = sp_context_helper_1.contextHelper(options.webUrl, options.isAppContextSite);
    var clientContext = contextWrapper.clientContext;
    var web = contextWrapper.web;
    var list = is_guid_1.isGuid(options.list) ? web.get_lists().getById(options.list) : web.get_lists().getByTitle(options.list);
    var view = is_guid_1.isGuid(options.view) ? list.get_views().getById(new SP.Guid(options.view)) : list.get_views().getByTitle(options.view);
    var listFields = list.get_fields();
    var viewFields = view.get_viewFields();
    clientContext.load(viewFields);
    clientContext.load(listFields);
    clientContext.executeQueryAsync(function () {
        var fields = [];
        sp_each_1.each(listFields, function (listField) {
            sp_each_1.each(viewFields, function (viewField) {
                if (listField.get_internalName() === viewField) {
                    fields.push(listField);
                }
            });
        });
        success(fields);
    }, function (sender, args) {
        error(args.get_message());
    });
}
exports.getViewFields = getViewFields;
