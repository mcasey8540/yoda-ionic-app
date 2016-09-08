'use strict';
controllers
  .controller('CreateUserCtrl',
    ['$scope', '$rootScope', '$ionicViewSwitcher', 'SignUp', '$state',
      function ($scope, $rootScope, $ionicViewSwitcher, SignUp, $state) {
        $scope.register = {};

        $scope.createUser = function () {
          SignUp.createUser($rootScope.SignUp.email, $scope.register.password, $rootScope.SignUp.inviteToken)
          .then(createSuccess, createFailure)
        }

        function createSuccess (res) {
          if (res.data.success) {
            SignUp.saveToken(res.data.token);
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('joinTeam');
          }
        }

        function createFailure (res) {
          $scope.register.message = res.data.message
        }
      }
    ])