'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var reglements = require('../../app/controllers/reglements.server.controller');

	// Reglements Routes
	app.route('/reglements')
		.get(reglements.list)
		.post(users.requiresLogin, reglements.create);

	app.route('/reglements/:reglementId')
		.get(reglements.read)
		.put(users.requiresLogin, reglements.hasAuthorization, reglements.update)
		.delete(users.requiresLogin, reglements.hasAuthorization, reglements.delete);

	// Finish by binding the Reglement middleware
	app.param('reglementId', reglements.reglementByID);
};
