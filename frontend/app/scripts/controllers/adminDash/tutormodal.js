'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AppmodalCtrl
 * @description
 * # AppmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TutormodalCtrl', function (contactAdminFactory, $scope) {

    // console.log(contactAdminFactory.getAppID());
    //
    // console.log('In addModal');
    //
    // console.log(JSON.parse(contactAdminFactory.getModalData()));

    $scope.tits = JSON.parse(contactAdminFactory.getTutorData());
    console.log('LOOK AT ME');
    console.log($scope.tits);
    console.log($scope.tits.applicantInfo);

    $scope.ugh = new Array();
    $scope.real = new Array();
//    var shitData = {"data":
//    [{"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
//    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
//    {"Sun": false, "Mon": true ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
//    {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": true ,"Fri": false },
//    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
//    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": true ,"Thurs": false ,"Fri": false },
//    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
//    {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false }]};

  var shitData = $scope.tits.calArray;

   $scope.ugh = shitData;


    var start = 2;
    var end = 3;
    for (var x = 0; x<$scope.ugh.length; x++) {
      $scope.ugh[x].time = start + ':00 - ' + end + ':00';
      start++;
      end++;
    }

    // console.log('ugh');
    // console.log($scope.ugh);

  });
