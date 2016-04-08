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
    // function to process the form
    $scope.processForm = function() {
        alert('Thanks for Applying!');  
    };
//    $scope.apply = function() {
//        console.log("apply")
//      $state.go("main.html");
//    };
    
});

