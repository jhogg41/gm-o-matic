'use strict';

angular.module('gomApp.player_profile', [
   'ngRoute', 'djangoRESTResources'
])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider.when('/global/:playerName/profile', {
      templateUrl: 'player_profile/player_profile.html',
      controller: 'PlayerCtrl',
      controllerAs: 'player'
   });
}])

.controller('PlayerCtrl', ['djResource', function(djResource) {
   var pctrl = this;
   var Player = djResource('/api/user/:userId');

   var p = Player.get({userId:1}, function() {
      pctrl.email = p.email;
   });
}]);
