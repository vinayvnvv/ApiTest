app.service('Helper', ['$rootScope', function($rootScope) {

	this.getDayState = function() {
		var myDate = new Date();
    	var hrs = myDate.getHours();
    	var greet;

		    if (hrs < 12)
		        greet = 'morning';
		    else if (hrs >= 12 && hrs <= 17)
		        greet = 'afternoon';
		    else if (hrs >= 17 && hrs <= 21)
		        greet = 'evening';
		    else if (hrs >= 21 && hrs <= 24)
		        greet = 'night';

		return greet    
	}

	


}]);