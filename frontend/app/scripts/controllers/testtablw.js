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
    var shitData = {"data":
    [{"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": true ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": true ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": true ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false }]};

    $scope.ugh = shitData.data;
    var start = 2;
    var end = 3;
    for (var x = 0; x<$scope.ugh.length; x++) {
      $scope.ugh[x].time = start + ':00 - ' + end + ':00';
      start++;
      end++;
    }
    console.log('ugh');
    console.log($scope.ugh);
    //$scope.real = $scope.ugh[0];

  });
