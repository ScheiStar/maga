'use strict';

describe('Controller: TesttablwCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var TesttablwCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TesttablwCtrl = $controller('TesttablwCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TesttablwCtrl.awesomeThings.length).toBe(3);
  });
});
