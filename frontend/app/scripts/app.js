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
    'ui.bootstrap',
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
//      .state('applicationForm', {
//        url: '/applicationForm',
//        templateUrl: 'views/applicationForm/form.html',
//        controller: 'formController',
//        controllerAs: 'applicationForm'
//      })
      // route to show our basic form (/form)
      .state('form', {
          url: '/form',
          templateUrl: 'views/applicationForm/form.html',
          controller: 'formController'
      })
      // nested states
      // each of these sections will have their own view
      // url will be nested (/form/profile)
      .state('form.profile', {
          url: '/profile',
          templateUrl: 'views/applicationForm/form-profile.html'
      })
      // url will be /form/interests
      .state('form.interests', {
          url: '/interests',
          templateUrl: 'views/applicationForm/form-interests.html'
      })
      // url will be /form/payment
      .state('form.payment', {
          url: '/payment',
          templateUrl: 'views/applicationForm/form-payment.html'
      })

      .state('userDash', {
        url: '/userDash',
        templateUrl: 'views/userDash/userdash-classes.html',
        controller: 'UserdashCtrl',
        controllerAs: 'userDash'
      })
      // .state('userDash.classes', {
      //   url: '/userDashClass',
      //   templateUrl: 'views/userDash/userdash-classes.html',
      //   controller: 'UserdashCtrl',
      //   controllerAs: 'userDash'
      // })
      .state('adminDash', {
        url: '/adminDash',
        templateUrl: 'views/admindash.html',
        controller: 'AdmindashCtrl',
        controllerAs: 'adminDash'
      })
      .state('helpDash', {
        url: '/helpDash',
        templateUrl: 'views/helpdash.html',
        controller: 'HelpdashCtrl',
        controllerAs: 'helpDash'
      })
    });