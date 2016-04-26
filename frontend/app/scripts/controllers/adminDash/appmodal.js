'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AppmodalCtrl
 * @description
 * # AppmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AppmodalCtrl', function (contactAdminFactory, userFactory, $scope, $state, $uibModalInstance) {

    console.log(contactAdminFactory.getAppID());

    console.log('In addModal');

    console.log(JSON.parse(contactAdminFactory.getModalData()));

    $scope.tits = JSON.parse(contactAdminFactory.getModalData());

    $scope.ugh = new Array();
    $scope.real = new Array();
    var shitData = $scope.tits.calArray;

    $scope.ugh = shitData;

    //this prints the calendar time slots on the table
    var start = 2;
    var end = 3;
    for (var x = 0; x<$scope.ugh.length; x++) {
      $scope.ugh[x].time = start + ':00 - ' + end + ':00';
      start++;
      end++;
    }
    console.log('ugh');
    console.log($scope.ugh);


    $scope.denyApplicant = function(tutorID) {
      contactAdminFactory.deny(tutorID);
      console.log('make sure its here');
      console.log(tutorID);
      $uibModalInstance.close();
    }

    $scope.approveApplicant = function(tutorID) {
      contactAdminFactory.approveApplicant(tutorID).then(function(data) {
        console.log('make sure its here');
        console.log(tutorID);
        userFactory.getThisTutor(tutorID).then(function(data){
          console.log('SENDING EMAIL');
          var email = data.data.tutorInfo.tutor_email;
          console.log(data.data);
          var user_data = {
            'email': email,
            'message': '',
            'type': "appAcceptance"
          };

          contactAdminFactory.emailAdmin(user_data);
        });

      });
      $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

  });
