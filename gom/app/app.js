'use strict';

// Declare app level module which depends on views, and components
angular.module('gomApp', [
   'ngRoute',
   'djangoRESTResources',
   'gomApp.character',
   'gomApp.header',
   'gomApp.player_profile',
   'gomApp.version'
]).
config(['$routeProvider', function($routeProvider) {
   $routeProvider.otherwise({redirectTo: '/'});
}]);
