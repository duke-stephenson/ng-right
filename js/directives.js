'use strict';
var utils = require('./utils');
function directive(config) {
    return function (constructor) {
        var module = utils.getModule();
        var directiveName = utils.camelCase(config.selector);
        config.controller = constructor;
        if (constructor[utils.scopeKey])
            config.scope = constructor[utils.scopeKey];
        if (typeof constructor.link === 'function') {
            config.link = utils.cloneFunction(constructor.link);
        }
        if (typeof constructor.compile === 'function') {
            config.compile = utils.cloneFunction(constructor.compile);
        }
        if (typeof constructor.template === 'function') {
            config.template = utils.cloneFunction(constructor.template);
        }
        else if (typeof constructor.template === 'string') {
            config.template = constructor.template;
        }
        if (typeof constructor.templateUrl === 'function') {
            config.templateUrl = utils.cloneFunction(constructor.templateUrl);
        }
        else if (typeof constructor.templateUrl === 'string') {
            config.templateUrl = constructor.templateUrl;
        }
        var fromInjectClassDecor = constructor.$inject || [];
        var inject = (constructor.prototype[utils.autoinjectKey] || []).concat(fromInjectClassDecor);
        var injectStatic = constructor[utils.autoinjectKey] || [];
        definition.$inject = inject.concat(injectStatic);
        function definition() {
            var injected = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injected[_i - 0] = arguments[_i];
            }
            var map = utils.zipObject(definition.$inject, injected);
            inject.forEach(function (token) {
                constructor.prototype[token] = map[token];
            });
            injectStatic.forEach(function (token) {
                constructor[token] = map[token];
            });
            return config;
        }
        module.directive(directiveName, definition);
    };
}
function Component(config) {
    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
    utils.assert(!!config.selector, 'you must provide a selector');
    var selector = utils.kebabCase(config.selector);
    var directiveConfig = {
        selector: config.selector,
        restrict: 'E',
        scope: {},
        controllerAs: utils.getCtrlAs(config),
        bindToController: true
    };
    if (config.template == null && config.templateUrl === undefined) {
        directiveConfig.templateUrl = utils.options.makeTemplateUrl(selector);
    }
    angular.extend(directiveConfig, config);
    return directive(directiveConfig);
}
exports.Component = Component;
function Attribute(config) {
    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
    utils.assert(!!config.selector, 'you must provide a selector');
    var directiveConfig = {
        selector: config.selector,
        restrict: 'A',
        scope: false
    };
    angular.extend(directiveConfig, config);
    return directive(directiveConfig);
}
exports.Attribute = Attribute;
