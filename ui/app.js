//bootstartp App
var app = angular.module('mainApp', ['ngAnimate', 'ngMaterial', 'ui.router', 'dTable']);

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
       .state("create", {
       	  url: "/create",
       	  templateUrl: "app/create/html/main.html",
       	  controller: "createCtrl"
       })      



 }]);

//theme config
app.config(['$mdThemingProvider',function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('indigo');
}]);
