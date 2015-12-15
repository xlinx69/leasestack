'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contrat Schema
 */
var ContratSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	//<!-- begin include chde -->
	bu: {
		type: String,
		default: 'EVL',
		trim:true
	},	
	ctrtnum: {
		type: Number,
		default: 9999,
	},

	econum: {
		type: Number,
		default: 9999,
	},
	drfnum: {
		type: Number,
		default: 9999,
	},
	locataire: {
		type: String,
		default: 'loc',
		trim: true
	},
	siren: {
		type: Number,
		default: 999999999,
	},
	typeactif: {
		type: String,
		default: 'technologique',
		trim: true
	},
	refinanceur: {
		type: String,
		default: 'Siemens',
		trim: true
	},
	consultant: {
		type: String,
		default: 'chde',
		trim: true
	},
	partenaire: {
		type: String,
		default: 'part',
		trim: true
	},
	duree: {
		type: Number,
		default: 48
	},
	periodicite: {
		type: String,
		default: 'tri',
		trim: true
	},
	nbperiode: {
		type: Number,
		default: 16
	},
	loyer: {
		type: Number,
		default: 0,
		trim: true
	},
	etatrefinct: {
		type: String,
		default: 'non defini',
		trim: true
	},
	etatcession: {
		type: String,
		default: 'non defini',
		trim: true
	},
	etatdenonc: {
		type: String,
		default: 'non defini',
		trim: true
	},
	etatvie: {
		type: String,
		default: 'non defini ',
		trim: true
	},

	etatrglt: { type: String,default: 'non defini',trim: true},
	// ctrtscantg: { type: Boolean ,default: 'false' },

	// ctrtmadfacturetg: { type: Boolean ,default: 'false'},
	// ctrtmadprelevtg: { type: Boolean ,default: 'false'},
	// ctrtrumtg: { type: Boolean ,default: 'false'},

	ctrtscantg: { type: String ,default: 'false',trim: true },

	ctrtmadfacturetg: { type: String ,default: 'false',trim: true},
	ctrtmadprelevtg: { type: String ,default: 'false',trim: true},
	ctrtrumtg: { type: String ,default: 'false',trim: true},





	ctrtrumnum: { type: Number, default: 0 },

	ctrtdenvoidossierrefi: { type: Date, default: Date.now  },
	
	ctrtddebut: {
		type: Date,
		default: Date.now
	},	
	ctrtdfin: {
		type: Date,
		default: Date.now
	},
	ctrtddenonc: {
		type: Date,
		default: Date.now
	},
	crtrtdlim: {
		type: Date,
		default: Date.now
	},
	ctrtdcloture: {
		type: Date,
		default: Date.now
	},	
	ctrtdcession: {
		type: Date,
		default: Date.now
	},	
	ctrtdsignature: {
		type: Date,
		default: Date.now
	},
	ctrtcommentaire: {
		type: String,
		default: 'commentaires commerciaux contrat ',
		trim: true
	},
		ctrtcommentaireadm: {
		type: String,
		default: 'commentaires administratifs contrat ',
		trim: true
	},
		ctrtcommentairerglt: {
		type: String,
		default: 'commentaires reglements contrat ',
		trim: true
	},
	modifier: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	modified: {
		type: Date,
		default: Date.now
	}

//<!-- end include chde -->


});

mongoose.model('Contrat', ContratSchema);