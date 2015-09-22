


declare module 'ng-right' {
    var Attribute: typeof ngRight.Attribute;
    var Ambient: typeof ngRight.Ambient;
    var Component: typeof ngRight.Component;
    var Service: typeof ngRight.Service;
    var Controller: typeof ngRight.Controller;
    var autoinject: typeof ngRight.autoinject;
    var bindTwoWay: typeof ngRight.bindTwoWay;
    var bindOneWay: typeof ngRight.bindOneWay;
    var bindString: typeof ngRight.bindString;
    var bindExpression: typeof ngRight.bindExpression;
}

declare module ngRight {

    // Class decorators.
    function Attribute(config: DirectiveConfig): ClassDecorator;
    function Ambient(config: BaseConfig): ClassDecorator;
    function Ambient(target: Function): void;
    function Component(config: DirectiveConfig): ClassDecorator;
    function Service(config: ServiceConfig): ClassDecorator;
    function Controller(config: ControllerConfig): ClassDecorator;

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

    interface BindTwoWayOptions {
        // Adds `*` to the property descriptor, marking it for `$watchCollection`.
        collection?: boolean;
        // Adds `?` to the property descriptor, marking it optional.
        optional?: boolean;
        // Adds an external property name to the binding.
        key?: string;
    }

}
