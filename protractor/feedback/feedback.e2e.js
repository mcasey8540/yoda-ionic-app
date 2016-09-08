describe('add new feedback', function() {
  //login helper
  loginHelper.loginToPage();
  //init variables
  var titleHolder = element(by.model('newFeed.title'));
  var contenHolder = element(by.model('newFeed.content'));
  var submitButton = element(by.buttonText("Submit Feedback"));
  var openFeedback = element(by.css("[ng-click='newFeedback()']"));
  var closebutton = element(by.css('[ng-click="closeFeedback()"]'));
  //new feedback
  function newFeedback(title, content) {
    openFeedback.click();
    titleHolder.sendKeys(title);
    contenHolder.sendKeys(content);
    closebutton.click();
  }
  it('open new feedback modal and add new feedback', function() {
    newFeedback('title tests', 'content tests');
  });
});