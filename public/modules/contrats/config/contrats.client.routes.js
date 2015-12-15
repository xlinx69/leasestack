'use strict';

//Setting up route
angular.module('contrats').config(['$stateProvider',
	function($stateProvider) {
		// Contrats state routing
		$stateProvider.
		state('listContrats', {
			url: '/contrats',
			templateUrl: 'modules/contrats/views/list-contrats.client.view.html'
		}).
		state('createContrat', {
			url: '/contrats/create',
			templateUrl: 'modules/contrats/views/create-contrat.client.view.html'
		}).
		state('runContrat', {
			url: '/contrats/:contratId/run',
			templateUrl: 'modules/contrats/views/run-contrat.client.view.html'
		}).
		state('viewContrat', {
			url: '/contrats/:contratId',
			templateUrl: 'modules/contrats/views/view-contrat.client.view.html'
		}).
		state('editContrat', {
			url: '/contrats/:contratId/edit',
			templateUrl: 'modules/contrats/views/edit-contrat.client.view.html'
		});
	}
]);