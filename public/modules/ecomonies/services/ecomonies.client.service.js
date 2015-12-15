'use strict';

//Ecomonies service used to communicate Ecomonies REST endpoints
angular.module('ecomonies')
.factory('Ecomonies', ['$resource',
	function($resource) {
		return $resource('ecomonies/:ecomonyId', { ecomonyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
.factory('EcoDataService', function() {
  var _ecoArray = [];
  return { 
    // defini contratservice.initAll  
    initAll: function() {var _ecoArray = [];},
    
    // defini contratservice.listAll  
    listAll: function() {return _ecoArray;},
    
    // defini contratservice.add(ctrt)  
    addOne: function(eco) {_ecoArray.push(eco); 
    return eco + ' est ajouté';},
    
    // defini contratservice.remove(index)  
    removeOne: function(index) 
    {
      if( _ecoArray.length === 1 )
        return 'impossible detruire dernier element';                
      var eco = _ecoArray.splice(index, 1)[0];
      return eco + ' a éte supprimé';
    }
  };
});