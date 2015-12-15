'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var statistiques = require('../../app/controllers/statistiques.server.controller');

	// Statistiques Routes
	app.route('/statistiques')
		.get(statistiques.list)
		.post(users.requiresLogin, statistiques.create);

	app.route('/statistiques/:statistiqueId')
		.get(statistiques.read)
		.put(users.requiresLogin, statistiques.hasAuthorization, statistiques.update)
		.delete(users.requiresLogin, statistiques.hasAuthorization, statistiques.delete);

	// Finish by binding the Statistique middleware
	app.param('statistiqueId', statistiques.statistiqueByID);
};
