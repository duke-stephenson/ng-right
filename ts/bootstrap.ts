/**
 * @author john
 * @version 9/21/15 1:31 AM
 */

///ts:ref=refs
/// No file or directory matched name "refs" ///ts:ref:generated

import {setOptions} from './utils';

let isSet = false;

function bootstrap(options: ngRight.OptionsConfig) {

    return function(target: ngRight.StateClass) {

        setOptions(options);

        // Mark this class as a bootstrap component. This allows @State
        // to handle it correctly.
        target.bootstrap = true;

        if (isSet)
            return;

        angular.element(document).ready(onReady);

        function onReady() {

            var el: any = document.body;
            // Find the component's element
            if (target.selector) {
                el = document.querySelector(target.selector);
            }

            angular.bootstrap(el, [options.module.name], options.ng);
            isSet = true;
        }

    };
}


export function Bootstrap(options: ngRight.OptionsConfig) {
    return bootstrap(options);
}

