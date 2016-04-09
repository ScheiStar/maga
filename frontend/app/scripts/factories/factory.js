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
          //console.log("Success!");
            userToken = data.data;
            localStorage.setItem("token", userToken);
            console.log('uhh');
            remember = auth;
            //remember = true;
            $state.go("userDash");
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
        var token = self.getToken();
        if(token) {
           var params = self.parseJwt(token);
           return Math.round(new Date().getTime() / 1000) <= params.exp;
         } else {
           return false;
         }
      },


      signOut: function() {
        console.log('signing out');
        console.log(remember);
        if(remember) {
          console.log('dont remove token');
          // $window.localStorage.removeItem('jwtToken');
          $state.go("login");
        }
        else {
          console.log('remove token');
          localStorage.removeItem("token");
          $state.go("login");
        }

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
