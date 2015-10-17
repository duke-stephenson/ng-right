'use strict';
var utils = require('./utils');
function service(conf, type) {
    var config;
    if (typeof conf === 'string') {
        config = { name: conf };
    }
    else {
        config = conf;
    }
    if (type === 'service' || type === 'controller' || type === 'filter' || type === 'factory') {
        utils.assert(!!config.name, 'you must provide a service name');
    }
    return function (constructor) {
        var module = utils.getModule();
        var injector = utils.mapConstructor(constructor);
        // Run DI.
        module.run(injector);
        // Publish service and/or controller.
        if (type === 'controller') {
            module.controller(config.name, constructor);
        }
        else if (type === 'factory') {
            module.factory(config.name, function () { return constructor; });
        }
        else if (type === 'service') {
            module.service(config.name, constructor);
        }
        else if (type === 'filter') {
            module.filter(config.name, function () {
                // All pipes must implement a `transform` method. These __must__ be pure
                // functions (for some input, it must always return the same output)
                if (!constructor.transform) {
                    throw new Error('Filters must implement a transform method');
                }
                // This is the Angular 1 filter itself
                return function (input) {
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    // Pass the input to the pipe to see if it conforms to the pipe's type
                    // spec
                    if (constructor.supports && !constructor.supports(input)) {
                        throw new Error("Filter " + name + " does not support " + input);
                    }
                    // Pass all inputs and parameters to the filter returning the output
                    return (_a = constructor).transform.apply(_a, [input].concat(params));
                    var _a;
                };
            });
        }
    };
}
/**
 * Polymorphic version of Ambient. Example:
 *   @Ambient
 *   class VM {
 *     @autoinject $http;
 *   }
 */
function Ambient(configOrClass) {
    if (typeof configOrClass === 'function') {
        return AmbientBase({}).apply(null, arguments);
    }
    return AmbientBase.apply(null, arguments);
}
exports.Ambient = Ambient;
/**
 * Ambient service. We inject it with DI values without exporting the class
 * into the angular DI environment.
 */
function AmbientBase(config) {
    return service(config);
}
function Factory(config) {
    return service(config, 'factory');
}
exports.Factory = Factory;
/**
 * Defines a generic angular service.
 */
function Service(config) {
    return service(config, 'service');
}
exports.Service = Service;
/**
 * Old-school controller. Gets injected with DI, then published as
 * module.controller under the given name. Can also optionally be published as
 * a service.
 */
function Controller(config) {
    return service(config, 'controller');
}
exports.Controller = Controller;
function Pipe(config) {
    return service(config, 'filter');
}
exports.Pipe = Pipe;
