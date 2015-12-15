'use strict';

(function() {
	// Statistiques Controller Spec
	describe('Statistiques Controller Tests', function() {
		// Initialize global variables
		var StatistiquesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Statistiques controller.
			StatistiquesController = $controller('StatistiquesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Statistique object fetched from XHR', inject(function(Statistiques) {
			// Create sample Statistique using the Statistiques service
			var sampleStatistique = new Statistiques({
				name: 'New Statistique'
			});

			// Create a sample Statistiques array that includes the new Statistique
			var sampleStatistiques = [sampleStatistique];

			// Set GET response
			$httpBackend.expectGET('statistiques').respond(sampleStatistiques);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.statistiques).toEqualData(sampleStatistiques);
		}));

		it('$scope.findOne() should create an array with one Statistique object fetched from XHR using a statistiqueId URL parameter', inject(function(Statistiques) {
			// Define a sample Statistique object
			var sampleStatistique = new Statistiques({
				name: 'New Statistique'
			});

			// Set the URL parameter
			$stateParams.statistiqueId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/statistiques\/([0-9a-fA-F]{24})$/).respond(sampleStatistique);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.statistique).toEqualData(sampleStatistique);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Statistiques) {
			// Create a sample Statistique object
			var sampleStatistiquePostData = new Statistiques({
				name: 'New Statistique'
			});

			// Create a sample Statistique response
			var sampleStatistiqueResponse = new Statistiques({
				_id: '525cf20451979dea2c000001',
				name: 'New Statistique'
			});

			// Fixture mock form input values
			scope.name = 'New Statistique';

			// Set POST response
			$httpBackend.expectPOST('statistiques', sampleStatistiquePostData).respond(sampleStatistiqueResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Statistique was created
			expect($location.path()).toBe('/statistiques/' + sampleStatistiqueResponse._id);
		}));

		it('$scope.update() should update a valid Statistique', inject(function(Statistiques) {
			// Define a sample Statistique put data
			var sampleStatistiquePutData = new Statistiques({
				_id: '525cf20451979dea2c000001',
				name: 'New Statistique'
			});

			// Mock Statistique in scope
			scope.statistique = sampleStatistiquePutData;

			// Set PUT response
			$httpBackend.expectPUT(/statistiques\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/statistiques/' + sampleStatistiquePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid statistiqueId and remove the Statistique from the scope', inject(function(Statistiques) {
			// Create new Statistique object
			var sampleStatistique = new Statistiques({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Statistiques array and include the Statistique
			scope.statistiques = [sampleStatistique];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/statistiques\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStatistique);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.statistiques.length).toBe(0);
		}));
	});
}());