/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	var utils_1 = __webpack_require__(2);
	exports.setModule = utils_1.setModule;
	exports.options = utils_1.options;
	exports.autoinject = utils_1.autoinject;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @version 9/20/15 7:24 PM
	 */
	'use strict';
	var utils = __webpack_require__(2);
	function bind(descriptor) {
	    if (descriptor === void 0) { descriptor = '='; }
	    return function (target, propertyName) {
	        var Class = target.constructor;
	        if (!Class[utils.scopeKey])
	            Class[utils.scopeKey] = {};
	        Class[utils.scopeKey][propertyName] = descriptor;
	    };
	}
	function bindString(targetOrKey, keyOrNothing) {
	    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
	        return bindStringBase().apply(null, arguments);
	    }
	    return bindStringBase.apply(null, arguments);
	}
	exports.bindString = bindString;
	function bindStringBase(key) {
	    if (key === void 0) { key = ''; }
	    return function (target, propertyName) {
	        var Class = target.constructor;
	        if (!Class[utils.scopeKey])
	            Class[utils.scopeKey] = {};
	        Class[utils.scopeKey][propertyName] = '@' + key;
	    };
	}
	function bindTwoWay(targetOrOptions, keyOrNothing) {
	    if (targetOrOptions != null && typeof targetOrOptions === 'object' && typeof keyOrNothing === 'string') {
	        bindTwoWayBase()(targetOrOptions, keyOrNothing);
	    }
	    return bindTwoWayBase(targetOrOptions);
	}
	exports.bindTwoWay = bindTwoWay;
	function bindTwoWayBase(options) {
	    if (options === void 0) { options = {}; }
	    return function (target, propertyName) {
	        var Class = target.constructor;
	        if (!Class[utils.scopeKey])
	            Class[utils.scopeKey] = {};
	        Class[utils.scopeKey][propertyName] = '=' + encodeDescriptor(options);
	    };
	}
	function bindExpression(targetOrKey, keyOrNothing) {
	    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
	        bindExpressionBase()(targetOrKey, keyOrNothing);
	    }
	    return bindExpressionBase(targetOrKey);
	}
	exports.bindExpression = bindExpression;
	function bindExpressionBase(key) {
	    if (key === void 0) { key = ''; }
	    return function (target, propertyName) {
	        var Class = target.constructor;
	        if (!Class[utils.scopeKey])
	            Class[utils.scopeKey] = {};
	        Class[utils.scopeKey][propertyName] = '&' + key;
	    };
	}
	function bindOneWay(targetOrKey, keyOrNothing) {
	    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
	        bindOneWayBase()(targetOrKey, keyOrNothing);
	    }
	    return bindOneWayBase(targetOrKey);
	}
	exports.bindOneWay = bindOneWay;
	function bindOneWayBase(key) {
	    if (key === void 0) { key = ''; }
	    return function (target, propertyName) {
	        var Class = target.constructor;
	        if (!Class[utils.scopeKey])
	            Class[utils.scopeKey] = {};
	        var secretKey = utils.randomString();
	        Class[utils.scopeKey][secretKey] = '&' + (key || propertyName);
	        Object.defineProperty(target, propertyName, {
	            get: function () {
	                if (typeof this[secretKey] === 'function')
	                    return this[secretKey]();
	                return undefined;
	            },
	            set: function (_) { }
	        });
	    };
	}
	function encodeDescriptor(options) {
	    return (options.collection ? '*' : '') + (options.optional ? '?' : '') + (options.key || '');
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	exports.options = {
	    module: null,
	    makeTemplateUrl: function (elementName) {
	        return elementName + "/" + elementName + ".tpl.html";
	    }
	};
	function setModule(module) {
	    console.log('module', module, exports.options.module);
	    exports.options.module = module;
	}
	exports.setModule = setModule;
	function getModule() {
	    assert(!!exports.options.module, 'angular module must bet set');
	    return exports.options.module;
	}
	exports.getModule = getModule;
	function getCtrlAs(config) {
	    return config.controllerAs || camelCase(config.selector);
	}
	exports.getCtrlAs = getCtrlAs;
	function setOptions(opts) {
	    angular.extend(exports.options, opts);
	}
	exports.setOptions = setOptions;
	exports.autoinjectKey = typeof Symbol === 'function' ? Symbol('autoinjectSettings') : randomString();
	exports.scopeKey = typeof Symbol === 'function' ? Symbol('scopeSettings') : randomString();
	function normalise(name) {
	    name = name.replace(/[^A-Za-z]+/g, ' ');
	    for (var i = 0; i < name.length - 1; i++) {
	        var prefix = name.slice(0, i + 1);
	        var next = name[i + 1];
	        if (/[a-z]/.test(name[i]) && /[A-Z]/.test(next)) {
	            next = next.toLowerCase();
	            name = prefix + ' ' + next + name.slice(i + 2);
	        }
	    }
	    return name.trim().toLowerCase();
	}
	function kebabCase(name) {
	    return normalise(name).replace(/ /g, '-');
	}
	exports.kebabCase = kebabCase;
	function camelCase(name) {
	    name = normalise(name);
	    return name.replace(/ (.)/g, function (m, p1) { return p1.toUpperCase(); });
	}
	exports.camelCase = camelCase;
	function zipObject(one, other) {
	    var buffer = {};
	    one.forEach(function (key, index) {
	        buffer[key] = other[index];
	    });
	    return buffer;
	}
	exports.zipObject = zipObject;
	function cloneFunction(func) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        return func.call.apply(func, [this].concat(args));
	    };
	}
	exports.cloneFunction = cloneFunction;
	function randomString() {
	    return (Math.random() * Math.pow(10, 16)).toString(16);
	}
	exports.randomString = randomString;
	function autoinject(target, propertyName) {
	    if (!target.hasOwnProperty(exports.autoinjectKey))
	        target[exports.autoinjectKey] = [];
	    target[exports.autoinjectKey].push(propertyName);
	}
	exports.autoinject = autoinject;
	function assert(ok) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!ok)
	        throw new Error(args.join(' '));
	}
	exports.assert = assert;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var utils = __webpack_require__(2);
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
	        if (constructor.template)
	            config.template = constructor.template;
	        if (constructor.templateUrl)
	            config.templateUrl = constructor.templateUrl;
	        if (constructor.transclude)
	            config.transclude = constructor.transclude;
	        if (config.template == null && config.templateUrl === undefined && !config.scope)
	            config.templateUrl = utils.options.makeTemplateUrl(config.selector);
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
	function View(config) {
	    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
	    var tpl = config.template || config.templateUrl;
	    utils.assert(!!tpl, 'Define a template retard');
	    return function (constructor) {
	        if (typeof config.template === 'string') {
	            constructor.template = transcludeContent(config.template);
	            if (/ng-transclude/i.test(config.template))
	                constructor.transclude = true;
	        }
	        if (config.templateUrl === 'string')
	            constructor.templateUrl = config.templateUrl;
	        return constructor;
	    };
	}
	exports.View = View;
	function transcludeContent(template) {
	    var s = (template || '').match(/\<content[ >]([^\>]+)/i);
	    if (s) {
	        if (s[1].toLowerCase().indexOf('ng-transclude') === -1)
	            template = template.replace(/\<content/i, '<content ng-transclude');
	    }
	    return template;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var utils = __webpack_require__(2);
	function service(config, type) {
	    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
	    if (type === 'service') {
	        utils.assert(!!config.serviceName, 'you must provide a service name');
	    }
	    if (type === 'controller') {
	        utils.assert(!!config.controllerName, 'you must provide a controller name');
	    }
	    return function (constructor) {
	        var module = utils.getModule();
	        var fromInjectClassDecor = constructor.$inject || [];
	        var inject = (constructor.prototype[utils.autoinjectKey] || []).concat(fromInjectClassDecor);
	        var injectStatic = constructor[utils.autoinjectKey] || [];
	        injector.$inject = inject.concat(injectStatic);
	        function injector() {
	            var injected = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                injected[_i - 0] = arguments[_i];
	            }
	            var map = utils.zipObject(injector.$inject, injected);
	            inject.forEach(function (token) {
	                constructor.prototype[token] = map[token];
	            });
	            injectStatic.forEach(function (token) {
	                constructor[token] = map[token];
	            });
	        }
	        module.run(injector);
	        if (type === 'controller') {
	            var conf = config;
	            module.controller(conf.controllerName, constructor);
	            if (conf.serviceName)
	                module.factory(conf.serviceName, function () { return constructor; });
	        }
	        if (type === 'service')
	            module.factory(config.serviceName, function () { return constructor; });
	    };
	}
	function Service(config) {
	    return service(config, 'service');
	}
	exports.Service = Service;
	function Ambient(configOrClass) {
	    if (typeof configOrClass === 'function') {
	        return AmbientBase({}).apply(null, arguments);
	    }
	    return AmbientBase.apply(null, arguments);
	}
	exports.Ambient = Ambient;
	function AmbientBase(config) {
	    return service(config);
	}
	function Controller(config) {
	    return service(config, 'controller');
	}
	exports.Controller = Controller;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author john
	 * @version 9/20/15 7:24 PM
	 */
	var utils = __webpack_require__(2);
	function inject(config) {
	    var deps = config.deps;
	    return function (target) {
	        target.$inject = target.$inject || [];
	        (_a = target.$inject).push.apply(_a, deps);
	        return target;
	        var _a;
	    };
	}
	function Inject() {
	    var deps = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        deps[_i - 0] = arguments[_i];
	    }
	    var config = {
	        deps: deps
	    };
	    utils.assert(config != null && typeof config === 'object', "expected a configuration object, got: " + config);
	    utils.assert(config.deps.length, '@Inject: No dependencies passed in');
	    return inject(config);
	}
	exports.Inject = Inject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author john
	 * @version 9/21/15 12:46 AM
	 */
	var utils = __webpack_require__(2);
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author john
	 * @version 9/21/15 1:31 AM
	 */
	var utils_1 = __webpack_require__(2);
	function bootstrap(options) {
	    return function (target) {
	        utils_1.setOptions(options);
	        target.bootstrap = true;
	        angular.element(document).ready(onReady);
	        function onReady() {
	            var el = document.body;
	            if (target.selector) {
	                el = document.querySelector(target.selector);
	            }
	            angular.bootstrap(el, [options.module.name], options.ng);
	        }
	    };
	}
	function Bootstrap(options) {
	    return bootstrap(options);
	}
	exports.Bootstrap = Bootstrap;


/***/ }
/******/ ]);