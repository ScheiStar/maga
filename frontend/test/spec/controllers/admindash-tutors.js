'use strict';

describe('Controller: AdmindashTutorsCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AdmindashTutorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmindashTutorsCtrl = $controller('AdmindashTutorsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmindashTutorsCtrl.awesomeThings.length).toBe(3);
  });
});
