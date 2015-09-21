/**
 * @author john
 * @version 9/21/15 12:46 AM
 */


///ts:ref=refs
/// <reference path="./refs.ts"/> ///ts:ref:generated


import * as utils from './utils';

import ui = angular.ui;

function state(options: lib.StateConfig) {

    return function(target: lib.StateClass) {

        var module              = utils.getModule();
        var resolvedServiceName = utils.camelCase(target.selector || (options.name + '').replace('.', '-'));

        var deps;

        // Indicates if there is anything to resolve
        var doResolve;

        // Values to resolve can either be supplied in options.resolve or as a static method on the
        // component's class
        var resolves = options.resolve || target.resolve;

        // Is there a resolve block?
        if (resolves && resolves instanceof Object && (deps = Object.keys(resolves)).length)
            doResolve = true;

        // Create an injectable value service to share the resolved values with the controller
        // The service bears the same name as the component's camelCased selector name.
        // if (doResolve) {
        //    if (!serviceExists(resolvedServiceName)) {
        //        angular.module(currentModule).value(resolvedServiceName, {});
        //    }
        // }

        // Configure the state

        module.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
            function($urlRouterProvider, $stateProvider, $locationProvider) {

                // Activate this state, if options.defaultRoute = true.
                // If you don't want this then don't set options.defaultRoute to true
                // and, instead, use $state.go inside the constructor to active a state.
                // You can also pass a string to defaultRoute, which will become the default route.
                if (options.defaultRoute)
                    $urlRouterProvider.otherwise((typeof options.defaultRoute === 'string') ? options.defaultRoute : options.url);

                if (options.html5Mode) {
                    $locationProvider.html5Mode(options.html5Mode);
                }

                // The user can supply a controller through a parameter in options
                // or the class itself can be used as the controller if no component is annotated.
                let userController: any;
                if (options.controller) {
                    userController = <string>options.controller;

                } else if (!target.selector) {
                    if (target.$inject && target.$inject.length && deps && deps.length) {

                        userController = <lib.StateClass>target;
                        deps.forEach(function(dep) {
                            var i = userController.$inject.indexOf(dep);
                            if (i !== -1)
                                userController.$inject[i] = dep;
                        });

                    }
                }


                // This is the state definition object
                var sdo = {
                    url: options.url,

                    // Default values for URL parameters can be configured here.
                    // ALso, parameters that do not appear in the URL can be configured here.
                    params: options.params,

                    // The State applied to a bootstrap component can be abstract,
                    // if you don't want that state to be able to activate.
                    abstract: options.abstract,

                    templateUrl: options.templateUrl,

                    // This is the "inline" template, as opposed to the templateUrl.
                    // 1) If options.templateUrl is specified then template will be set to undefined.
                    // 2) If options.template is provided then it will be used.
                    // 3) Otherwise, if this is a component, but not the bootstrap(**) component,
                    //    then we use it's selector to create the inline template "<selector></selector>".
                    // 4) Otherwise, we provide the following default template "<div ui-view></div>".
                    // (**) The bootstrap component will be rendered by Angular directly and must not
                    //     be rendered again by ui-router, or you will literally see it twice.
                    // todo: allow the user to specify their own div/span instead of forcing "div(ui-view)"
                    template: options.templateUrl ? undefined : options.template || ((target.template || target.templateUrl) && !target.bootstrap && target.selector ? target.selector.replace(/^(.*)$/, '<$1></$1>') : '<div ui-view=""></div>'),

                    // Do we need to resolve stuff? If so, then we also provide a controller to catch the resolved data.
                    resolve: resolves,

                    // A user supplied controller OR
                    // An internally created proxy controller, if resolves were requested for a Component.
                    controller: userController || (doResolve ? controller : undefined),

                    // onEnter and onExit events
                    onEnter: options.onEnter,
                    onExit: options.onExit
                };


                // Create the state
                $stateProvider.state(options.name, sdo);

                // When our automatic controller is used, we inject the resolved values into it,
                // along with the injectable service that will be used to publish them.
                // If the user supplied a controller than we do not inject anything
                if (doResolve) {
                    deps.unshift(resolvedServiceName);

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

        return target;

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
