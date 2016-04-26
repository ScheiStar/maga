'use strict';

describe('Controller: AppmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AppmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppmodalCtrl = $controller('AppmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppmodalCtrl.awesomeThings.length).toBe(3);
  });
});
