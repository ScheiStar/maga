'use strict';

/**
 * @ngdoc service
 * @name frontendApp.contactAdmin
 * @description
 * # contactAdmin
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('contactAdminFactory', function ($http) {

    return {
      emailAdmin: function (user_data) {
        console.log("in admin factory");
        console.log(user_data);
            $http({
              method: 'POST',
              url: 'http://54.86.70.62/sendEmail',
              data: user_data
            }).then(function(data){
              console.log("Email Sent!");
              return true;
            }, function errorCallback(response) {
              console.log("Email not sent!");
               return false;
        });
      },

      getApplicants: function() {
        var userArray = new Array();
        var user = {};
        $http({
          method: 'GET',
          url: 'http://54.86.70.62/getApplications'
        }).then(function(data){
          console.log("Successfully recieved applications.");
          for (var i = 0; i < data.data.length; i++) {
            user.lastName = data.data[i].applicant_first_name;
            user.appID = data.data[i].applicant_id;
            user.firstName = data.data[i].applicant_last_name;
            user.major = data.data[i].applicant_major;
            user.appStatus = data.data[i].application_status;
            userArray.push(user);
          }
          console.log(data);
          console.log(userArray);
          //console.log(data);
          return userArray;
        }, function errorCallback(response) {
           console.log("We fucked up on the application retrieval.");
           return false;
      });
    },

      getTutors: function() {
        var userArray = new Array();
        var user = {};
        return $http({
          method: 'GET',
          url: 'http://54.86.70.62/admin/getTutors'
        }).then(function(data){
          console.log("Successfully recieved applications.");
          for (var i = 0; i < data.data.length; i++) {
            user.userID = data.data[i].tutor_id;
            user.lastName = data.data[i].tutor_first_name;
            user.firstName = data.data[i].tutor_last_name;
            user.email = data.data[i].tutor_email;
            user.major = data.data[i].tutor_major;
            user.gpa = data.data[i].tutor_gpa;
            userArray.push(user);
            user = {};
          }
          console.log('tutor shit inside factory');
          console.log(data);
          console.log('returning');
          console.log(userArray);
          return userArray;
        }, function errorCallback(response) {
           console.log("We fucked up on the application retrieval.");
           return false;
      });
    }

  }

  });
