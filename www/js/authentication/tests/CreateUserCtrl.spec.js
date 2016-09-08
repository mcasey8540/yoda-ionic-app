'use strict';

describe('CreateUserCtrl', function () {
  var res
  var $state
  var CreateUserCtrl
  var scope
  var SignUp
  var $q
  var $ionicViewSwitcher
  var $rootScope;

  beforeEach(module('app.controllers'));

  beforeEach(module(function ($provide) {

    $provide.service('$state', function () {
      this.go = angular.noop;
    });

    $provide.service('$ionicViewSwitcher', function () {
      this.nextDirection = angular.noop;
    });

    $provide.service('SignUp', function () {
      this.createUser = angular.noop;
      this.saveToken = angular.noop;
    });

  }));

  beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _$state_, _$ionicViewSwitcher_, _SignUp_) {
    scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $state = _$state_;
    $q = _$q_;
    SignUp = _SignUp_;
    $rootScope.SignUp = {
      email: 'mike@aventr.com',
      token: 1234
    };
    $ionicViewSwitcher = _$ionicViewSwitcher_;
    CreateUserCtrl = _$controller_('CreateUserCtrl', {
      $scope: scope
    });
  }));

  describe('State', function () {

    it('should expose a register object to the view', function () {
      expect(scope.register).toBeDefined();
      expect(angular.isObject(scope.register)).toBe(true);
    });

  });

  describe('Successful user creation', function () {
    
    beforeEach(function () {
      res = {
        "data": {
          "success": true,
          "email": "mike@aventr.com",
          "password": "apple123",
          "token": "FAKETOKEN"
        }
      };      
      spyOn(SignUp, 'createUser').and.returnValue($q.resolve(res));
      scope.register.password = 1234;
      scope.createUser();
    })

    it('call create user service', function () {
      expect(res.data.token).toEqual('FAKETOKEN');
      expect(SignUp.createUser).toHaveBeenCalled();
      expect(SignUp.createUser.calls.count()).toBe(1);
      scope.$apply();
    })

    it('should save token', function () {
      spyOn(SignUp,'saveToken')
      scope.$apply();
      expect(SignUp.saveToken).toHaveBeenCalled();
    })

    it('should go to next view', function () {
      spyOn($ionicViewSwitcher, 'nextDirection');
      scope.$apply();
      expect($ionicViewSwitcher.nextDirection).toHaveBeenCalledWith('forward');
    })

  })

  describe('Invalid user creation', function () {

    beforeEach(function () {
      res = { 
        data: { 
          success: false,
          message: "Email, Token, and Password must be sent"
        }
      };

      spyOn(SignUp, 'createUser').and.returnValue($q.reject(res));
      scope.createUser();
    })

    it('call create user service', function () {
      scope.$apply();
      expect(SignUp.createUser).toHaveBeenCalled();
      expect(SignUp.createUser.calls.count()).toBe(1);
    })

    it('should show error message', function () {
      scope.$apply();
      expect(scope.register.message).toEqual(res.data.message);
    })

    it('should not save token', function () {
      spyOn(SignUp,'saveToken')
      expect(SignUp.saveToken).not.toHaveBeenCalled();
    })

    it('should not go to next view', function () {
      spyOn($ionicViewSwitcher, 'nextDirection');
      scope.$apply();
      expect($ionicViewSwitcher.nextDirection).not.toHaveBeenCalledWith('forward');
    })
  })
})