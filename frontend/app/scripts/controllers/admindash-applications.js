'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashApplicationsCtrl
 * @description
 * # AdmindashApplicationsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashApplicationsCtrl', function ($scope, contactAdminFactory) {
    console.log('come on');
    $scope.ugh = new Array();
    var user = {};
    // console.log('before');
    //$scope.ugh = contactAdminFactory.getApplicants();
    // console.log('after');
    // console.log(ugh);


    user.lastName = 'Miller';
    user.appID = '123';
    user.firstName = 'Jayce';
    user.major = 'Math';
    user.appStatus = 0;
    $scope.ugh.push(user);

    user = {};

    user.lastName = 'Lee';
    user.appID = '69';
    user.firstName = 'Matthew';
    user.major = 'CSE';
    user.appStatus = 1;
    $scope.ugh.push(user);

    console.log($scope.ugh);

  });
