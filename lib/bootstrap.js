/**
 * @author john
 * @version 9/21/15 1:31 AM
 */
var utils = require('./utils');
var isSet = false;
function Bootstrap(options) {
    return function (constructor) {
        angular.extend(utils.options, options);
        if (isSet)
            return;
        angular.element(document).ready(onReady);
        function onReady() {
            var el = document.body;
            // Find the component's element
            angular.bootstrap(el, [options.module.name], options.ng);
            isSet = true;
        }
    };
}
exports.Bootstrap = Bootstrap;
