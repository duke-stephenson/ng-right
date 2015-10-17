/**
 * @author john
 * @version 9/21/15 12:46 AM
 */
var utils = require('./utils');
function State(config) {
    utils.assert(!!config, '@State: Valid options are: name, url, defaultRoute, template, resolve, abstract.');
    return function (constructor) {
        var injector = utils.mapConstructor(constructor);
        var defaultRoute = config.defaultRoute;
        var module = utils.getModule();
        var name = utils.camelCase(config.name);
        config.template = config.template || constructor.template;
        config.templateUrl = config.templateUrl || constructor.templateUrl;
        config.controller = constructor;
        config.controllerAs = config.controllerAs || utils.options.controllerAs || name;
        if (!config.resolve) { }
        else
            constructor.$inject = Object.keys(config.resolve);
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
