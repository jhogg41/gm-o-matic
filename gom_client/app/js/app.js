var gomApp = angular.module('gomApp', [
   'ngRoute',
   'gomControllers'
]);

gomApp.config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
         when('/', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
      });
}]);
