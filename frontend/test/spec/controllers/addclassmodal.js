'use strict';

describe('Controller: AddclassmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var AddclassmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddclassmodalCtrl = $controller('AddclassmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddclassmodalCtrl.awesomeThings.length).toBe(3);
  });
});
