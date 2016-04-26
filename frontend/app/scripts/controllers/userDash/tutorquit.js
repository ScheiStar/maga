angular.module('frontendApp').controller('TutorquitCtrl', function ($state, contactAdminFactory, userFactory, $scope, $uibModal) {
  console.log('in contact admin dash');

  $scope.signOut = function() {
    userFactory.signOut();
  };

  $scope.submitMessage = function(size, user) {
      console.log('in $scope.submitMessage');
      if(user && user.message!=''){
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/userDash/tutorquitmodal.html',
        controller: 'TutorquitmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
          //functionality goes here I think
          console.log("UIBModalInstance Success");
          var user_data = JSON.stringify({
          'email': "jaycem@smu.edu",
          'message': user.message,
          'type': "tutorQuit"
          });
          console.log(user.message);
          contactAdminFactory.emailAdmin(user_data);
          $state.go("userDash");

      }, function () {
          console.log("UIBModalInstance Dismiss");
          //funcitonality goes here I think
      });
          
    }
    else alert('Please enter an actual message.');
    };
});
