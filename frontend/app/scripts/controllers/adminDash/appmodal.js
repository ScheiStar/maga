'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AppmodalCtrl
 * @description
 * # AppmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AppmodalCtrl', function (contactAdminFactory) {

    console.log(contactAdminFactory.getAppID());

    //TODO: Get and print all application data for admin to look at
//     contactAdminFactory.getIndApp(contactAdminFactory.getID()).then(function(data){
//       $scope.applicationData = data;
    
     //});
  });
