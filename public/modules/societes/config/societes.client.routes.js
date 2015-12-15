'use strict';

//Setting up route
angular.module('societes').config(['$stateProvider',
	function($stateProvider) {
		// Societes state routing
		$stateProvider.
		state('listSocietes', {
			url: '/societes',
			templateUrl: 'modules/societes/views/list-societes.client.view.html'
		}).
		state('createSociete', {
			url: '/societes/create',
			templateUrl: 'modules/societes/views/create-societe.client.view.html'
		}).
		state('viewSociete', {
			url: '/societes/:societeId',
			templateUrl: 'modules/societes/views/view-societe.client.view.html'
		}).
		state('editSociete', {
			url: '/societes/:societeId/edit',
			templateUrl: 'modules/societes/views/edit-societe.client.view.html'
		});
	}
]);