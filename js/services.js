'use strict';
var utils = require('./utils');
function service(config, type) {
    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
    if (type === 'service') {
        utils.assert(!!config.serviceName, 'you must provide a service name');
    }
    if (type === 'controller') {
        utils.assert(!!config.controllerName, 'you must provide a controller name');
    }
    return function (constructor) {
        var module = utils.getModule();
        var fromInjectClassDecor = constructor.$inject || [];
        var inject = (constructor.prototype[utils.autoinjectKey] || []).concat(fromInjectClassDecor);
        var injectStatic = constructor[utils.autoinjectKey] || [];
        injector.$inject = inject.concat(injectStatic);
        function injector() {
            var injected = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injected[_i - 0] = arguments[_i];
            }
            var map = utils.zipObject(injector.$inject, injected);
            inject.forEach(function (token) {
                constructor.prototype[token] = map[token];
            });
            injectStatic.forEach(function (token) {
                constructor[token] = map[token];
            });
        }
        module.run(injector);
        if (type === 'controller') {
            var conf = config;
            module.controller(conf.controllerName, constructor);
            if (conf.serviceName)
                module.factory(conf.serviceName, function () { return constructor; });
        }
        if (type === 'service')
            module.factory(config.serviceName, function () { return constructor; });
    };
}
function Service(config) {
    return service(config, 'service');
}
exports.Service = Service;
function Ambient(configOrClass) {
    if (typeof configOrClass === 'function') {
        return AmbientBase({}).apply(null, arguments);
    }
    return AmbientBase.apply(null, arguments);
}
exports.Ambient = Ambient;
function AmbientBase(config) {
    return service(config);
}
function Controller(config) {
    return service(config, 'controller');
}
exports.Controller = Controller;
