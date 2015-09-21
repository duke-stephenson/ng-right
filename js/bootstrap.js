/**
 * @author john
 * @version 9/21/15 1:31 AM
 */
var utils_1 = require('./utils');
function bootstrap(options) {
    return function (target) {
        utils_1.setOptions(options);
        target.bootstrap = true;
        angular.element(document).ready(onReady);
        function onReady() {
            var el = document.body;
            if (target.selector) {
                el = document.querySelector(target.selector);
            }
            angular.bootstrap(el, [options.module.name], options.ng);
        }
    };
}
function Bootstrap(options) {
    return bootstrap(options);
}
exports.Bootstrap = Bootstrap;
