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
  .controller('UserdashCtrl', function ($state, $scope, $http, userFactory, $window, $uibModal, $log, $filter) {


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
    };

    console.log("in userDash now");
    console.log('authed?');
    console.log(userFactory.isAuthed());
    if(!userFactory.isAuthed()) $state.go('login');

    $scope.signOut = function() {
      userFactory.signOut();
    };

    // console.log(userFactory.getCurrentUser());
    // $scope.user = userFactory.getCurrentUser();

    // userFactory.saveToken()
    // var userID = (userFactory.parseToken(userFactory.getToken()));
    // console.log(userID);

    //(!userFactory.isAuthed()) $state.go('login');

    //-----------------------------MODAL CODE-----------------------------------
    //Modal code which is used to both 'add' and 'drop' class

    //Array to store classes and display information to user of their
    //current classes they are taking. This is also used to help push
    //information into a json file for POST request to and and drop classes
    $scope.classArr = {
      classType: ['CSE','CSE', 'ADV', 'BUSI'],
      classNumber: ['1342','2340', '1234', '4566'],
      classGrade: ['A','B+','A','A']
    };

    $scope.myText = "";//takes input

    $scope.classArr2 = {
      classType: ['1','2'],
      classNumber: ['1','2'],
      classGrade: ['1','2']
    };

    //These variables are used to help push inputs into classArr
    $scope.myClassType = "";
    $scope.myClassGrade = "";
    $scope.myText = "";//takes input for adding class number

    //Animation for modal enabled
    $scope.animationsEnabled = true;
    $scope.arrayText = ['CSE1342','CSE2340'];
    //debug test function
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
      }
    };//for
    //Allows a tutor to send add class request to admin
    $scope.addClassInfo = function() {
        //store class info in array for visual
        $scope.classArr.classType.push(this.myClassType);
        $scope.classArr.classNumber.push(this.myText);
        $scope.classArr.classGrade.push(this.myClassGrade);
        //get info from class array and store in json
        var addclass_data = {
          'userID': $scope.user,
          'classType': $scope.classArr.classType,
          'classNumber': $scope.classArr.classNumber,
          'classGrade': ['A','B+']
        };
        console.log(addclass_data)
        //do post request to add class

        //update pending class

    }

    $scope.dropClass = function(index) {
      console.log(index);
      $scope.classArr.classType.splice(index, 1);
      $scope.classArr.classNumber.splice(index, 1);
      $scope.classArr.classGrade.splice(index, 1);
      // $scope.arrayText.splice(index, 1);
    }

    // $scope.displayTable= {
    //   myClass: ['cse','1333','cse','1334'];
    // };
    //create function which will grab data from classArr
    //and put it into a new function
    // $scope.convertTable = function(){
    //   for(var i = 0;i<classArr.classType.length;i++){

    //   }
    // }

    //Used to remove items from the array
    //Need to improve efficiency of this.
    // $scope.removeItem = function(index){
    //   // $scope.arrayText.splice(index, 1);
    //   // delete $scope.arrayText[index];
    //   // console.log(i);
    //   for(var i = 0; i < $scope.arrayText.length; i++) {
    //     if(this.myText == $scope.arrayText[i]) {
    //       console.log("Removed");
    //       console.log(i);
    //       console.log($scope.arrayText[i]);
    //       $scope.arrayText.splice(i, 1);//doesnt work
    //       //delete $scope.arrayText[i];//doesnt work
    //       break;
    //     }
    //     else {
    //       console.log("Invalid Class");
    //     }
    //   }
    // }

    //Important to allow add class modal to appear on screen
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

    //Important to allow drop class modal to appear on screen
    $scope.openDrop = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'dropClassModal.html',
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

    //--------------------End of Modal Code---------------------------

    //GET request retreives current user id and displays it to pages
    //Used in Add/Drop class' post request to add and drop classes
    //Used in home page to display welcome "tutor name"

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
      alert('shit');
      userFactory.onExit();
    };

    $(window).unload(function() {
      userFactory.onExit();
    });
    //$window.onbeforeunload =  userFactory.onExit();

    $scope.getUser = function() {


    //Interesting: $http request is always last
    console.log("i");
    // console.log(UserData.info[2]);
    // console.log($scope.getUserTest.data);


    }



  });
