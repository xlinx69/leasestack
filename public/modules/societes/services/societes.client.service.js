'use strict';

//Societes service used to communicate Societes REST endpoints
angular.module('societes').factory('Societes', ['$resource',
	function($resource) {
		return $resource('societes/:societeId', { societeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);