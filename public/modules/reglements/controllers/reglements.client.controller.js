'use strict';

// Reglements controller
angular.module('reglements').controller('ReglementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reglements',
	function($scope, $stateParams, $location, Authentication, Reglements) {
		$scope.authentication = Authentication;

		// Create new Reglement
		$scope.create = function() {
			// Create new Reglement object
			var reglement = new Reglements ({
				name: this.name
			});

			// Redirect after save
			reglement.$save(function(response) {
				$location.path('reglements/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Reglement
		$scope.remove = function(reglement) {
			if ( reglement ) { 
				reglement.$remove();

				for (var i in $scope.reglements) {
					if ($scope.reglements [i] === reglement) {
						$scope.reglements.splice(i, 1);
					}
				}
			} else {
				$scope.reglement.$remove(function() {
					$location.path('reglements');
				});
			}
		};

		// Update existing Reglement
		$scope.update = function() {
			var reglement = $scope.reglement;

			reglement.$update(function() {
				$location.path('reglements/' + reglement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reglements
		$scope.find = function() {
			$scope.reglements = Reglements.query();
		};

		// Find existing Reglement
		$scope.findOne = function() {
			$scope.reglement = Reglements.get({ 
				reglementId: $stateParams.reglementId
			});
		};
	}
]);