app.service('Parser', ['$rootScope', 'Helper', function($rootScope, Helper) {

	this.parseMsg = function(msg) {
       msg = msg.replace("[[daystate]]", Helper.getDayState());  // parse day state


       return msg;
	}

	
}])