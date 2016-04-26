'use strict';

describe('Controller: ContactadminCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var ContactadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactadminCtrl = $controller('ContactadminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactadminCtrl.awesomeThings.length).toBe(3);
  });
});
