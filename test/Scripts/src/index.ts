/// <reference path='./typings/index.d.ts'/>
/// <reference path='../../../typings/index.d.ts'/>

import { getViewFields, IViewFieldsOption } from '../../../index';
import { parse } from 'query-string';

let appWebUrl: string = parse(location.search).SPAppWebUrl;
let options: IViewFieldsOption = {
    webUrl: appWebUrl,
    isAppContextSite: false,
    list: 'TestList',
    view: 'All Items'
};

getViewFields(options, function (viewFields: Array<SP.Field>) {
    let html: string = '<p>View fields of "All Items" view in <a href="' + appWebUrl + '/Lists/TestList" target="_blank">TestList</a>:</p>';

    html += '<ul>';

    for (let i: number = 0, length: number = viewFields.length; i < length; i++) {
        let viewField: SP.Field = viewFields[i];

        html += '<li>Field type: ' + viewField.get_typeAsString() + ', field internal name: ' + viewField.get_internalName() + '</li>';
    }

    html += '</ul>';

    $('#message').html(html);
}, function (message: string) {
    $('#message').html(message);
});