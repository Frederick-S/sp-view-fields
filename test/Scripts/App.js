/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path='./typings/index.d.ts'/>
	/// <reference path='../../../typings/index.d.ts'/>
	"use strict";
	var index_1 = __webpack_require__(1);
	var query_string_1 = __webpack_require__(5);
	var appWebUrl = query_string_1.parse(location.search).SPAppWebUrl;
	var options = {
	    webUrl: appWebUrl,
	    isAppContextSite: false,
	    list: 'TestList',
	    view: 'All Items'
	};
	index_1.getViewFields(options, function (viewFields) {
	    var html = '<p>View fields of "All Items" view in <a href="' + appWebUrl + '/Lists/TestList" target="_blank">TestList</a>:</p>';
	    html += '<ul>';
	    for (var i = 0, length_1 = viewFields.length; i < length_1; i++) {
	        var viewField = viewFields[i];
	        html += '<li>Field type: ' + viewField.get_typeAsString() + ', field internal name: ' + viewField.get_internalName() + '</li>';
	    }
	    html += '</ul>';
	    $('#message').html(html);
	}, function (message) {
	    $('#message').html(message);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./typings/index.d.ts"/>
	"use strict";
	var is_guid_1 = __webpack_require__(2);
	var sp_each_1 = __webpack_require__(3);
	var sp_context_helper_1 = __webpack_require__(4);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	function isGuid(value) {
	    return /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/.test(value);
	}
	exports.isGuid = isGuid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/// <reference path="./typings/index.d.ts"/>
	"use strict";
	function each(collection, iteratee, context) {
	    if (typeof collection.getEnumerator === 'function') {
	        var index = 0;
	        var current = null;
	        var enumerator = collection.getEnumerator();
	        while (enumerator.moveNext()) {
	            current = enumerator.get_current();
	            iteratee.call(context, current, index, collection);
	            index++;
	        }
	    }
	}
	exports.each = each;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/// <reference path="./typings/index.d.ts"/>
	"use strict";
	function contextHelper(webUrl, isAppContextSite) {
	    var web = null;
	    var site = null;
	    var clientContext = null;
	    var appContextSite = null;
	    if (!webUrl || isAppContextSite) {
	        clientContext = SP.ClientContext.get_current();
	    }
	    else {
	        clientContext = new SP.ClientContext(webUrl);
	    }
	    if (isAppContextSite) {
	        appContextSite = new SP.AppContextSite(clientContext, webUrl);
	        web = appContextSite.get_web();
	        site = appContextSite.get_site();
	    }
	    else {
	        web = clientContext.get_web();
	        site = clientContext.get_site();
	    }
	    return {
	        web: web,
	        site: site,
	        clientContext: clientContext,
	        appContextSite: appContextSite
	    };
	}
	exports.contextHelper = contextHelper;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(6);
	var objectAssign = __webpack_require__(7);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }
/******/ ]);