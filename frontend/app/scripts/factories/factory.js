angular.module('frontendApp')
  .factory('userFactory', function ($http, $window, $state) {
    var currentUser = null;

    return {
      signIn: function(user_json) {

        return $http({
          method: 'POST',
          url: 'http://54.86.70.62/login',
          data: user_json
        }).then(function(data){
          console.log("Success!");
            currentUser = data;
            console.log(data.data);
            $state.go("userDash");
            //set token
            userToken = data.data;
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

      saveToken: function() {
        $window.localStorage['jwtToken'] = userToken;
        return;
      },

      getToken: function() {
        return $window.localStorage['jwtToken'];
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
        $window.localStorage.removeItem('jwtToken');
      }
}
});
