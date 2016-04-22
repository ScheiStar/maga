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
      