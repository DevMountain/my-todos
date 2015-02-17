angular.module('MyTodos').controller('TodoController', function($scope, TodoService, todos) {
	$scope.todos = todos;

	$scope.saveTodo = function(todo) {
		TodoService.save(todo);
	};
	$scope.createTodo = function() {
		TodoService.add({
			title: $scope.newTodo
		}).then(function(todo) {
			$scope.todos.push(todo);
			$scope.newTodo = null;
		})
	}
});