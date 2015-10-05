/**
 * @author john
 * @version 9/21/15 4:33 PM
 */


/// <reference path="./typings/ng-right/ng-right.d.ts" />
/// <reference path="./typings/angularjs/angular.d.ts" />



import {Attribute, Ambient, Bootstrap, Controller} from 'ng-right';
import {Inject, Component, Service, State, View} from 'ng-right';
import {bindTwoWay, bindOneWay, bindString, bindExpression} from 'ng-right';


let app = angular.module('app', ['ng']);



@Controller('App')
@Bootstrap({
    module: app
})
class WebApp {
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

@Service('name')
class ServiceTest {

}

@Controller('name')
class CtrlName {

}

@Ambient
class Amb {

}

new AttrTest();
new ServiceTest();
new CtrlName();
new Amb();
