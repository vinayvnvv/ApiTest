app.directive('ripple', ['$mdInkRipple', function($mdInkRipple){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		 restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			iElm.bind("click", function(ev) {

				 var dim = iAttrs.ripple;
				 if(dim == 'dim')
				 	dim = true;
				 else
				 	dim = false;

				 $mdInkRipple.attach($scope, angular.element(iElm[0]), {center: false, dimBackground: dim});

			});
			
		}
	};
}]);