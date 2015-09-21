'use strict';
exports.options = {
    module: null,
    makeTemplateUrl: function (elementName) {
        return elementName + "/" + elementName + ".html";
    }
};
function getModule() {
    assert(!!exports.options.module, 'angular module must bet set');
    return exports.options.module;
}
exports.getModule = getModule;
function getCtrlAs(config) {
    return config.controllerAs || camelCase(config.selector);
}
exports.getCtrlAs = getCtrlAs;
function setOptions(opts) {
    angular.extend(exports.options, opts);
}
exports.setOptions = setOptions;
exports.autoinjectKey = typeof Symbol === 'function' ? Symbol('autoinjectSettings') : randomString();
exports.scopeKey = typeof Symbol === 'function' ? Symbol('scopeSettings') : randomString();
function normalise(name) {
    name = name.replace(/[^A-Za-z]+/g, ' ');
    for (var i = 0; i < name.length - 1; i++) {
        var prefix = name.slice(0, i + 1);
        var next = name[i + 1];
        if (/[a-z]/.test(name[i]) && /[A-Z]/.test(next)) {
            next = next.toLowerCase();
            name = prefix + ' ' + next + name.slice(i + 2);
        }
    }
    return name.trim().toLowerCase();
}
function kebabCase(name) {
    return normalise(name).replace(/ /g, '-');
}
exports.kebabCase = kebabCase;
function camelCase(name) {
    name = normalise(name);
    return name.replace(/ (.)/g, function (m, p1) { return p1.toUpperCase(); });
}
exports.camelCase = camelCase;
function zipObject(one, other) {
    var buffer = {};
    one.forEach(function (key, index) {
        buffer[key] = other[index];
    });
    return buffer;
}
exports.zipObject = zipObject;
function cloneFunction(func) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return func.call.apply(func, [this].concat(args));
    };
}
exports.cloneFunction = cloneFunction;
function randomString() {
    return (Math.random() * Math.pow(10, 16)).toString(16);
}
exports.randomString = randomString;
function autoinject(target, propertyName) {
    if (!target.hasOwnProperty(exports.autoinjectKey))
        target[exports.autoinjectKey] = [];
    target[exports.autoinjectKey].push(propertyName);
}
exports.autoinject = autoinject;
function assert(ok) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!ok)
        throw new Error(args.join(' '));
}
exports.assert = assert;
