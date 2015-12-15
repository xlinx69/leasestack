'use strict';

//Reglements service used to communicate Reglements REST endpoints
angular.module('reglements').factory('Reglements', ['$resource',
	function($resource) {
		return $resource('reglements/:reglementId', { reglementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);