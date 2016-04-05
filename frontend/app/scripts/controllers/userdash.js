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
<<<<<<< HEAD
  .controller('UserdashCtrl', function ($state, $scope, $http, userFactory, $window) {
    
  	$scope.classArr = { classInfo: ['CSE1342','CSE2340'] };
  	
    console.log("in userDash now");
    console.log(userFactory.getCurrentUser());
    $scope.user = userFactory.getCurrentUser();

  	$scope.getHelp = function() {
  		$state.go("helpdash");
  		console.log('helpdash');
  	}


  //   $scope.classesData = function(){
  	$http.get('http://54.86.70.62/admin/getTutor/?format=json').success(function(data) {
        $scope.classes = data;
        // for (var i=0; i < $scope.classes.results.length; i++)
        // {
        //     if ($scope.classes.results.status == 0)
        //     {
        //         tobedone++;
        //     }
        // }
    });

  //   	$http({
		//   method: 'GET',
		//   url: 'http://54.86.70.62/admin/getTutor'
		//   params: {abv: userFactory.getCurrentUser().abv}
		// }).then(function successCallback(response) {
		//     // this callback will be called asynchronously
		//     // when the response is available
		//     //classesData.classes = response.data.classes;
		//     console.log('success');
		//   }, function errorCallback(response) {
		//     console.log('fail');
		//   });

    //});
  });
