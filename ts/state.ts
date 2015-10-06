/**
 * @author john
 * @version 9/21/15 12:46 AM
 */


import * as utils from './utils';
import {mapConstructor} from './common/injectors';
import ui = angular.ui;

function state(options: ngRight.StateConfig) {

    return function(constructor: ngRight.StateClass) {

        var module = utils.getModule();

        let deps: string[];

        let {
            name,
            resolve,
            defaultRoute = false,
            template = constructor.template,
            templateUrl = constructor.templateUrl} = options;

        name = utils.camelCase(name);

        // Values to resolve can either be supplied in options.resolve or as a static method on the
        // component's class
        let doResolve = false;
        if (resolve && (deps = Object.keys(resolve))) {
            doResolve = true;
        }

        let injector = mapConstructor(<Function>constructor);

        module.run(injector);

        options.template = template;
        options.templateUrl = templateUrl;
//        options.controllerAs = options.controllerAs ||



        config.$inject = ['$urlRouterProvider', '$stateProvider'];
        function config($urlRouterProvider: ui.IUrlRouterProvider, $stateProvider: ui.IStateProvider) {

            if (defaultRoute && options.url === 'string')
                $urlRouterProvider.otherwise((typeof defaultRoute === 'string') ? defaultRoute : options.url);

            $stateProvider.state(options);
        }

        module.config(config);

        module.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
            function($urlRouterProvider, $stateProvider, $locationProvider) {


                // This is the state definition object
                var sdo = {

                    // A user supplied controller OR
                    // An internally created proxy controller, if resolve were requested for a Component.
                    controller: userController || (doResolve ? controller : undefined),

                };

                // When our automatic controller is used, we inject the resolved values into it,
                // along with the injectable service that will be used to publish them.
                // If the user supplied a controller than we do not inject anything
                if (doResolve) {
                    deps.unshift(name);

                    controller.$inject = deps;
                }

                // Populate the published service with the resolved values
                function controller() {
                    var args = Array.prototype.slice.call(arguments);

                    // This is the service that we "un-shifted" earlier
                    var localScope = args[0];

                    args = args.slice(1);

                    // Now we copy the resolved values to the service.
                    // This service can be injected into a component's constructor, for example.
                    deps.slice(1).forEach(function(v, i) {
                        localScope[v] = args[i];
                    });

                }

            }]);

        return constructor;

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

