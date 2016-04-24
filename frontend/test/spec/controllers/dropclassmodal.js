'use strict';

describe('Controller: DropclassmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var DropclassmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DropclassmodalCtrl = $controller('DropclassmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DropclassmodalCtrl.awesomeThings.length).toBe(3);
  });
});
