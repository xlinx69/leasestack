'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Reglement = mongoose.model('Reglement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, reglement;

/**
 * Reglement routes tests
 */
describe('Reglement CRUD tests', function() {
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

		// Save a user to the test db and create new Reglement
		user.save(function() {
			reglement = {
				name: 'Reglement Name'
			};

			done();
		});
	});

	it('should be able to save Reglement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reglement
				agent.post('/reglements')
					.send(reglement)
					.expect(200)
					.end(function(reglementSaveErr, reglementSaveRes) {
						// Handle Reglement save error
						if (reglementSaveErr) done(reglementSaveErr);

						// Get a list of Reglements
						agent.get('/reglements')
							.end(function(reglementsGetErr, reglementsGetRes) {
								// Handle Reglement save error
								if (reglementsGetErr) done(reglementsGetErr);

								// Get Reglements list
								var reglements = reglementsGetRes.body;

								// Set assertions
								(reglements[0].user._id).should.equal(userId);
								(reglements[0].name).should.match('Reglement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Reglement instance if not logged in', function(done) {
		agent.post('/reglements')
			.send(reglement)
			.expect(401)
			.end(function(reglementSaveErr, reglementSaveRes) {
				// Call the assertion callback
				done(reglementSaveErr);
			});
	});

	it('should not be able to save Reglement instance if no name is provided', function(done) {
		// Invalidate name field
		reglement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reglement
				agent.post('/reglements')
					.send(reglement)
					.expect(400)
					.end(function(reglementSaveErr, reglementSaveRes) {
						// Set message assertion
						(reglementSaveRes.body.message).should.match('Please fill Reglement name');
						
						// Handle Reglement save error
						done(reglementSaveErr);
					});
			});
	});

	it('should be able to update Reglement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reglement
				agent.post('/reglements')
					.send(reglement)
					.expect(200)
					.end(function(reglementSaveErr, reglementSaveRes) {
						// Handle Reglement save error
						if (reglementSaveErr) done(reglementSaveErr);

						// Update Reglement name
						reglement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Reglement
						agent.put('/reglements/' + reglementSaveRes.body._id)
							.send(reglement)
							.expect(200)
							.end(function(reglementUpdateErr, reglementUpdateRes) {
								// Handle Reglement update error
								if (reglementUpdateErr) done(reglementUpdateErr);

								// Set assertions
								(reglementUpdateRes.body._id).should.equal(reglementSaveRes.body._id);
								(reglementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Reglements if not signed in', function(done) {
		// Create new Reglement model instance
		var reglementObj = new Reglement(reglement);

		// Save the Reglement
		reglementObj.save(function() {
			// Request Reglements
			request(app).get('/reglements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Reglement if not signed in', function(done) {
		// Create new Reglement model instance
		var reglementObj = new Reglement(reglement);

		// Save the Reglement
		reglementObj.save(function() {
			request(app).get('/reglements/' + reglementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', reglement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Reglement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Reglement
				agent.post('/reglements')
					.send(reglement)
					.expect(200)
					.end(function(reglementSaveErr, reglementSaveRes) {
						// Handle Reglement save error
						if (reglementSaveErr) done(reglementSaveErr);

						// Delete existing Reglement
						agent.delete('/reglements/' + reglementSaveRes.body._id)
							.send(reglement)
							.expect(200)
							.end(function(reglementDeleteErr, reglementDeleteRes) {
								// Handle Reglement error error
								if (reglementDeleteErr) done(reglementDeleteErr);

								// Set assertions
								(reglementDeleteRes.body._id).should.equal(reglementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Reglement instance if not signed in', function(done) {
		// Set Reglement user 
		reglement.user = user;

		// Create new Reglement model instance
		var reglementObj = new Reglement(reglement);

		// Save the Reglement
		reglementObj.save(function() {
			// Try deleting Reglement
			request(app).delete('/reglements/' + reglementObj._id)
			.expect(401)
			.end(function(reglementDeleteErr, reglementDeleteRes) {
				// Set message assertion
				(reglementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Reglement error error
				done(reglementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Reglement.remove().exec();
		done();
	});
});