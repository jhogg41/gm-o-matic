'use strict';

// Declare app level module which depends on views, and components
angular.module('gomApp', [
   'ngRoute',
   'ngMaterial',
   'djangoRESTResources',
   'gomApp.player_profile', // Must be before .character for route precedence!
   'gomApp.character',
   'gomApp.meta',
])
.config(['$routeProvider', function($routeProvider) {
   $routeProvider.otherwise({redirectTo: '/'});
}])
.config(['$mdThemingProvider', function($mdThemingProvider) {
   $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('amber');
}]);
