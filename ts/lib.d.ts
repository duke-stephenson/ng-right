
declare var Symbol: Function;

declare namespace lib {

    interface OptionsConfig {
        module: ng.IModule;
        makeTemplateUrl?: (selector: string) => string;
        ng?: angular.IAngularBootstrapConfig;
    }

    // Abstract interface shared by configuration objects.
    interface BaseConfig {


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
