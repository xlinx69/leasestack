'use strict';

// Configuring the Articles module
angular.module('ecomonies').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ecomonies', 'ecomonies', 'dropdown', '/ecomonies(/create)?');
		Menus.addSubMenuItem('topbar', 'ecomonies', 'Lister Ecomonies', 'ecomonies');
		Menus.addSubMenuItem('topbar', 'ecomonies', 'Ajouter Ecomony', 'ecomonies/create');
		Menus.addSubMenuItem('topbar', 'ecomonies', 'Calculer Ecomony', 'ecomonies/calculate');
	}
]);