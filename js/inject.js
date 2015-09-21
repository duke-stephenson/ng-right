/**
 * @author john
 * @version 9/20/15 7:24 PM
 */
/// <reference path="./refs.ts"/> ///ts:ref:generated
var utils = require('./utils');
function inject(config) {
    var deps = config.deps;
    return function (target) {
        target.$inject = target.$inject || [];
        target.$inject.unshift.apply(target.$inject, deps);
        return target;
    };
}
function Inject(config) {
    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
    utils.assert(config.deps.length, '@Inject: No dependencies passed in');
    return inject(config);
}
exports.Inject = Inject;
