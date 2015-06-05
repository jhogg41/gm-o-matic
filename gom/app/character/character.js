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
    controllerAs: 'char'
  });
}])

.controller('NewCharacterCtrl', [function() {

}])

.controller('CharacterCtrl', [function() {

}]);
