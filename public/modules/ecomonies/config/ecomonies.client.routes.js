'use strict';

//Setting up route
angular.module('ecomonies').config(['$stateProvider',
	function($stateProvider) {
		// Ecomonies state routing
		$stateProvider.
		state('listEcomonies', {
			url: '/ecomonies',
			templateUrl: 'modules/ecomonies/views/list-ecomonies.client.view.html'
		}).
		state('createEcomony', {
			url: '/ecomonies/create',
			templateUrl: 'modules/ecomonies/views/create-ecomony.client.view.html'
		}).		
		state('calculate', {
			url: '/ecomonies/calculate',
			templateUrl: 'modules/ecomonies/views/calc-ecomony.client.view.html'
		}).
		state('viewEcomony', {
			url: '/ecomonies/:ecomonyId',
			templateUrl: 'modules/ecomonies/views/view-ecomony.client.view.html'
		}).
		state('editEcomony', {
			url: '/ecomonies/:ecomonyId/edit',
			templateUrl: 'modules/ecomonies/views/edit-ecomony.client.view.html'
		});
	}
]);