'use strict';

//Setting up route
angular.module('reglements').config(['$stateProvider',
	function($stateProvider) {
		// Reglements state routing
		$stateProvider.
		state('listReglements', {
			url: '/reglements',
			templateUrl: 'modules/reglements/views/list-reglements.client.view.html'
		}).
		state('createReglement', {
			url: '/reglements/create',
			templateUrl: 'modules/reglements/views/create-reglement.client.view.html'
		}).
		state('viewReglement', {
			url: '/reglements/:reglementId',
			templateUrl: 'modules/reglements/views/view-reglement.client.view.html'
		}).
		state('editReglement', {
			url: '/reglements/:reglementId/edit',
			templateUrl: 'modules/reglements/views/edit-reglement.client.view.html'
		});
	}
]);