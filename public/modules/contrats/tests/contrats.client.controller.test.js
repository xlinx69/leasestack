'use strict';

(function() {
	// Contrats Controller Spec
	describe('Contrats Controller Tests', function() {
		// Initialize global variables
		var ContratsController,
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

			// Initialize the Contrats controller.
			ContratsController = $controller('ContratsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Contrat object fetched from XHR', inject(function(Contrats) {
			// Create sample Contrat using the Contrats service
			var sampleContrat = new Contrats({
				name: 'New Contrat'
			});

			// Create a sample Contrats array that includes the new Contrat
			var sampleContrats = [sampleContrat];

			// Set GET response
			$httpBackend.expectGET('contrats').respond(sampleContrats);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contrats).toEqualData(sampleContrats);
		}));

		it('$scope.findOne() should create an array with one Contrat object fetched from XHR using a contratId URL parameter', inject(function(Contrats) {
			// Define a sample Contrat object
			var sampleContrat = new Contrats({
				name: 'New Contrat'
			});

			// Set the URL parameter
			$stateParams.contratId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contrats\/([0-9a-fA-F]{24})$/).respond(sampleContrat);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contrat).toEqualData(sampleContrat);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contrats) {
			// Create a sample Contrat object
			var sampleContratPostData = new Contrats({
				name: 'New Contrat'
			});

			// Create a sample Contrat response
			var sampleContratResponse = new Contrats({
				_id: '525cf20451979dea2c000001',
				name: 'New Contrat'
			});

			// Fixture mock form input values
			scope.name = 'New Contrat';

			// Set POST response
			$httpBackend.expectPOST('contrats', sampleContratPostData).respond(sampleContratResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Contrat was created
			expect($location.path()).toBe('/contrats/' + sampleContratResponse._id);
		}));

		it('$scope.update() should update a valid Contrat', inject(function(Contrats) {
			// Define a sample Contrat put data
			var sampleContratPutData = new Contrats({
				_id: '525cf20451979dea2c000001',
				name: 'New Contrat'
			});

			// Mock Contrat in scope
			scope.contrat = sampleContratPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contrats\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contrats/' + sampleContratPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contratId and remove the Contrat from the scope', inject(function(Contrats) {
			// Create new Contrat object
			var sampleContrat = new Contrats({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Contrats array and include the Contrat
			scope.contrats = [sampleContrat];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contrats\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContrat);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contrats.length).toBe(0);
		}));
	});
}());