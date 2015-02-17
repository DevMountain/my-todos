angular.module('MyTodos').service('TodoService', function($q, $http) {
	this.getTodos = function() {
		var deferred = $q.defer();
		deferred.resolve([
			{
				title: 'Grab eggs',
				completed: false
			},
			{
				title: 'Visit mom',
				completed: false
			},
			{
				title: 'Pay bills',
				completed: true
			}
		]);
		return deferred.promise;
	};
	this.save = function(todo) {
		var deferred = $q.defer();
		deferred.resolve(true);
		return deferred.promise;
	};
});