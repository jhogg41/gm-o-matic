/* jslint browser: true */
'use strict';

angular.module('gomApp.user', [
   'ngCookies', 'ngResource', 'ngRoute', 'djangoRESTResources'
])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider.when('/login', {
      templateUrl: 'user/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
   });
}])

.controller('LoginCtrl', ['AuthService', function(AuthService) {
   var lc = this;
   this.username = '';
   this.password = '';
   this.login = function() {
      AuthService.login(lc.username, lc.password,
         function() {
            window.alert("I win");
         },
         function(msg) {
            lc.error.failed = true;
         }
      );
   };
   this.error = {
      failed: false
   };
}])

.service('AuthService', [
'$cookies', '$resource',
function($cookies, $resource) {
   var auth = this;
   var AuthAPI = $resource('/api/rest-auth\\/', {}, {
      login:  { 
         method: 'POST',
         url: '/api/rest-auth/login\\/'
      },
      logout: {
         method: 'POST',
         url: '/api/rest-auth/logout\\/'
      }
   });
   this.key = null;
   this.login = function(username, password, success, error) {
      AuthAPI.login({username:username, password:password},
         function(response) {
            if(response.key) {
               auth.key = response.key;
               if(success) success();
            } else {
               if(error) error('Unknown error: login succesful but no key supplied');
            }
         },
         function(response) {
            if(response.data && response.data.non_field_errors) {
               if(error) error('Bad username or password');
            } else {
               if(error) error('Unknown error: login failed but no reason returned');
            }
         }
      );
   };
}])

.service('UserService', [
'djResource',
function(djResource) {
   var UserResource = djResource('/api/user/:id');
}]);
