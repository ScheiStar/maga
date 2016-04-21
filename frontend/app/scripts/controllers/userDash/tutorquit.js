angular.module('frontendApp').controller('TutorquitCtrl', function ($state, contactAdminFactory, userFactory, $scope) {
  console.log('in contact admin dash');

  $scope.signOut = function() {
    userFactory.signOut();
  };

  $scope.submitMessage = function(user) {
    if(user && user.message!=''){
      var user_data = JSON.stringify({
        'email': "jaycem@smu.edu",
        'message': user.message,
        'type': "tutorQuit"
      });
      console.log(user.message);
      contactAdminFactory.emailAdmin(user_data);
      alert('We hate to see you go. :/ You will hear from us soon regarding your termination.');
      $state.go("userDash");
    }
    else alert('Please enter an actual message.');

    //TODO: Log values in database and do something with them

    //TODO: Get request for python script
  }


});
