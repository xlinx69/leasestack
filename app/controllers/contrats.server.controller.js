'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contrat = mongoose.model('Contrat'),
	_ = require('lodash');

/**
 * Create a Contrat
 */
exports.create = function(req, res) {
	var contrat = new Contrat(req.body);
	contrat.user = req.user;

	contrat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrat);
		}
	});
};

/**
 * Show the current Contrat
 */
exports.read = function(req, res) {
	res.jsonp(req.contrat);
};

/**
 * Update a Contrat
 */
exports.update = function(req, res) {
	var contrat = req.contrat ;

	contrat = _.extend(contrat , req.body);

	contrat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrat);
		}
	});
};

/**
 * Delete an Contrat
 */
exports.delete = function(req, res) {
	var contrat = req.contrat ;

	contrat.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrat);
		}
	});
};

/**
 * List of Contrats
 */
exports.list = function(req, res) { 
	Contrat.find().sort('-created').populate('user', 'displayName').exec(function(err, contrats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contrats);
		}
	});
};

/**
 * Contrat middleware
 */
exports.contratByID = function(req, res, next, id) { 
	Contrat.findById(id).populate('user', 'displayName').exec(function(err, contrat) {
		if (err) return next(err);
		if (! contrat) return next(new Error('Failed to load Contrat ' + id));
		req.contrat = contrat ;
		next();
	});
};


/**
 * Contrat authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contrat.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
