'use strict';

describe('Controller: UserdashCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var UserdashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserdashCtrl = $controller('UserdashCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserdashCtrl.awesomeThings.length).toBe(3);
  });
});
