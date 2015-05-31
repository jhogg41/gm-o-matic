'use strict';

angular.module('gomApp.meta', [
])

.controller('MetaCtrl', ['$mdUtil', '$mdSidenav',
function($mdUtil, $mdSidenav) {
   this.user = {
      'username': 'jhogg',
      'activeChar': 'Fred Bloggs'
   };
   this.activeGame = "Crisis";
   this.user.is_gm = function(character) {
      // Return true is this user has GM permissions on the game of given
      // character.
      return true;
   };

   this.toggleMenu = $mdUtil.debounce(function(){
      $mdSidenav('menu').toggle();
   });
}]);
