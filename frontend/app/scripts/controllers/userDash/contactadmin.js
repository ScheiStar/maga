angular.module('frontendApp').controller('ContactadminCtrl', function ($state, contactAdminFactory, userFactory, $scope) {
  console.log('in contact admin dash');

  $scope.signOut = function() {
    userFactory.signOut();
  };

  $scope.submitMessage = function(user) {
    if(user && user.message!=''){
      var user_data = {
        'email': 'jaycem@smu.edu',
        'message': user.message,
        'type': 'contactAdminConfirm'
      };

      var user_data_admin = {
        'email': 'jaycem@smu.edu',
        'message': user.message,
        'type': 'emailToAdmin'
        //'userID': userFactory.parseToken(userFactory.getToken()).userID
      };

      contactAdminFactory.emailAdmin(user_data);
      contactAdminFactory.emailAdmin(user_data_admin);
      alert('Thank you for submitting. You will hear from us soon!')
      $state.go("userDash");

    }
    else alert('Please enter an actual message.');
  }


});
