'use strict';

// Configuring the Articles module
angular.module('refinancements').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Refinancements', 'refinancements', 'dropdown', '/refinancements(/create)?');
		Menus.addSubMenuItem('topbar', 'refinancements', 'Lister Refinancements', 'refinancements');
		Menus.addSubMenuItem('topbar', 'refinancements', 'Ajouter Refinancement', 'refinancements/create');
		Menus.addSubMenuItem('topbar', 'refinancements', 'Traiter Refinancement', 'refinancements/run');
	}
]);