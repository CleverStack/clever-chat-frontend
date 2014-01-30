require.config({
  baseUrl: '/modules/cs_chat',
  packages: [
    {
      name: 'cs_account',
      location: '../cs_account'
    },
    {
      name: 'cs_common',
      location: '../cs_common'
    },
    {
      name: 'cs_session',
      location: '../cs_session'
    },
    {
      name: 'users',
      location: '../users'
    },
    {
      name: 'cs_chat',
      location: '../cs_chat'
    }
  ],
  paths: {
    jquery: '../../components/jquery/jquery',
    angular: '../../components/angular/angular',
    ngResource: '../../components/angular-resource/angular-resource',
    ngRoute: '../../components/angular-route/angular-route',
    ngSanitize: '../../components/angular-sanitize/angular-sanitize',
    socketio: '../../components/socket.io-client/dist/socket.io'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    },
    socketio: {
        exports: 'io'
    }
  }
});
