'use strict';

// Declare app level module which depends on views, and components
angular.module('gomApp', [
  'ngRoute',
  'gomApp.player_profile',
  'gomApp.character',
  'gomApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
