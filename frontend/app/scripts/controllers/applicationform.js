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
    console.log("In formController");
      this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];  
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.formData.cal = {};
    // function to process the form
    $scope.processForm = function() {
        //!!!!!!!!!!!!!!!!! Need to convert the times arrays all to strings here so that ehy can be post to the data base!!!!!!!!!!!!!!!!!!!!!
        alert('Thanks for Applying!');  
    };
//    $scope.apply = function() {
//        console.log("apply")
//      $state.go("main.html");
//    };
    $scope.createCourseArray = function() {
        
    };
        //str for $time version
//    $scope.addTime = function($day,$time) {
//        if (angular.isDefined($scope.formData.cal[$day])){
// //           console.log($day, "In dictionary");
//            if($scope.formData.cal[$day].indexOf($time) !== -1){
//                console.log("Time in string, removing");
//                $scope.formData.cal[$day] = $scope.formData.cal[$day].replace($time, '');
//            }
//            else
//                $scope.formData.cal[$day] = $scope.formData.cal[$day] + ' ' + $time;
//        }
//        else{
//  //          console.log($day, "Not in Dict, adding now");
//            $scope.formData.cal[$day] = $time;
//        }
//        console.log($scope.formData.cal);
//        console.log('Sorted?' + $scope.formData.cal[$day].sort());
//        
//        
//    };
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
        console.log($scope.formData.cal);
    };
});

