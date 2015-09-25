/**
 * @author john
 * @version 9/20/15 7:24 PM
 */

///ts:ref=refs
/// No file or directory matched name "refs" ///ts:ref:generated


import * as utils from './utils';


function inject(config: ngRight.InjectConfig) {
    let deps = config.deps;

    return function(target: ngRight.ControllerClass) {

        target.$inject = target.$inject || [];
        target.$inject.push(...deps);

        return target;
    };
}

export function Inject(...deps: string[]) {
    let config: ngRight.InjectConfig = {
        deps: deps
    };
    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);
    utils.assert(config.deps.length, '@Inject: No dependencies passed in');
    return inject(config);
}


