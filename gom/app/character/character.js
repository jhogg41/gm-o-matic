'use strict';

angular.module('gomApp.character', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:game/:char/profile', {
    templateUrl: 'character/character.html',
    controller: 'CharacterCtrl',
    controllerAs: 'char'
  });
}])

.controller('CharacterCtrl', [function() {

}]);
