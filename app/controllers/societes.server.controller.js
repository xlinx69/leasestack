'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Societe = mongoose.model('Societe'),
	_ = require('lodash');

/**
 * Create a Societe
 */
exports.create = function(req, res) {
	var societe = new Societe(req.body);
	societe.user = req.user;

	societe.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(societe);
		}
	});
};

/**
 * Show the current Societe
 */
exports.read = function(req, res) {
	res.jsonp(req.societe);
};

/**
 * Update a Societe
 */
exports.update = function(req, res) {
	var societe = req.societe ;

	societe = _.extend(societe , req.body);

	societe.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(societe);
		}
	});
};

/**
 * Delete an Societe
 */
exports.delete = function(req, res) {
	var societe = req.societe ;

	societe.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(societe);
		}
	});
};

/**
 * List of Societes
 */
exports.list = function(req, res) { 
	Societe.find().sort('-created').populate('user', 'displayName').exec(function(err, societes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(societes);
		}
	});
};

/**
 * Societe middleware
 */
exports.societeByID = function(req, res, next, id) { 
	Societe.findById(id).populate('user', 'displayName').exec(function(err, societe) {
		if (err) return next(err);
		if (! societe) return next(new Error('Failed to load Societe ' + id));
		req.societe = societe ;
		next();
	});
};

/**
 * Societe authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.societe.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
