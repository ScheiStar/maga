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

    contactAdminFactory.getApplicants().then(function(data){
      $scope.ugh = data;
    });

  });
