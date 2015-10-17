/**
 * @version 9/20/15 7:24 PM
 */
'use strict';
var utils = require('./utils');
/**
 * Property binding decorator. Takes a string property descriptor, like '@' or
 * '&action', and stores it in class's static property `scope` under the same
 * key as the name of the property being decorated.
 *
 * Basically, this:
 *   class VM {
 *     @bind() ngModel;
 *     @bind('@longWay') path;
 *   }
 *
 * Becomes this:
 *   class VM {
 *     static scope = {
 *       ngModel: '=',
 *       path: '@longWay'
 *     };
 *   }
 *
 * When used with @Component or @Attribute, the scope property is then passed
 * into the directive definition.
 *
 * Keeping this un-exported for the time being. I'm not convinced we need this
 * general form over other, more descriptive decorators.
 */
function bind(descriptor) {
    if (descriptor === void 0) { descriptor = '='; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = descriptor;
    };
}
/**
 * Polymorphic version of @bindString, usable without parens. Example:
 *   class VM {
 *     @bindString first: string;
 *     @bindString('second') second: string;
 *   }
 */
function bindString(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        return bindStringBase().apply(null, arguments);
    }
    return bindStringBase.apply(null, arguments);
}
exports.bindString = bindString;
// export function bindString(options: ngRight.BindTwoWayOptions): PropertyDecorator {
//    return bindStringBase('');
// }
//
// export function bindString(target: Object, key: string): PropertyDecorator {
//    return bindStringBase(key);
// }
/**
 * Semantic version of @bind('@').
 *
 * Example usage:
 *   class VM {
 *     @bindString() first: string;
 *     @bindString('secunda') second: string;
 *   }
 */
function bindStringBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '@' + key;
    };
}
/**
 * Polymorphic version of @bindTwoWay, usable without parens. Example:
 *   class VM {
 *     @bindTwoWay first: any;
 *     @bindTwoWay({optional: true, key: 'secunda', collection: true})
 *     second: any;
 *   }
 */
function bindTwoWay(targetOrOptions, keyOrNothing) {
    if (targetOrOptions != null && typeof targetOrOptions === 'object' && typeof keyOrNothing === 'string') {
        bindTwoWayBase()(targetOrOptions, keyOrNothing);
    }
    return bindTwoWayBase(targetOrOptions);
}
exports.bindTwoWay = bindTwoWay;
/**
 * Semantic version of @bind() or @bind('=').
 *
 * Example usage:
 *   class VM {
 *     @bindTwoWay() first: any;
 *     @bindTwoWay({optional: true, key: 'secunda', collection: true})
 *     second: any;
 *   }
 */
function bindTwoWayBase(options) {
    if (options === void 0) { options = {}; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '=' + encodeDescriptor(options);
    };
}
/**
 * Polymorphic version of @bindExpression, usable without parens. Example:
 *   class VM {
 *     @bindExpression first: Function;
 *     @bindExpression('secunda') second: Function;
 *   }
 */
function bindExpression(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        bindExpressionBase()(targetOrKey, keyOrNothing);
    }
    return bindExpressionBase(targetOrKey);
}
exports.bindExpression = bindExpression;
/**
 * Semantic version of @bind('&').
 *
 * Example usage:
 *   class VM {
 *     @bindExpression() first: Function;
 *     @bindExpression('secunda') second: Function;
 *   }
 */
function bindExpressionBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        Class[utils.scopeKey][propertyName] = '&' + key;
    };
}
/**
 * Polymorphic version of @bindOneWay, usable without parens. Example:
 *   class VM {
 *     @bindOneWay first: any;
 *     @bindOneWay('secunda') second: any;
 *   }
 */
function bindOneWay(targetOrKey, keyOrNothing) {
    if (targetOrKey != null && typeof targetOrKey === 'object' && typeof keyOrNothing === 'string') {
        bindOneWayBase()(targetOrKey, keyOrNothing);
    }
    return bindOneWayBase(targetOrKey);
}
exports.bindOneWay = bindOneWay;
/**
 * Emulates a one-way binding, which is not supported by Angular natively.
 * Uses a hidden '&' binding and a getter/setter pair to make the decorated
 * property read-only.
 *
 * Example usage:
 *   @Component({
 *     selector: 'controlled-input'
 *   })
 *   class X {
 *     @bindOneWay value: any;
 *
 *     constructor() {
 *       this.value = 123;         // has no effect
 *       console.log(this.value);  // prints 'constant value'
 *     }
 *   }
 */
function bindOneWayBase(key) {
    if (key === void 0) { key = ''; }
    return function (target, propertyName) {
        var Class = target.constructor;
        if (!Class[utils.scopeKey])
            Class[utils.scopeKey] = {};
        var secretKey = utils.randomString();
        Class[utils.scopeKey][secretKey] = '&' + (key || propertyName);
        // noinspection JSUnusedLocalSymbols
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
/**
 * Generates a descriptor string suffix from the given options.
 */
function encodeDescriptor(options) {
    return (options.collection ? '*' : '') + (options.optional ? '?' : '') + (options.key || '');
}
