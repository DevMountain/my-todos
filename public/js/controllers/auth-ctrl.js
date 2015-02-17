angular.module('MyTodos').controller('AuthController', function($scope, $location, AuthService) {
	$scope.state = 'login';
	$scope.clickLogin = function() {
		AuthService.login($scope.email, $scope.password).then(function() {
			$location.path('/todos');
		}).catch(function(err) {
			$scope.loginError = true;
		});
	};
	$scope.clickRegister = function() {
		AuthService.register($scope.email, $scope.password).then(function() {
			$scope.state = 'login';
			$scope.registerSuccessful = true;
		});
	};
	$scope.changeState = function(newState) {
		$scope.state = newState;
	};
});