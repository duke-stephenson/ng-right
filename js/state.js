/**
 * @author john
 * @version 9/21/15 12:46 AM
 */
var utils = require('./utils');
function state(options) {
    return function (target) {
        var module = utils.getModule();
        var resolvedServiceName = utils.camelCase(target.selector || (options.name + '').replace('.', '-'));
        var deps;
        var doResolve;
        var resolves = options.resolve || target.resolve;
        if (resolves && resolves instanceof Object && (deps = Object.keys(resolves)).length)
            doResolve = true;
        module.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
            function ($urlRouterProvider, $stateProvider, $locationProvider) {
                if (options.defaultRoute)
                    $urlRouterProvider.otherwise((typeof options.defaultRoute === 'string') ? options.defaultRoute : options.url);
                if (options.html5Mode) {
                    $locationProvider.html5Mode(options.html5Mode);
                }
                var userController;
                if (options.controller) {
                    userController = options.controller;
                }
                else if (!target.selector) {
                    if (target.$inject && target.$inject.length && deps && deps.length) {
                        userController = target;
                        deps.forEach(function (dep) {
                            var i = userController.$inject.indexOf(dep);
                            if (i !== -1)
                                userController.$inject[i] = dep;
                        });
                    }
                }
                var sdo = {
                    url: options.url,
                    params: options.params,
                    abstract: options.abstract,
                    templateUrl: options.templateUrl,
                    template: options.templateUrl ? undefined : options.template || ((target.template || target.templateUrl) && !target.bootstrap && target.selector ? target.selector.replace(/^(.*)$/, '<$1></$1>') : '<div ui-view=""></div>'),
                    resolve: resolves,
                    controller: userController || (doResolve ? controller : undefined),
                    onEnter: options.onEnter,
                    onExit: options.onExit
                };
                $stateProvider.state(options.name, sdo);
                if (doResolve) {
                    deps.unshift(resolvedServiceName);
                    controller.$inject = deps;
                }
                function controller() {
                    var args = Array.prototype.slice.call(arguments);
                    var localScope = args[0];
                    args = args.slice(1);
                    deps.slice(1).forEach(function (v, i) {
                        localScope[v] = args[i];
                    });
                }
            }]);
        return target;
    };
}
function State(options) {
    utils.assert(!!options, '@State: Valid options are: name, url, defaultRoute, template, resolve, abstract.');
    return state(options);
}
exports.State = State;
