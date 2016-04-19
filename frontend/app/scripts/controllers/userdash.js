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
  .controller('UserdashCtrl', function ($state, $scope, $http, contactAdminFactory, userFactory, $window, $uibModal, $log, $filter) {

  	
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

    $scope.goHome = function() {
      console.log('going home');
      $state.go('userDash.home');
    }

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

    //Allows a tutor to send add class request to admin
    $scope.addClassInfo = function() {
        //error control -- need to add specific error control for scope
        if($scope.myClassType == "" || ($scope.myText == "" || $scope.myText.length < 4) || $scope.myClassGrade == "") {
          console.log("Error");
        }
        else {
          //alert
          alert("Class Successfully Added");
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
          console.log(addclass_data);
          
          //do post request to add class

          //update pending class
          
          //clear fields 
          $scope.clearFields();
          $uibModal.close();
        }
        
    }
    
    $scope.clearFields = function() {
      $scope.myClassType = null;
      $scope.myClassGrade = null;
      $scope.myText = null;
    }

    // $scope.showConfirm = function(ev) {
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   var confirm = $mdDialog.confirm()
    //         .title('Would you like to delete your debt?')
    //         .textContent('All of the banks have agreed to forgive you your debts.')
    //         .ariaLabel('Lucky day')
    //         .targetEvent(ev)
    //         .ok('Please do it!')
    //         .cancel('Sounds like a scam');
    //   $mdDialog.show(confirm).then(function() {
    //     $scope.status = 'You decided to get rid of your debt.';
    //   }, function() {
    //     $scope.status = 'You decided to keep your debt.';
    //   });
    // };
    $scope.dropArr = {
      classType: [],
      classNumber: [],
      classGrade: []
    }
    $scope.dropClass = function(index) {
      console.log(index);
      $scope.dropArr.classType.push($scope.classArr.classType[index])
      $scope.dropArr.classNumber.push($scope.classArr.classNumber[index])
      $scope.dropArr.classGrade.push($scope.classArr.classGrade[index])
      $scope.classArr.classType.splice(index, 1);
      $scope.classArr.classNumber.splice(index, 1);
      $scope.classArr.classGrade.splice(index, 1);
    }
    $scope.undoDrop = function(index) {
      $scope.classArr.classType.push($scope.dropArr.classType[index])
      $scope.classArr.classNumber.push($scope.dropArr.classNumber[index])
      $scope.classArr.classGrade.push($scope.dropArr.classGrade[index])
      $scope.dropArr.classType.splice(index, 1);
      $scope.dropArr.classNumber.splice(index, 1);
      $scope.dropArr.classGrade.splice(index, 1);
    }
    $scope.submitDrop = function() {
      if($scope.dropArr.classType.length == 0 || $scope.dropArr.classNumber.length == 0 || $scope.dropArr.classGrade.length == 0) {
        alert("You did not drop any classes");
      }
      else {
        alert("Classes successfully dropped");
        //Store drop class data
        var addclass_data = { 
          'userID': $scope.user,
          'classType': $scope.dropClass.classType,
          'classNumber': $scope.dropClass.classNumber,
          'classGrade': $scope.dropClass.classGrade
        };
        $uibModal.close();
      }
      

      //post request to drop classess in drop arr

    }

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


    //--------------------End of Modal Code---------------------------


    //--------------------CALENDAR CODE START-------------------------

    $scope.calenderArr = {
      sun:[0, 0, 0, 0, 0, 0, 0, 0],
      mon:[0, 0, 0, 0, 0, 0, 0, 0],
      tue:[0, 0, 0, 0, 0, 0, 0, 0],
      wed:[0, 0, 0, 0, 0, 0, 0, 0],
      thu:[0, 0, 0, 0, 0, 0, 0, 0],
      fri:[0, 0, 0, 0, 0, 0, 0, 0]
    };

    
    //test calendar data
    $scope.calendarstuff = "'sun':'2,3,4','tue':'1,2,3','wed':'4'";

    //need to remove from function in future
    $scope.displayCalendar = function(){
      console.log("enter displayCalendar");
      //test string
      var calendarstuff = "'sun':'2,3,4','tue':'1,2,3','wed':'4'";

      //regex
      var test = /shit/;
      var dayRegex = /(sun|mon|tue|wed|thu|fri)/;
      var quotesRegex = /'\d+'/;
      var numberRegex = /[0-9]/;
      var nextDataRegex = /','/;
      var superRegex = /('sun'|'mon'|'tue'|'wed'|'thu'|'fri'):['](\d*|,*)*[']/
      var superRegex2 = /(sun|mon|tue|wed|thu|fri)+/
      //Get request to extract string
      //TEST super regex
      // if(superRegex2.exec(calendarstuff)) {
      //   var omg = calendarstuff.match(superRegex2);
      //   console.log(omg);
      //   console.log('lol');
      // }
      //regex performed on string // 8 times total
      //regex for '2,3,4' and then use match to grab individual numbers
      console.log(dayRegex.toString(calendarstuff));
      console.log(calendarstuff.match(dayRegex)); 
      //store data into calendarArr
      if(calendarstuff.match(dayRegex) == 'sun') {
        console.log("enter sun"); 
        
        //grab quote regex. use substring to focus on those numbers
        //use match to extract numbers
        //grabs block of string starting from date to last of quotesRegex
        var numberBlock = calendarstuff.substring(calendarstuff.search(dayRegex), calendarstuff.match(quotesRegex).lastIndexOf());
        console.log("number");
        console.log(numberBlock);

        //var regexBlock = 
        $scope.calenderArr[0][numberRegex] = 1;
      }
      else if(dayRegex == "mon") {
        $scope.calenderArr[1][numberRegex] = 1;
      }
      else if(dayRegex == "tue") {
        $scope.calenderArr[2][numberRegex] = 1;
      }
      else if(dayRegex == "wed") {
        $scope.calenderArr[3][numberRegex] = 1;
      }
      else if(dayRegex == "thu") {
        $scope.calenderArr[4][numberRegex] = 1;
      }
      else if(dayRegex == "fri") {
        $scope.calenderArr[5][numberRegex] = 1;
      }
      else if(nextDataRegex == "','") {
        //reset if needed
      }
      //display calendar using ng-repeat

    };    

    $scope.removeCalendar = function() {

    }





    //--------------------CALENDAR CODE END---------------------------
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
