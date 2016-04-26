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
    });

    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.predicate = predicate;
      $scope.ugh = orderBy($scope.ugh, predicate);
    };

    $scope.acceptTutorRequest = function(requestInfo) {
      var request_data = {
        "userID": requestInfo.tutor_id,
        "className": requestInfo.tr_classtype,
        "classNum": requestInfo.tr_classnum,
        "requestType": requestInfo.tr_request_type,
        "requestChoice": "Approve"
      }

      contactAdminFactory.adjustTutorRequest(request_data);
    }

    $scope.denyTutorRequest = function(requestInfo) {
      var request_data = {
        "userID": requestInfo.tutor_id,
        "className": requestInfo.tr_classtype,
        "classNum": requestInfo.tr_classnum,
        "requestType": requestInfo.tr_request_type,
        "requestChoice": "Deny"
      }

      contactAdminFactory.adjustTutorRequest(request_data);
    }

    $scope.signOut = function() {
      userFactory.signOut();
    };
  });
