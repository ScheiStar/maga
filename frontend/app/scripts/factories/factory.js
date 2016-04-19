'use strict';

angular.module('frontendApp')
  .factory('userFactory', function ($http, $window, $state) {
    var currentUser = null;

    return {
      signIn: function(user_json, auth) {
        console.log('signing in');

        return $http({
          method: 'POST',
          url: 'http://54.86.70.62/login',
          data: user_json
        }).then(function(data){
            var userToken = data.data;
            console.log('setting token');
            console.log(userToken);
            localStorage.setItem("token", userToken);
            //console.log(userToken);
            var remember = auth;
            //$state.go("adminDash");
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

      // saveToken: function() {
      //   console.log('Saving token now');
      //   $window.localStorage['jwtToken'] = userToken;
      //   return;
      // },

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
          //console.log(token);
           var params = this.parseToken(token);
           //console.log(params);
           //remember = true;
           return true;
           //return Math.round(new Date().getTime() / 1000) <= params.exp;
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
          //return potentialToken.parseToken(potentialToken).userID;
          return potentialToken;
        }
        else {
          return;
        }
      }
}
});
