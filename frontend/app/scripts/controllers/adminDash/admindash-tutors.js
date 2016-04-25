'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashTutorsCtrl
 * @description
 * # AdmindashTutorsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashTutorsCtrl', function ($scope, contactAdminFactory, userFactory, $filter, $uibModal) {
    console.log('come on');

    $scope.ugh = new Array();
    var user = {};
    console.log('before');
    contactAdminFactory.getTutors().then(function(data){
      $scope.ugh = data.data;
    });


    $scope.openTutorModal = function (size, tutorID) {
      console.log('opening tutor modal');
      console.log(tutorID);
       contactAdminFactory.storeTutorID(tutorID);

        for (var i=0; i < $scope.ugh.length; i++){
            if (contactAdminFactory.getTutorID() == $scope.ugh[i].applicantInfo.tutor_id)
                contactAdminFactory.storeTutorData($scope.ugh[i]);
        }
        $scope.testMe = JSON.parse(contactAdminFactory.getTutorData());

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/adminDash/tutormodal.html',
        controller: 'TutormodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
          //functionality goes here I think
//        alert('Modal success at:' + new Date());
          console.log("UIBModalInstance Success");
      }, function () {
          console.log("UIBModalInstance Dismiss");
          //funcitonality goes here I think
//        alert('Modal dismissed at: ' + new Date());
      });
    };


    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.ugh = orderBy($scope.ugh, predicate);
    };

    $scope.signOut = function() {
      userFactory.signOut();
    };










});
