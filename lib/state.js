/**
 * @author john
 * @version 9/21/15 12:46 AM
 */
var utils = require('./utils');
function State(stateName, config) {
    utils.assert(!!config, '@State: Valid options are: url, defaultRoute, template, templateUrl, resolve, abstract');
    return function (target) {
        if (config.as)
            utils.options.controllerAs = utils.camelCase(target.prototype.constructor.name);
        var injector = utils.mapConstructor(target);
        var module = utils.getModule();
        var name = utils.camelCase(stateName); // used for the controllerAs syntax
        var defaultRoute = config.defaultRoute;
        config.template = config.template || target.template;
        config.templateUrl = config.templateUrl || target.templateUrl;
        config.controller = target;
        config.controllerAs = config.controllerAs || utils.options.controllerAs || name;
        config.name = stateName; // for the $stateProvider.state below
        if (!config.resolve) { }
        else
            target.$inject = Object.keys(config.resolve);
        setup.$inject = ['$urlRouterProvider', '$stateProvider'];
        function setup($urlRouterProvider, $stateProvider) {
            if (defaultRoute && typeof config.url === 'string')
                $urlRouterProvider.otherwise(config.url);
            $stateProvider.state(config);
        }
        module.run(injector);
        module.config(setup);
    };
}
exports.State = State;
