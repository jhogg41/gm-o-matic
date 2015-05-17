'use strict';

angular.module('gomApp.version', [
  'gomApp.version.interpolate-filter',
  'gomApp.version.version-directive'
])

.value('version', '0.1');
