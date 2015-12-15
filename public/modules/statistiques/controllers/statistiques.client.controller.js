'use strict';

// Statistiques controller
angular.module('statistiques').controller('StatistiquesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Statistiques',
	function($scope, $stateParams, $location, Authentication, Statistiques) {
		$scope.authentication = Authentication;

		// Create new Statistique
		$scope.create = function() {
			// Create new Statistique object
			var statistique = new Statistiques ({
				name: this.name
			});

			// Redirect after save
			statistique.$save(function(response) {
				$location.path('statistiques/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Statistique
		$scope.remove = function(statistique) {
			if ( statistique ) { 
				statistique.$remove();

				for (var i in $scope.statistiques) {
					if ($scope.statistiques [i] === statistique) {
						$scope.statistiques.splice(i, 1);
					}
				}
			} else {
				$scope.statistique.$remove(function() {
					$location.path('statistiques');
				});
			}
		};

		// Update existing Statistique
		$scope.update = function() {
			var statistique = $scope.statistique;

			statistique.$update(function() {
				$location.path('statistiques/' + statistique._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Statistiques
		$scope.find = function() {
			$scope.statistiques = Statistiques.query();
		};

		// Find existing Statistique
		$scope.findOne = function() {
			$scope.statistique = Statistiques.get({ 
				statistiqueId: $stateParams.statistiqueId
			});
		};
	}
]);