'use strict';

angular.module('gomApp.meta', [
])

.service('MetaService', [function() {
   var ms = this;
   this.game = {
      'name': 'Crisis'
   };
   this.switchGame = function(newName) {
      // Called to switch game
      ms.game.name = newName;
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

.controller('MetaCtrl', ['$mdDialog', '$mdSidenav', '$mdUtil', 'MetaService',
function($mdDialog, $mdSidenav, $mdUtil, MetaService) {
   this.user = MetaService.user;
   this.game = MetaService.game;

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

.controller('GameSwitchCtrl', ['$mdDialog', 'MetaService',
function($mdDialog, MetaService) {
   this.game = MetaService.game.name;
   this.cancel = function() {
      $mdDialog.cancel();
   };
   this.switch = function() {
      $mdDialog.hide(this.game);
   };
}]);
