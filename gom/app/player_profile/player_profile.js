'use strict';

angular.module('gomApp.player_profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider.when('/global/:playerName/profile', {
      templateUrl: 'player_profile/player_profile.html',
      controller: 'PlayerCtrl',
      controllerAs: 'player'
   });
}])

.controller('PlayerCtrl', [function() {

}]);
