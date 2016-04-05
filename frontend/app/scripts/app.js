'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/applicationForm', {
        templateUrl: 'views/applicationform.html',
        controller: 'ApplicationformCtrl',
        controllerAs: 'applicationForm'
      })
      .when('/userDash', {
        templateUrl: 'views/userdash.html',
        controller: 'UserdashCtrl',
        controllerAs: 'userDash'
      })
      .when('/adminDash', {
        templateUrl: 'views/admindash.html',
        controller: 'AdmindashCtrl',
        controllerAs: 'adminDash'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
