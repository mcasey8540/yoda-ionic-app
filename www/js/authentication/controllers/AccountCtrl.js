'use strict';

controllers
  .controller('AccountCtrl',
    ['$scope', '$rootScope', '$ionicViewSwitcher', 'Account',  '$state',
      function ($scope, $rootScope, $ionicViewSwitcher, Account, $state) {
        $scope.account = {};

        $scope.createAccount = function () {
          Account.createAccount($rootScope.SignUp.teamName, $scope.account.fName, $scope.account.lName)
          .then(finalizeCreate);
        }

        $scope.setCurrentAccount = function (account) {
          Account.setCurrentAccount(account);
          if(Account.getCurrentTeamId()){
            $state.go('app.tabs.feedback');
          }
        }

        $scope.getUserAccounts = function(){
          Account.getUserAccounts()
            .then(displayUserAccounts)
        }

        function displayUserAccounts(res){
          if(res.data.success){
            $scope.account.userAccounts = res.data.accounts;
          }
        }

        function finalizeCreate (res) {
          if (res.data.success) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('app.tabs.feedback');
            $scope.account = {};
            $rootScope.SignUp = {};
            Account.setCurrentAccount(res.data.account);
            $scope.getUserAccounts();
          }
          else if (res.status == 400 || res.status == 404) {
            $rootScope.SignUp.createError = res.data.message;
          }
        }

        $scope.getUserAccounts();
      }
    ]);