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
var utils_1 = require('../lib/utils');
describe('utils', function () {
    it('adds propertyName onto target prototype', function () {
        var UtilsClass = (function () {
            function UtilsClass() {
            }
            __decorate([
                utils_1.autoinject, 
                __metadata('design:type', String)
            ], UtilsClass.prototype, "value");
            return UtilsClass;
        })();
        var key = utils_1.autoinjectKey;
        var injectedVars = UtilsClass.prototype[key];
        injectedVars.should.have.length(1);
        injectedVars[0].should.equal('value');
    });
});
