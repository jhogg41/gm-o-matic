'use strict';

// Declare app level module which depends on views, and components
angular.module('gomApp', [
   'ngRoute',
   'ngMaterial',
   'djangoRESTResources',
   'gomApp.character',
   'gomApp.meta',
   'gomApp.player_profile',
]).
config(['$routeProvider', function($routeProvider) {
   $routeProvider.otherwise({redirectTo: '/'});
}]);
