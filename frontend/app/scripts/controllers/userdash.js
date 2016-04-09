'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserdashCtrl
 * @description
 * # UserdashCtrl
 * Controller of the frontendApp
 */

// app.factory('classesData', function(){
  // 	return{classes: {}};
  // })
angular.module('frontendApp')
  .controller('UserdashCtrl', function ($state, $scope, $http, userFactory, $window) {

  	$scope.classArr = { classInfo: ['CSE1342','CSE2340'] };
    $scope.add = {};
    $scope.getUserTest = {};
  	// //Store class input -- json
    var classData = {
      'userID': userFactory.getToken(),
      'classID': $scope.add.Class,
      'grades': $scope.add.Grade
    };

    console.log("in userDash now");
    // console.log(userFactory.getCurrentUser());
    // $scope.user = userFactory.getCurrentUser();

    // userFactory.saveToken()
    // var userID = (userFactory.parseToken(userFactory.getToken()));
    // console.log(userID);

    $scope.addClassFun = function(){
      console.log("Sent classes");
      // $http({
      //   method: 'POST',
      //   url: 'http://54.86.70.62/admin/addClass/',
      //   data: classData
      // });
    }
    
    $scope.getUser = function() {
      console.log("uuu");
      $http({
      method: 'GET',
      url: 'http://54.86.70.62/admin/getTutors'
      //params: {'userID': userID}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        //classesData.classes = response.data.classes;
        $scope.getUserTest = response;
        console.log('success');
        console.log($scope.getUserTest);
      }, function errorCallback(response) {
        console.log('fail');
      });

    //if(userID = $scope.getUserTest.data.)
    // for(var i = 0; i < $scope.getUserTest.data; i++) {
    //   if(userID = $scope.getUserTest.data.tutorID) {

    //   }
    // }

    }
    

  });
