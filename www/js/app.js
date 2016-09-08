'use strict';

var app = angular.module('app', ['ngCordova', 'ionic', 'app.filters', 'app.controllers', 'app.routes', 'app.services', 'app.config', 'app.directives', 'angular-svg-round-progressbar'])

app.run(function($ionicPlatform, $state, User) {
  $ionicPlatform.ready(function() {
    if (User.isLoggedIn()) {
      $state.go('app.tabs.feedback');
    }
    else {
      $state.go('start');
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

  });
})

app.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('');
})