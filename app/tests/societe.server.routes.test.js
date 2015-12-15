'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Societe = mongoose.model('Societe'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, societe;

/**
 * Societe routes tests
 */
describe('Societe CRUD tests', function() {
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

		// Save a user to the test db and create new Societe
		user.save(function() {
			societe = {
				name: 'Societe Name'
			};

			done();
		});
	});

	it('should be able to save Societe instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Societe
				agent.post('/societes')
					.send(societe)
					.expect(200)
					.end(function(societeSaveErr, societeSaveRes) {
						// Handle Societe save error
						if (societeSaveErr) done(societeSaveErr);

						// Get a list of Societes
						agent.get('/societes')
							.end(function(societesGetErr, societesGetRes) {
								// Handle Societe save error
								if (societesGetErr) done(societesGetErr);

								// Get Societes list
								var societes = societesGetRes.body;

								// Set assertions
								(societes[0].user._id).should.equal(userId);
								(societes[0].name).should.match('Societe Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Societe instance if not logged in', function(done) {
		agent.post('/societes')
			.send(societe)
			.expect(401)
			.end(function(societeSaveErr, societeSaveRes) {
				// Call the assertion callback
				done(societeSaveErr);
			});
	});

	it('should not be able to save Societe instance if no name is provided', function(done) {
		// Invalidate name field
		societe.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Societe
				agent.post('/societes')
					.send(societe)
					.expect(400)
					.end(function(societeSaveErr, societeSaveRes) {
						// Set message assertion
						(societeSaveRes.body.message).should.match('Please fill Societe name');
						
						// Handle Societe save error
						done(societeSaveErr);
					});
			});
	});

	it('should be able to update Societe instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Societe
				agent.post('/societes')
					.send(societe)
					.expect(200)
					.end(function(societeSaveErr, societeSaveRes) {
						// Handle Societe save error
						if (societeSaveErr) done(societeSaveErr);

						// Update Societe name
						societe.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Societe
						agent.put('/societes/' + societeSaveRes.body._id)
							.send(societe)
							.expect(200)
							.end(function(societeUpdateErr, societeUpdateRes) {
								// Handle Societe update error
								if (societeUpdateErr) done(societeUpdateErr);

								// Set assertions
								(societeUpdateRes.body._id).should.equal(societeSaveRes.body._id);
								(societeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Societes if not signed in', function(done) {
		// Create new Societe model instance
		var societeObj = new Societe(societe);

		// Save the Societe
		societeObj.save(function() {
			// Request Societes
			request(app).get('/societes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Societe if not signed in', function(done) {
		// Create new Societe model instance
		var societeObj = new Societe(societe);

		// Save the Societe
		societeObj.save(function() {
			request(app).get('/societes/' + societeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', societe.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Societe instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Societe
				agent.post('/societes')
					.send(societe)
					.expect(200)
					.end(function(societeSaveErr, societeSaveRes) {
						// Handle Societe save error
						if (societeSaveErr) done(societeSaveErr);

						// Delete existing Societe
						agent.delete('/societes/' + societeSaveRes.body._id)
							.send(societe)
							.expect(200)
							.end(function(societeDeleteErr, societeDeleteRes) {
								// Handle Societe error error
								if (societeDeleteErr) done(societeDeleteErr);

								// Set assertions
								(societeDeleteRes.body._id).should.equal(societeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Societe instance if not signed in', function(done) {
		// Set Societe user 
		societe.user = user;

		// Create new Societe model instance
		var societeObj = new Societe(societe);

		// Save the Societe
		societeObj.save(function() {
			// Try deleting Societe
			request(app).delete('/societes/' + societeObj._id)
			.expect(401)
			.end(function(societeDeleteErr, societeDeleteRes) {
				// Set message assertion
				(societeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Societe error error
				done(societeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Societe.remove().exec();
		done();
	});
});