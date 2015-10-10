'use strict';


import * as utils from './utils';


function service(conf: ngRight.ServiceConfig|string, type?: string) {

    let config: ngRight.ServiceConfig;
    if (typeof conf === 'string') {
        config = {name: conf};
    } else {
        config = conf;
    }

    if (type === 'service' || type === 'controller' || type === 'filter' || type === 'factory') {
        utils.assert(!!config.name, 'you must provide a service name');
    }

    return function(constructor: Function) {

        var module = utils.getModule();

        var inject = constructor.prototype[utils.autoinjectKey] || [];
        var injectStatic = constructor[utils.autoinjectKey] || [];

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
            module.controller(config.name, constructor);

        } else if (type === 'factory') {
            module.factory(config.name, () => constructor);

        } else if (type === 'service') {
            module.service(config.name, constructor);

        } else if (type === 'filter') {
            module.filter(config.name, () => {
                // All pipes must implement a `transform` method. These __must__ be pure
                // functions (for some input, it must always return the same output)
                if (!(<any>constructor).transform) {
                    throw new Error('Filters must implement a transform method');
                }

                // This is the Angular 1 filter itself
                return (input, ...params) => {
                    // Pass the input to the pipe to see if it conforms to the pipe's type
                    // spec
                    if ((<any>constructor).supports && !(<any>constructor).supports(input)) {
                        throw new Error(`Filter ${name} does not support ${input}`);
                    }

                    // Pass all inputs and parameters to the filter returning the output
                    return (<any>constructor).transform(input, ...params);
                }
            })
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

export function Factory(config: ngRight.ServiceConfig) {
    return service(config, 'factory');
}

/**
 * Defines a generic angular service.
 */
export function Service(config: ngRight.ServiceConfig) {
    return service(config, 'service');
}

/**
 * Old-school controller. Gets injected with DI, then published as
 * module.controller under the given name. Can also optionally be published as
 * a service.
 */
export function Controller(config: ngRight.ServiceConfig) {
    return service(config, 'controller');
}

export function Pipe(config: ngRight.ServiceConfig) {
    return service(config, 'filter');
}
