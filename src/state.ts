/**
 * @author john
 * @version 9/21/15 12:46 AM
 */


import * as utils from './utils';
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
import IStateProvider = angular.ui.IStateProvider;


export function State(stateName: string, config: ngRight.StateConfig): ClassDecorator {

    utils.assert(!!config, '@State: Valid options are: url, defaultRoute, template, templateUrl, resolve, abstract');

    return function(target: ngRight.StateClass) {

        if (config.as)
            utils.options.controllerAs = utils.camelCase(target.prototype.constructor.name);

        let injector        = utils.mapConstructor(<Function>target);
        let module          = utils.getModule();
        let name            = utils.camelCase(stateName); // used for the controllerAs syntax
        let defaultRoute    = config.defaultRoute;
        config.template     = config.template || target.template;
        config.templateUrl  = config.templateUrl || target.templateUrl;
        config.controller   = <Function>target;
        config.controllerAs = config.controllerAs || utils.options.controllerAs || name;
        config.name         = stateName; // for the $stateProvider.state below
        if (!config.resolve) {} else target.$inject = Object.keys(config.resolve);

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
