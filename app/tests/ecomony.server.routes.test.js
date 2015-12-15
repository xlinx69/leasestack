'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ecomony = mongoose.model('Ecomony'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ecomony;

/**
 * Ecomony routes tests
 */
describe('Ecomony CRUD tests', function() {
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

		// Save a user to the test db and create new Ecomony
		user.save(function() {
			ecomony = {
				name: 'Ecomony Name'
			};

			done();
		});
	});

	it('should be able to save Ecomony instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ecomony
				agent.post('/ecomonies')
					.send(ecomony)
					.expect(200)
					.end(function(ecomonySaveErr, ecomonySaveRes) {
						// Handle Ecomony save error
						if (ecomonySaveErr) done(ecomonySaveErr);

						// Get a list of Ecomonies
						agent.get('/ecomonies')
							.end(function(ecomoniesGetErr, ecomoniesGetRes) {
								// Handle Ecomony save error
								if (ecomoniesGetErr) done(ecomoniesGetErr);

								// Get Ecomonies list
								var ecomonies = ecomoniesGetRes.body;

								// Set assertions
								(ecomonies[0].user._id).should.equal(userId);
								(ecomonies[0].name).should.match('Ecomony Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ecomony instance if not logged in', function(done) {
		agent.post('/ecomonies')
			.send(ecomony)
			.expect(401)
			.end(function(ecomonySaveErr, ecomonySaveRes) {
				// Call the assertion callback
				done(ecomonySaveErr);
			});
	});

	it('should not be able to save Ecomony instance if no name is provided', function(done) {
		// Invalidate name field
		ecomony.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ecomony
				agent.post('/ecomonies')
					.send(ecomony)
					.expect(400)
					.end(function(ecomonySaveErr, ecomonySaveRes) {
						// Set message assertion
						(ecomonySaveRes.body.message).should.match('Please fill Ecomony name');
						
						// Handle Ecomony save error
						done(ecomonySaveErr);
					});
			});
	});

	it('should be able to update Ecomony instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ecomony
				agent.post('/ecomonies')
					.send(ecomony)
					.expect(200)
					.end(function(ecomonySaveErr, ecomonySaveRes) {
						// Handle Ecomony save error
						if (ecomonySaveErr) done(ecomonySaveErr);

						// Update Ecomony name
						ecomony.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ecomony
						agent.put('/ecomonies/' + ecomonySaveRes.body._id)
							.send(ecomony)
							.expect(200)
							.end(function(ecomonyUpdateErr, ecomonyUpdateRes) {
								// Handle Ecomony update error
								if (ecomonyUpdateErr) done(ecomonyUpdateErr);

								// Set assertions
								(ecomonyUpdateRes.body._id).should.equal(ecomonySaveRes.body._id);
								(ecomonyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ecomonies if not signed in', function(done) {
		// Create new Ecomony model instance
		var ecomonyObj = new Ecomony(ecomony);

		// Save the Ecomony
		ecomonyObj.save(function() {
			// Request Ecomonies
			request(app).get('/ecomonies')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ecomony if not signed in', function(done) {
		// Create new Ecomony model instance
		var ecomonyObj = new Ecomony(ecomony);

		// Save the Ecomony
		ecomonyObj.save(function() {
			request(app).get('/ecomonies/' + ecomonyObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ecomony.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ecomony instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ecomony
				agent.post('/ecomonies')
					.send(ecomony)
					.expect(200)
					.end(function(ecomonySaveErr, ecomonySaveRes) {
						// Handle Ecomony save error
						if (ecomonySaveErr) done(ecomonySaveErr);

						// Delete existing Ecomony
						agent.delete('/ecomonies/' + ecomonySaveRes.body._id)
							.send(ecomony)
							.expect(200)
							.end(function(ecomonyDeleteErr, ecomonyDeleteRes) {
								// Handle Ecomony error error
								if (ecomonyDeleteErr) done(ecomonyDeleteErr);

								// Set assertions
								(ecomonyDeleteRes.body._id).should.equal(ecomonySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ecomony instance if not signed in', function(done) {
		// Set Ecomony user 
		ecomony.user = user;

		// Create new Ecomony model instance
		var ecomonyObj = new Ecomony(ecomony);

		// Save the Ecomony
		ecomonyObj.save(function() {
			// Try deleting Ecomony
			request(app).delete('/ecomonies/' + ecomonyObj._id)
			.expect(401)
			.end(function(ecomonyDeleteErr, ecomonyDeleteRes) {
				// Set message assertion
				(ecomonyDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ecomony error error
				done(ecomonyDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ecomony.remove().exec();
		done();
	});
});