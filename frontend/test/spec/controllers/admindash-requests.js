'use strict';

describe('Controller: AdmindashRequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AdmindashRequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmindashRequestsCtrl = $controller('AdmindashRequestsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmindashRequestsCtrl.awesomeThings.length).toBe(3);
  });
});
