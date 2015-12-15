'use strict';

(function() {
	// Ecomonies Controller Spec
	describe('Ecomonies Controller Tests', function() {
		// Initialize global variables
		var EcomoniesController,
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

			// Initialize the Ecomonies controller.
			EcomoniesController = $controller('EcomoniesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ecomony object fetched from XHR', inject(function(Ecomonies) {
			// Create sample Ecomony using the Ecomonies service
			var sampleEcomony = new Ecomonies({
				name: 'New Ecomony'
			});

			// Create a sample Ecomonies array that includes the new Ecomony
			var sampleEcomonies = [sampleEcomony];

			// Set GET response
			$httpBackend.expectGET('ecomonies').respond(sampleEcomonies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ecomonies).toEqualData(sampleEcomonies);
		}));

		it('$scope.findOne() should create an array with one Ecomony object fetched from XHR using a ecomonyId URL parameter', inject(function(Ecomonies) {
			// Define a sample Ecomony object
			var sampleEcomony = new Ecomonies({
				name: 'New Ecomony'
			});

			// Set the URL parameter
			$stateParams.ecomonyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ecomonies\/([0-9a-fA-F]{24})$/).respond(sampleEcomony);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ecomony).toEqualData(sampleEcomony);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ecomonies) {
			// Create a sample Ecomony object
			var sampleEcomonyPostData = new Ecomonies({
				name: 'New Ecomony'
			});

			// Create a sample Ecomony response
			var sampleEcomonyResponse = new Ecomonies({
				_id: '525cf20451979dea2c000001',
				name: 'New Ecomony'
			});

			// Fixture mock form input values
			scope.name = 'New Ecomony';

			// Set POST response
			$httpBackend.expectPOST('ecomonies', sampleEcomonyPostData).respond(sampleEcomonyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ecomony was created
			expect($location.path()).toBe('/ecomonies/' + sampleEcomonyResponse._id);
		}));

		it('$scope.update() should update a valid Ecomony', inject(function(Ecomonies) {
			// Define a sample Ecomony put data
			var sampleEcomonyPutData = new Ecomonies({
				_id: '525cf20451979dea2c000001',
				name: 'New Ecomony'
			});

			// Mock Ecomony in scope
			scope.ecomony = sampleEcomonyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ecomonies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ecomonies/' + sampleEcomonyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ecomonyId and remove the Ecomony from the scope', inject(function(Ecomonies) {
			// Create new Ecomony object
			var sampleEcomony = new Ecomonies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ecomonies array and include the Ecomony
			scope.ecomonies = [sampleEcomony];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ecomonies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEcomony);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ecomonies.length).toBe(0);
		}));
	});
}());