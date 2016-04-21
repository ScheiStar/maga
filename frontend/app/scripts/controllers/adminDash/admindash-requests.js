'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashRequestsCtrl
 * @description
 * # AdmindashRequestsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashRequestsCtrl', function ($scope, userFactory, $filter, contactAdminFactory) {


    $scope.tutorRequests = new Array();
    var user = {};
    console.log('before');
    contactAdminFactory.getTutorRequests().then(function(data){
      console.log('im back');
      console.log(data.data[0].tr_classnum);
      $scope.tutorRequests = data.data;
    });

    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.ugh = orderBy($scope.ugh, predicate);
    };

    $scope.signOut = function() {
      userFactory.signOut();
    };
  });
