var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var chai = require('chai');
var should = chai.should();
//noinspection TypeScriptCheckImport
var directives_1 = require('../lib/directives');
/**
 * @author john
 * @version 10/15/15 12:41 PM
 */
describe('directives', function () {
    it('adds propertyName onto target prototype', function () {
        var TestClass = (function () {
            function TestClass() {
            }
            TestClass = __decorate([
                directives_1.Component({
                    selector: 'eat-ass'
                }),
                directives_1.View({
                    templateUrl: 'fuckyou.tpl.html'
                }), 
                __metadata('design:paramtypes', [])
            ], TestClass);
            return TestClass;
        })();
    });
});
