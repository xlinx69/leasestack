'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Refinancement Schema
 */
var RefinancementSchema = new Schema({
	bu: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	
	//<!-- begin include chde -->

	crtnum: {
		type: Number,
		default: 1000
	},
	drfnum: {
		type: Number,
		default: 10000
	},
	locataire: {
		type: String,
		default: 'locataire svp ...',
		trim: true
	},
	typactif: {
		type: String,
		default: 'type actif...',
		trim: true
	},
	refinanceur: {
		type: String,
		default: 'refinanceur svp ...',
		trim: true
	},
	consultant: {
		type: String,
		default: 'consultant svp ...',
		trim: true
	},
	partenaire: {
		type: String,
		default: 'partenaire svp ...',
		trim: true
	},
	duree: {
		type: Number,
		default: 36
	},
	periodicite: {
		type: String,
		default: 'tri',
		trim: true
	},
	nbperiode: {
		type: Number,
		default: 12
	},
	loyer: {
		type: Number,
		default: 0
	},

	drfmntafin: {
		type: Number,
		default: 0
	},	

	drfmtcession: {
		type: Number,
		default: 0
	},
	drfcoef: {
		type: Number,
		default: 0
	},
	drfaccord: {
		type: String,
		default: 'accord refis ...',
		trim: true
	},
	drfdatedemande: {
		type: Date,
		default: Date.now
	},	
	drfdateaccord: {
		type: Date,
		default: Date.now
	},
	drfdatelima: {
		type: Date,
		default: Date.now
	},
	modifier: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	modified: {
		type: Date,
		default: Date.now
	},

	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});


mongoose.model('Refinancement', RefinancementSchema);

