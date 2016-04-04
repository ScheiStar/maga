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

    $scope.signIn = function(user) {
      var user_data = {
        'userID': user.userID,
        'password': user.password
      };

      userFactory.signIn(user_data).then(function (response) {
        if(angular.isUndefined(response)) {
          console.log('asd');
          return;
        }
        if(response.data == "Success") {
          console.log("Also Success!");
          //save token
          //get token
          //alert("Log In Successful");
          console.log("user");
          console.log(user);
          //$state.go("userDash");
          return;
          }
      });
    },

    $scope.recoverPass = function(password) {
      console.log('Will recover password now.');
      //get request and email for recovering password
    }

    $scope.apply = function() {
      $state.go("applicationForm");
    }
  });
