'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $http) {

    console.log('inside controller');


    $scope.signIn = function(user) {
      var user_data = {
        'userID': user.userID,
        'password': user.password
      };
      console.log(user);

      var user_json = JSON.stringify(user_data);

      $http({
        method: 'POST',
        url: 'http://54.86.70.62/login',
        data: user_json
        }).then(function successCallback(response) {
          if(response.data == "Success") {
            $scope.user = '';
            alert("Log In Successful");

          }
          }, function errorCallback(response) {
            console.log(response);
            alert("Log In Unsuccessful");
            $scope.user = '';

          });
        };

  });
