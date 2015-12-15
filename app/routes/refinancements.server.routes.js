'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var refinancements = require('../../app/controllers/refinancements.server.controller');

	// Refinancements Routes
	app.route('/refinancements')
		.get(refinancements.list)
		.post(users.requiresLogin, refinancements.create);

	app.route('/refinancements/:refinancementId')
		.get(refinancements.read)
		.put(users.requiresLogin, refinancements.hasAuthorization, refinancements.update)
		.delete(users.requiresLogin, refinancements.hasAuthorization, refinancements.delete);

	// Finish by binding the Refinancement middleware
	app.param('refinancementId', refinancements.refinancementByID);
};
