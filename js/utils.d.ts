import lib from './lib';
export declare const options: {
    module: ng.IModule;
    makeTemplateUrl(elementName: string): string;
};
export declare function getModule(): ng.IModule;
export declare function getCtrlAs(config: lib.DirectiveConfig): string;
export declare function setOptions(opts: lib.OptionsConfig): void;
export declare var autoinjectKey: any;
export declare var scopeKey: any;
export declare function kebabCase(name: string): string;
export declare function camelCase(name: string): string;
export declare function zipObject<T>(one: string[], other: T[]): {
    [key: string]: T;
};
export declare function cloneFunction(func: Function): (...args: any[]) => any;
export declare function randomString(): string;
export declare function autoinject(target: any, propertyName: string): void;
export declare function assert(ok: boolean | number, ...args: string[]): void;
