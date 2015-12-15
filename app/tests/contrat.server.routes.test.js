'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Contrat = mongoose.model('Contrat'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, contrat;

/**
 * Contrat routes tests
 */
describe('Contrat CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Contrat
		user.save(function() {
			contrat = {
				name: 'Contrat Name'
			};

			done();
		});
	});

	it('should be able to save Contrat instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrat
				agent.post('/contrats')
					.send(contrat)
					.expect(200)
					.end(function(contratSaveErr, contratSaveRes) {
						// Handle Contrat save error
						if (contratSaveErr) done(contratSaveErr);

						// Get a list of Contrats
						agent.get('/contrats')
							.end(function(contratsGetErr, contratsGetRes) {
								// Handle Contrat save error
								if (contratsGetErr) done(contratsGetErr);

								// Get Contrats list
								var contrats = contratsGetRes.body;

								// Set assertions
								(contrats[0].user._id).should.equal(userId);
								(contrats[0].name).should.match('Contrat Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Contrat instance if not logged in', function(done) {
		agent.post('/contrats')
			.send(contrat)
			.expect(401)
			.end(function(contratSaveErr, contratSaveRes) {
				// Call the assertion callback
				done(contratSaveErr);
			});
	});

	it('should not be able to save Contrat instance if no name is provided', function(done) {
		// Invalidate name field
		contrat.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrat
				agent.post('/contrats')
					.send(contrat)
					.expect(400)
					.end(function(contratSaveErr, contratSaveRes) {
						// Set message assertion
						(contratSaveRes.body.message).should.match('Please fill Contrat name');
						
						// Handle Contrat save error
						done(contratSaveErr);
					});
			});
	});

	it('should be able to update Contrat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrat
				agent.post('/contrats')
					.send(contrat)
					.expect(200)
					.end(function(contratSaveErr, contratSaveRes) {
						// Handle Contrat save error
						if (contratSaveErr) done(contratSaveErr);

						// Update Contrat name
						contrat.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Contrat
						agent.put('/contrats/' + contratSaveRes.body._id)
							.send(contrat)
							.expect(200)
							.end(function(contratUpdateErr, contratUpdateRes) {
								// Handle Contrat update error
								if (contratUpdateErr) done(contratUpdateErr);

								// Set assertions
								(contratUpdateRes.body._id).should.equal(contratSaveRes.body._id);
								(contratUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Contrats if not signed in', function(done) {
		// Create new Contrat model instance
		var contratObj = new Contrat(contrat);

		// Save the Contrat
		contratObj.save(function() {
			// Request Contrats
			request(app).get('/contrats')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Contrat if not signed in', function(done) {
		// Create new Contrat model instance
		var contratObj = new Contrat(contrat);

		// Save the Contrat
		contratObj.save(function() {
			request(app).get('/contrats/' + contratObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', contrat.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Contrat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Contrat
				agent.post('/contrats')
					.send(contrat)
					.expect(200)
					.end(function(contratSaveErr, contratSaveRes) {
						// Handle Contrat save error
						if (contratSaveErr) done(contratSaveErr);

						// Delete existing Contrat
						agent.delete('/contrats/' + contratSaveRes.body._id)
							.send(contrat)
							.expect(200)
							.end(function(contratDeleteErr, contratDeleteRes) {
								// Handle Contrat error error
								if (contratDeleteErr) done(contratDeleteErr);

								// Set assertions
								(contratDeleteRes.body._id).should.equal(contratSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Contrat instance if not signed in', function(done) {
		// Set Contrat user 
		contrat.user = user;

		// Create new Contrat model instance
		var contratObj = new Contrat(contrat);

		// Save the Contrat
		contratObj.save(function() {
			// Try deleting Contrat
			request(app).delete('/contrats/' + contratObj._id)
			.expect(401)
			.end(function(contratDeleteErr, contratDeleteRes) {
				// Set message assertion
				(contratDeleteRes.body.message).should.match('User is not logged in');

				// Handle Contrat error error
				done(contratDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Contrat.remove().exec();
		done();
	});
});