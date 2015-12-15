'use strict';

// Refinancements controller
angular.module('refinancements').controller('RefinancementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Refinancements',
	function($scope, $stateParams, $location, Authentication, Refinancements) {
		$scope.authentication = Authentication;

		// Create new  Refinancement
		$scope.create = function() {
			// Create new Refinancement object
			var refinancement = new Refinancements ({
				bu: this.bu,
				name: this.name,
				ctrtnum: this.ctrtnum,
				drfnum: this.drfnum,
				ecofnum: this.drfnum,
				locataire:this.locataire,
				typactif:this.typeactif,
				refinanceur: this.refinanceur,
				consultant: this.consultant,
				partenaire:this.partenaire,
				duree:this.duree,
				periodicite:this.periodicite,
				nbperiode:this.duree,
				loyer:this.loyer,
				drfmntafin:this.drfmntafin,
				drfmtcession:this.drfmtcession,
				drfcoef:this.drfcoef,
				drfaccord:this.drfaccord,
				drfdatedemande:this.drfdatedemande,
				drfdateaccord:this.drfdateaccord,
				drfdatelima:this.drfdatelima
			});

			// Redirect after save
			refinancement.$save(function(response) {
				$location.path('refinancements/' + response._id);

				// Clear form fields
				$scope.bu = '';
				$scope.name = '';
				$scope.ctrtnum = 0;
				$scope.drfnum = 0;
				$scope.econum = 0;
				$scope.locataire = '';
				$scope.typeactif = '';
				$scope.refinanceur = '';
				$scope.consultant = '';
				$scope.partenaire = '';
				$scope.duree = 0;
				$scope.periodicite = '';
				$scope.nbperiode = 0;
				$scope.loyer = 0;
				$scope.drfmntafin = 0;
				$scope.drfmtcession = 0;
				$scope.drfcoef = 0;
				$scope.drfaccord = '';
				$scope.drfdatedemande = '';
				$scope.drfdateaccord = '';
				$scope.drfdatelima = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Refinancement
		$scope.remove = function(refinancement) {
			if ( refinancement ) { 
				refinancement.$remove();

				for (var i in $scope.refinancements) {
					if ($scope.refinancements [i] === refinancement) {
						$scope.refinancements.splice(i, 1);
					}
				}
			} else {
				$scope.refinancement.$remove(function() {
					$location.path('refinancements');
				});
			}
		};

		// Update existing Refinancement
		$scope.update = function() {
			var refinancement = $scope.refinancement;

			refinancement.$update(function() {
				$location.path('refinancements/' + refinancement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Refinancements
		$scope.find = function() {
			$scope.refinancements = Refinancements.query();
		};

		// Find existingg Refinancement
		$scope.findOne = function() {
			$scope.refinancement = Refinancements.get({ 
				refinancementId: $stateParams.refinancementId
			});
		};

		$scope.myData = Refinancements.query(); 

		$scope.gridOptions2 = {
  	  		data: $scope.myData,
  	  		enableSorting: true,
  			enableCellEditOnFocus: true,
  			enableFiltering: true,
  			visible: true,
  			columnDefs: [ 
    			{ name: 'bu', displayName: 'Bu', width: '50'},
  				{ name: '_id', displayName: 'Edt', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/refinancements/{{ COL_FIELD }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>',
   			enableFiltering: false, enableSorting: false},
   				{ name: 'drfnum', displayName: 'N° Drf', width: '60'},
    			{ name: 'ctrtnum', displayName: 'N° Ctrt', width: '60'},
    			{ name: 'locataire' },
       			{ name: 'typeactif', width: '25' },
    			{ name: 'consultant' , width: '50'},
    			{ name: 'refinanceur', width: '75'},
    			{ name: 'partenaire' },
    			{ name: 'duree', width: '50'  },
    			{ name: 'periodicite', displayName: 'Per.', width: '50' },
    			{ name: 'nbperiode', displayName: 'Nb per.' , width: '50' },
    			{ name: 'loyer' , width: '75'  },
    			{ name: 'drfmtafin' , width: '75'  },
    			{ name: 'drfmtcession' , width: '75'  },
    			{ name: 'drfcoef' , width: '75'  },
    			{ name: 'drfaccorddrfcoef' , width: '75'  },
    			{ name: 'drfdatedemande' , width: '75'  },
    			{ name: 'drfdateaccord' , width: '75'  },
    			{ name: 'drfdatelima' , width: '75'  }
    		]
    	};

	}
]);