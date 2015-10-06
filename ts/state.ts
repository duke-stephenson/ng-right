/**
 * @author john
 * @version 9/21/15 12:46 AM
 */


import * as utils from './utils';
import {mapConstructor} from './common/injectors';
import ui = angular.ui;

function state(config: ngRight.StateConfig) {

    return function(constructor: ngRight.StateClass) {

        var module = utils.getModule();

        let deps: string[];

        let {
            name,
            resolve,
            defaultRoute = false,
            template = constructor.template,
            templateUrl = constructor.templateUrl} = config;

        name = utils.camelCase(name);

        // Values to resolve can either be supplied in config.resolve or as a static method on the
        // component's class
        let doResolve = false;
        if (resolve && (deps = Object.keys(resolve))) {
            doResolve = true;
        }

        let injector = mapConstructor(<Function>constructor);

        module.run(injector);

        if (deps) {
            constructor.$inject = deps;
        }

        config.controller = <Function>constructor;

        config.template = template;
        config.templateUrl = templateUrl;
        config.controllerAs = config.controllerAs || utils.options.controllerAs || name;


        setup.$inject = ['$urlRouterProvider', '$stateProvider'];
        function setup($urlRouterProvider: ui.IUrlRouterProvider, $stateProvider: ui.IStateProvider) {

            if (defaultRoute && config.url === 'string')
                $urlRouterProvider.otherwise((typeof defaultRoute === 'string') ? defaultRoute : config.url);

            $stateProvider.state(config);
        }

        module.config(setup);

    };
}


/**
 * State can be used to annotate either a Component or a class and assign
 * a ui-router state to it.
 *
 * @param options   literal object
 *      name:           name of the state
 *      url:            url associated with this state
 *      template:       template
 *      templateUrl:    templateUrl
 *      defaultRoute:   truthy = .otherwise(url)
 *                      string = .otherwise(defaultRoute)
 *      resolve:        Literal object, see ui-router resolve
 *      abstract:       true/false
 *      params:         Literal object
 *      controller:     A controller is automatically assigned, but if you need
 *                      finer control then you can assign your own controller
 *
 * If a class is annotated then it is assumed to be the controller and
 * the state name will be used as the name of the injectable service
 * that will hold any resolves requested.
 *
 * When a component is annotated and resolves requested, then the component's
 * selector name is used as the name of the injectable service that holds
 * their values.
 */
export function State(options: angular.ui.IState) {
    utils.assert(!!options, '@State: Valid options are: name, url, defaultRoute, template, resolve, abstract.');
    return state(options);
}

