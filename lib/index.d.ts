declare module 'ng-right/utils' {
	/**
	 * Used to store autoinject settings (list of things to inject onto the class
	 * or the prototype).
	 */
	/**
	 * Used to store binding information (isolated scope settings).
	 */
	export var autoinjectKey: any;
	export var scopeKey: any;
	/**
	 * Adds the given property to the list of items to autoinject onto the class
	 * or prototype.
	 */
	export function autoinject(target: any, propertyName: string): void;
	/**
	 * Mutable configuration object.
	 */
	export let options: {
	    module: ng.IModule;
	    makeTemplateUrl(elementName: string): string;
	    controllerAs: string;
	};
	/**
	 * Reuses or creates an angular module from the given configuration.
	 */
	export function getModule(): angular.IModule;
	export function getCtrlAs(config: ngRight.DirectiveConfig): string;
	/**
	 * Converts an identifier into kebab case.
	 */
	export function kebabCase(name: string): string;
	/**
	 * Converts an identifier into camelcase.
	 */
	export function camelCase(name: string): string;
	/**
	 * Primitive version of lodash#zipObject.
	 */
	export function zipObject<T>(one: string[], other: T[]): {
	    [key: string]: T;
	};
	/**
	 * "Clones" the given function by wrapping it into a pass-through function.
	 * Doesn't preserve arity ('.length') and argument names.
	 */
	export function cloneFunction(func: Function): (...args: any[]) => any;
	/**
	 * Creates a random string that is unlikely to clash with other keys. This is
	 * where you're supposed to use a Symbol, but Angular can't bind to a
	 * symbol-keyed property.
	 */
	export function randomString(): string;
	/**
	 * Assertion utility.
	 */
	export function assert(ok: boolean | number, ...args: string[]): void;
	export function mapConstructor(constructor: Function, config?: any): Function | any[];

}
declare module 'ng-right/bindings' {
	/**
	 * Polymorphic version of @bindString, usable without parens. Example:
	 *   class VM {
	 *     @bindString first: string;
	 *     @bindString('second') second: string;
	 *   }
	 */
	export function bindString(targetOrKey: any | string, keyOrNothing?: string): any;
	/**
	 * Polymorphic version of @bindTwoWay, usable without parens. Example:
	 *   class VM {
	 *     @bindTwoWay first: any;
	 *     @bindTwoWay({optional: true, key: 'secunda', collection: true})
	 *     second: any;
	 *   }
	 */
	export function bindTwoWay(targetOrOptions: any | ngRight.BindTwoWayOptions, keyOrNothing?: string): (target: any, propertyName: string) => void;
	/**
	 * Polymorphic version of @bindExpression, usable without parens. Example:
	 *   class VM {
	 *     @bindExpression first: Function;
	 *     @bindExpression('secunda') second: Function;
	 *   }
	 */
	export function bindExpression(targetOrKey: any | string, keyOrNothing?: string): (target: any, propertyName: string) => void;
	/**
	 * Polymorphic version of @bindOneWay, usable without parens. Example:
	 *   class VM {
	 *     @bindOneWay first: any;
	 *     @bindOneWay('secunda') second: any;
	 *   }
	 */
	export function bindOneWay(targetOrKey: any | string, keyOrNothing?: string): (target: any, propertyName: string) => void;

}
declare module 'ng-right/directives' {
	/**
	 * Defines an angular component (custom element).
	 */
	export function Component(config: ngRight.DirectiveConfig): ClassDecorator;
	/**
	 * Defines an attribute directive.
	 */
	export function Attribute(config: ngRight.DirectiveConfig): ClassDecorator;
	export function View(config: ngRight.ViewConfig): ClassDecorator;

}
declare module 'ng-right/services' {
	/**
	 * Polymorphic version of Ambient. Example:
	 *   @Ambient
	 *   class VM {
	 *     @autoinject $http;
	 *   }
	 */
	export function Ambient(configOrClass: any): any;
	export function Factory(config: ngRight.ServiceName): (constructor: Function) => void;
	/**
	 * Defines a generic angular service.
	 */
	export function Service(config: ngRight.ServiceName): (constructor: Function) => void;
	/**
	 * Old-school controller. Gets injected with DI, then published as
	 * module.controller under the given name. Can also optionally be published as
	 * a service.
	 */
	export function Controller(config: ngRight.ServiceName): (constructor: Function) => void;
	export function Pipe(config: ngRight.ServiceName): (constructor: Function) => void;

}
declare module 'ng-right/state' {
	export function State(stateName: string, config: ngRight.StateConfig): ClassDecorator;

}
declare module 'ng-right/bootstrap' {
	export function Bootstrap(options: ngRight.OptionsConfig): ClassDecorator;

}
declare module 'ng-right/index' {
	export * from 'ng-right/bindings';
	export * from 'ng-right/directives';
	export * from 'ng-right/services';
	export * from 'ng-right/state';
	export * from 'ng-right/bootstrap';
	export { options, autoinject } from 'ng-right/utils';

}
/**
 * @author john
 * @version 10/12/15 5:28 AM
 */



declare module ngRight {

    type ServiceName = ServiceConfig | string;

    // Abstract interface shared by configuration objects.
    interface BaseConfig {
        makeTemplateUrl?: (selector: string) => string;
    }

    interface OptionsConfig extends BaseConfig {
        module?: angular.IModule;
        ng?: angular.IAngularBootstrapConfig;
    }

    interface DirectiveConfig extends BaseConfig, angular.IDirective {
        // The name of the custom element or attribute. Used to derive module name,
        // directive name, and template url.
        selector: string;
    }

    interface ServiceConfig extends BaseConfig {
        // The name of the service in the angular module system. Mandatory
        // due to minification woes.
        name: string;
    }

    interface ControllerClass extends Function {
        template?: string|Function;
        templateUrl?: string|Function;
        link?: Function;
        compile?: any;
        transclude?: boolean;
    }

    interface StateConfig extends angular.ui.IState {
        defaultRoute?: boolean|string;
        as?: boolean; // use class name
    }

    interface StateClass extends Function {
        template?: string;
        templateUrl?: string;
    }

    interface ViewConfig {
        template?: string;
        templateUrl?: string;
        transclude?: boolean;
    }

    interface BindTwoWayOptions {
        // Adds `*` to the property descriptor, marking it for `$watchCollection`.
        collection?: boolean;
        // Adds `?` to the property descriptor, marking it optional.
        optional?: boolean;
        // Adds an external property name to the binding.
        key?: string;
    }


}
declare module 'ng-right' {
	import main = require('ng-right/index');
	export = main;
}
