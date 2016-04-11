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
  .factory('UserData', function(){
    return {info: {}};
  })
  .controller('UserdashCtrl', function ($state, $scope, $http, userFactory, UserData, $window) {

  	$scope.classArr = { classInfo: ['CSE1342','CSE2340'] };
    $scope.add = {};//stores class into json
    $scope.Class = 'www';
    //Used to display user information
    $scope.getUserID = {};
    $scope.user = null;
    //$scope.add.Class = 10;<-- works
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

    $scope.addClass = function(){
      console.log("Sent classes");
      
      // $http({
      //   method: 'POST',
      //   url: 'http://54.86.70.62/admin/addClass/',
      //   data: classData
      // });
    }

    $http({
      method: 'GET',
      url: 'http://54.86.70.62/admin/getTutors'
      //params: {'userID': userID}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // factory version
        // UserData.info = response.data;
        // console.log(UserData.info[1]);
        // console.log('success');
        
        $scope.getUserID = response;
        console.log($scope.getUserID.data[1]);
        //switch this to ng-model for mini ddos program lol
        //Use subtraction for instant number
        for(var i = 0; i < $scope.getUserID.data.length; i++) {
            console.log(i);//userID
            if("11380723" == $scope.getUserID.data[i].tutor_id) {
              console.log("tits");
              $scope.user = $scope.getUserID.data[i].tutor_first_name;
              break;  
            }
        }
        
      }, function errorCallback(response) {
        console.log('fail');
      });

    $scope.getUser = function() {
      

    //Interesting: $http request is always last
    console.log("i");
    // console.log(UserData.info[2]);
    // console.log($scope.getUserTest.data);
    

    }


    
  });
