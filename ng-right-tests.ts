/**
 * @author john
 * @version 9/21/15 4:33 PM
 */


/// <reference path="./typings/tsd.d.ts" />


import {Attribute, Ambient, Bootstrap, Controller} from 'ng-right';
import {Inject, Component, Service, State, View} from 'ng-right';
import {bindTwoWay, bindOneWay, bindString, bindExpression} from 'ng-right';


let app = angular.module('app', ['ng']);



@Component({
    selector: 'web-app'
})
@View({
    template: '<content></content>'
})
@Bootstrap({
    module: app
})
class WebApp {

    constructor() {
        console.log('this', this);
    }
}

var a = new WebApp();

@State({
    name: 'name',
    templateUrl: 'a.tpl.html'
})
@Inject('One', 'Two')
class StateTest {

    @bindTwoWay two: {};
    @bindOneWay one: string;
    @bindString str: string;
    @bindExpression exp: Function;
}

var state = new StateTest();


@Attribute({
    selector: 'attr'
})
class AttrTest {

}

@Service({
    serviceName: 'name'
})
class ServiceTest {

}

@Controller({
    controllerName: 'name'
})
class CtrlName {

}

@Ambient({

})
class Amb {

}

new AttrTest();
new ServiceTest();
new CtrlName();
new Amb();
