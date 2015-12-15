'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Reglement Schema
 */
var ReglementSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Reglement name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Reglement', ReglementSchema);