app.controller('NewModuleDialogController', ['$scope', '$http', function($scope, $http){

	console.log("Called dailog ctrl")
	$scope.res_module = {};
	$scope.module = {};

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
       	  var sbinfo = $scope.module.res_subinfo_value.split("\n");
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

	  		var res_ = $http.post("http://localhost:3004/api/file/insert", $scope.new_module);
	  		res_.success(function(res) {
	  			console.log(res)
	  		})



	   }
	  }

	
}]);