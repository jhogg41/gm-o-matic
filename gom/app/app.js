'use strict';

// Declare app level module which depends on views, and components
angular.module('gomApp', [
   'ngRoute',
   'ngMaterial',
   'ngMessages',
   'djangoRESTResources',
   'gomApp.player_profile', // Must be before .character for route precedence!
   'gomApp.character',
   'gomApp.meta',
   'gomApp.user',
])
.config(['$routeProvider', function($routeProvider) {
   $routeProvider.otherwise({redirectTo: '/'});
}])
.config(['$mdThemingProvider', function($mdThemingProvider) {
   $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('amber');
}]);
