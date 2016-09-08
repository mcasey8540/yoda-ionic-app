function TeamService($http, API, auth) {
  var self = this;

  self.createTeam = function (team) {
    return $http.post(API + '/api/team/create', {
      teamName: team
    })
  }
  self.checkForTeam = function (team) {
    return $http.post(API + '/api/team/verify', {
      teamName: team
    })
  }
  self.searchMembers = function (teamID, keyword) {
    return $http.get(API + '/api/team/' + teamID + '/members?search=' + keyword);
  }
  self.getMembers = function (teamID) {
    return $http.get(API + '/api/team/' + teamID + '/members');
  }
}
services
  .service('Team', TeamService)