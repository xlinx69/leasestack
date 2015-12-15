'use strict';

//Setting up route
angular.module('refinancements').config(['$stateProvider',
	function($stateProvider) {
		// Refinancements state routing
		$stateProvider.
		state('listRefinancements', {
			url: '/refinancements',
			templateUrl: 'modules/refinancements/views/list-refinancements.client.view.html'
		}).
		state('createRefinancement', {
			url: '/refinancements/create',
			templateUrl: 'modules/refinancements/views/create-refinancement.client.view.html'
		}).
		state('runRefinancement', {
			url: '/refinancements/run',
			templateUrl: 'modules/refinancements/views/run-refinancement.client.view.html'
		}).
		state('viewRefinancement', {
			url: '/refinancements/:refinancementId',
			templateUrl: 'modules/refinancements/views/view-refinancement.client.view.html'
		}).
		state('editRefinancement', {
			url: '/refinancements/:refinancementId/edit',
			templateUrl: 'modules/refinancements/views/edit-refinancement.client.view.html'
		});
	}
]);