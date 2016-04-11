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
    console.log(userFactory.parseToken(userFactory.getToken()).userID);
    $scope.user = {};
    $scope.user.userID = userFactory.parseToken(userFactory.getToken()).userID;

    // angular.element(document).ready(function () {
    //     document.getElementById('inputEmail').value = 'Hello';
    // });

    if(userFactory.loginInit()) {
      //TODO: Autopopulate userID textbox with parsed token value
      console.log(String(userFactory.loginInit()));
      //$scope.user.userID = String(userFactory.loginInit());
    }


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
