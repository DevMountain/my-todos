angular.module('MyTodos').service('ProfileService', function($q, $http) {
	this.getProfile = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/profile'
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
});