'use strict';

//Statistiques service used to communicate Statistiques REST endpoints
angular.module('statistiques').factory('Statistiques', ['$resource',
	function($resource) {
		return $resource('statistiques/:statistiqueId', { statistiqueId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);