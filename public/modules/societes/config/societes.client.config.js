'use strict';

// Configuring the Articles module
angular.module('societes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Societes', 'societes', 'dropdown', '/societes(/create)?');
		Menus.addSubMenuItem('topbar', 'societes', 'Lister Societes', 'societes');
		Menus.addSubMenuItem('topbar', 'societes', 'Ajouter Societe', 'societes/create');
	}
]);