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

    $scope.ugh = new Array();
    $scope.real = new Array();

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

      $scope.getColor = function(freq) {
        if (freq <= 5) return 'likeNone';
        else if (freq > 5 && freq <= 7) return 'kindaSome';
        else if (freq > 7 && freq <= 8) return 'goodAmount';
        else if (freq > 8 && freq <= 9) return 'woahAmount';
        else if (freq > 9) return 'wowThatsAlot';
        else return;
      }

      $scope.changeCal = function(type) {
        console.log('changing cal');
        console.log(type);
        $scope.ugh = heatMapCals[type].data;
        console.log($scope.ugh);
        $scope.currentTitle = type;
        var start = 2;
        var end = 3;
        for (var x = 0; x<$scope.ugh.length; x++) {
          console.log('ASDAS');
          $scope.ugh[x].time = start + ':00 - ' + end + ':00';
          start++;
          end++;
        }
      }

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

      heatMapCals['ALL'] = {"data":
      [{"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 },
      {"Sun": 0, "Mon": 0 ,"Tues": 0 ,"Wed": 0 ,"Thurs": 0 ,"Fri": 0 }]};

      for (var i = 0; i<$scope.testData.length; i++) {
        for (var j = 0; j<$scope.testData[i].courseDictArray.length; j++) {
          if(tutorClasses.indexOf($scope.testData[i].courseDictArray[j].class_type) == -1)
            tutorClasses.push($scope.testData[i].courseDictArray[j].class_type);
        }

        for (var j = 0; j<$scope.testData[i].calArray.length; j++) {
          for(var k = 0; k<tutorClasses.length; k++) {
            if($scope.testData[i].calArray[j].Mon == true) {
              heatMapCals['ALL'].data[j].Mon++;
              heatMapCals[tutorClasses[k]].data[j].Mon++;
            }
            else if ($scope.testData[i].calArray[j].Tues == true) {
              heatMapCals['ALL'].data[j].Tues++;
              heatMapCals[tutorClasses[k]].data[j].Tues++;
            }
            else if ($scope.testData[i].calArray[j].Wed == true) {
              heatMapCals['ALL'].data[j].Wed++;
              heatMapCals[tutorClasses[k]].data[j].Wed++;
            }
            else if ($scope.testData[i].calArray[j].Thurs == true) {
              heatMapCals['ALL'].data[j].Thurs++;
              heatMapCals[tutorClasses[k]].data[j].Thurs++;
            }
            else {
              heatMapCals['ALL'].data[j].Fri++;
              heatMapCals[tutorClasses[k]].data[j].Fri++;
            }
          }
        }
        tutorClasses = [];
      }

      //LOGIC TO BE USED FOR THE HEAT MAP GRAPHS

      console.log('HEAT');
      console.log(heatMapCals);
      console.log($scope.testData[0].calArray[0].Fri);
      $scope.ugh = heatMapCals['ALL'].data;
      $scope.currentTitle = 'ALL';

      var start = 2;
      var end = 3;
      for (var x = 0; x<$scope.ugh.length; x++) {
        console.log('ASDAS');
        $scope.ugh[x].time = start + ':00 - ' + end + ':00';
        start++;
        end++;
      }
    });
  });
