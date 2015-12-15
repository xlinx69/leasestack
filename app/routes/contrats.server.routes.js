'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var contrats = require('../../app/controllers/contrats.server.controller');

	// Contrats Routes
	app.route('/contrats')
		.get(contrats.list)
		.post(users.requiresLogin, contrats.create);

	app.route('/contrats/:contratId')
		.get(contrats.read)
		.put(users.requiresLogin, contrats.hasAuthorization, contrats.update)
		.delete(users.requiresLogin, contrats.hasAuthorization, contrats.delete);

	// Finish by binding the Contrat middleware
	app.param('contratId', contrats.contratByID);
};
