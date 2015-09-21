/// <reference path="../angularjs/angular.d.ts" />

declare module 'ng-right' {
    export var Attribute: typeof ngRight.Attribute;
    export var Ambient: typeof ngRight.Ambient;
    export var Component: typeof ngRight.Component;
    export var Service: typeof ngRight.Service;
    export var Controller: typeof ngRight.Controller;
    export var autoinject: typeof ngRight.autoinject;
    export var bindTwoWay: typeof ngRight.bindTwoWay;
    export var bindOneWay: typeof ngRight.bindOneWay;
    export var bindString: typeof ngRight.bindString;
    export var bindExpression: typeof ngRight.bindExpression;
    export var defaults: typeof ngRight.defaults;
}

declare module ngRight {
    // Class decorators.
    export function Attribute(config: DirectiveConfig): ClassDecorator;

    export function Ambient(config: BaseConfig): ClassDecorator;
    export function Ambient(target: Function): void;

    export function Component(config: DirectiveConfig): ClassDecorator;

    export function Service(config: ServiceConfig): ClassDecorator;

    export function Controller(config: ControllerConfig): ClassDecorator;

    // Property decorators.
    export function autoinject(target: any, key: string);

    export function bindTwoWay(options: BindTwoWayOptions): PropertyDecorator;
    export function bindTwoWay(target: any, key: string): void;

    export function bindOneWay(key: string): PropertyDecorator;
    export function bindOneWay(target: any, key: string): void;

    export function bindString(key: string): PropertyDecorator;
    export function bindString(target: any, key: string): void;

    export function bindExpression(key: string): PropertyDecorator;
    export function bindExpression(target: any, key: string): void;

    // Mutable configuration.
    export const defaults: {
        module?: ng.IModule;
        moduleName?: string;
        controllerAs: string;
        makeTemplateUrl: (selector: string) => string;
    };

    // Abstract interface shared by configuration objects.
    interface BaseConfig {
        // Angular module object. If provided, other module options are ignored, and
        // no new module is declared.
        module?: ng.IModule;

        // Optional name for the new module created for this service or directive.
        // If omitted, the service or directive name is used.
        moduleName?: string;

        // Names of other angular modules this module depends on.
        dependencies?: string[];

        // DEPRECATED in favour of @autoinject.
        // Angular services that will be assigned to the class prototype.
        inject?: string[];

        // DEPRECATED in favour of @autoinject.
        // Angular services that will be assigned to the class as static properties.
        injectStatic?: string[];
    }

    interface DirectiveConfig extends BaseConfig, ng.IDirective {
        // The name of the custom element or attribute. Used to derive module name,
        // directive name, and template url.
        selector: string;
    }

    interface ServiceConfig extends BaseConfig {
        // The name of the service in the angular module system. Mandatory
        // due to minification woes.
        serviceName: string;
    }

    interface ControllerConfig extends BaseConfig {
        // Mandatory controller name.
        controllerName: string;
        // Optional service name. If included, the controller is published to
        // angular's DI as a service under this name.
        serviceName?: string;
    }

    interface InjectConfig {
        deps: string[];
    }

    interface ControllerClass extends Function {
        template?: string|Function;
        templateUrl?: string|Function;
        link?: Function;
        compile?: any;
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
