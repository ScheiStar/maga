'use strict';

describe('Controller: AdmindashCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AdmindashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmindashCtrl = $controller('AdmindashCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmindashCtrl.awesomeThings.length).toBe(3);
  });
});
