'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserdashCtrl
 * @description
 * # UserdashCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UserdashCtrl', function (userFactory) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log("in userDash now");

    var userID = (userFactory.parseToken(userFactory.getToken()));
    console.log(userID);
  });
