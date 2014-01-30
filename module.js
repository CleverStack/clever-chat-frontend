define(['angular'], function (ng) {
  'use strict';

  ng.module('cs_chat.controllers', []);
  ng.module('cs_chat.services', []);

  var module = ng.module('cs_chat', [
    'cs_common',
    'cs_chat.controllers'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplateProvider) {

      CSTemplateProvider.setPath('/modules/cs_chat/views');

      $routeProvider
        .when('/chat', {
          templateUrl: CSTemplateProvider.view('chat'),
          controller: 'CSChatController',
          public: true
        });

    }

  ]);

  return module;

});
