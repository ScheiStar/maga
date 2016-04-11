angular.module('frontendApp').controller('QuitTutorModalInstanceCtrl', function (contactAdminFactory, userFactory, $scope, $uibModalInstance, items) {
  console.log('in contact admin dash');

  $scope.submitMessage = function(user) {
    if(user && user.message!=''){
      var user_data = {
        'userID': userFactory.parseToken(userFactory.getToken()).userID,
        'message': user.message
      };

      if(contactAdminFactory.emailAdmin(user_data)) {
        alert('We hate to see you go. :/ You will hear from us soon regarding your termination.');
        $state.go("userDash");
      } else {
        alert('Oops looks like we had trouble handling you quitting. Please try again.');
      }
    }
    else alert('Please enter an actual message.');

    //TODO: Log values in database and do something with them

    //TODO: Get request for python script
  }


});
