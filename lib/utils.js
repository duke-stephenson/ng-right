'use strict';
/**
 * Used to store autoinject settings (list of things to inject onto the class
 * or the prototype).
 */
//export var autoinjectKey = Symbol('autoinjectSettings');
/**
 * Used to store binding information (isolated scope settings).
 */
//export var scopeKey = Symbol('scopeSettings');
exports.autoinjectKey = typeof Symbol === 'function' ? Symbol('autoinjectSettings') : randomString();
exports.scopeKey = typeof Symbol === 'function' ? Symbol('scopeSettings') : randomString();
/**
 * Adds the given property to the list of items to autoinject onto the class
 * or prototype.
 */
function autoinject(target, propertyName) {
    if (!target.hasOwnProperty(exports.autoinjectKey))
        target[exports.autoinjectKey] = [];
    target[exports.autoinjectKey].push(propertyName);
}
exports.autoinject = autoinject;
/**
 * Mutable configuration object.
 */
exports.options = {
    // Default angular module
    module: null,
    makeTemplateUrl: function (elementName) {
        return elementName + "/" + elementName + ".tpl.html";
    },
    controllerAs: null
};
/**
 * Reuses or creates an angular module from the given configuration.
 */
function getModule() {
    assert(!!exports.options.module, 'angular DEFAULT module must bet set');
    return exports.options.module;
}
exports.getModule = getModule;
function getCtrlAs(config) {
    return config.controllerAs || exports.options.controllerAs || camelCase(config.selector);
}
exports.getCtrlAs = getCtrlAs;
/**
 * Normalises a string, converting non-English-letters into singular spaces,
 * inserting spaces into case boundaries, and lower casing.
 */
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
/**
 * Converts an identifier into kebab case.
 */
function kebabCase(name) {
    return normalise(name).replace(/ /g, '-');
}
exports.kebabCase = kebabCase;
/**
 * Converts an identifier into camelcase.
 */
function camelCase(name) {
    name = normalise(name);
    return name.replace(/ (.)/g, function (m, p1) { return p1.toUpperCase(); });
}
exports.camelCase = camelCase;
/**
 * Primitive version of lodash#zipObject.
 */
function zipObject(one, other) {
    var buffer = {};
    one.forEach(function (key, index) {
        buffer[key] = other[index];
    });
    return buffer;
}
exports.zipObject = zipObject;
/**
 * "Clones" the given function by wrapping it into a pass-through function.
 * Doesn't preserve arity ('.length') and argument names.
 */
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
/**
 * Creates a random string that is unlikely to clash with other keys. This is
 * where you're supposed to use a Symbol, but Angular can't bind to a
 * symbol-keyed property.
 */
function randomString() {
    return (Math.random() * Math.pow(10, 16)).toString(16);
}
exports.randomString = randomString;
/**
 * Assertion utility.
 */
function assert(ok) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!ok)
        throw new Error(args.join(' '));
}
exports.assert = assert;
function mapConstructor(constructor, config) {
    var inject = constructor.prototype[exports.autoinjectKey] || [];
    var injectStatic = constructor[exports.autoinjectKey] || [];
    injector.$inject = inject.concat(injectStatic);
    function injector() {
        var injected = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            injected[_i - 0] = arguments[_i];
        }
        var map = zipObject(injector.$inject, injected);
        // Assign injected values to the prototype.
        inject.forEach(function (token) {
            constructor.prototype[token] = map[token];
        });
        // Assign injected values to the class.
        injectStatic.forEach(function (token) {
            constructor[token] = map[token];
        });
        if (config)
            return config;
    }
    return injector;
}
exports.mapConstructor = mapConstructor;
