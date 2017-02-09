//bootstartp App
var app = angular.module('mainApp', ['ngAnimate', 'ngMaterial', 'ui.router']);

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
    .primaryPalette('indigo')
    .accentPalette('indigo');
}]);
