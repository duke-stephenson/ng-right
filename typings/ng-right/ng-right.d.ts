// Type definitions for ng-right v0.0.3
// Project: https://github.com/j-walker23/ng-right.git
// Definitions by: John Walker <https://github.com/j-walker23>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module 'ng-right' {
    var Attribute: typeof ngRight.Attribute;
    var Ambient: typeof ngRight.Ambient;
    var Bootstrap: typeof ngRight.Bootstrap;
    var Component: typeof ngRight.Component;
    var Controller: typeof ngRight.Controller;
    var Inject: typeof ngRight.Inject;
    var Service: typeof ngRight.Service;
    var State: typeof ngRight.State;
    var View: typeof ngRight.View;

    var autoinject: typeof ngRight.autoinject;
    var bindTwoWay: typeof ngRight.bindTwoWay;
    var bindOneWay: typeof ngRight.bindOneWay;
    var bindString: typeof ngRight.bindString;
    var bindExpression: typeof ngRight.bindExpression;

    function setModule(module: angular.IModule): void;

    let options: {
        module: angular.IModule;
        makeTemplateUrl: (name: string) => string;
    };
}

declare module ngRight {

    // Class decorators.
    function Attribute(config: DirectiveConfig): ClassDecorator;
    function Ambient(config: BaseConfig): ClassDecorator;
    function Ambient(target: Function): void;
    function Bootstrap(config: OptionsConfig): ClassDecorator;
    function Component(config: DirectiveConfig): ClassDecorator;
    function Controller(config: ControllerConfig): ClassDecorator;
    function Inject(...deps: string[]): ClassDecorator;
    function Service(config: ServiceConfig): ClassDecorator;
    function State(config: StateConfig): ClassDecorator;
    function View(config: ViewConfig): ClassDecorator;

    // Property decorators.
    function autoinject(target: any, key: string);
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
        transclude?: boolean;
    }

    interface StateConfig extends angular.ui.IState {
        defaultRoute?: boolean|string;
        html5Mode?: boolean;
    }

    interface StateClass extends ControllerClass {
        selector?: string;
        resolve?: {};
        bootstrap?: any;
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
