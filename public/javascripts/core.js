'use strict';

var howdoivoteforbernie = angular.module('howdoivoteforbernie', []);

function mainController($scope, $http) {

	$scope.voteInfo = { 'states' : [], };
	$scope.selectedState = {};  //TODO Browser cached selectedState maybe?
	$scope.stateCache = {};
	$scope.currentInput = '';
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

	$scope.selectStateByAbbrev = function(abbrev) {

		var success = false;

		for (var i = 0; i < $scope.voteInfo.states.length; i++) {
			if($scope.voteInfo.states[i].abbreviation.toUpperCase() === abbrev.toUpperCase()) {
				$scope.selectedState = $scope.voteInfo.states[i];
				//$scope.stateCache[abbrev] = $scope.voteInfo.states[i];
				$scope.error = '';
				success = true;
			}
		}
		if(success !== true) {
			console.log('Error: Cannot select state: ' + abbrev);
			$scope.error = abbrev + ' is not a US state!';
		}
	};

	$scope.selectStateByName = function(name) {

		var success = false;

		for (var i = 0; i < $scope.voteInfo.states.length; i++) {
			if($scope.voteInfo.states[i].name.toUpperCase() === name.toUpperCase()) {
				$scope.selectedState = $scope.voteInfo.states[i];
				//$scope.stateCache[name] = $scope.voteInfo.states[i];
				$scope.error = '';
				success = true;
			}
		}
		if(success !== true) {
			console.log('Error: Cannot select state: ' + name);
			$scope.error = name + ' is not a US state!';
		}
	};


	$scope.getSelectedState = function() {
		return ($scope.selectedState && $scope.selectedState.name);
	};

	$scope.areWeMissingInformation = function() {
		//console.log($scope.selectedState);
		return !$scope.selectedState.info;
	};

	$scope.selectStateFromCurrentInput = function() {
		if($scope.currentInput.length===2) {
			$scope.selectStateByAbbrev($scope.currentInput);
		}
		else {
			$scope.selectStateByName($scope.currentInput);
		}
	};
}