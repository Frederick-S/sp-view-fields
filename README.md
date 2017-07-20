# sp-view-fields [![Build Status](https://travis-ci.org/Frederick-S/sp-view-fields.svg?branch=master)](https://travis-ci.org/Frederick-S/sp-view-fields)

[![Greenkeeper badge](https://badges.greenkeeper.io/Frederick-S/sp-view-fields.svg)](https://greenkeeper.io/)
Get view fields by SharePoint list view.

## Installation
```
npm install sp-view-fields --save
```

## Usage
### JavaScript
```js
import { getViewFields } from 'sp-view-fields';

var options = {
    webUrl: 'web url',
    isAppContextSite: false,
    list: 'id or title',
    view: 'id or title'
};

getViewFields(options, function (viewFields) {
    // Now you have an array of SP.Field
}, function (errorMessage) {
    // Error
});
```

### TypeScript
```
typings install dt~microsoft.ajax --global --save
typings install dt~sharepoint --global --save
```

```js
/// <reference path='./typings/index.d.ts'/>

import { getViewFields, IViewFieldsOption } from 'sp-view-fields';

let options: IViewFieldsOption = {
    webUrl: 'web url',
    isAppContextSite: false,
    list: 'id or title',
    view: 'id or title'
};

getViewFields(options, function (viewFields: Array<SP.Field>) {
    // Now you have an array of SP.Field
}, function (message: string) {
    // Error
});
```

## Test
```
cd sp-view-fields/test/Scripts/src
npm install
webpack
```

## API
```js
interface IViewFieldsOption {
    webUrl: string;
    isAppContextSite: boolean;
    list: string;
    view: string;
}

interface IViewFieldsOnSuccess {
    (viewFields: Array<SP.Field>): void;
}

interface IViewFieldsOnError {
    (message: string): void;
}

function getViewFields(options: IViewFieldsOption, success: IViewFieldsOnSuccess, error: IViewFieldsOnError): void;
```

## License
MIT.
