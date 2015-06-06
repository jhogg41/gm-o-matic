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
      var newClass = GameService.addNewAttrClass({title: this.newClassName});
      this.attrClasses.push(newClass);
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
            ac.$delete();
            var idx = gc.attrClasses.indexOf(ac);
            gc.attrClasses.splice(idx, 1);
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
   var GameAttrDetailResource = djResource('/api/attrib-detail/:id/', {id:'@id'});

   this.game = null;
   this.switchGame = function(id) {
      this.game = GameResource.get({id:id});
      this.game.id = id;
      $rootScope.$broadcast('game:changed', id);
      $cookies.put('game:id', id);
   };
   this.listAll = GameResource.query;
   this.getAttr = function(gid) {
      var save_attr_fn = function(successFn, errorFn) {
         GameAttrDetailResource.save(this, successFn, errorFn);
      };
      var attr = GameAttrResource.query({gameid: gid}, function() {
         for(var i=0; i<attr.length; i++) {
            var aclass = attr[i];
            for(var j=0; j<aclass.attributes.length; j++) {
               var attribute = aclass.attributes[j];
               attribute.$save = save_attr_fn;
            }
         }
      });
      return attr;
   };
   this.addNewAttrClass = function(ac) {
      ac.game = ac.game || this.game.id;
      return GameAttrResource.save(ac);
   };

   var gameid = $cookies.get('game:id');
   if(gameid) this.switchGame(gameid);
}]);
