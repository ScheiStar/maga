'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TesttablwCtrl
 * @description
 * # TesttablwCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TesttablwCtrl', function ($scope) {
    $scope.ugh = new Array();
    $scope.real = new Array();
    var shitData = {"data":[{"mon":"True","tues":"False"},{"mon":"False","tues":"True"}]}
    $scope.ugh = shitData.data;
    console.log('ugh');
    console.log($scope.ugh);
    //$scope.real = $scope.ugh[0];

  });
