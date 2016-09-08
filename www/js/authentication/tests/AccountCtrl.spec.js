'use strict';

describe('AccountCtrl', function () {
  let res
  let $state
  let AccountCtrl
  let scope
  let Account
  let $q
  let $ionicViewSwitcher
  let $rootScope;

  beforeEach(module('app.controllers'));

  beforeEach(module(function ($provide) {
    $provide.service('$state', function () {
      this.go = angular.noop;
    });

    $provide.service('$ionicViewSwitcher', function () {
      this.nextDirection = angular.noop;
    });

    $provide.service('Account', function () {
      this.createAccount = angular.noop;
      this.getUserAccounts = angular.noop;
      this.setCurrentAccount = angular.noop;
      this.getCurrentTeamId = angular.noop;
    });
  }));

  beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _$state_, _$ionicViewSwitcher_, _Account_) {
    scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $state = _$state_;
    $q = _$q_;
    Account = _Account_;
    $ionicViewSwitcher = _$ionicViewSwitcher_;

    res = {
      status: 200,
      data: {
        success: true,
        teamName: 'Happster',
        teamId: '577ed3e58b80f5920f9b56eb',
        message: 'Account successfully added to Happster.'
      }
    };

    getUserAccountsSpy = spyOn(Account, 'getUserAccounts').and.returnValue($q.resolve(res));

    AccountCtrl = _$controller_('AccountCtrl', {
      $scope: scope
    });

  }));
  describe('State', function () {
    it('should expose a account object to the view', function () {
      expect(scope.account).toBeDefined();
      expect(angular.isObject(scope.account)).toBe(true);
      scope.getUserAccounts();
      expect(res.data.success).toEqual(true);
    });
  });

  describe('create successful account', function () {
    beforeEach(function () {
      $rootScope.SignUp = {
        confirmMessage: 'Email successfully verified.'
      };      
      spyOn(Account, 'createAccount').and.returnValue($q.resolve(res));
      $rootScope.SignUp.teamName = 'test@aventr.com';
      scope.account.fName = 'jon';
      scope.account.lName = 'rod';
      scope.createAccount();
    })
    it('should call create account service', function () {
      expect(res.data.success).toEqual(true);
      expect(Account.createAccount).toHaveBeenCalled();
      expect(Account.createAccount.calls.count()).toBe(1);
      expect(Account.createAccount).toHaveBeenCalledWith('test@aventr.com', 'jon', 'rod');
    })
    it('should go to next view', function () {
      spyOn($ionicViewSwitcher, 'nextDirection');
      scope.$apply();
      expect($ionicViewSwitcher.nextDirection).toHaveBeenCalledWith('forward');
    })
    it('set user account', function () {
      res.data.account = 'test'
      spyOn(Account, 'setCurrentAccount');
      scope.$apply();
      expect(Account.setCurrentAccount).toHaveBeenCalledWith('test');
    })
  })

  describe('try to create invalid account', function () {
    beforeEach(function () {
      res = {
        status: 400,
        data: {
          message: 'Team name, first name and last name required.'
        }
      };
      $rootScope.SignUp = {
        createError: 'Team name, first name and last name required.'
      }  
      spyOn(Account, 'createAccount').and.returnValue($q.resolve(res));
      scope.createAccount();
      scope.$apply();
    })
    it('should call create account service', function () {
      expect(Account.createAccount).toHaveBeenCalled();
      expect(Account.createAccount.calls.count()).toBe(1);
    })
    it('should save error message in rootscope', function () {
      expect($rootScope.SignUp.createError).toEqual(res.data.message);
    })
    it('should not go to next view', function () {
      spyOn($ionicViewSwitcher, 'nextDirection');
      expect($ionicViewSwitcher.nextDirection).not.toHaveBeenCalledWith('forward');
    })
  })

  describe('try to set current account', function () {
    beforeEach(function () {
      account = 'team';
      spyOn($state, 'go').and.returnValue('app.tabs.feedback');
      spyOn(Account, 'getCurrentTeamId').and.returnValue($q.resolve(true));
      spyOn(Account, 'setCurrentAccount').and.returnValue($q.resolve(true))
      scope.setCurrentAccount(account);
    })
    it('expect set current account to be called', function () {
      expect(Account.setCurrentAccount).toHaveBeenCalled();
    })
    it('should expect to go to feedback page', function () {
      expect(Account.getCurrentTeamId).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('app.tabs.feedback');
    })
  })
})