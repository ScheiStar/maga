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

    $scope.ugh = new Array();
    $scope.applicationData = new Array();
    var user = {};

    contactAdminFactory.getApplicants().then(function(data){

      $scope.ugh = data;
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

  });
