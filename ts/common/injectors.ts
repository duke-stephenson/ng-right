/**
 * @author john
 * @version 10/6/15 1:42 AM
 */

import * as utils from '../utils';

export function mapConstructor(constructor: Function): Function {

    var inject = constructor.prototype[utils.autoinjectKey] || [];
    var injectStatic = constructor[utils.autoinjectKey] || [];

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

    return injector;
}
