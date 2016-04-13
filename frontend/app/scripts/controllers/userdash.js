'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserdashCtrl
 * @description
 * # UserdashCtrl
 * Controller of the frontendApp
 */

// app.factory('classesData', function(){
  // 	return{classes: {}};
  // })
angular.module('frontendApp')
  .factory('UserData', function(){
    return {info: {}};
  })
  .directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            scope:{
              isolatedAttributeFoo:'@attributeFoo'
              isolatedBindingFoo:'=bindingFoo'
              isolatedExpressionFoo:'&'
            }
            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
  })
  .controller('UserdashCtrl', function ($state, $scope, $http, userFactory, UserData, $window, $uibModal, $log, $filter) {

  	
    $scope.add = {};//stores class into json
    
    //Used to display user information
    $scope.getUserID = {};
    $scope.user = null;
    //$scope.add.Class = 10;<-- works
  	// //Store class input -- json
    var classData = {
      'userID': userFactory.getToken(),
      'classID': $scope.add.Class,
      'grades': $scope.add.Grade
    };

    //test
    $scope.foo = 'Hello!';
    $scope.updateFoo = function (newFoo) {
        $scope.foo = newFoo;
    }

    console.log("in userDash now");

    // console.log(userFactory.getCurrentUser());
    // $scope.user = userFactory.getCurrentUser();

    // userFactory.saveToken()
    // var userID = (userFactory.parseToken(userFactory.getToken()));
    // console.log(userID);

    //(!userFactory.isAuthed()) $state.go('login');
    //------------------------MODAL-----------------------------------------
    $scope.classArr = { 
      classType: ['CSE','CSE'],
      classNumber: ['1342','2340'],
      classGrade: ['A','B+']
    };

    $scope.animationsEnabled = true;

    $scope.myText = "";//takes input
    
    $scope.arrayText = ['CSE1342','CSE2340'];

    $scope.addText = function() {
        $scope.arrayText.push(this.myText);
    }

    $scope.removeItem = function(index){
      // $scope.arrayText.splice(index, 1);
      //delete $scope.arrayText[index];
      // console.log(i);
      for(var i = 0; i < $scope.arrayText.length; i++) {
        if(this.myText == $scope.arrayText[i]) {
          console.log("Removed");
          console.log(i);
          console.log($scope.arrayText[i]);
          $scope.arrayText.splice(i, 1);//doesnt work
          //delete $scope.arrayText[i];//doesnt work
          //return !($scope.arrayText == $scope.arrayText[i]);
          //$scope.arrayText = $filter('filter')($scope.arrayText, {name: '!hey'})//almost worked
          
          break;
        }
        else {
          console.log("Invalid Class");
        }
      }//for

    }


    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'UserdashCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    $scope.ok = function () {
      $uibModal.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModal.dismiss('cancel');
    };

    //------------------------------------------------------------------------

    $scope.addClass = function(){
      console.log("Sent classes");
      
      // $http({
      //   method: 'POST',
      //   url: 'http://54.86.70.62/admin/addClass/',
      //   data: classData
      // });
    }

    $http({
      method: 'GET',
      url: 'http://54.86.70.62/admin/getTutors'
      //params: {'userID': userID}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // factory version
        // UserData.info = response.data;
        // console.log(UserData.info[1]);
        // console.log('success');
        
        $scope.getUserID = response;
        console.log($scope.getUserID.data[1]);
        //switch this to ng-model for mini ddos program lol
        //Use subtraction for instant number
        for(var i = 0; i < $scope.getUserID.data.length; i++) {
            console.log(i);//userID
            if("11380723" == $scope.getUserID.data[i].tutor_id) {
              console.log("tits");
              $scope.user = $scope.getUserID.data[i].tutor_first_name;
              break;  
            }
        }
        
      }, function errorCallback(response) {
        console.log('fail');
      });

    $window.onbeforeunload = function(){
      userFactory.onExit();
    };
    //$window.onbeforeunload =  userFactory.onExit();

    $scope.getUser = function() {
      

    //Interesting: $http request is always last
    console.log("i");
    // console.log(UserData.info[2]);
    // console.log($scope.getUserTest.data);
    

    }


    
  });
