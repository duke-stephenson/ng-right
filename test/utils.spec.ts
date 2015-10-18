import * as chai from 'chai';
const should = chai.should();

//noinspection TypeScriptCheckImport
import {camelCase, autoinjectKey, autoinject} from '../lib/utils';

describe('utils', () => {

    it.only('adds propertyName onto target prototype', () => {

        class UtilsClass {
            @autoinject value: string;
        }

        let key = autoinjectKey;

        let injectedVars = UtilsClass.prototype[key];
        injectedVars.should.have.length(1);
        injectedVars[0].should.equal('value');

        console.log('NAMMME', camelCase('UtilsClass'));

    });

});
