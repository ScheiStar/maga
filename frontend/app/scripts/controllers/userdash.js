'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserdashCtrl
 * @description
 * # UserdashCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UserdashCtrl', function () {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];

    $scope.example = {
        text: 'guest',
        word: /^\s*\w*\s*$/
      };
  });
