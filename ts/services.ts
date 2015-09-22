'use strict';

///ts:ref=refs
/// <reference path="./refs.ts"/> ///ts:ref:generated

import * as utils from './utils';


function service(config: ngRight.ServiceConfig|ngRight.ControllerConfig, type?: string) {

    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);

    if (type === 'service') {
        utils.assert(!!config.serviceName, 'you must provide a service name');
    }
    if (type === 'controller') {
        utils.assert(!!(<ngRight.ControllerConfig>config).controllerName, 'you must provide a controller name');
    }

    return function(constructor: Function) {

        var module = utils.getModule();

        var fromInjectClassDecor = constructor.$inject || [];
        var inject               = (constructor.prototype[utils.autoinjectKey] || []).concat(fromInjectClassDecor);
        var injectStatic         = constructor[utils.autoinjectKey] || [];

        // Injector function that assigns the injected services to the class.
        injector.$inject = inject.concat(injectStatic);
        function injector(...injected) {
            var map = utils.zipObject(injector.$inject, injected);
            // Assign injected values to the prototype.
            inject.forEach(token => {
                constructor.prototype[token] = map[token];
            });
            // Assign injected values to the class.
            injectStatic.forEach(token => {
                constructor[token] = map[token];
            });
        }

        // Run DI.
        module.run(injector);

        // Publish service and/or controller.
        if (type === 'controller') {
            let conf = <ngRight.ControllerConfig>config;
            module.controller(conf.controllerName, constructor);
            if (conf.serviceName) module.factory(conf.serviceName, () => constructor);
        }
        if (type === 'service') module.factory(config.serviceName, () => constructor);
    };
}

/**
 * Defines a generic angular service.
 */
export function Service(config: ngRight.ServiceConfig) {
    return service(config, 'service');
}

/**
 * Polymorphic version of Ambient. Example:
 *   @Ambient
 *   class VM {
 *     @autoinject $http;
 *   }
 */
export function Ambient(configOrClass: any) {
    if (typeof configOrClass === 'function') {
        return AmbientBase(<ngRight.BaseConfig>{}).apply(null, arguments);
    }
    return AmbientBase.apply(null, arguments);
}

/**
 * Ambient service. We inject it with DI values without exporting the class
 * into the angular DI environment.
 */
function AmbientBase(config: ngRight.BaseConfig) {
    return service(<ngRight.ServiceConfig>config);
}

/**
 * Old-school controller. Gets injected with DI, then published as
 * module.controller under the given name. Can also optionally be published as
 * a service.
 */
export function Controller(config: ngRight.ControllerConfig) {
    return service(config, 'controller');
}

