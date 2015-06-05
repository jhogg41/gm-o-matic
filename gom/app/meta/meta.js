'use strict';

angular.module('gomApp.meta', [
   'djangoRESTResources', 'gomApp.user', 'gomApp.game'
])

.controller('MetaCtrl', [
'$mdDialog', '$mdSidenav', '$mdUtil', '$scope', 'AuthService', 'GameService', 'UserService',
function($mdDialog, $mdSidenav, $mdUtil, $scope, AuthService, GameService, UserService) {
   var meta = this;
   // Current user
   meta.user = UserService.user;
   $scope.$on('user:change', function(event, id) {
      meta.user = UserService.user;
   });
   // Current game
   meta.game = GameService.game;
   $scope.$on('game:changed', function(event, id) {
      meta.game = GameService.game;
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
         GameService.switchGame(game);
      });
   };
   meta.logout = function() {
      AuthService.logout();
   };
}])

.controller('GameSwitchCtrl', ['$mdDialog', 'GameService',
function($mdDialog, GameService) {
   this.games = GameService.listAll();
   this.game = GameService.game ? GameService.game.id : 0;
   this.cancel = function() {
      $mdDialog.cancel();
   };
   this.switch = function() {
      $mdDialog.hide(this.game);
   };
}]);
