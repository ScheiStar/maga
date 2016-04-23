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

    console.log('other one');

    //TODO: get request to get all the classes for both tables

    $scope.classes = [{"type":"CSE","number":"1423","grade":"A"},{"type":"HIST","number":"1432","grade":"B"},{"type":"ACCT","number":"1929","grade":"A-"}];
    console.log($scope.classes);


    $scope.pendingClasses = [{"className":"ACCT","classNum":"2716","requestType":"Drop"},{"className":"HIST","classNum":"6969","requestType":"Add"}];

    $scope.goHome = function() {
      console.log('going home');
      $state.go('userDash.home');
    }

    $scope.submitDrop = function(classInfo) {
      console.log('dropping shit');
      //console.log(classInfo.type);
      var request_data = {
        'userID': '12345678',
        'className': JSON.parse(userFactory.getClassInfo()).type,
        'classNum': JSON.parse(userFactory.getClassInfo()).number,
        'requestType': 'Drop'
      }
      userFactory.tutorRequest(request_data);
      $state.go("userDashClass");
    }

    $scope.cancel = function() {
      console.log('asd');
    }

    console.log("in userDash nol;akdflksdjw");
    console.log('authed?');
    console.log(userFactory.isAuthed());
    //if(!userFactory.isAuthed()) $state.go('login');

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
        templateUrl: 'dropConfirmModal.html',
        controller: 'UserdashCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    }

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  });
