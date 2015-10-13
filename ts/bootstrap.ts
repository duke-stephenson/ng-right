/**
 * @author john
 * @version 9/21/15 1:31 AM
 */


import * as utils from './utils';

let isSet = false;


export function Bootstrap(options: ngRight.OptionsConfig): ClassDecorator {
    return function(constructor: Function) {

        angular.extend(utils.options, options);

        if (isSet)
            return;

        angular.element(document).ready(onReady);

        function onReady() {

            var el: any = document.body;
            // Find the component's element

            angular.bootstrap(el, [options.module.name], options.ng);
            isSet = true;
        }

    };
}

