'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var societes = require('../../app/controllers/societes.server.controller');

	// Societes Routes
	app.route('/societes')
		.get(societes.list)
		.post(users.requiresLogin, societes.create);

	app.route('/societes/:societeId')
		.get(societes.read)
		.put(users.requiresLogin, societes.hasAuthorization, societes.update)
		.delete(users.requiresLogin, societes.hasAuthorization, societes.delete);

	// Finish by binding the Societe middleware
	app.param('societeId', societes.societeByID);
};
