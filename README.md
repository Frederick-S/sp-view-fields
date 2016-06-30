# sp-view-fields [![Build Status](https://travis-ci.org/Frederick-S/sp-view-fields.svg?branch=master)](https://travis-ci.org/Frederick-S/sp-view-fields)
Get view fields by SharePoint list view.

## Installation
```
npm install sp-view-fields --save
```

## Usage
```js
var getViewFields = require('sp-view-fields');

var options = {
    webUrl: 'web url',
    useAppContextSite: false,
    list: 'id or title',
    view: 'id or title'
};

getViewFields(options, function (viewFields) {
    // Now you have an array of SP.Field
}, function (errorMessage) {
    // Error
});
```

## License
MIT.
