'use strict';

// Configuring the Articles module
angular.module('contrats').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contrats', 'contrats', 'dropdown', '/contrats(/create)?');
		Menus.addSubMenuItem('topbar', 'contrats', 'Lister Contrats', 'contrats');
		Menus.addSubMenuItem('topbar', 'contrats', 'Ajouter Contrat', 'contrats/create');
		Menus.addSubMenuItem('topbar', 'contrats', 'Lancer Contrat', 'contrats/run');
	}
]);