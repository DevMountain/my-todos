angular.module('MyTodos').service('AuthService', function($q, $http) {
	this.register = function(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/register',
			data: {
				email: email,
				password: password
			}
		}).then(function(response) {
			deferred.resolve(response.data);
		}).catch(function(response) {
			if (response.status === 400 || response.status === 401) {
				deferred.reject(response);
			}
		});
		return deferred.promise;
	};
	this.login = function(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth',
			data: {
				email: email,
				password: password
			}
		}).then(function(response) {
			deferred.resolve(response.data);
		}).catch(function(response) {
			if (response.status === 400 || response.status === 401) {
				deferred.reject(response);
			}
		});
		return deferred.promise;
	};
});