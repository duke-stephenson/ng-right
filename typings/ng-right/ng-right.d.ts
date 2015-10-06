// Type definitions for ng-right v0.0.3
// Project: https://github.com/j-walker23/ng-right.git
// Definitions by: John Walker <https://github.com/j-walker23>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module 'ng-right' {

    var Bootstrap: typeof ngRight.Bootstrap;
    var Inject: typeof ngRight.Inject;
    var State: typeof ngRight.State;
    var Pipe: typeof ngRight.Pipe;

    var Attribute: typeof ngRight.Attribute;
    var Component: typeof ngRight.Component;
    var View: typeof ngRight.View;

    var Ambient: typeof ngRight.Ambient;
    var Service: typeof ngRight.Service;
    var Controller: typeof ngRight.Controller;
    var Factory: typeof ngRight.Factory;

    var autoinject: typeof ngRight.autoinject;
    var bindTwoWay: typeof ngRight.bindTwoWay;
    var bindOneWay: typeof ngRight.bindOneWay;
    var bindString: typeof ngRight.bindString;
    var bindExpression: typeof ngRight.bindExpression;

    let options: {
        module: angular.IModule;
        makeTemplateUrl: (name: string) => string;
        controllerAs: string;
    };
    const app = options.module;
}

declare module ngRight {

    function Bootstrap(config: OptionsConfig): ClassDecorator;

    function Inject(...deps: string[]): ClassDecorator;

    function State(config: StateConfig): ClassDecorator;

    function Pipe(config: ServiceConfig): ClassDecorator;

    function Attribute(config: DirectiveConfig): ClassDecorator;

    function Component(config: DirectiveConfig): ClassDecorator;

    function View(config: ViewConfig): ClassDecorator;

    function Ambient(config: BaseConfig): ClassDecorator;
    function Ambient(target: Function): void;

    function Service(config: ServiceConfig|string): ClassDecorator;

    function Controller(config: ServiceConfig|string): ClassDecorator;

    function Factory(config: ServiceConfig|string): ClassDecorator;

    // Property decorators.
    function autoinject(target: any, key: string): void;

    function bindTwoWay(options: BindTwoWayOptions): PropertyDecorator;
    function bindTwoWay(target: any, key: string): void;

    function bindOneWay(key: string): PropertyDecorator;
    function bindOneWay(target: any, key: string): void;

    function bindString(key: string): PropertyDecorator;
    function bindString(target: any, key: string): void;

    function bindExpression(key: string): PropertyDecorator;
    function bindExpression(target: any, key: string): void;


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
