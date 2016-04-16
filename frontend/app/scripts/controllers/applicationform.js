'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ApplicationformCtrl
 * @description
 * # ApplicationformCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')

.controller('formController', function($scope, $state, contactAdminFactory) {
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.formData.cal = {};
    $scope.formData.courseDictArray = [];
    var courseDict = {};

    // function to process the form
    $scope.processForm = function() {
        //processes the calendar into strings
        for (var day in $scope.formData.cal){
             $scope.formData.cal[day] = $scope.formData.cal[day].toString();
        }
        //processes the input courses into array of dictionaries where 'courseNum':"CSE2341",'grade':"A"
        for(var i = 0; i < (Object.keys($scope.formData.courseArray).length); i++){
            console.log("Course Array: ", $scope.formData.courseArray);
            $scope.formData.courseDictArray.push({'courseNum':$scope.formData.courseArray[i], 'grade':$scope.formData.courseArray[i+1]});
            i++;
        }
        delete $scope.formData.courseArray; //delete because its not needed in formData anymore!
        console.log($scope.formData);
        console.log($scope.formData.email);
        var user_data = {
          'email': $scope.formData.email,
          'message': '',
          'type': "appConfirm"
        };
//        contactAdminFactory.emailAdmin(user_data);
//        //work on hooking this up to database
//        return $http({
//          method: 'POST',
//          url: 'http://54.86.70.62/login',
//          data: user_json
//        }).then(function(data){
//            var userToken = data.data;
//            localStorage.setItem("token", userToken);
//            var remember = auth;
//            $state.go("userDash");
//            return data;
//        }, function errorCallback(response) {
//          console.log("Failure!");
//              console.log(response);
//              alert("Log In Unsuccessful");
//    });
        
        
        
        alert('Thanks for Applying!');
        $state.go('login');
        
    };
    //int for $time version
    $scope.addTime = function($day,$time) {
        if (angular.isDefined($scope.formData.cal[$day])){
            if($scope.formData.cal[$day].indexOf($time) != -1)
                $scope.formData.cal[$day].splice($scope.formData.cal[$day].indexOf($time), 1); //splice removes the element without leaving holes
            else
                $scope.formData.cal[$day].push($time);
        }
        else{
            $scope.formData.cal[$day] = [];
            $scope.formData.cal[$day].push($time);
        }
        $scope.formData.cal[$day].sort();
    };
});
