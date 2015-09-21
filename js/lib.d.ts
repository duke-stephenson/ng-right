export default lib;
declare namespace lib {
    interface OptionsConfig {
        module: ng.IModule;
        makeTemplateUrl?: (selector: string) => string;
        ng?: angular.IAngularBootstrapConfig;
    }
    interface BaseConfig {
    }
    interface DirectiveConfig extends BaseConfig, ng.IDirective {
        selector: string;
    }
    interface ServiceConfig extends BaseConfig {
        serviceName: string;
    }
    interface ControllerConfig extends BaseConfig {
        controllerName: string;
        serviceName?: string;
    }
    interface InjectConfig {
        deps: string[];
    }
    interface ControllerClass extends Function {
        template?: string | Function;
        templateUrl?: string | Function;
        link?: Function;
        compile?: any;
    }
    interface StateConfig extends angular.ui.IState {
        defaultRoute?: boolean | string;
        html5Mode?: boolean;
    }
    interface StateClass extends ControllerClass {
        selector?: string;
        resolve?: {};
        bootstrap?: any;
    }
    interface BindTwoWayOptions {
        collection?: boolean;
        optional?: boolean;
        key?: string;
    }
}
