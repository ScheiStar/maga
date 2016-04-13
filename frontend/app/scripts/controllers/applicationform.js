'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ApplicationformCtrl
 * @description
 * # ApplicationformCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')

.controller('formController', function($scope) {
      this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];  
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
        alert('Thanks for Applying!');
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
