'use strict';

describe('Team Service', function(){
	var Team;
	var teamName;
	var teamId;
	var searchTerm;

	beforeEach(angular.mock.module('app.services'));

	beforeEach(inject(function(_Team_, _API_, _$httpBackend_){
		teamName = 'Happster'
		teamId = 'T123';
		searchTerm = 'Jonathan';
		API = _API_;
		Team = _Team_;
		httpBackend = _$httpBackend_;

		httpBackend.whenPOST(API + '/api/team/create',{
			teamName: teamName
		}).respond({
			success: true,
	  	teamName: teamName,
	  	message: "Team successfully created"
		});

		httpBackend.whenPOST(API + '/api/team/verify',{
			teamName: teamName
		}).respond(	{
		  teamName: teamName,
		  teamExists: false,
		  canCreate: true,
		  canJoin: true,
		  message: "Good news! HappsterTeam doesnt exist but you can create it."
		});

  	httpBackend.whenGET(API + "/api/team/" + teamId + "/members").respond({
		  "success": true 
		});

  	httpBackend.whenGET(API + "/api/team/" + teamId + "/members?search=" + searchTerm).respond({
		  "success": true 
		});		


	}));

	describe('Initial State', function(){

		it('should define createTeam', function(){
			expect(Team.createTeam).toBeDefined();
		})

		it('should define createTeam', function(){
			expect(Team.checkForTeam).toBeDefined();
		})		

	})

	describe('Successful team creation', function(){

		it('should call createTeam', function(){
			Team.createTeam({teamName: teamName}).then(function(response){
				expect(response.data.success).toEqual(true);
				expect(response.data.teamName).toEqual(teamName);
			})
		})
	
	})

	describe('Successful team exists verificaiton', function(){

		it('should call checkForTeam', function(){
			Team.checkForTeam({teamName: teamName}).then(function(response){
				expect(response.data.success).toEqual(true);
				expect(response.data.teamExists).toEqual(false);
			})
		})
	
	})

	describe('Successful getMembers for team', function(){

    it('should return success response', function(){
    	Team.getMembers(teamId).then(function(response) {
  			expect(response.data.success).toEqual(true);
  		})
  		httpBackend.flush();
    });

	})

	describe('Successful searchMembers for team', function(){

    it('should return success response', function(){
    	Team.searchMembers(teamId, searchTerm).then(function(response) {
  			expect(response.data.success).toEqual(true);
  		})
  		httpBackend.flush();
    });

	})


})