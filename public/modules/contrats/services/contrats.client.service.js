'use strict';

//Contrats service used to communicate Contrats REST endpoints
angular.module('contrats').factory('Contrats', ['$resource',
	function($resource) {
		return $resource('contrats/:contratId', { contratId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);