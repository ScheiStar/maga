'use strict';

describe('Controller: HelpdashCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var HelpdashCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HelpdashCtrl = $controller('HelpdashCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HelpdashCtrl.awesomeThings.length).toBe(3);
  });
});
