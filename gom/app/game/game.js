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
'$mdDialog', '$scope', 'GameService',
function($mdDialog, $scope, GameService) {
   var gc = this;
   this.resetForGame = function(game) {
      this.game = game;
      this.newClassName = '';
      this.attrClasses = [];
      if(game) {
         gc.attrClasses = GameService.getAttr(game.id);
      }
   };
   this.addNewAttrClass = function() {
      this.attrClasses.push({
         title: this.newClassName
      });
      this.newClassName = '';
   };
   this.deleteAttrClass = function(ac) {
      var delConfirm = $mdDialog.confirm()
         //.parent(angular.element(document.body))
         .title('Really delete Attribute '+ac.title+'?')
         .content('This will delete all Attributes of this class too!')
         .ariaLabel('Confirm delete Attribute Class')
         .ok('DELETE!')
         .cancel('Cancel');
      $mdDialog.show(delConfirm).then(function() {
            window.alert('FINE!');
            //ac.$delete();
         });
   };

   this.resetForGame(GameService.game);

   $scope.$on('game:changed', function(event) {
      gc.resetForGame(GameService.game);
   });
}])

/*********************************************************
 * Services
 *********************************************************/
.service('GameService', [
'$cookies', '$rootScope', 'djResource',
function($cookies, $rootScope, djResource) {
   var GameResource = djResource('/api/game/:id/', {id:'@id'});
   var GameAttrResource = djResource('/api/attrib/:gameid/:acid/', {
      gameid:'@game', // Game we're interested in
      acid:'@id'      // Attribute Class ID we want in particular
   });

   this.game = null;
   this.switchGame = function(id) {
      this.game = GameResource.get({id:id});
      this.game.id = id;
      $rootScope.$broadcast('game:changed', id);
      $cookies.put('game:id', id);
   };
   this.listAll = GameResource.query;
   this.getAttr = function(gid) {
      return GameAttrResource.query({gameid: gid});
   };

   var gameid = $cookies.get('game:id');
   if(gameid) this.switchGame(gameid);
}]);
