'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Refinancement = mongoose.model('Refinancement'),
	_ = require('lodash');

/**
 * Create a Refinancement
 */
exports.create = function(req, res) {
	var refinancement = new Refinancement(req.body);
	refinancement.user = req.user;

	refinancement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(refinancement);
		}
	});
};

/**
 * Show the current Refinancement
 */
exports.read = function(req, res) {
	res.jsonp(req.refinancement);
};

/**
 * Update a Refinancement
 */
exports.update = function(req, res) {
	var refinancement = req.refinancement ;

	refinancement = _.extend(refinancement , req.body);

	refinancement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(refinancement);
		}
	});
};

/**
 * Delete an Refinancement
 */
exports.delete = function(req, res) {
	var refinancement = req.refinancement ;

	refinancement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(refinancement);
		}
	});
};

/**
 * List of Refinancements
 */
exports.list = function(req, res) { 
	Refinancement.find().sort('-created').populate('user', 'displayName').exec(function(err, refinancements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(refinancements);
		}
	});
};

/**
 * Refinancement middleware
 */
exports.refinancementByID = function(req, res, next, id) { 
	Refinancement.findById(id).populate('user', 'displayName').exec(function(err, refinancement) {
		if (err) return next(err);
		if (! refinancement) return next(new Error('Failed to load Refinancement ' + id));
		req.refinancement = refinancement ;
		next();
	});
};

/**
 * Refinancement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.refinancement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
