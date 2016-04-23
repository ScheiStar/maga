'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashTutorsCtrl
 * @description
 * # AdmindashTutorsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashTutorsCtrl', function ($scope, contactAdminFactory, userFactory, $filter) {
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
