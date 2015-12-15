'use strict';

//Refinancements service used to communicate Refinancements REST endpoints
angular.module('refinancements').factory('Refinancements', ['$resource',
	function($resource) {
		return $resource('refinancements/:refinancementId', { refinancementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);