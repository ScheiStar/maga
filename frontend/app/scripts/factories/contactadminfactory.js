'use strict';

/**
 * @ngdoc service
 * @name frontendApp.contactAdmin
 * @description
 * # contactAdmin
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
  .factory('contactAdminFactory', function ($http, userFactory, $state) {

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
        return $http({
          method: 'GET',
          url: 'http://54.86.70.62/getApplications'
        }).then(function(data){
          console.log("Successfully recieved applications.");
          for (var i = 0; i < data.data.length; i++) {
            user.lastName = data.data[i].applicantInfo.applicant_last_name;
            user.appID = data.data[i].applicantInfo.applicant_id;
            user.firstName = data.data[i].applicantInfo.applicant_first_name;
            user.major = data.data[i].applicantInfo.applicant_major;
            user.appStatus = data.data[i].applicantInfo.application_status;
            userArray.push(user);
            user = {};
          }
          //console.log('printing shit');
          //console.log(data);
          //console.log(userArray);
          //console.log(data);
          var allData = [userArray, data];
          return allData;
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
          url: 'http://54.86.70.62/getTutors'
        }).then(function(data){
          console.log("Successfully recieved tutors.");
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
          //console.log(userArray);
          //var allData = [userArray, data];
          return data;
        }, function errorCallback(response) {
           console.log("We fucked up on the application retrieval.");
           return false;
      });
    },

    storeAppID: function(appID){
      localStorage.setItem("currentAppID", appID);
      return;
    },

    getAppID: function(){
      return localStorage.getItem("currentAppID");
    },

    storeModalData: function(data){
        console.log('storing');
        //console.log(data);
        localStorage.setItem("modalData", JSON.stringify(data));
        return;
    },

    getTutorID: function(){
      return localStorage.getItem("currentTutorID");
    },

    storeTutorID: function(data){
        localStorage.setItem("currentTutorID", data);
        return;
    },

    getTutorData: function(){
      return localStorage.getItem("currentTutorData");
    },

    storeTutorData: function(data){
        console.log('storing tutor data');
        //console.log(data);
        localStorage.setItem("currentTutorData", JSON.stringify(data));
        return;
    },

    getModalData: function(){
      console.log('getting');
      if(localStorage.getItem("modalData") == null){
        console.log('Null')
        //console.log(localStorage.getItem("modalData"));
        return false
      }
      else{
        console.log('NOT NULL');
        //console.log(localStorage.getItem("modalData"));
        return localStorage.getItem("modalData");
      }
    },

    getTutorRequests: function(){
      var requestArray = new Array();
      var user = {};
      return $http({
        method: 'GET',
        url: 'http://54.86.70.62/getTutorRequests'
      }).then(function(data){
        console.log("Successfully recieved requests.");
        // for (var i = 0; i < data.data.length; i++) {
        //   user.userID = data.data[i].tutor_id;
        //   user.lastName = data.data[i].tutor_first_name;
        //   user.firstName = data.data[i].tutor_last_name;
        //   user.classType = data.data[i].tr_classtype;
        //   user.classNum = data.data[i].tr_classnum;
        //   user.requestType = data.data[i].tr_request_type;
        //   requestArray.push(user);
        //   user = {};
        // }
        console.log('request shit inside factory');
        console.log(data);
        console.log('returning requests');
        console.log(requestArray);
        return data;
      }, function errorCallback(response) {
         console.log("We fucked up on the tutor requests retrieval.");
         return false;
    });
    },

    apply: function(applicant_data) {
      console.log(applicant_data);
          $http({
            method: 'POST',
            url: 'http://54.86.70.62/applicationForm',
            data: applicant_data
          }).then(function(data){
            console.log("Successfully submitted application.");
            alert('Thank you for submitting! Please check your email.')
            $state.go('login');
            return true;
          }, function errorCallback(response) {
            console.log("Did not submit application.");
             return false;
      });
    },

    deny: function(tutorID) {
      $http({
        method: 'DELETE',
        url: 'http://54.86.70.62/deleteApplication/' + tutorID
      }).then(function(data){
        console.log("Successfully deleted application.");
        $state.go($state.current, {}, {reload: true});
        alert('Bye bitch')
        return true;
      }, function errorCallback(response) {
        console.log("Did not submit application.");
         return false;
       });
     },

     approveApplicant: function(tutorID) {
       return $http({
         method: 'POST',
         url: 'http://54.86.70.62/updateApplicant/'+tutorID
       }).then(function(data){
         console.log("Successfully approved application.");
         alert('Thank you for submitting! Please check your email.')
         $state.go($state.current, {}, {reload: true});
         return;
       }, function errorCallback(response) {
         console.log("Did not submit application.");
          return;
        });
     },

     terminateTutor: function(tutorID) {
       console.log('IDIDID');
       console.log(tutorID);
       $http({
         method: 'DELETE',
         url: 'http://54.86.70.62/deleteTutor/' + tutorID
       }).then(function(data){
         console.log("Successfully deleted tutor.");
         $state.go($state.current, {}, {reload: true});
         alert('Bye bitch')
         return true;
       }, function errorCallback(response) {
         console.log("Did not delete tutor.");
          return false;
        });
     }


   }
 });
