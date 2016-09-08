exports.config = {
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
  specs: [
    'signout.e2e.js',
    'feedback/feedback.e2e.js'
  ],
  onPrepare: function () {
    loginHelper = require('./login.e2e.js')
  },
  frameworks: ['jasmine']
};