app.service('ApiCall', ['$http', function($http) {

	this.Modules = {

        getModules : function() {
        	return $http.get("api/modules/get");
        },
        insertModule : function(data) {
        	return $http.post("api/modules/insert", data);
        },
        editModule : function(id, data) {
           return $http.post("api/modules/edit/"+ id, data);
        },
        deleteModule : function(id) {
        	return $http.delete("api/modules/delete/" + id);
        }
	} 
	
}])