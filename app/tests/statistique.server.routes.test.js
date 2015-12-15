'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Statistique = mongoose.model('Statistique'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, statistique;

/**
 * Statistique routes tests
 */
describe('Statistique CRUD tests', function() {
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

		// Save a user to the test db and create new Statistique
		user.save(function() {
			statistique = {
				name: 'Statistique Name'
			};

			done();
		});
	});

	it('should be able to save Statistique instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Statistique
				agent.post('/statistiques')
					.send(statistique)
					.expect(200)
					.end(function(statistiqueSaveErr, statistiqueSaveRes) {
						// Handle Statistique save error
						if (statistiqueSaveErr) done(statistiqueSaveErr);

						// Get a list of Statistiques
						agent.get('/statistiques')
							.end(function(statistiquesGetErr, statistiquesGetRes) {
								// Handle Statistique save error
								if (statistiquesGetErr) done(statistiquesGetErr);

								// Get Statistiques list
								var statistiques = statistiquesGetRes.body;

								// Set assertions
								(statistiques[0].user._id).should.equal(userId);
								(statistiques[0].name).should.match('Statistique Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Statistique instance if not logged in', function(done) {
		agent.post('/statistiques')
			.send(statistique)
			.expect(401)
			.end(function(statistiqueSaveErr, statistiqueSaveRes) {
				// Call the assertion callback
				done(statistiqueSaveErr);
			});
	});

	it('should not be able to save Statistique instance if no name is provided', function(done) {
		// Invalidate name field
		statistique.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Statistique
				agent.post('/statistiques')
					.send(statistique)
					.expect(400)
					.end(function(statistiqueSaveErr, statistiqueSaveRes) {
						// Set message assertion
						(statistiqueSaveRes.body.message).should.match('Please fill Statistique name');
						
						// Handle Statistique save error
						done(statistiqueSaveErr);
					});
			});
	});

	it('should be able to update Statistique instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Statistique
				agent.post('/statistiques')
					.send(statistique)
					.expect(200)
					.end(function(statistiqueSaveErr, statistiqueSaveRes) {
						// Handle Statistique save error
						if (statistiqueSaveErr) done(statistiqueSaveErr);

						// Update Statistique name
						statistique.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Statistique
						agent.put('/statistiques/' + statistiqueSaveRes.body._id)
							.send(statistique)
							.expect(200)
							.end(function(statistiqueUpdateErr, statistiqueUpdateRes) {
								// Handle Statistique update error
								if (statistiqueUpdateErr) done(statistiqueUpdateErr);

								// Set assertions
								(statistiqueUpdateRes.body._id).should.equal(statistiqueSaveRes.body._id);
								(statistiqueUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Statistiques if not signed in', function(done) {
		// Create new Statistique model instance
		var statistiqueObj = new Statistique(statistique);

		// Save the Statistique
		statistiqueObj.save(function() {
			// Request Statistiques
			request(app).get('/statistiques')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Statistique if not signed in', function(done) {
		// Create new Statistique model instance
		var statistiqueObj = new Statistique(statistique);

		// Save the Statistique
		statistiqueObj.save(function() {
			request(app).get('/statistiques/' + statistiqueObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', statistique.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Statistique instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Statistique
				agent.post('/statistiques')
					.send(statistique)
					.expect(200)
					.end(function(statistiqueSaveErr, statistiqueSaveRes) {
						// Handle Statistique save error
						if (statistiqueSaveErr) done(statistiqueSaveErr);

						// Delete existing Statistique
						agent.delete('/statistiques/' + statistiqueSaveRes.body._id)
							.send(statistique)
							.expect(200)
							.end(function(statistiqueDeleteErr, statistiqueDeleteRes) {
								// Handle Statistique error error
								if (statistiqueDeleteErr) done(statistiqueDeleteErr);

								// Set assertions
								(statistiqueDeleteRes.body._id).should.equal(statistiqueSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Statistique instance if not signed in', function(done) {
		// Set Statistique user 
		statistique.user = user;

		// Create new Statistique model instance
		var statistiqueObj = new Statistique(statistique);

		// Save the Statistique
		statistiqueObj.save(function() {
			// Try deleting Statistique
			request(app).delete('/statistiques/' + statistiqueObj._id)
			.expect(401)
			.end(function(statistiqueDeleteErr, statistiqueDeleteRes) {
				// Set message assertion
				(statistiqueDeleteRes.body.message).should.match('User is not logged in');

				// Handle Statistique error error
				done(statistiqueDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Statistique.remove().exec();
		done();
	});
});