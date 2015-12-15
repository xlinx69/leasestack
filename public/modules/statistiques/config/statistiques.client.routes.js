'use strict';

//Setting up route
angular.module('statistiques').config(['$stateProvider',
	function($stateProvider) {
		// Statistiques state routing
		$stateProvider.
		state('listStatistiques', {
			url: '/statistiques',
			templateUrl: 'modules/statistiques/views/list-statistiques.client.view.html'
		}).
		state('createStatistique', {
			url: '/statistiques/create',
			templateUrl: 'modules/statistiques/views/create-statistique.client.view.html'
		}).
		state('viewStatistique', {
			url: '/statistiques/:statistiqueId',
			templateUrl: 'modules/statistiques/views/view-statistique.client.view.html'
		}).
		state('editStatistique', {
			url: '/statistiques/:statistiqueId/edit',
			templateUrl: 'modules/statistiques/views/edit-statistique.client.view.html'
		});
	}
]);