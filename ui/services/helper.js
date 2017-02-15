app.service('Helper', ['$rootScope', '$location', function($rootScope, $location) {

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

	this.getCurrentHost = function() {
		return ($location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/");

	}

	this.copyText = function(str) {

				var para = document.createElement("P");
			    var t = document.createTextNode(str);
			    para.setAttribute("id","coping");
			    para.appendChild(t);
			    document.body.appendChild(para);
			    
			    
				  var emailLink = para;  
				  var range = document.createRange();  
				  range.selectNode(emailLink);  
				  window.getSelection().addRange(range);
			      successful = document.execCommand('copy');

			      document.body.removeChild(document.getElementById("coping"))

			      if(successful) return true;
			      else return false;
	}

	


}]);