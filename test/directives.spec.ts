import * as chai from 'chai';
const should = chai.should();

//noinspection TypeScriptCheckImport
import {View, Component} from '../lib/directives';

/**
 * @author john
 * @version 10/15/15 12:41 PM
 */


describe('directives', () => {

    it('adds propertyName onto target prototype', () => {


        @Component({
            selector: 'eat-ass'
        })
        @View({
            templateUrl: 'fuckyou.tpl.html'
        })
        class TestClass {
        }

    });

});

