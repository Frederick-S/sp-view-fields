
/// <reference path="./typings/index.d.ts"/>

import { isGuid } from 'is-guid';
import { each } from 'sp-each';
import { contextHelper, IContextWrapper } from 'sp-context-helper';

export interface IViewFieldsOption {
    webUrl: string;
    isAppContextSite: boolean;
    list: string;
    view: string;
}

export interface IViewFieldsOnSuccess {
    (viewFields: Array<SP.Field>): void;
}

export interface IViewFieldsOnError {
    (message: string): void;
}

export function getViewFields(options: IViewFieldsOption, success: IViewFieldsOnSuccess, error: IViewFieldsOnError): void {
    let contextWrapper: IContextWrapper = contextHelper(options.webUrl, options.isAppContextSite);
    let clientContext: SP.ClientContext = contextWrapper.clientContext;
    let web: SP.Web = contextWrapper.web;
    let list: SP.List = isGuid(options.list) ? web.get_lists().getById(options.list) : web.get_lists().getByTitle(options.list);
    let view: SP.View = isGuid(options.view) ? list.get_views().getById(new SP.Guid(options.view)) : list.get_views().getByTitle(options.view);
    let listFields: SP.FieldCollection = list.get_fields();
    let viewFields: SP.ViewFieldCollection = view.get_viewFields();

    clientContext.load(viewFields);
    clientContext.load(listFields);
    clientContext.executeQueryAsync(function () {
        let fields: Array<SP.Field> = [];

        each(listFields, function (listField: SP.Field) {
            each(viewFields, function (viewField: string) {
                if (listField.get_internalName() === viewField) {
                    fields.push(listField);
                }
            });
        });

        success(fields);
    }, function (sender: any, args: SP.ClientRequestFailedEventArgs) {
        error(args.get_message());
    });
}