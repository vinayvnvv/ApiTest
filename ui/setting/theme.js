app.service('Theme', ['$rootScope', function($rootScope) {

   console.log('Theme Service Called')

   $rootScope.Theme_leftBarWidth = "240px";
   $rootScope.Theme_appBarHeight = "60px";
   $rootScope.Theme_titleBarHeight = "50px";

  
}]);