app.controller('homeCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
      console.log("home Ctrl called");	

 
    //close left-nav 
    $scope.toggleLeftNav = function() {
    	console.log("fff")
    	$mdSidenav('left').toggle();
    	$mdSidenav('ss').toggle();
    }

   //buildToggler For toggle nav-bar
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }

}]);