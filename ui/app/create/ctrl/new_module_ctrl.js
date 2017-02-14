app.controller('NewModuleDialogController', ['$scope', '$http', '$rootScope', '$mdDialog', '$mdToast', '$timeout', function($scope, $http, $rootScope, $mdDialog, $mdToast, $timeout){

	console.log("Called dailog ctrl")
	$scope.res_module = {};
	$scope.module = {};
	$scope.model = {};

	if($rootScope.module_open_type == 'edit') {
       
       $scope.model.title = "Edit Module";
       $scope.model.button_name = "Edit";



		$scope.module.req_msg = $rootScope.selectedModuleForEdit.req.query;
		$scope.module.res_msg = $rootScope.selectedModuleForEdit.res.msg;
		$scope.module.res_before_msg = $rootScope.selectedModuleForEdit.res.before_msg;
		$scope.module.res_after_msg = $rootScope.selectedModuleForEdit.res.after_msg;
		if($rootScope.selectedModuleForEdit.res.sub_info) {
	    $scope.module.res_subinfo_type = $rootScope.selectedModuleForEdit.res.sub_info.type;

	      $scope.module.res_subinfo_value = $rootScope.selectedModuleForEdit.res.sub_info.text;
	  }
	} else {
	   $scope.model.title = "New Module";
       $scope.model.button_name = "Create";


	   $scope.module.res_subinfo_type = 'none';	
	}

   console.log($scope.module)


	 $scope.createModule = function() {
	 	$scope.new_module = {};
	 	var req = {};
	 	var res = {};
	  	console.log("creating module")
	  	if($scope.module.req_msg != undefined) { req.query = $scope.module.req_msg; }
	  	if($scope.module.res_msg != undefined) { res.msg = $scope.module.res_msg; }
	  	if($scope.module.res_before_msg != undefined) { if($scope.module.res_before_msg.length > 0 ) res.before_msg = $scope.module.res_before_msg; }
	  	if($scope.module.res_after_msg != undefined) { if($scope.module.res_after_msg.length > 0) res.after_msg = $scope.module.res_after_msg; }


       console.log($scope.module.res_subinfo_type)

       //sub info parser 
       if($scope.module.res_subinfo_type != 'none' && $scope.module.res_subinfo_value != undefined) {
       	console.log($scope.module.res_subinfo_value)
       	  var sbinfo = $scope.module.res_subinfo_value;
       	  if(sbinfo.length!=0 && $scope.module.res_subinfo_value != '') {
       	  	res.sub_info = {};
       	  	res.sub_info.type = $scope.module.res_subinfo_type;
       	  	res.sub_info.text = sbinfo;	
       	  }
       }
	  	$scope.new_module = {
	  		req:req,
	  		res:res
	  	}

	  	if($scope.createForm.$valid) { 
	  		console.log($scope.new_module);

	  		if($rootScope.module_open_type == 'insert') { //insert
	  			$scope.isLoading = true;
			  		var res_ = $http.post("api/file/insert", $scope.new_module);
			  		res_.success(function(res) {
			  			$scope.isLoading = false;
			  			console.log(res);
			  			$timeout(function() {$rootScope.refresh();}, 2000)
			  			$mdDialog.cancel();
			  			$mdToast.show(
						      $mdToast.simple()
						        .textContent('Module Created !')
						        .position("bottom")
						        .hideDelay(3000)
						    );
			  		});

	  		} else { //edit
	  			$scope.isLoading = true;
	  			var res_ = $http.post("api/file/edit/"+ $rootScope.selectedModuleForEdit.id_, $scope.new_module);
			  		res_.success(function(res) {
			  			$scope.isLoading = false;
			  			console.log(res);
			  			$timeout(function() {$rootScope.refresh();}, 2000)
			  			
			  			$mdDialog.cancel();
			  			$mdToast.show(
						      $mdToast.simple()
						        .textContent('Module Edited successfully !')
						        .position("bottom")
						        .hideDelay(3000)
						    );
			  		})

	  		}



	   }
	  }


	   $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	
}]);