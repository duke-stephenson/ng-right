/**
 * @author john
 * @version 9/21/15 12:46 AM
 */


import * as utils from './utils';
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
import IStateProvider = angular.ui.IStateProvider;


export function State(config: ngRight.StateConfig): ClassDecorator {
    utils.assert(!!config, '@State: Valid options are: name, url, defaultRoute, template, resolve, abstract.');
    return function(constructor: ngRight.StateClass) {

        let injector        = utils.mapConstructor(<Function>constructor);
        let defaultRoute    = config.defaultRoute;
        let module          = utils.getModule();
        let name            = utils.camelCase(config.name);
        config.template     = config.template || constructor.template;
        config.templateUrl  = config.templateUrl || constructor.templateUrl;
        config.controller   = <Function>constructor;
        config.controllerAs = config.controllerAs || utils.options.controllerAs || name;
        if (!config.resolve) {} else constructor.$inject = Object.keys(config.resolve);

        setup.$inject = ['$urlRouterProvider', '$stateProvider'];
        function setup($urlRouterProvider: IUrlRouterProvider, $stateProvider: IStateProvider) {

            if (defaultRoute && typeof config.url === 'string')
                $urlRouterProvider.otherwise(<string>config.url);

            $stateProvider.state(config);
        }

        module.run(<any[]>injector);
        module.config(setup);
    };
}
