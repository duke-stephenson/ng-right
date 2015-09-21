/**
 * @author john
 * @version 9/21/15 1:31 AM
 */

import {setOptions} from './utils';


function bootstrap(options: lib.OptionsConfig) {

    return function(target: lib.StateClass) {

        setOptions(options);

        // Mark this class as a bootstrap component. This allows @State
        // to handle it correctly.
        target.bootstrap = true;

        angular.element(document).ready(onReady);

        function onReady() {

            var el: any = document.body;
            // Find the component's element
            if (target.selector) {
                el = document.querySelector(target.selector);
            }

            angular.bootstrap(el, [options.module.name], options.ng);
        }

    };
}


export function Bootstrap(options: lib.OptionsConfig) {
    return bootstrap(options);
}

