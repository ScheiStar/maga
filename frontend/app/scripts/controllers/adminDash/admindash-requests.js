'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashRequestsCtrl
 * @description
 * # AdmindashRequestsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashRequestsCtrl', function ($scope, userFactory, $filter, contactAdminFactory) {


    $scope.tutorRequests = new Array();
    var user = {};
    //console.log('before');
    contactAdminFactory.getTutorRequests().then(function(data){
      //console.log('im back');
      //console.log(data.data[0].tr_classnum);
      $scope.tutorRequests = data.data;
      console.log('LOOK');
      console.log(data);
    });

    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.tutorRequests = orderBy($scope.tutorRequests, predicate);
    };

    $scope.acceptTutorRequest = function(requestInfo) {
      console.log('accepting');
      var request_data = {
        "userID": requestInfo.tutor_id,
        "className": requestInfo.tr_classtype,
        "classNum": requestInfo.tr_classnum,
        "requestType": requestInfo.tr_request_type,
        "grade": requestInfo.tr_grade,
        "requestChoice": "Approve"
      }
      console.log('DATA ACCEPT');
      console.log(request_data);

      contactAdminFactory.adjustTutorRequest(request_data);
    }

    $scope.denyTutorRequest = function(requestInfo) {
      console.log('denying');
      var request_data = {
        "userID": requestInfo.tutor_id,
        "className": requestInfo.tr_classtype,
        "classNum": requestInfo.tr_classnum,
        "requestType": requestInfo.tr_request_type,
        "grade": requestInfo.tr_grade,
        "requestChoice": "Reject"
      }
      console.log('DATA DENY');
      console.log(request_data);

      contactAdminFactory.adjustTutorRequest(request_data);
    }

    $scope.what = function() {
      console.log('WHAT');
    }

    $scope.signOut = function() {
      userFactory.signOut();
    };
  });
