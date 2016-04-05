'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ContactadminCtrl
 * @description
 * # ContactadminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ContactadminCtrl', function ($scope, $http, $state) {
    // this.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    console.log('in contact admin dash');

    $scope.submitMessage = function(user) {
      var user_data = {
        'email': user.email,
        'message': user.message
      };

      if(user.email == undefined) alert('Please enter valid email.');
      else {
        user = '';
        alert('thank you for submitting!');
        $state.go("userDash");
        //     $http({
        //       method: 'GET',
        //       url: 'http://162.243.187.169/sendEmails.py',
        //       data: 'user_data'
        //     }).then(function(data){
        //       console.log("Email Sent!");
        //         return data;
        //     }, function errorCallback(response) {
        //       console.log("Email not sent!");
        // });
      }

      //TODO: Log values in database and do something with them

      //TODO: Get request for python script
    }
  });
