angular.module('frontendApp').controller('QuitTutorModalInstanceCtrl', function ($state, contactAdminFactory, userFactory, $scope, $uibModalInstance, items) {
  console.log('in contact admin dash');

  $scope.submitMessage = function(user) {
    if(user && user.message!=''){
      var user_data = {
        'email': "jaycem@smu.edu",
        'message': "penis",
        'type': "tutorQuit"
      };
      //var shit = {'email': "jaycem@smu.edu", 'message': "\"bad a\"", 'type': "tutorQuit"};
      //var user_json = JSON.stringify(user_data);
      //console.log(user_data.message);
      contactAdminFactory.emailAdmin(user_data);
      alert('We hate to see you go. :/ You will hear from us soon regarding your termination.');
      //$state.go("userDash");
    }
    else alert('Please enter an actual message.');

    //TODO: Log values in database and do something with them

    //TODO: Get request for python script

    $uibModalInstance.dismiss('cancel');
  }


});
