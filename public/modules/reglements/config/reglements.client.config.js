'use strict';

// Configuring the Articles module
angular.module('reglements').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Reglements', 'reglements', 'dropdown', '/reglements(/create)?');
		Menus.addSubMenuItem('topbar', 'reglements', 'Lister Reglements', 'reglements');
		Menus.addSubMenuItem('topbar', 'reglements', 'Ajouter Reglement', 'reglements/create');
	}
]);