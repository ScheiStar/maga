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
              data: 'user_data'
            }).then(function(data){
              console.log("Email Sent!");
              return true;
            }, function errorCallback(response) {
              console.log("Email not sent!");
               return false;
        });
      }
    };
  });
