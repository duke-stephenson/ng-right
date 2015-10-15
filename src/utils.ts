'use strict';

/**
 * Used to store autoinject settings (list of things to inject onto the class
 * or the prototype).
 */
export var autoinjectKey = typeof Symbol === 'function' ? Symbol('autoinjectSettings') : randomString();

/**
 * Used to store binding information (isolated scope settings).
 */
export var scopeKey = typeof Symbol === 'function' ? Symbol('scopeSettings') : randomString();

/**
 * Adds the given property to the list of items to autoinject onto the class
 * or prototype.
 */
export function autoinject(target: any, propertyName: string): void {
    if (!target.hasOwnProperty(autoinjectKey)) target[autoinjectKey] = [];
    target[autoinjectKey].push(propertyName);
}

/**
 * Mutable configuration object.
 */
export let options = {
    // Default angular module
    module: <angular.IModule>null,
    makeTemplateUrl(elementName: string): string {
        return `${elementName}/${elementName}.tpl.html`;
    },
    controllerAs: <string>null
};


/**
 * Reuses or creates an angular module from the given configuration.
 */
export function getModule(): angular.IModule {
    assert(!!options.module, 'angular DEFAULT module must bet set');
    return options.module;
}

export function getCtrlAs(config: ngRight.DirectiveConfig) {
    return config.controllerAs || options.controllerAs || camelCase(config.selector);
}


/**
 * Normalises a string, converting non-English-letters into singular spaces,
 * inserting spaces into case boundaries, and lower casing.
 */
function normalise(name: string): string {
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

/**
 * Converts an identifier into kebab case.
 */
export function kebabCase(name: string): string {
    return normalise(name).replace(/ /g, '-');
}

/**
 * Converts an identifier into camelcase.
 */
export function camelCase(name: string): string {
    name = normalise(name);
    return name.replace(/ (.)/g, (m: any, p1: string) => p1.toUpperCase());
}

/**
 * Primitive version of lodash#zipObject.
 */
export function zipObject<T>(one: string[], other: T[]): { [key: string]: T } {
    var buffer: { [key: string]: T } = {};
    one.forEach((key, index) => {
        buffer[key] = other[index];
    });
    return buffer;
}

/**
 * "Clones" the given function by wrapping it into a pass-through function.
 * Doesn't preserve arity ('.length') and argument names.
 */
export function cloneFunction(func: Function) {
    return function(...args: any[]) {
        return func.call(this, ...args);
    };
}

/**
 * Creates a random string that is unlikely to clash with other keys. This is
 * where you're supposed to use a Symbol, but Angular can't bind to a
 * symbol-keyed property.
 */
export function randomString(): string {
    return (Math.random() * Math.pow(10, 16)).toString(16);
}


/**
 * Assertion utility.
 */
export function assert(ok: boolean | number, ...args: string[]): void {
    if (!ok) throw new Error(args.join(' '));
}

export function mapConstructor(constructor: Function, config?: any): Function | any[] {

    var inject: string[] = constructor.prototype[autoinjectKey] || [];
    var injectStatic: string[] = constructor[autoinjectKey] || [];

    injector.$inject = inject.concat(injectStatic);
    function injector(...injected: string[]) {
        var map = zipObject(injector.$inject, injected);
        // Assign injected values to the prototype.
        inject.forEach(token => {
            constructor.prototype[token] = map[token];
        });
        // Assign injected values to the class.
        injectStatic.forEach(token => {
            constructor[token] = map[token];
        });

        if (config)
            return config;
    }

    return injector;
}
