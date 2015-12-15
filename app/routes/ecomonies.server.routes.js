'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ecomonies = require('../../app/controllers/ecomonies.server.controller');

	// Ecomonies Routes
	app.route('/ecomonies')
		.get(ecomonies.list)
		.post(users.requiresLogin, ecomonies.create);

	app.route('/ecomonies/:ecomonyId')
		.get(ecomonies.read)
		.put(users.requiresLogin, ecomonies.hasAuthorization, ecomonies.update)
		.delete(users.requiresLogin, ecomonies.hasAuthorization, ecomonies.delete);

	// Finish by binding the Ecomony middleware
	app.param('ecomonyId', ecomonies.ecomonyByID);
};
