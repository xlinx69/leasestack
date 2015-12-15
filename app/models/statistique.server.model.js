'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Statistique Schema
 */
var StatistiqueSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Statistique name',
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

mongoose.model('Statistique', StatistiqueSchema);