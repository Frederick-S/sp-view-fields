var queryString = require('query-string');
var getViewFields = require('../index');

var appWebUrl = queryString.parse(location.search).SPAppWebUrl;

var options = {
    webUrl: appWebUrl,
    useAppContextSite: false,
    list: 'TestList',
    view: 'All Items'
};

getViewFields(options, function (viewFields) {
    var html = '<p>View fields of "All Items" view in <a href="' + appWebUrl + '/Lists/TestList" target="_blank">TestList</a>:</p>';

    html += '<ul>';

    for (var i = 0, length = viewFields.length; i < length; i++) {
        var viewField = viewFields[i];

        html += '<li>Field type: ' + viewField.get_typeAsString() + ', field internal name: ' + viewField.get_internalName() + '</li>';
    }

    html += '</ul>';

    $('#message').html(html);
}, function (errorMessage) {
    $('#message').html(errorMessage);
});
