import * as chai from 'chai';
const should = chai.should();

/**
 * @author john
 * @version 10/17/15 11:10 PM
 */


//noinspection TypeScriptCheckImport
import {State} from '../lib/state';
//noinspection TypeScriptCheckImport
import {View} from '../lib/directives';


describe('@State', () => {

    it('tests state url from view decorator', () => {

        @State('cool', {
            url: '/cool-state'
        })
        @View({
            templateUrl: 'cooler.tpl.html'
        })
        class CoolTestClass {

        }

    });

});


