'use strict';

(function() {
	// Reglements Controller Spec
	describe('Reglements Controller Tests', function() {
		// Initialize global variables
		var ReglementsController,
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

			// Initialize the Reglements controller.
			ReglementsController = $controller('ReglementsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Reglement object fetched from XHR', inject(function(Reglements) {
			// Create sample Reglement using the Reglements service
			var sampleReglement = new Reglements({
				name: 'New Reglement'
			});

			// Create a sample Reglements array that includes the new Reglement
			var sampleReglements = [sampleReglement];

			// Set GET response
			$httpBackend.expectGET('reglements').respond(sampleReglements);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.reglements).toEqualData(sampleReglements);
		}));

		it('$scope.findOne() should create an array with one Reglement object fetched from XHR using a reglementId URL parameter', inject(function(Reglements) {
			// Define a sample Reglement object
			var sampleReglement = new Reglements({
				name: 'New Reglement'
			});

			// Set the URL parameter
			$stateParams.reglementId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/reglements\/([0-9a-fA-F]{24})$/).respond(sampleReglement);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.reglement).toEqualData(sampleReglement);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Reglements) {
			// Create a sample Reglement object
			var sampleReglementPostData = new Reglements({
				name: 'New Reglement'
			});

			// Create a sample Reglement response
			var sampleReglementResponse = new Reglements({
				_id: '525cf20451979dea2c000001',
				name: 'New Reglement'
			});

			// Fixture mock form input values
			scope.name = 'New Reglement';

			// Set POST response
			$httpBackend.expectPOST('reglements', sampleReglementPostData).respond(sampleReglementResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Reglement was created
			expect($location.path()).toBe('/reglements/' + sampleReglementResponse._id);
		}));

		it('$scope.update() should update a valid Reglement', inject(function(Reglements) {
			// Define a sample Reglement put data
			var sampleReglementPutData = new Reglements({
				_id: '525cf20451979dea2c000001',
				name: 'New Reglement'
			});

			// Mock Reglement in scope
			scope.reglement = sampleReglementPutData;

			// Set PUT response
			$httpBackend.expectPUT(/reglements\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/reglements/' + sampleReglementPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid reglementId and remove the Reglement from the scope', inject(function(Reglements) {
			// Create new Reglement object
			var sampleReglement = new Reglements({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Reglements array and include the Reglement
			scope.reglements = [sampleReglement];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/reglements\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleReglement);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.reglements.length).toBe(0);
		}));
	});
}());