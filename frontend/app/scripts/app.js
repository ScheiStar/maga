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
    'ngTouch',
    'ui.router',
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('state1', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('applicationForm', {
        url: '/applicationForm',
        templateUrl: 'views/applicationform.html',
        controller: 'ApplicationformCtrl',
        controllerAs: 'applicationForm'
      })
      .state('userDash', {
        url: '/userDash',
        templateUrl: 'views/userdash.html',
        controller: 'UserdashCtrl',
        controllerAs: 'userDash'
      })
      .state('adminDash', {
        url: '/adminDash',
        templateUrl: 'views/admindash.html',
        controller: 'AdmindashCtrl',
        controllerAs: 'adminDash'
      })
      .state('contactAdmin', {
        url: '/contactAdmin',
        templateUrl: 'views/contactadmin.html',
        controller: 'ContactadminCtrl',
        controllerAs: 'contactAdmin'
      })
      .state('helpDash', {
        url: '/helpDash',
        templateUrl: 'views/helpdash.html',
        controller: 'HelpdashCtrl',
        controllerAs: 'helpDash'
      })
      .state('tutorQuit', {
        templateUrl: 'views/tutorquit.html',
        controller: 'TutorquitCtrl',
        controllerAs: 'tutorQuit'
      })
  });
