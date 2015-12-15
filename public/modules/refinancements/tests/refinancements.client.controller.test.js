'use strict';

(function() {
	// Refinancements Controller Spec
	describe('Refinancements Controller Tests', function() {
		// Initialize global variables
		var RefinancementsController,
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

			// Initialize the Refinancements controller.
			RefinancementsController = $controller('RefinancementsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Refinancement object fetched from XHR', inject(function(Refinancements) {
			// Create sample Refinancement using the Refinancements service
			var sampleRefinancement = new Refinancements({
				name: 'New Refinancement'
			});

			// Create a sample Refinancements array that includes the new Refinancement
			var sampleRefinancements = [sampleRefinancement];

			// Set GET response
			$httpBackend.expectGET('refinancements').respond(sampleRefinancements);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.refinancements).toEqualData(sampleRefinancements);
		}));

		it('$scope.findOne() should create an array with one Refinancement object fetched from XHR using a refinancementId URL parameter', inject(function(Refinancements) {
			// Define a sample Refinancement object
			var sampleRefinancement = new Refinancements({
				name: 'New Refinancement'
			});

			// Set the URL parameter
			$stateParams.refinancementId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/refinancements\/([0-9a-fA-F]{24})$/).respond(sampleRefinancement);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.refinancement).toEqualData(sampleRefinancement);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Refinancements) {
			// Create a sample Refinancement object
			var sampleRefinancementPostData = new Refinancements({
				name: 'New Refinancement'
			});

			// Create a sample Refinancement response
			var sampleRefinancementResponse = new Refinancements({
				_id: '525cf20451979dea2c000001',
				name: 'New Refinancement'
			});

			// Fixture mock form input values
			scope.name = 'New Refinancement';

			// Set POST response
			$httpBackend.expectPOST('refinancements', sampleRefinancementPostData).respond(sampleRefinancementResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Refinancement was created
			expect($location.path()).toBe('/refinancements/' + sampleRefinancementResponse._id);
		}));

		it('$scope.update() should update a valid Refinancement', inject(function(Refinancements) {
			// Define a sample Refinancement put data
			var sampleRefinancementPutData = new Refinancements({
				_id: '525cf20451979dea2c000001',
				name: 'New Refinancement'
			});

			// Mock Refinancement in scope
			scope.refinancement = sampleRefinancementPutData;

			// Set PUT response
			$httpBackend.expectPUT(/refinancements\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/refinancements/' + sampleRefinancementPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid refinancementId and remove the Refinancement from the scope', inject(function(Refinancements) {
			// Create new Refinancement object
			var sampleRefinancement = new Refinancements({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Refinancements array and include the Refinancement
			scope.refinancements = [sampleRefinancement];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/refinancements\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRefinancement);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.refinancements.length).toBe(0);
		}));
	});
}());