'use strict';

angular.module('gomApp.character', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/character', {
    templateUrl: 'character/character.html',
    controller: 'CharacterCtrl',
    controllerAs: 'char'
  });
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/character/new', {
    templateUrl: 'character/newchar.html',
    controller: 'NewCharacterCtrl',
    controllerAs: 'ncc'
  });
}])

.controller('NewCharacterCtrl', [
'GameService',
function(GameService) {
   var ncc = this;
   ncc.acs = GameService.getAttr(GameService.game.id);
}])

.controller('CharacterCtrl', [function() {

}]);
