'use strict';

// Configuring the Articles module
angular.module('statistiques').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Statistiques', 'statistiques', 'dropdown', '/statistiques(/create)?');
		Menus.addSubMenuItem('topbar', 'statistiques', 'Lister Statistiques', 'statistiques');
		Menus.addSubMenuItem('topbar', 'statistiques', 'Ajouter Statistique', 'statistiques/create');
	}
]);