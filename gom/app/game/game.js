'use strict';

angular.module('gomApp.game', [
   'djangoRESTResources', 'ngCookies', 'ngRoute'
])

/*********************************************************
 * Routes
 *********************************************************/
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game/setup', {
    templateUrl: 'game/setup.html',
    controller: 'GameSetupController',
    controllerAs: 'gs'
  });
}])

/*********************************************************
 * Controllers
 *********************************************************/
.controller('GameSetupController', [
'$scope', 'GameService',
function($scope, GameService) {
   var gc = this;
   gc.game = GameService.game;
   $scope.$on('game:changed', function(event, id) {
      gc.game = GameService.game;
   });
}])

/*********************************************************
 * Services
 *********************************************************/
.service('GameService', [
'$cookies', '$rootScope', 'djResource',
function($cookies, $rootScope, djResource) {
   var GameResource = djResource('/api/game/:id', {id:'@id'});

   this.game = null;
   this.switchGame = function(id) {
      this.game = GameResource.get({id:id});
      $rootScope.$broadcast('game:changed', id);
      $cookies.put('game:id', id);
   };
   this.listAll = GameResource.query;

   var gameid = $cookies.get('game:id');
   if(gameid) this.switchGame(gameid);
}]);
