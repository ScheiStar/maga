'use strict';

describe('Controller: TutorquitCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var TutorquitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TutorquitCtrl = $controller('TutorquitCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TutorquitCtrl.awesomeThings.length).toBe(3);
  });
});
