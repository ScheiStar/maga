'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TesttablwCtrl
 * @description
 * # TesttablwCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TesttablwCtrl', function ($scope, contactAdminFactory) {
    $scope.ugh = new Array();
    $scope.real = new Array();



    // var shitData = {"data":
    // [{"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    // {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    // {"Sun": false, "Mon": true ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    // {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": true ,"Fri": false },
    // {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    // {"Sun": false, "Mon": false ,"Tues": false ,"Wed": true ,"Thurs": false ,"Fri": false },
    // {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    // {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false }]};



    // var shitData = {"data":
    // [{"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
    // {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 }]};
    //
    // $scope.ugh = shitData.data;

    var useMe = {};
    contactAdminFactory.getTutors().then(function(data){
      $scope.testData = data.data;
      console.log('LOOK AT TEST DATA');
      //useMe = data[1].data;
      console.log($scope.testData);
      console.log('THURSDAY');

      //LOGIC TO BE USED FOR THE HEAT MAP GRAPHS
      var heatMapCals = [];
      var tutorClasses = [];

      for (var i = 0; i<$scope.testData.length; i++) {
        for (var j = 0; j<$scope.testData[i].courseDictArray.length; j++) {
          if (heatMapCals.indexOf($scope.testData[i].courseDictArray[j].class_type) == -1) {
            heatMapCals[$scope.testData[i].courseDictArray[j].class_type] = {"data":
            [{"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
            {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 }]};
          }
        }
      }

      for (var i = 0; i<$scope.testData.length; i++) {
        for (var j = 0; j<$scope.testData[i].courseDictArray.length; j++) {
          if(tutorClasses.indexOf($scope.testData[i].courseDictArray[j].class_type) == -1)
            tutorClasses.push($scope.testData[i].courseDictArray[j].class_type);
        }

        for (var j = 0; j<$scope.testData[i].calArray.length; j++) {
          for(var k = 0; k<tutorClasses.length; k++) {
            if($scope.testData[i].calArray[j].Mon == true)
              heatMapCals[tutorClasses[k]].data[j].Mon++;
            else if ($scope.testData[i].calArray[j].Tues == true)
              heatMapCals[tutorClasses[k]].data[j].Tues++;
            else if ($scope.testData[i].calArray[j].Wed == true)
              heatMapCals[tutorClasses[k]].data[j].Wed++;
            else if ($scope.testData[i].calArray[j].Thurs == true)
              heatMapCals[tutorClasses[k]].data[j].Thurs++;
            else
              heatMapCals[tutorClasses[k]].data[j].Fri++;
          }
        }
        tutorClasses = [];
      }

      //LOGIC TO BE USED FOR THE HEAT MAP GRAPHS

      console.log('HEAT');
      console.log(heatMapCals);
      //console.log(shitData.data);
      console.log($scope.testData[0].calArray[0].Fri);
      $scope.ugh = heatMapCals.ACCT.data;

      var start = 2;
      var end = 3;
      for (var x = 0; x<$scope.ugh.length; x++) {
        console.log('ASDAS');
        $scope.ugh[x].time = start + ':00 - ' + end + ':00';
        start++;
        end++;
      }
    });

    // contactAdminFactory.getTutors().then(function(data){
    //   $scope.otherShit = data.data;
    //
    //   console.log('TUTOR INFO');
    //   console.log($scope.otherShit);
    // });



    console.log('ugh');
    console.log($scope.ugh);
    //$scope.real = $scope.ugh[0];

  });
