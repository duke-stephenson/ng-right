/**
 * @version 9/20/15 7:24 PM
 */
'use strict';
/// <reference path="./refs.ts"/> ///ts:ref:generated
var utils = require('./utils');
function bind(descriptor) {
    if (descriptor === void 0) { descriptor = '='; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = descriptor;
    };
}
function bindString(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        return bindStringBase().apply(null, arguments);
    }
    return bindStringBase.apply(null, arguments);
}
exports.bindString = bindString;
function bindStringBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '@' + key;
    };
}
function bindTwoWay(targetOrOptions, keyOrNothing) {
    if (targetOrOptions != null && typeof targetOrOptions === 'object' && typeof keyOrNothing === 'string') {
        bindTwoWayBase()(targetOrOptions, keyOrNothing);
    }
    return bindTwoWayBase(targetOrOptions);
}
exports.bindTwoWay = bindTwoWay;
function bindTwoWayBase(options) {
    if (options === void 0) { options = {}; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '=' + encodeDescriptor(options);
    };
}
function bindExpression(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        bindExpressionBase()(targetOrKey, keyOrNothing);
    }
    return bindExpressionBase(targetOrKey);
}
exports.bindExpression = bindExpression;
function bindExpressionBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '&' + key;
    };
}
function bindOneWay(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        bindOneWayBase()(targetOrKey, keyOrNothing);
    }
    return bindOneWayBase(targetOrKey);
}
exports.bindOneWay = bindOneWay;
function bindOneWayBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        var secretKey = utils.randomString();
        Class[utils.scopeKey][secretKey] = '&' + (key || propertyName);
        Object.defineProperty(target, propertyName, {
            get: function () {
                if (typeof this[secretKey] === 'function')
                    return this[secretKey]();
                return undefined;
            },
            set: function (_) { }
        });
    };
}
function encodeDescriptor(options) {
    return (options.collection ? '*' : '') + (options.optional ? '?' : '') + (options.key || '');
}
