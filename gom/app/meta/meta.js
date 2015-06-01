'use strict';

angular.module('gomApp.meta', [
   'djangoRESTResources', 'gomApp.user'
])

.factory('GameService', ['djResource', function(djResource) {
   return djResource('/api/game/:id');
}])

.service('MetaService', ['$rootScope', 'GameService', 'UserService',
function($rootScope, GameService, UserService) {
   var ms = this;
   this.game = null; // FIXME: Set to last used game
   this.switchGame = function(id) {
      // Called to switch game
      ms.game = GameService.get({id: id});
      $rootScope.$broadcast('game:changed', ms.game.id);
   };
}])

.controller('MetaCtrl', [
'$mdDialog', '$mdSidenav', '$mdUtil', '$scope', 'AuthService', 'MetaService', 'UserService',
function($mdDialog, $mdSidenav, $mdUtil, $scope, AuthService, MetaService, UserService) {
   var meta = this;
   // Current user
   meta.user = UserService.user;
   $scope.$on('user:change', function(event, id) {
      meta.user = UserService.user;
   });
   // Current game
   meta.game = MetaService.game;
   $scope.$on('game:changed', function(event, id) {
      meta.game = MetaService.game;
   });

   meta.toggleMenu = $mdUtil.debounce(function(){
      $mdSidenav('menu').toggle();
   });
   meta.gameSwitcher = function(){
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
   meta.logout = function() {
      AuthService.logout();
   };
}])

.controller('GameSwitchCtrl', ['$mdDialog', 'GameService', 'MetaService',
function($mdDialog, GameService, MetaService) {
   this.games = GameService.query();
   this.game = MetaService.game ? MetaService.game.id : 0;
   this.cancel = function() {
      $mdDialog.cancel();
   };
   this.switch = function() {
      $mdDialog.hide(this.game);
   };
}]);
