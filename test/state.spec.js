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
/**
 * @author john
 * @version 10/17/15 11:10 PM
 */
//noinspection TypeScriptCheckImport
var state_1 = require('../lib/state');
//noinspection TypeScriptCheckImport
var directives_1 = require('../lib/directives');
describe('@State', function () {
    it('tests state url from view decorator', function () {
        var CoolTestClass = (function () {
            function CoolTestClass() {
            }
            CoolTestClass = __decorate([
                state_1.State('cool', {
                    url: '/cool-state'
                }),
                directives_1.View({
                    templateUrl: 'cooler.tpl.html'
                }), 
                __metadata('design:paramtypes', [])
            ], CoolTestClass);
            return CoolTestClass;
        })();
    });
});
