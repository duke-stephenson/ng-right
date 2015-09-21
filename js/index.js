'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/// <reference path="./refs.ts"/> ///ts:ref:generated
__export(require('./bindings'));
__export(require('./directives'));
__export(require('./services'));
__export(require('./inject'));
__export(require('./state'));
__export(require('./bootstrap'));
var utils_1 = require('./utils');
exports.autoinject = utils_1.autoinject;
