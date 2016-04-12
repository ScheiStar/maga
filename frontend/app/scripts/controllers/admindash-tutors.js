'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashTutorsCtrl
 * @description
 * # AdmindashTutorsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashTutorsCtrl', function ($scope, contactAdminFactory) {
    console.log('come on');
    $scope.ugh = new Array();
    var user = {};
    console.log('before');
    contactAdminFactory.getTutors().then(function(data){
      console.log('ASDASFFAS');
      console.log(data);
      $scope.ugh = data;
    });
    //console.log('tits outside factory');
    //console.log(contactAdminFactory.getTutors());
    //console.log('after');
    //console.log(ugh);


    // user.userID = '6969';
    // user.lastName = 'Miller';
    // user.firstName = 'Jayce';
    // user.email = 'jaycem@smu.edu';
    // user.major = 'Math';
    // user.gpa = '13';
    // $scope.ugh.push(user);
    //
    // user = {};
    //
    // user.userID = '123';
    // user.lastName = 'Valdez';
    // user.firstName = 'Geroge';
    // user.email = 'george@smu.edu';
    // user.major = 'CSE';
    // user.gpa = '21';
    // $scope.ugh.push(user);
    //
    // console.log('here is ugh');
    // console.log($scope.ugh);

  });
