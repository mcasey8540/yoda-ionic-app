describe('sign out', function() {
  //login helper
  loginHelper.loginToPage();
  //init variables
  var sideMenu = element(by.css('.button.button-icon.button-clear.ion-navicon'));
  var settingsButton = element(by.css('[ui-sref="sideMenu.settings"]'));
  it('open side menu and settings', function () {
    sideMenu.click();
    settingsButton.click();
  });
  it('should click sign out', function () {
    element(by.css("[ng-click='logout()']")).click();
  });
  it('should be redirected to login', function () {
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/signin');
  });
});