angular.module('MyTodos').service('AuthService', function($q, $http) {
	this.register = function(email, password) {
		var deferred = $q.defer();
		deferred.resolve(true);
		return deferred.promise;
	};
	this.login = function(email, password) {
		var deferred = $q.defer();
		deferred.resolve(true);
		return deferred.promise;
	};
});