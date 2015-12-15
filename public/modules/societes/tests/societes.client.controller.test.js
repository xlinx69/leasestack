'use strict';

(function() {
	// Societes Controller Spec
	describe('Societes Controller Tests', function() {
		// Initialize global variables
		var SocietesController,
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

			// Initialize the Societes controller.
			SocietesController = $controller('SocietesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Societe object fetched from XHR', inject(function(Societes) {
			// Create sample Societe using the Societes service
			var sampleSociete = new Societes({
				name: 'New Societe'
			});

			// Create a sample Societes array that includes the new Societe
			var sampleSocietes = [sampleSociete];

			// Set GET response
			$httpBackend.expectGET('societes').respond(sampleSocietes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.societes).toEqualData(sampleSocietes);
		}));

		it('$scope.findOne() should create an array with one Societe object fetched from XHR using a societeId URL parameter', inject(function(Societes) {
			// Define a sample Societe object
			var sampleSociete = new Societes({
				name: 'New Societe'
			});

			// Set the URL parameter
			$stateParams.societeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/societes\/([0-9a-fA-F]{24})$/).respond(sampleSociete);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.societe).toEqualData(sampleSociete);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Societes) {
			// Create a sample Societe object
			var sampleSocietePostData = new Societes({
				name: 'New Societe'
			});

			// Create a sample Societe response
			var sampleSocieteResponse = new Societes({
				_id: '525cf20451979dea2c000001',
				name: 'New Societe'
			});

			// Fixture mock form input values
			scope.name = 'New Societe';

			// Set POST response
			$httpBackend.expectPOST('societes', sampleSocietePostData).respond(sampleSocieteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Societe was created
			expect($location.path()).toBe('/societes/' + sampleSocieteResponse._id);
		}));

		it('$scope.update() should update a valid Societe', inject(function(Societes) {
			// Define a sample Societe put data
			var sampleSocietePutData = new Societes({
				_id: '525cf20451979dea2c000001',
				name: 'New Societe'
			});

			// Mock Societe in scope
			scope.societe = sampleSocietePutData;

			// Set PUT response
			$httpBackend.expectPUT(/societes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/societes/' + sampleSocietePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid societeId and remove the Societe from the scope', inject(function(Societes) {
			// Create new Societe object
			var sampleSociete = new Societes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Societes array and include the Societe
			scope.societes = [sampleSociete];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/societes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSociete);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.societes.length).toBe(0);
		}));
	});
}());