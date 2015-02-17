angular.module('MyTodos').controller('TodoController', function($scope, TodoService, todos) {
	$scope.todos = todos;

	$scope.saveTodo = function(todo) {
		TodoService.save(todo);
	};
});