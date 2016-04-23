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

  });
