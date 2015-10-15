'use strict';

import 'reflect-metadata';

import * as utils from './utils';

/**
 * Shared directive definition logic.
 */
function directive(config: ngRight.DirectiveConfig) {

    return function(constructor: ngRight.ControllerClass) {

        /**
         * Transfer properties.
         */
        config.controller = constructor;

        if (constructor[utils.scopeKey]) config.scope = constructor[utils.scopeKey];

        // Link functions must be cloned because angular mutates them with `require`
        // annotations, then relies on those annotations for injection.
        if (typeof constructor.link === 'function')
            config.link = utils.cloneFunction(constructor.link);
        // Cloning other functions just in case.
        if (typeof constructor.compile === 'function')
            config.compile = utils.cloneFunction(constructor.compile);
        if (constructor.transclude)
            config.transclude = constructor.transclude;

        if (typeof constructor.template === 'function')
            config.template = utils.cloneFunction(<Function>constructor.template);
        else if (typeof constructor.template === 'string')
            config.template = constructor.template;

        if (typeof constructor.templateUrl === 'function')
            config.templateUrl = utils.cloneFunction(<Function>constructor.templateUrl);
        else if (typeof constructor.templateUrl === 'string')
            config.templateUrl = constructor.templateUrl;

        if (config.template == null && config.templateUrl === undefined && typeof config.scope !== 'boolean')
            config.templateUrl = utils.options.makeTemplateUrl(config.selector);

        var module        = utils.getModule();
        var directiveName = utils.camelCase(config.selector);
        let definition    = utils.mapConstructor(<Function>constructor, config);

        // Register the directive.
        module.directive(directiveName, <any[]>definition);
    };
}

/**
 * Defines an angular component (custom element).
 */
export function Component(config: ngRight.DirectiveConfig) {
    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);
    utils.assert(!!config.selector, 'you must provide a selector');

    var selector = utils.kebabCase(config.selector);

    var directiveConfig: ngRight.DirectiveConfig = {
        selector: config.selector,
        restrict: 'E',
        scope: {},
        controllerAs: utils.getCtrlAs(config),
        bindToController: true
    };

    angular.extend(directiveConfig, config);

    return directive(directiveConfig);
}

/**
 * Defines an attribute directive.
 */
export function Attribute(config: ngRight.DirectiveConfig) {
    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);
    utils.assert(!!config.selector, 'you must provide a selector');

    var directiveConfig: ngRight.DirectiveConfig = {
        selector: config.selector,
        restrict: 'A',
        scope: false
    };

    angular.extend(directiveConfig, config);

    return directive(directiveConfig);
}

export function View(config: ngRight.ViewConfig) {
    utils.assert(config != null && typeof config === 'object', `expected a configuration object, got: ${config}`);
    var tpl = config.template || config.templateUrl;
    utils.assert(!!tpl, 'Define a template retard');

    return function(constructor: ngRight.ControllerClass) {

        if (config.templateUrl) {
            constructor.templateUrl = config.templateUrl;
        } else {
            constructor.template = transcludeContent(config.template);
            if (/ng-transclude/i.test(config.template))
                constructor.transclude = true;
        }

        return constructor;
    };
}

// If template contains the new <content> tag then add ng-transclude to it.
function transcludeContent(template: string) {
    var s = (template || '').match(/\<content[ >]([^\>]+)/i);
    if (s) {
        if (s[1].toLowerCase().indexOf('ng-transclude') === -1)
            template = template.replace(/\<content/i, '<content ng-transclude');
    }
    return template;
}
