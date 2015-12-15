'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Refinancement = mongoose.model('Refinancement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, refinancement;

/**
 * Refinancement routes tests
 */
describe('Refinancement CRUD tests', function() {
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

		// Save a user to the test db and create new Refinancement
		user.save(function() {
			refinancement = {
				name: 'Refinancement Name'
			};

			done();
		});
	});

	it('should be able to save Refinancement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Refinancement
				agent.post('/refinancements')
					.send(refinancement)
					.expect(200)
					.end(function(refinancementSaveErr, refinancementSaveRes) {
						// Handle Refinancement save error
						if (refinancementSaveErr) done(refinancementSaveErr);

						// Get a list of Refinancements
						agent.get('/refinancements')
							.end(function(refinancementsGetErr, refinancementsGetRes) {
								// Handle Refinancement save error
								if (refinancementsGetErr) done(refinancementsGetErr);

								// Get Refinancements list
								var refinancements = refinancementsGetRes.body;

								// Set assertions
								(refinancements[0].user._id).should.equal(userId);
								(refinancements[0].name).should.match('Refinancement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Refinancement instance if not logged in', function(done) {
		agent.post('/refinancements')
			.send(refinancement)
			.expect(401)
			.end(function(refinancementSaveErr, refinancementSaveRes) {
				// Call the assertion callback
				done(refinancementSaveErr);
			});
	});

	it('should not be able to save Refinancement instance if no name is provided', function(done) {
		// Invalidate name field
		refinancement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Refinancement
				agent.post('/refinancements')
					.send(refinancement)
					.expect(400)
					.end(function(refinancementSaveErr, refinancementSaveRes) {
						// Set message assertion
						(refinancementSaveRes.body.message).should.match('Please fill Refinancement name');
						
						// Handle Refinancement save error
						done(refinancementSaveErr);
					});
			});
	});

	it('should be able to update Refinancement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Refinancement
				agent.post('/refinancements')
					.send(refinancement)
					.expect(200)
					.end(function(refinancementSaveErr, refinancementSaveRes) {
						// Handle Refinancement save error
						if (refinancementSaveErr) done(refinancementSaveErr);

						// Update Refinancement name
						refinancement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Refinancement
						agent.put('/refinancements/' + refinancementSaveRes.body._id)
							.send(refinancement)
							.expect(200)
							.end(function(refinancementUpdateErr, refinancementUpdateRes) {
								// Handle Refinancement update error
								if (refinancementUpdateErr) done(refinancementUpdateErr);

								// Set assertions
								(refinancementUpdateRes.body._id).should.equal(refinancementSaveRes.body._id);
								(refinancementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Refinancements if not signed in', function(done) {
		// Create new Refinancement model instance
		var refinancementObj = new Refinancement(refinancement);

		// Save the Refinancement
		refinancementObj.save(function() {
			// Request Refinancements
			request(app).get('/refinancements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Refinancement if not signed in', function(done) {
		// Create new Refinancement model instance
		var refinancementObj = new Refinancement(refinancement);

		// Save the Refinancement
		refinancementObj.save(function() {
			request(app).get('/refinancements/' + refinancementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', refinancement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Refinancement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Refinancement
				agent.post('/refinancements')
					.send(refinancement)
					.expect(200)
					.end(function(refinancementSaveErr, refinancementSaveRes) {
						// Handle Refinancement save error
						if (refinancementSaveErr) done(refinancementSaveErr);

						// Delete existing Refinancement
						agent.delete('/refinancements/' + refinancementSaveRes.body._id)
							.send(refinancement)
							.expect(200)
							.end(function(refinancementDeleteErr, refinancementDeleteRes) {
								// Handle Refinancement error error
								if (refinancementDeleteErr) done(refinancementDeleteErr);

								// Set assertions
								(refinancementDeleteRes.body._id).should.equal(refinancementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Refinancement instance if not signed in', function(done) {
		// Set Refinancement user 
		refinancement.user = user;

		// Create new Refinancement model instance
		var refinancementObj = new Refinancement(refinancement);

		// Save the Refinancement
		refinancementObj.save(function() {
			// Try deleting Refinancement
			request(app).delete('/refinancements/' + refinancementObj._id)
			.expect(401)
			.end(function(refinancementDeleteErr, refinancementDeleteRes) {
				// Set message assertion
				(refinancementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Refinancement error error
				done(refinancementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Refinancement.remove().exec();
		done();
	});
});