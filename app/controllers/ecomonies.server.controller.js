'use strict';

/**
 * Module depen derthuy(uyncies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ecomony = mongoose.model('Ecomony'),
	_ = require('lodash');

/**
 * Create a Ecomony
 */
exports.create = function(req, res) {
	var ecomony = new Ecomony(req.body);
	ecomony.user = req.user;

	ecomony.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ecomony);
		}
	});
};

/**
 * Show the current Ecomony
 */
exports.read = function(req, res) {
	res.jsonp(req.ecomony);
};

/**
 * Update a Ecomony
 */
exports.update = function(req, res) {
	var ecomony = req.ecomony ;

	ecomony = _.extend(ecomony , req.body);

	ecomony.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ecomony);
		}
	});
};

/**
 * Delete an Ecomony
 */
exports.delete = function(req, res) {
	var ecomony = req.ecomony ;

	ecomony.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ecomony);
		}
	});
};

/**
 * List of Ecomonies
 */
exports.list = function(req, res) { 
	Ecomony.find().sort('-created').populate('user', 'displayName').exec(function(err, ecomonies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ecomonies);
		}
	});
};

/**
 * Ecomony middleware
 */
exports.ecomonyByID = function(req, res, next, id) { 
	Ecomony.findById(id).populate('user', 'displayName').exec(function(err, ecomony) {
		if (err) return next(err);
		if (! ecomony) return next(new Error('Failed to load Ecomony ' + id));
		req.ecomony = ecomony ;
		next();
	});
};

/**
 * Ecomony authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ecomony.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
