
export default lib;

namespace lib {

    export interface OptionsConfig {
        module: ng.IModule;
        makeTemplateUrl?: (selector: string) => string;
        ng?: angular.IAngularBootstrapConfig;
    }

    // Abstract interface shared by configuration objects.
    export interface BaseConfig {


    }

    export interface DirectiveConfig extends BaseConfig, ng.IDirective {
        // The name of the custom element or attribute. Used to derive module name,
        // directive name, and template url.
        selector: string;
    }

    export interface ServiceConfig extends BaseConfig {
        // The name of the service in the angular module system. Mandatory
        // due to minification woes.
        serviceName: string;
    }

    export interface ControllerConfig extends BaseConfig {
        // Mandatory controller name.
        controllerName: string;
        // Optional service name. If included, the controller is published to
        // angular's DI as a service under this name.
        serviceName?: string;
    }

    export interface InjectConfig {
        deps: string[];
    }

    export interface ControllerClass extends Function {
        template?: string|Function;
        templateUrl?: string|Function;
        link?: Function;
        compile?: any;
    }

    export interface StateConfig extends angular.ui.IState {
        defaultRoute?: boolean|string;
        html5Mode?: boolean;
    }

    export interface StateClass extends ControllerClass {
        selector?: string;
        resolve?: {};
        bootstrap?: any;
    }

    export interface BindTwoWayOptions {
        // Adds `*` to the property descriptor, marking it for `$watchCollection`.
        collection?: boolean;
        // Adds `?` to the property descriptor, marking it optional.
        optional?: boolean;
        // Adds an external property name to the binding.
        key?: string;
    }

}
