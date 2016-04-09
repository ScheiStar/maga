'use strict';

/**
 * @ngdoc service
 * @name frontendApp.contactAdmin
 * @description
 * # contactAdmin
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('contactAdminFactory', function () {

    return {
      emailAdmin: function (user_data) {
        console.log("in admin factory");
        console.log(user_data);
        //     $http({
        //       method: 'GET',
        //       url: 'http://162.243.187.169/sendEmails.py',
        //       params: 'user_data'
        //     }).then(function(data){
        //       console.log("Email Sent!");
        //         return true;
        //     }, function errorCallback(response) {
        //       console.log("Email not sent!");
        //        return false;
        // });
      }
    };
  });
