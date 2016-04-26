# These are the things that would be good to remember 

## git
- [git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done] is the magical command that will pull all of the branches down from a repo so that you can easily checkout between them on your local machine, that makes it really easy to push and such

## npm/node/yeoman/grunt/bower
- on windows used cmd prompt as administrator to install everything because it has more access priveleges than git bash. This is really the only way to get npm and grunt installed properly on windows, git bash will just make a ton of errors in the end. You can still "grunt build" and "grunt serve" from git bash, just don't install it from there.
- add [ "jpegtran-bin": "0.2.0", ] to the package.json file if its not already there (may only need to do this on windows)

## Loading Resources
- Always, always use [https://] instead of just [//] for laoding resources, the [//] will give you trouble if you are in subfolders and such

## Nested States
- Nested states are the bomb, just make sure that the parent [.state] name matches the child [.state] name. If you have the following example it won't work because the parent name is different from the child name:

    .state('applicationForm', {
        url: '/applicationForm',
        templateUrl: 'views/applicationForm/form.html',
        controller: 'formController',
        controllerAs: 'applicationForm'
    })
    .state('form.profile', {
        url: '/profile',
        templateUrl: 'views/applicationForm/form-profile.html'
    })
    

    
The following code will not recognize the states as linked:

    <div id="status-buttons" class="text-center">
        <a ui-sref-active="active" ui-sref=".profile"><span>1</span> Create Account</a>
        <a ui-sref-active="active" ui-sref=".interests"><span>2</span> Classes & Times</a>
        <a ui-sref-active="active" ui-sref=".payment"><span>3</span> Verify Info</a>
    </div>
    
Use "abstract: true" to make sure that you don't navigate to the abstract state
      
      .state('form', {
          url: '/form',
          templateUrl: 'views/applicationForm/form.html',
          controller: 'formController',
          abstract: true
      })
## Styling
- If you don't know how to acess an html element to style it in css, right click it and inspect it to see exactly what to call it. I learned this from trying to style the calendar a different color.
      
## $uibModal
- If you wanna use this puppy you got to abstract the modal controller and html into separate files from the "parent" page (the page that the modal is activated from). You inject $uibModal into the parent page's controller, then you inject $uibModalInstance into the actual modal page's controller.
This is an example of creating a modal that will catch the states thrown when you exit the modal and allow you to exit it

    $scope.confirmDrop = function(size, classInfo){
      console.log('finna store');
      console.log(classInfo);
      userFactory.storeClassInfo(classInfo);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/userDash/dropclassmodal.html',
        controller: 'DropclassmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
          //functionality goes here 
          console.log("UIBModalInstance Success");
          $scope.submitDrop(classInfo); //when ok() is invoked invoke this line
      }, function () {
          console.log("UIBModalInstance Dismiss");
          //funcitonality goes here //when cancel() is invoked invoke this line
      }); 
    };
    
This part you put in the actual modal controller and it catches the two states and sends it back to the parent page for functionality over there

    $scope.ok = function () {
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };