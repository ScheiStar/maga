'use strict';

angular.module('frontendApp')
  .factory('userFactory', function ($http, $window, $state) {
    var currentUser = null;

    return {
      signIn: function(user_json, auth) {
        return $http({
          method: 'POST',
          url: 'http://54.86.70.62/login',
          data: user_json
        }).then(function(data){
            var userToken = data.data;
            localStorage.setItem("token", userToken);
            var remember = auth;
            return data;
        }, function errorCallback(response) {
          console.log("Failure!");
              console.log(response);
              alert("Log In Unsuccessful");
    });
  },
      getCurrentUser: function(){
        return currentUser;
      },

      getToken: function() {
        return localStorage.getItem("token");
      },

      parseToken: function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      },

      isAuthed: function() {
        var token = this.getToken();
        if(token) {
           var params = this.parseToken(token);
           return true;
         } else {
           return false;
         }
      },

      onExit: function() {
        if(remember) return;
        else {
          localStorage.removeItem("token");
          return;
        }
      },

      signOut: function() {
        localStorage.removeItem("token");
        $state.go("login");
      },

      loginInit: function() {
        potentialToken = localStorage.getItem("token");
        if(potentialToken) {
          return potentialToken;
        }
        else {
          return;
        }
      },

      tutorRequest: function(request_data) {
        return $http({
          method: 'POST',
          url: 'http://54.86.70.62/requestClass',
          data: request_data
        }).then(function(data){
            alert('Successfully submitted!')
            $state.go($state.current, {}, {reload: true});
            return;
        }, function errorCallback(response) {
          console.log("Failure!");
              alert("Bad Tutor Request");
    });
  },

        storeClassInfo: function(classInfo) {
          localStorage.setItem("classInfo", JSON.stringify(classInfo));
          return;
        },

        getClassInfo: function() {
          return localStorage.getItem("classInfo");
        },

        getThisTutor: function(tutorID) {
          return $http({
            method: 'GET',
            url: 'http://54.86.70.62/getTutor/'+tutorID
          }).then(function(data){
            return data;
          }, function errorCallback(response) {
             console.log("We fucked up on the application retrieval.");
             return false;
        });

        },

        getThisTutorRequests: function(tutorID) {
          return $http({
            method: 'GET',
            url: 'http://54.86.70.62/getTutorRequest/'+tutorID
          }).then(function(data){
            return data;
          }, function errorCallback(response) {
             console.log("We messed up on the application retrieval.");
             return false;
        });
        },

        storeCourseInfo: function(courseInfo) {
          localStorage.setItem("courseInfo", JSON.stringify(courseInfo));
          return;
        },

        getCourseInfo: function() {
          return localStorage.getItem("courseInfo");
        }
}
});
