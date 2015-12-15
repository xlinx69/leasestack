'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Societe Schema
 */
var SocieteSchema = new Schema({
	stenom: {
		type: String,
		default: '-',
		required: 'manque Societe name',
		trim: true
	},	
	stegrp: {
		type: String,
		default: '-',
		required: 'manque groupe name',
		trim: true
	},	
	siren: {
		type: Number,
		default: 999999999
	},	
	steformsoc: {
		type: String,
		default: '-',
		required: 'manque type ste',
		trim: true
	},	
	stedcreat: {
		type: Date,
		default: Date.now
	},
	capsoc: {
		type: Number,
		default: 88888
	},	
	stedcloture: {
		type: Date,
		default: Date.now
	},
	ca: {
		type: Number,
		default: 99999	
	},
	can: {
		type: Number,
		default: 99999
	},
	rn: {
		type: Number,
		default: 999
	},
	rnn: {
		type: Number,
		default: 999
	},
	banquepal: {
		type: String,
		default: '-',
		required: 'manque banque principale',
		trim: true
	},
	banquesec: {
		type: String,
		default: '-',
		required: 'manque banque secondaire',
		trim: true
	},
	stetype: {
		type: String,
		default: '-',
		required: 'manque type locataire-prospect-partenaire-fournisseur',
		trim: true
	},		
	steadresse1: {
		type: String,
		default: '-',
		required: 'manque adresse',
		trim: true
	},	
	steadresse2: {
		type: String,
		default: '-',
		required: 'manque complement adresse',
		trim: true
	},	
	stecp: {
		type: Number,
		default: 99999
	},	
	steville: {
		type: String,
		default: '-',
		required: 'manque ville',
		trim: true
	},	
	stetel: {
		type: String,
		default: '-',
		required: 'manque tel',
		trim: true
	},	
	stefax: {
		type: String,
		default: '-',
		required: 'manque fax',
		trim: true
	},	
	stemail: {
		type: String,
		default: '-',
		required: 'manque mel',
		trim: true
	},

	mandname: {
		type: String,
		default: '-',
		required: 'manque mandataire',
		trim: true
	},	
	mandfonc: {
		type: String,
		default: '-',
		required: 'manque man dfunc',
		trim: true
	},	

	finname: {
		type: String,
		default: '-',
		required: 'manque contact finance',
		trim: true
	},
	compname: {
		type: String,
		default: '-',
		required: 'manque contact compta',
		trim: true
	},
	dgname: {
		type: String,
		default: '-',
		required: 'manque contact dg',
		trim: true
	},
	techname: {
		type: String,
		default: '-',
		required: 'manque contact technique',
		trim: true
	},
	assname: {
		type: String,
		default: '-',
		required: 'manque contact assistante',
		trim: true
	},
	consultant: {
		type: String,
		default: '-',
		required: 'manque consultant name',
		trim: true
	},
	partenaire: {
		type: String,
		default: '-',
		required: 'manque nom ste partenaire',
		trim: true
	},
	
	etatbdf: {
		type: String,
		default: '-',
		required: 'manque cotation bdf',
		trim: true
	},
	etatfi: {
		type: String,
		default: '-',
		required: 'manque etat financier',
		trim: true
	},
	etatpc: {
		type: String,
		default: '-',
		required: 'proc collective',
		trim: true
	},

	incident: {
		type: String,
		default: '-',
		required: 'incident rglt',
		trim: true
	},

	stecommentaire: {
		type: String,
		default: '-',
		required: 'ras',
		trim: true
	},

	modified: {
		type: Date,
		default: Date.now
	},

	modifier: {
		type: String,
		default: 'User',
		required: 'manque modificateur',
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

mongoose.model('Societe', SocieteSchema);

/*
	stenom: {
	stegrp: {
	siren: {
	steformsoc: {
	stedcreat: {
	capsoc: {	
	stedcloture: {
	ca: {
	can: {
	rn: {
	rnn: {
	banquepal: {
	banquesec: {
	stetype: {
	steadresse1: {
	steadresse2: {
	stecp: {
	steville: {
	stetel: {
	stefax: {
	stemail: {

	mandname: {
	mandfonc: {
	
	finname: {
	compname: {
	dgname: {
	techname: {
	assname: {
	consultant: {
	partenaire: {

	etatbdf: {
	etatfi: {
	etatpc: {
	stecommentaire: {
	
	modified: {
	modifier: {

	created: {
	user: {

*/