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

      console.log('TUTOR INFO');
      //console.log($scope.ugh[0].applicantInfo.user_)
      console.log($scope.ugh);
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
    };


    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.ugh = orderBy($scope.ugh, predicate);
    };

    $scope.signOut = function() {
      userFactory.signOut();
    };

//    $scope.openTutorModal = function (size, appID) {
//      console.log('opening tutor modal');
//      console.log(appID);
//      contactAdminFactory.storeAppID(appID);
//
//        for (var i=0; i < $scope.applicants.data.length; i++){
//    //            console.log("applicant ID: ", $scope.applicants.data[i].applicantInfo.applicant_id);
//            if (contactAdminFactory.getAppID() == $scope.applicants.data[i].applicantInfo.applicant_id)
//                contactAdminFactory.storeModalData($scope.applicants.data[i]);
//        }
////        console.log("MODAL DATA: ", contactAdminFactory.getModalData());
//        $scope.modalDataYo = JSON.parse(contactAdminFactory.getModalData());
////        console.log("modalData: ", $scope.modalDataYo.applicantInfo);
//        //console.log("modalData: ", $scope.modalDataYo.applicantInfo.applicant_id);
//
//
//
//
//      var modalInstance = $uibModal.open({
//        animation: $scope.animationsEnabled,
//        templateUrl: 'views/adminDash/appmodal.html',
//        controller: 'AppmodalCtrl',
//        size: size,
//        resolve: {
//          items: function () {
//            return $scope.items;
//          }
//        }
//      });
//    };











});
