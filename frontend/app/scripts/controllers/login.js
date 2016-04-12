'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', function ($state, $scope, $http, userFactory, $window) {
    $scope.user = {};
    console.log(userFactory.isAuthed());
    if(userFactory.isAuthed()) $state.go('userDash');


    $scope.signIn = function(user) {
      if ($scope.rememberMe)
        user.auth = true;
      else
        user.auth = false;

      console.log(user.auth);
      var user_data = {
        'userID': user.userID,
        'password': user.password
      };

      console.log(user_data);

      userFactory.signIn(user_data, user.auth);
    },

    $scope.recoverPass = function() {
      console.log('Will recover password now.');
      //get request and email for recovering password
    }
  });
