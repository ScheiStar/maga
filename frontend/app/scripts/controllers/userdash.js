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

    console.log('Look');
  	
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

    console.log("in userDash now fucl");

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
    $scope.flag = 0;
    //Allows a tutor to send add class request to admin
    $scope.addClassInfo = function() {
        //error control -- need to add specific error control for scope
        if(($scope.myClassType == "" || ($scope.myText == "" || $scope.myText.length < 4) || $scope.myClassGrade == "") && $scope.flag == 0) {
          console.log("Error");
          console.log($scope.flag);
          $scope.flag = 0;
        }
        else {
          $scope.flag = 1;
          console.log($scope.flag);
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
        }
        
    }
    
    $scope.clearFields = function() {
      $scope.myClassType = null;
      $scope.myClassGrade = null;
      $scope.myText = null;
    }

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
        alert("You did not drop or add any classes");
      }
      //need to add conditional to add classes
      else {
        alert("Classes successfully dropped");
        //Store drop class data
        var addclass_data = { 
          'userID': $scope.user,
          'className': $scope.dropClass.classType,
          'classNum': $scope.dropClass.classNumber,
          'requesType': 'drop'
        };
        $http.post("/echo/json/", addclass_data).success(function(addclass_data, status) {
            console.log("dropped");
            $scope.hello = addclass_data;
        })
        
      }
      

      //post request to drop classess in drop arr

    }

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

    // $scope.ok = function () {
    //   $uibModal.close($scope.selected.item);
    // };

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

    $scope.openStuff = [];
    
    $scope.openJson = function() {
      console.log("openJson");

    //   $http({
    //   method: 'GET',
    //   url: 'data.json'
    //   //params: {'userID': userID}
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     // factory version
    //     // UserData.info = response.data;
    //     // console.log(UserData.info[1]);
    //     // console.log('success');
        
    //     $scope.openStuff = response;
    //     console.log($scope.openStuff.data[]);
        
    //   }, function errorCallback(response) {
    //     console.log('fail');
    //   });
    // }

    //need to remove from function in future
    $scope.displayCalendar = function(){
      console.log("enter displayCalendar");
      //test string
      // var calendarstuff = "'sun':'2,3,4','tue':'1,2,3','wed':'4'";
      $http.get('data.json')
            .success(function(data) {\
                console.log("Ayy")
                angular.extend(_this, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find someFile.json');
            });
      
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

    };    

    $scope.removeCalendar = function() {

    }





    //--------------------CALENDAR CODE END---------------------------
    //--------------------CALENDAR CODE 2-----------------------------

    $scope.ugh = new Array();
    $scope.real = new Array();
    $scope.eee = function() {alert("test)");}
    $scope.loadCalendar = function() {
      console.log("openedCalendar");
      var shitData = {"data":
        [{"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
        {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
        {"Sun": false, "Mon": true ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
        {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": true ,"Fri": false },
        {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
        {"Sun": false, "Mon": false ,"Tues": false ,"Wed": true ,"Thurs": false ,"Fri": false },
        {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
        {"Sun": true, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false }]};
    
        $scope.ugh = shitData.data;
        var start = 2;
        var end = 3;
        for (var x = 0; x<$scope.ugh.length; x++) {
          $scope.ugh[x].time = start + ':00 - ' + end + ':00';
          start++;
          end++;
        }
    }
    console.log('ugh');
    console.log($scope.ugh);
    //$scope.real = $scope.ugh[0];


    //====================CALENDAR CODE END============================

    //GET request retreives current user id and displays it to pages
    //Used in Add/Drop class' post request to add and drop classes
    //Used in home page to display welcome "tutor name"
   
    $scope.getData = []
    //Save class data
    $http({
      method: 'POST',
      url: 'http://54.86.70.62/requestClass'
      //params: {'userID': userID}
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        // factory version
        // UserData.info = response.data;
        // console.log(UserData.info[1]);
        // console.log('success');
        
        $scope.getData = response;
        console.log("logDAAA");
        console.log($scope.getData.data[1]);
        
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
