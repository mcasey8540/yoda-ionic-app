exports.loginToPage = function () {
  describe('login reusable', function() {
    browser.ignoreSynchronization = true;

    it('redirect to feedback', function() {
    	browser.get('localhost:8100/#/signin');
        element(by.model('data.email')).sendKeys('test@aventr.com');
        element(by.model('data.password')).sendKeys('pass');
        element(by.buttonText("Login")).click();

        return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
              return /feedback/.test(url);
            });
        }, 6000);
    })
})
}