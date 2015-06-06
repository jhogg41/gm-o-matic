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
   this.resetForGame = function(game) {
      this.game = game;
      this.newClassName = '';
      this.attrClasses = [
         {
            name: 'Skilleg',
         },
         {
            name: 'Quirkeg',
         }
      ];
   };
   this.addNewAttrClass = function() {
      this.attrClasses.push({
         name: this.newClassName
      });
      this.newClassName = '';
   };

   this.resetForGame(GameService.game);

   var gc = this;
   $scope.$on('game:changed', gc.resetForGame(GameService.game));
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
