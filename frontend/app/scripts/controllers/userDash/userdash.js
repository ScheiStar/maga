'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserdashCtrl
 * @description
 * # UserdashCtrl
 * Controller of the frontendApp
 */

angular.module('frontendApp')
  .controller('UserdashCtrl', function ($state, $scope, $http, contactAdminFactory, userFactory, $window, $uibModal, $log, $filter) {

    console.log("in userDash nol;akdflksdjw");
    console.log('authed?');
    console.log(userFactory.isAuthed());
    //if(!userFactory.isAuthed()) $state.go('login');
    var currentUserID = userFactory.parseToken(userFactory.getToken()).userID;

    userFactory.getThisTutor(currentUserID).then(function(data){
      console.log('initial');
      $scope.ugh = data.data;
      $scope.calInfo = data.data.calArray;
      $scope.courseInfo = data.data.courseDictArray;

      var start = 2;
      var end = 3;
      for (var x = 0; x<$scope.calInfo.length; x++) {
        console.log('ASDAS');
        $scope.calInfo[x].time = start + ':00 - ' + end + ':00';
        start++;
        end++;
      }
    });

    $window.onbeforeunload = function(){
      userFactory.onExit();
    };

    userFactory.getThisTutorRequests(currentUserID).then(function(data){
      $scope.pendingCourses = data.data;
      console.log('oh yeah');
      console.log($scope.pendingCourses);
    });

    $scope.goHome = function() {
      console.log('going home');
      $state.go('userDash.home');
    }

    $scope.submitDrop = function(classInfo) {
      console.log('dropping shit');
      console.log(JSON.parse(userFactory.getClassInfo()));
      var request_data = {
        'userID': currentUserID,
        'className': JSON.parse(userFactory.getClassInfo()).class_type,
        'classNum': JSON.parse(userFactory.getClassInfo()).class_num,
        'grade': JSON.parse(userFactory.getClassInfo()).class_grade,
        'requestType': 'Drop'
      }
      userFactory.tutorRequest(request_data);
    }

    $scope.cancel = function() {
      console.log('asd');
    }



    $scope.signOut = function() {
      userFactory.signOut();
    };

    //Important to allow add class modal to appear on screen
    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/userDash/addclassmodal.html',
        controller: 'AddclassmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

    //Important to allow confirm drop class modal to appear on screen
    $scope.confirmDrop = function(size, classInfo){
      console.log('finna store');
      console.log(classInfo);
      userFactory.storeClassInfo(classInfo);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/userDash/dropclassmodal.html',
        controller: 'DropclassmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

            modalInstance.result.then(function () {
                //functionality goes here I think
                console.log("UIBModalInstance Success");
                $scope.submitDrop(classInfo);
            }, function () {
                console.log("UIBModalInstance Dismiss");
                //funcitonality goes here I think
            });
    }; //end confirmDrop()

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  });
