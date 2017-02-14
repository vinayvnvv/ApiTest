//bootstartp App
var app = angular.module('mainApp', ['ngAnimate', 'ngMaterial', 'ui.router', 'dTable', 'autoAddInput']);

//Routing
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //default Router
    $urlRouterProvider.otherwise("/app");

	//Define router config
    $stateProvider
       .state("login", {
       	  url: "/login",
       	  template: "Login"
       	  // controller: "loginCtrl"
       })

    $stateProvider
       .state("app", {
       	  url: "/app",
       	  templateUrl: "app/screen/html/main.html",
       	  controller: "chatCtrl"
       })   

     $stateProvider
       .state("manager", {
       	  url: "/manager",
       	  templateUrl: "app/manager/html/dashboard.html",
       	  controller: "managerCtrl"
       }) 

    $stateProvider
       .state("track", {
          url: "/track",
          templateUrl: "app/manager/html/track.html",
          controller: "trackCtrl"
       })    





 }]);

//theme config
app.config(['$mdThemingProvider',function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('indigo');
}]);
