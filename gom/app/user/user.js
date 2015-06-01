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

.controller('LoginCtrl', [
'$location', 'AuthService',
function($location, AuthService) {
   var lc = this;
   this.username = AuthService.username;
   this.name = '';
   this.password = '';
   this.password2 = '';
   this.email = '';
   this.terms = false;
   this.cat = false;
   this.login = function() {
      AuthService.login(lc.username, lc.password,
         function() {
            $location.url('/');
         },
         function(msg) {
            lc.error.failed = true;
         }
      );
   };
   this.register = function() {
      window.alert('Register!\n');
   };
   this.error = {
      failed: false
   };
}])

.service('AuthService', [
'$cookies', '$http', '$resource', '$rootScope',
function($cookies, $http, $resource, $rootScope) {
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
   this.login = function(username, password, success, error) {
      AuthAPI.login({username:username, password:password},
         function(response) {
            if(response.key) {
               auth.username = username;
               auth.key = response.key;
               auth.setHeaders();
               $cookies.put('auth:username', auth.username); 
               $cookies.put('auth:key', auth.key); 
               $rootScope.$broadcast('auth:login', auth.username);
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
   this.logout = function() {
      var out_username = auth.username;
      auth.username = null;
      auth.key = null;
      auth.setHeaders();
      $cookies.remove('auth:key');
      $rootScope.$broadcast('auth:logout', out_username);
   };
   this.setHeaders = function() {
      if(auth.key) {
         $http.defaults.headers.common.Authorization = 'Token ' + auth.key;
      } else {
         $http.defaults.headers.common.Authorization = undefined;
      }
   };

   auth.username = $cookies.get('auth:username');
   auth.key      = $cookies.get('auth:key');
   auth.authenticated = function() { return auth.username && auth.key; };
   if(auth.key) auth.setHeaders();
}])

.service('UserService', [
'$rootScope', 'djResource', 'AuthService',
function($rootScope, djResource, AuthService) {
   var userSrv = this;
   //var UserResource = djResource('/api/user/:username');

   // Functions
   userSrv.setUser = function(username) {
      if(username) {
         userSrv.user = {
            username: username
         };
         userSrv.user.is_gm = function(character) {
            // Return true is this user has GM permissions on the game of given
            // character.
            return true;
         };
      } else {
         userSrv.user = null;
      }
      $rootScope.$broadcast('user:change', userSrv.user);
   };

   // Initialization
   if(AuthService.authenticated()) userSrv.setUser(AuthService.username);
   else                            userSrv.setUser(null);
   $rootScope.$on('auth:login', function(event, username) {
      userSrv.setUser(username);
   });
   $rootScope.$on('auth:logout', function(event, username) {
      userSrv.setUser(null);
   });
}]);
