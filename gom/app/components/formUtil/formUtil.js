'use strict';

function getDescProp(obj, prop) {
   var parts = prop.split('.');
   while(parts.length) obj = obj[parts.shift()];
   return obj;
}

angular.module('gomApp.formUtil', [
   'ngMaterial'
])

.directive('gomAsyncSave', [
'$mdToast',
function($mdToast) {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
         var targetId = attr.gomAsyncSave;
         element.on('blur', function(event) {
            if(ngModelCtrl.$pristine) return; // Hasn't changed
            ngModelCtrl.$validate(); // Run validator before check we're valid
            if(ngModelCtrl.$invalid) return; // Don't commit, is wrong
            getDescProp(scope,targetId)
               .$save().$promise
               .then(function() {
                  $mdToast.show($mdToast.simple()
                     .content('Saved ' + ngModelCtrl.$name)
                     .hideDelay(300)
                  );
               });
            ngModelCtrl.$setPristine();
         });
      }
   };
}]);
