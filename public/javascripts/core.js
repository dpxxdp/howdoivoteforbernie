'use strict';

var howdoivoteforbernie = angular.module('howdoivoteforbernie', []);

function mainController($scope, $http) {

	$scope.voteInfo = { 'states' : [], };
	$scope.selectedState = {};  //TODO Browser cached selectedState maybe?
	$scope.stateCache = {};
	$scope.currentInput = '';
	$scope.error = '';
	$scope.showFooter = false;
	$scope.view = '';

	// $http.get('/api/v0.1') TODO: Sort out api bug
	$http.get('./data/states.json')
		.success(function(data) {
			$scope.voteInfo = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.getState = function(state) {
		$http.get('/api/v0.1/' + state)
			.success(function(data) {
				$scope.selectedState = data;
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
			$scope.error = 'Please select a US state.';
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
			$scope.error = 'Please select a US state.';
		}
	};


	$scope.showSelectedStateInfo = function() {
		return ($scope.selectedState && $scope.selectedState.name && !$scope.error && $scope.view==='info');
	};

	$scope.showActInfo = function() {
		return ($scope.view==='act');
	};

	$scope.showRemindInfo = function() {
		return ($scope.selectedState && $scope.selectedState.name && !$scope.error && $scope.view==='remind');
	};

	$scope.showJumbo = function() {
		return ($scope.showRemindInfo() || $scope.showActInfo() || $scope.showSelectedStateInfo());
	};

	$scope.areWeMissingInformation = function() {
		return !$scope.selectedState.info || !$scope.selectedState.registration;
	};

	$scope.selectStateFromCurrentInput = function() {
		$scope.showFooter = true;
		$scope.view = 'info';
		if($scope.currentInput.length===0)
		{
			$scope.selectedState = {};
			$scope.error = '';
			return;
		}
		else if($scope.currentInput.length===2) {
			$scope.selectStateByAbbrev($scope.currentInput);
		}
		else {
			$scope.selectStateByName($scope.currentInput);
		}
	};

	$scope.formatDate = function(dateString) {
		var date = new Date(dateString);
		var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()];
		var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()];
		return week + ' ' + month + ' ' + date.getUTCDate() + ', ' + date.getFullYear();
	};

	$scope.formatRegistration = function(deadline) {
		return deadline;//TODO: smart handling of registration rule combined with election date
	};

	$scope.selectRemindInfo = function() {
		$scope.view = 'remind';
	};

	$scope.selectActInfo = function() {
		$scope.view = 'act';
	};

}