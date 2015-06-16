'use strict';

var howdoivoteforbernie = angular.module('howdoivoteforbernie', []);

function mainController($scope, $http) {

	$scope.formData = {};

	$http.get('/api/v0.1')
		.success(function(data) {
			$scope.allStates = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.getState = function(state) {
		$http.get('/api/v0.1/' + state)
			.success(function(data) {
				$scope.state = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});
	};
}