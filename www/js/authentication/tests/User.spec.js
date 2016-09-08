'use strict';

describe('user service', function() {
	var User;
	var auth;
	var API;
	var httpBackend;
	var $window;

	beforeEach(angular.mock.module('app.services'));
  	
  	beforeEach(inject(function( _API_, _auth_, _User_, _$window_, _$httpBackend_) {
    	User = _User_;
    	auth = _auth_;
    	$window = _$window_;
    	API = _API_;
    	httpBackend = _$httpBackend_;

    	httpBackend.whenPOST(API + "/authenticate", {'email' : 'test@aventr.com', 'password' : 'p@ssword'}).respond({	
		    success: true,
		    message: "Successful Login!",
		    token: "THISisAfakeTOKEN"
    	})
  	}));  	

  	it('should login an user', function() {
  		User.login('test@aventr.com', 'p@ssword').then(function(response) {
  			expect(response.data.success).toEqual(true);
  		})
  		httpBackend.flush();
  	})

  	it('should check if user is logged in', function() {
  		expect(User.isLoggedIn()).toEqual(false);
  	})

  	it('should log out the user', function() {
  		expect(User.logout()).toEqual(true);
  	})

})