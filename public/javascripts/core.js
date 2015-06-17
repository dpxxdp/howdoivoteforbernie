'use strict';

var howdoivoteforbernie = angular.module('howdoivoteforbernie', []);

function mainController($scope, $http) {

	$scope.voteInfo = { 'states' : [], };
	$scope.selectedState = {};  //TODO Browser cached selectedState maybe?
	$scope.stateCache = {};
	$scope.error = '';

	$http.get('/api/v0.1')
		.success(function(data) {
			$scope.voteInfo = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.getState = function(state) {
		$http.get('/api/v0.1/' + state)
			.success(function(data) {
				$scope.selectedState = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: '+ data);
			});
	};

	$scope.selectState = function(abbrev) {
		//console.log("a:" + JSON.stringify($scope.selectedState));
		//if(abbrev in $scope.stateCache) {
		//	console.log("b:" + JSON.stringify($scope.selectedState));
		//	$scope.selectedState = $scope.stateCache[abbrev];
		//}
		//else {

		var success = false;

		for (var i = 0; i < $scope.voteInfo.states.length; i++) {
			if($scope.voteInfo.states[i].abbreviation === abbrev) {
				$scope.selectedState = $scope.voteInfo.states[i];
				$scope.stateCache[abbrev] = $scope.voteInfo.states[i];
				$scope.error = '';
				success = true;
			}
		}
		if(success !== true) {
			console.log('Error: Cannot select state: ' + abbrev);
			$scope.error = abbrev + ' is not a state!';
		}

		//}
	};
}