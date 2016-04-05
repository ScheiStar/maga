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
            console.log(data.data);
            userToken = data.data;
            // var api_key = 'key-3a991789584ec646b3e2e88d5a737923';
            // var domain = 'sandbox2d09628f0b6b414ebc37579659ff9a21.mailgun.org';
            // var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
            //
            // var data = {
            //   from: 'Excited User <me@samples.mailgun.org>',
            //   to: 'jaycem@smu.edu',
            //   subject: 'Hello',
            //   text: 'Testing some Mailgun awesomness!'
            // };

          // mailgun.messages().send(data, function (error, body) {
          //   console.log(body);
//});
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
