'use strict';

function getDescProp(obj, prop) {
   var parts = prop.split('.');
   while(parts.length) obj = obj[parts.shift()];
   return obj;
}

angular.module('gomApp.formUtil', [
   'ngMaterial'
])

.directive('gomAttrSelect', [
function() {
   return {
      restrict: 'E',
      templateUrl: 'components/formUtil/gomAttrSelect.html',
      scope: {
         attr: '=',
         model: '=',
      },
   };
}])

.directive('gomBlurSave', [
'$mdToast',
function($mdToast) {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
         var targetId = attr.gomBlurSave;
         element.on('blur', function(event) {
            if(ngModelCtrl.$pristine) return; // Hasn't changed
            ngModelCtrl.$validate(); // Run validator before check we're valid
            if(ngModelCtrl.$invalid) return; // Don't commit, is wrong
            var label = (attr.gomSaveLabel || ngModelCtrl.$name);
            var target = getDescProp(scope,targetId);
            target.$save(function() {
               $mdToast.show($mdToast.simple()
                  .content('Saved ' + label)
                  .hideDelay(500)
               );
            });
            ngModelCtrl.$setPristine();
         });
      }
   };
}])

.directive('gomChangeSave', [
'$mdToast',
function($mdToast) {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModelCtrl) {
         var targetId = attr.gomChangeSave;
         ngModelCtrl.$viewChangeListeners.push(function() {
            if(ngModelCtrl.$pristine) return; // Hasn't changed
            ngModelCtrl.$validate(); // Run validator before check we're valid
            if(ngModelCtrl.$invalid) return; // Don't commit, is wrong
            var label = (attr.gomSaveLabel || ngModelCtrl.$name);
            var target = getDescProp(scope,targetId);
            target.$save(function() {
               $mdToast.show($mdToast.simple()
                  .content('Saved ' + label)
                  .hideDelay(500)
               );
            });
            ngModelCtrl.$setPristine();
         });
      }
   };
}]);
