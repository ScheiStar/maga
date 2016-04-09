'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TutorquitCtrl
 * @description
 * # TutorquitCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TutorquitCtrl', function ($scope, $state, userFactory, contactAdminFactory) {

    $scope.quitJob = function(user) {
      if(user){
        var user_data = {
          'userID': userFactory.parseToken(userFactory.getToken()).userID,
          'message': user.message
        };

        if(contactAdminFactory.emailAdmin(user_data)) {
          alert('Thank you for submitting. You will hear from us soon regarding your desired termination.')
          $state.go("userDash");
        } else {
          alert('Oops looks like we had trouble handling that. Please try again.')
        }
      }
      else alert('Please enter an actual message.');

      //TODO: Log values in database and do something with them

      //TODO: Get request for python script
    }
  });
