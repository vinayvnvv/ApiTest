app.controller('mainCtrl', ['$scope', 'Theme', '$element', '$rootScope', '$mdColors', function($scope, Theme, $element, $rootScope, $mdColors){

	 $scope.people = [
    { name: 'Janet Perkins', img: 'img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'img/100-2.jpeg', newMessage: false }
  ];


  //set colors variable

  $rootScope.chat_bg_color = $mdColors.getThemeColor('primary-A700');
  console.log($rootScope.chat_bg_color)


	
}]);