'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ecomony Schema
 */
var EcomonySchema = new Schema({
	bu: {
		type: String,
		default: '',
		required: 'BU',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Ecomony name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	modified: {
		type: Date,
		default: Date.now
	},
	modifier: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
//*
	fieconum: {
		type: Number,
		default: 1000
	},
	locataire: {
		type: String,
		default: 'locataire svp ...',
		trim: true
	},
	typeactif: {
		type: String,
		default: 'type actif svp ...',
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
		default: 16
	},
	loyer: {
		type: Number,
		default: 0
	},
	drfmtcession: {
		type: Number,
		default: 0
	},
	drfcoef: {
		type: Number,
		default: 7.102
	},
	drfaccord: {
		type: String,
		default: 'accord refis ...',
		trim: true
	},
	fcomtachat: {
		type: Number,
		default: 0
	},
	fcomtrachat: {
		type: Number,
		default: 0
	},
	fcomtafin: {
		type: Number,
		default: 0
	},	
	fcomtnfin: {
		type: Number,
		default: 0
	},	
	fcotxcommpart: {
		type: Number,
		default: 0
	},	
	fcocommpart: {
		type: Number,
		default: 0
	},
	fcotxcommapport: {
		type: Number,
		default: 0
	},	
	fcocommapport: {
		type: Number,
		default: 0
	},
	fcofraisfi: {
		type: Number,
		default: 0
	},
	fcovaleuract: {
		type: Number,
		default: 0
	},
	fcomargebrute: {
		type: Number,
		default: 0
	},
	fcomargenette: {
		type: Number,
		default: 0
	},
	fcomargemad: {
		type: Number,
		default: 0
	},
	fcomargerev: {
		type: Number,
		default: 0
	},	
	fcomargeprlg: {
		type: Number,
		default: 0
	},
	fcomargefinale: {
		type: Number,
		default: 0
	},
	fcocommentaire: {
		type: String,
		default: 'commentaire fiche economie',
		trim: true
	},
	factachat: {
    numfacture: { type: String, lowercase: true, trim: true },
    fournisseur: { type: String, lowercase: true, trim: true },
    dateemission: { type: String, lowercase: true, trim: true },
    datexig: { type: String, lowercase: true, trim: true },
    montantht: { type: String, lowercase: true, trim: true },
    montantttc: { type: String, lowercase: true, trim: true }
  	}


});

mongoose.model('Ecomony', EcomonySchema);