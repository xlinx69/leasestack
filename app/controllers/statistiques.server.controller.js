'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Statistique = mongoose.model('Statistique'),
	_ = require('lodash');

/**
 * Create a Statistique
 */
exports.create = function(req, res) {
	var statistique = new Statistique(req.body);
	statistique.user = req.user;

	statistique.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(statistique);
		}
	});
};

/**
 * Show the current Statistique
 */
exports.read = function(req, res) {
	res.jsonp(req.statistique);
};

/**
 * Update a Statistique
 */
exports.update = function(req, res) {
	var statistique = req.statistique ;

	statistique = _.extend(statistique , req.body);

	statistique.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(statistique);
		}
	});
};

/**
 * Delete an Statistique
 */
exports.delete = function(req, res) {
	var statistique = req.statistique ;

	statistique.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(statistique);
		}
	});
};

/**
 * List of Statistiques
 */
exports.list = function(req, res) { 
	Statistique.find().sort('-created').populate('user', 'displayName').exec(function(err, statistiques) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(statistiques);
		}
	});
};

/**
 * Statistique middleware
 */
exports.statistiqueByID = function(req, res, next, id) { 
	Statistique.findById(id).populate('user', 'displayName').exec(function(err, statistique) {
		if (err) return next(err);
		if (! statistique) return next(new Error('Failed to load Statistique ' + id));
		req.statistique = statistique ;
		next();
	});
};

/**
 * Statistique authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.statistique.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
