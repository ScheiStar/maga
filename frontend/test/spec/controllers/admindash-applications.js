'use strict';

describe('Controller: AdmindashApplicationsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AdmindashApplicationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmindashApplicationsCtrl = $controller('AdmindashApplicationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmindashApplicationsCtrl.awesomeThings.length).toBe(3);
  });
});
