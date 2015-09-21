export declare function bindString(targetOrKey: any | string, keyOrNothing?: string): any;
export declare function bindTwoWay(targetOrOptions: any | lib.BindTwoWayOptions, keyOrNothing?: string): (target: any, propertyName: string) => void;
export declare function bindExpression(targetOrKey: any | string, keyOrNothing?: string): (target: any, propertyName: string) => void;
export declare function bindOneWay(targetOrKey: any | string, keyOrNothing?: string): (target: any, propertyName: string) => void;
