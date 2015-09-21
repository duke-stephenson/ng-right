/**
 * @author john
 * @version 9/20/15 7:24 PM
 */

///ts:ref=refs
/// <reference path="./refs.ts"/> ///ts:ref:generated


import * as utils from './utils';


function inject(config: lib.InjectConfig) {
    let deps = config.deps;

    return function(target: lib.ControllerClass) {

        target.$inject = target.$inject || [];

        // Add new dependencies before existing ones
        target.$inject.unshift.apply(target.$inject, deps);

        return target;
    };
}

export function Inject(config: lib.InjectConfig) {
    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);
    utils.assert(config.deps.length, '@Inject: No dependencies passed in');
    return inject(config);
}
