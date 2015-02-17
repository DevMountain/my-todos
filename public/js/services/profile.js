angular.module('MyTodos').service('ProfileService', function($q, $http) {
	this.getProfile = function() {
		var deferred = $q.defer();
		deferred.resolve({
			email: 'cahlan@gmail.com',
			gender: 'm',
			age: 33,
			bio: 'I like lonely walks on the beach.'
		});
		return deferred.promise;
	};
});