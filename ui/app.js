//bootstartp App
var app = angular.module('mainApp', ['ngMaterial', 'ui.router', 'ngAnimate']);

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
       	  templateUrl: "app/home/html/home.html",
       	  controller: "homeCtrl"
       })   

    //  $stateProvider
    //    .state("reg", {
    //    	  url: "/reg",
    //    	  templateUrl: "src/reg/reg.html",
    //    	  controller: "regCtrl"
    //    })      



 }]);

//theme config
app.config(['$mdThemingProvider',function($mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('teal');
}])