'use strict';
function userService($http, API, auth) {
  var self = this;

  self.login = function(email, password) {
    return $http.post(API + '/authenticate', {
        email: email,
        password: password
      })
  }

  self.isLoggedIn = function(){
    return auth.isAuthed();
  }

  self.logout = function(){
    return auth.logout();
  }    
}

services
  .service('User', userService)


