'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ApplicationformCtrl
 * @description
 * # ApplicationformCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')

.controller('formController', function($scope, $state, contactAdminFactory) {
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.formData.cal = {};
    $scope.formData.calArray = [];
    $scope.formData.courseDictArray = [];
    var courseDict = {};

    // function to process the form
    $scope.processForm = function() {
//        console.log($scope.formData.applicant_first_name);
//        console.log($scope.tutorForm.$valid);   
        if($scope.tutorForm.$valid == true){
        //processes the calendar into strings
        for (var day in $scope.formData.cal){
            $scope.formData.cal[day] = $scope.formData.cal[day].toString();
            $scope.formData.calArray.push({'day':day, 'times':$scope.formData.cal[day]});
        }
        //processes the input courses into array of dictionaries where 'courseNum':"CSE2341",'grade':"A"
        for(var i = 0; i < (Object.keys($scope.formData.courseArray).length); i++){
            console.log((Object.keys($scope.formData.courseArray).length));
//            console.log("Course Array: ", $scope.formData.courseArray);
            $scope.formData.courseDictArray.push({'courseType':$scope.formData.courseArray[i], 'courseNum':$scope.formData.courseArray[i+1], 'grade':$scope.formData.courseArray[i+2]});
            i = i+2;
        }
        delete $scope.formData.courseArray; //delete because its not needed in formData anymore!
        delete $scope.formData.cal;
        console.log("FORM_DATA: ", $scope.formData);
//        console.log($scope.formData.email);
        var user_data = {
          'email': $scope.formData.email,
          'message': '',
          'type': "appConfirm"
        };
//        contactAdminFactory.emailAdmin(user_data);
//        //work on hooking this up to database
//        return $http({
//          method: 'POST',
//          url: 'http://54.86.70.62/login',
//          data: user_json
//        }).then(function(data){
//            var userToken = data.data;
//            localStorage.setItem("token", userToken);
//            var remember = auth;
//            $state.go("userDash");
//            return data;
//        }, function errorCallback(response) {
//          console.log("Failure!");
//              console.log(response);
//              alert("Log In Unsuccessful");
//    });



        alert('Thanks for Applying!');
        $state.go('login');

    };

    var initialTimes = JSON.stringify({"data":
    [{"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false },
    {"Sun": false, "Mon": false ,"Tues": false ,"Wed": false ,"Thurs": false ,"Fri": false }]});
    //console.log('about to show some shit');
    console.log(initialTimes);
    $scope.addRealTime = function($index, $day) {
      if($day == 'Sun')
        initialTimes.data[$index].Sun = true;
      else if($day == 'Mon')
        initialTimes.data[$index].Mon = true;
      else if($day == 'Tues')
        initialTimes.data[$index].Tues = true;
      else if($day == 'Wed')
        initialTimes.data[$index].Wed = true;
      else if($day == 'Thurs')
        initialTimes.data[$index].Thurs = true;
      else
        initialTimes.data[$index].Fri = true;

      //console.log(initialTimes);
    }
    // $scope.addTime = function($day,$time) {
    //     if (angular.isDefined($scope.formData.cal[$day])){
    //         if($scope.formData.cal[$day].indexOf($time) != -1)
    //             $scope.formData.cal[$day].splice($scope.formData.cal[$day].indexOf($time), 1); //splice removes the element without leaving holes
    //         else
    //             $scope.formData.cal[$day].push($time);
    //     }
    //     else{
    //         $scope.formData.cal[$day] = [];
    //         $scope.formData.cal[$day].push($time);
    //     }
    //     $scope.formData.cal[$day].sort();
    // };
});

    $scope.goFormTwo = function(){
        console.log('blalalal');
        if ($scope.tutorForm.$valid){
            console.log('blarg');
            $state.go('form.interests');
        }
        else
            alert('Invalid Form... :(');
    };

    
