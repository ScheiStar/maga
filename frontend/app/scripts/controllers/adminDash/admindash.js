'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashCtrl
 * @description
 * # AdmindashCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashCtrl', function ($scope, $uibModal, contactAdminFactory, userFactory) {


    //console.log(userFactory.parseToken(userFactory.getToken()).userID);
    $scope.animationsEnabled = true;

    $scope.signOut = function() {
      userFactory.signOut();
    };

    $scope.openAppModal = function (size) {
      console.log('click');
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/admindash-applications.html',
        controller: 'AdmindashApplicationsCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

    $scope.openTutorsModal = function (size) {
      console.log('click');
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/admindash-tutors.html',
        controller: 'AdmindashTutorsCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  });
