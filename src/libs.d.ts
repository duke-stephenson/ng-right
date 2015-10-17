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
