'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Reglement = mongoose.model('Reglement'),
	_ = require('lodash');

/**
 * Create a Reglement
 */
exports.create = function(req, res) {
	var reglement = new Reglement(req.body);
	reglement.user = req.user;

	reglement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reglement);
		}
	});
};

/**
 * Show the current Reglement
 */
exports.read = function(req, res) {
	res.jsonp(req.reglement);
};

/**
 * Update a Reglement
 */
exports.update = function(req, res) {
	var reglement = req.reglement ;

	reglement = _.extend(reglement , req.body);

	reglement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reglement);
		}
	});
};

/**
 * Delete an Reglement
 */
exports.delete = function(req, res) {
	var reglement = req.reglement ;

	reglement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reglement);
		}
	});
};

/**
 * List of Reglements
 */
exports.list = function(req, res) { 
	Reglement.find().sort('-created').populate('user', 'displayName').exec(function(err, reglements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reglements);
		}
	});
};

/**
 * Reglement middleware
 */
exports.reglementByID = function(req, res, next, id) { 
	Reglement.findById(id).populate('user', 'displayName').exec(function(err, reglement) {
		if (err) return next(err);
		if (! reglement) return next(new Error('Failed to load Reglement ' + id));
		req.reglement = reglement ;
		next();
	});
};

/**
 * Reglement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.reglement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
