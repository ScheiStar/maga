'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashApplicationsCtrl
 * @description
 * # AdmindashApplicationsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashApplicationsCtrl', function ($scope, $uibModal, contactAdminFactory, userFactory, $filter) {
    console.log('come on');


    $scope.signOut = function() {
      userFactory.signOut();
    };


    console.log('Checking data');
    // if(contactAdminFactory.getModalData()){
    //   console.log('TRUEDAT');
    //   $scope.modalDataYo = JSON.parse(contactAdminFactory.getModalData());
    // } else {
    //   console.log('NO DATA');
    // }
    $scope.ugh = new Array();
    $scope.applicationData = new Array();
    $scope.modalData = new Array();
    var user = {};

    contactAdminFactory.getApplicants().then(function(data){
      $scope.ugh = data[0];
      $scope.applicants = data[1];
      $scope.test = 'test';
//      $scope.applicants =
      //console.log("ugh", $scope.ugh);
      //console.log("applicants", $scope.applicants);
//        console.log("data",data);
    });

    $scope.animationsEnabled = true;

    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.ugh = orderBy($scope.ugh, predicate);
    };


    $scope.openAppModal = function (size, appID) {
      console.log('opening modal');
      console.log(appID);
      contactAdminFactory.storeAppID(appID);

        for (var i=0; i < $scope.applicants.data.length; i++){
    //            console.log("applicant ID: ", $scope.applicants.data[i].applicantInfo.applicant_id);
            if (contactAdminFactory.getAppID() == $scope.applicants.data[i].applicantInfo.applicant_id)
                contactAdminFactory.storeModalData($scope.applicants.data[i]);
        }
//        console.log("MODAL DATA: ", contactAdminFactory.getModalData());
        $scope.modalDataYo = JSON.parse(contactAdminFactory.getModalData());
//        console.log("modalData: ", $scope.modalDataYo.applicantInfo);
        //console.log("modalData: ", $scope.modalDataYo.applicantInfo.applicant_id);




      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/adminDash/appmodal.html',
        controller: 'AppmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

    $scope.work = function() {
        console.log(JSON.parse(contactAdminFactory.getModalData()));
    }

  });
