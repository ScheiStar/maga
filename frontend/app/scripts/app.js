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
      .state('/terminateTutorModal', {
        templateUrl: 'views/adminDash/terminatetutormodal.html',
        controller: 'TerminatetutormodalCtrl',
        controllerAs: 'terminateTutorModal'
      })
      .state('/tutorQuitModal', {
        templateUrl: 'views/userDash/tutorquitmodal.html',
        controller: 'TutorquitmodalCtrl',
        controllerAs: 'tutorQuitModal'
      })
      .state('/dropClassModal', {
        templateUrl: 'views/adminDash/dropclassmodal.html',
        controller: 'DropclassmodalCtrl',
        controllerAs: 'dropClassModal'
      })
      .state('/tutorModal', {
        templateUrl: 'views/adminDash/tutormodal.html',
        controller: 'TutormodalCtrl',
        controllerAs: 'tutorModal'
      })
      .state('state1', {
        url: '/main',
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
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      // route to show our basic form (/form)
      .state('form', {
          url: '/form',
          templateUrl: 'views/applicationForm/form.html',
          controller: 'formController',
          abstract: true
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
        templateUrl: 'views/userDash/userdash-home.html',
        controller: 'UserdashCtrl',
        controllerAs: 'userDash'
      })
      .state('userDashClass', {
        url: '/userDashClass',
        templateUrl: 'views/userDash/userdash-temp.html',
        controller: 'UserdashCtrl',
        controllerAs: 'userDash'
      })
      .state('helpDash', {
        url: '/helpDash',
        templateUrl: 'views/helpdash.html',
        controller: 'HelpdashCtrl',
        controllerAs: 'helpDash'
      })
      .state('adminDash', {
        templateUrl: 'views/adminDash/admindash.html',
        controller: 'AdmindashCtrl',
        controllerAs: 'adminDash'
      })

      .state('admindash-tutors', {
        templateUrl: 'views/adminDash/admindash-tutors.html',
        controller: 'AdmindashTutorsCtrl',
        controllerAs: 'admindashTutors'
      })
      .state('adminDash-requests', {
        templateUrl: 'views/adminDash/admindash-requests.html',
        controller: 'AdmindashRequestsCtrl',
        controllerAs: 'adminDashRequests'
      })
      .state('/appModal', {
        templateUrl: 'views/adminDash/appmodal.html',
        controller: 'AppmodalCtrl',
        controllerAs: 'appModal'
      })
      .state('admindash-applications', {
        templateUrl: 'views/adminDash/admindash-applications.html',
        controller: 'AdmindashApplicationsCtrl',
        controllerAs: 'admindashApplications'
      })
      .state('contactAdmin', {
            templateUrl: 'views/userDash/contactadmin.html',
            controller: 'ContactadminCtrl',
            controllerAs: 'contactAdmin'
      })
      .state('tutorQuit', {
      templateUrl: 'views/userDash/tutorquit.html',
      controller: 'TutorquitCtrl',
      controllerAs: 'tutorQuit'
      })
      .state('testTablw', {
        templateUrl: 'views/testtablw.html',
        controller: 'TesttablwCtrl',
        controllerAs: 'testTablw'
      })
      .state('addClassModal', {
        templateUrl: 'views/userDash/addclassmodal.html',
        controller: 'AddclassmodalCtrl',
        controllerAs: 'addClassModal'
      })
      .state('TEST', {
        templateUrl: 'views/testtwo.html'
      })
    });
