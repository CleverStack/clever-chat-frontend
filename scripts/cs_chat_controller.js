define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_chat.controllers')
  .controller('CSChatController', [
    '$scope',
    'CSSession',
    'CSSessionHelpers',
    '$log',
    function ($scope, CSSessionProvider, CSSessionHelpersProvider, $log) {
      $scope.helpers = CSSessionHelpersProvider;

      console.log('Chat controller...');

      // update current user when it changes
      $scope.$watch(CSSessionProvider.getCurrentUser, function() {
          $scope.user = CSSessionProvider.getCurrentUser() || false;
      });

      $scope.users = [];
      $scope.messages = [];
      $scope.hideRoomMsgs = true;

      // todo: work out why io is not defined, require should output io when loading socket-io component
      var socket = io.connect('http://localhost:8080');

      socket.on('connect', function(data) {

          // socket connected
          console.log('socket connected');
          $scope.connect(data);

      });

      socket.on('disconnect', function(data) {

          // socket disconnected
          console.log('socket disconnected');
          $scope.disconnect(data);

      });

      $scope.$on('$destroy', function(data) {

          console.log('scope destoyed...');
          socket.removeListener(this);
          $scope.disconnect(data);

      });

      $scope.connect = function(data) {

          socket.emit('connect', $scope.user);

      };

      $scope.disconnect = function(data) {

          socket.emit('disconnect', $scope.user);

      };

      // Incoming active user list
      socket.on('userlist', function(data) {

          console.log('updated userlist');
          $scope.users = data;
          $scope.$apply();

      });

      // Incoming message
      socket.on('chatmessage', function(data) {

          console.log('message recieved: ' + data.text);
          $scope.messages.push({
              id: data.id,
              text: data.text,
              uid: data.uid,
              user: data.user,
              type: data.type
          });
          if(!$scope.$$phase) {
              $scope.$apply();
          }

      });

      // Outgoing message
      $scope.sendMsg = function(msg) {

          console.log('sending message: '+msg.text);
          socket.emit('chatmessage', msg);
          $scope.messages.push(msg);
          if(!$scope.$$phase) {
              $scope.$apply();
          }

      };

      // New message by user
      $scope.newMsg = function() {

          var msg = {
              id: new Date().getTime(),
              text: $scope.message,
              uid: $scope.user.id,
              user: $scope.user.username,
              type: "user"
          };
          $scope.sendMsg(msg);
          $scope.message = '';

      };

      // update user list
      socket.emit('userlist', null);

    }
  ]);

});
