/**
 * @author john
 * @version 10/6/15 1:42 AM
 */

import * as utils from '../utils';

export function mapConstructor(constructor: Function, config?: any): Function|any[] {

    var inject: string[] = constructor.prototype[utils.autoinjectKey] || [];
    var injectStatic: string[] = constructor[utils.autoinjectKey] || [];

    injector.$inject = inject.concat(injectStatic);
    function injector(...injected: string[]) {
        var map = utils.zipObject(injector.$inject, injected);
        // Assign injected values to the prototype.
        inject.forEach(token => {
            constructor.prototype[token] = map[token];
        });
        // Assign injected values to the class.
        injectStatic.forEach(token => {
            constructor[token] = map[token];
        });

        if (config)
            return config;
    }

    return injector;
}
