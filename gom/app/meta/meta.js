'use strict';

angular.module('gomApp.meta', [
   'djangoRESTResources'
])

.factory('GameService', ['djResource', function(djResource) {
   return djResource('/api/game/:id');
}])

.service('MetaService', ['$rootScope', 'GameService',
function($rootScope, GameService) {
   var ms = this;
   this.game = GameService.get({id:1}); // FIXME: Last used game
   this.switchGame = function(id) {
      // Called to switch game
      ms.game = GameService.get({id: id});
      $rootScope.$broadcast('game:changed', ms.game.id);
   };
   this.user = {
      'username': 'jhogg',
      'activeChar': 'Fred Bloggs'
   };
   this.user.is_gm = function(character) {
      // Return true is this user has GM permissions on the game of given
      // character.
      return true;
   };
}])

.controller('MetaCtrl', [
'$mdDialog', '$mdSidenav', '$mdUtil', '$scope', 'MetaService',
function($mdDialog, $mdSidenav, $mdUtil, $scope, MetaService) {
   var meta = this;
   this.user = MetaService.user;
   // Current game
   this.game = MetaService.game;
   $scope.$on('game:changed', function(event, id) {
      meta.game = MetaService.game;
   });

   this.toggleMenu = $mdUtil.debounce(function(){
      $mdSidenav('menu').toggle();
   });
   this.gameSwitcher = function(){
      $mdDialog.show({
         clickOutsideToClose: 'true',
         controller: 'GameSwitchCtrl',
         controllerAs: 'gsw',
         templateUrl: 'meta/gameSwitch.html',
         })
      .then(function(game) {
         MetaService.switchGame(game);
      });
   };
}])

.controller('GameSwitchCtrl', ['$mdDialog', 'GameService', 'MetaService',
function($mdDialog, GameService, MetaService) {
   this.games = GameService.query();
   this.game = MetaService.game.name;
   this.cancel = function() {
      $mdDialog.cancel();
   };
   this.switch = function() {
      $mdDialog.hide(this.game.id);
   };
}]);
