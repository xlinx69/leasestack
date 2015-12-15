'use strict';

// Societes controller
angular.module('societes')
.controller('SocietesController', 
['$scope', '$stateParams', '$location', 'Authentication', 'Societes',
	function($scope, $stateParams, $location, Authentication, Societes)
	{
		$scope.authentication = Authentication;

		// Create new Societe
		$scope.create = function() 
		{
			// Create new Societe object
			var societe = new Societes 
			({
				stenom: this.stenom,
				stegrp: this.stegrp,
				siren: this.siren,
				steformsoc: this.steformsoc,
				stedcreat: this.stedcreat,
				capsoc: this.capsoc,
				stedcloture: this.stedcloture,
				ca: this.ca,
				can: this.can,
				rn: this.rn,
				rnn: this.rnn,
				banquepal: this.banquepal,
				banquesec: this.banquesec,
				stetype: this.stetype,
				steadresse1: this.steadresse1,
				steadresse2: this.steadresse2,
				stecp: this.stecp,
				steville: this.steville,
				stetel: this.stetel,
				stefax: this.stefax,
				stemail: this.stemail,

				mandname: this.mandname,
				mandfonc: this.mandfonc,
				
				finname: this.finname,
				compname: this.compname,
				dgname: this.dgname,
				techname: this.techname,
				assname: this.assname,
				consultant: this.consultant,
				partenaire: this.partenaire,
				
				etatbdf: this.etatbdf,
				etatfi: this.etatfi,
				etatpc: this.etatpc,
				stecommentaire: this.stecommentaire,
				incident: this.incident,
				
				created: this.created,
				user: this.user,
				modified: this.modified,
				modifier: this.modifier
			});

			// Redirect after save
			societe.$save(function(response) 
			{
				$location.path('societes/' + response._id);

				// Clear form fields
				$scope.stenom = '';
				$scope.stegrp = '';
				$scope.siren = '';
				$scope.steformsoc = '';
				$scope.stedcreat = '';
				$scope.capsoc = '';
				$scope.stedcloture = '';
				$scope.ca = '';
				$scope.can = '';
				$scope.rn = '';
				$scope.rnn = '';
				$scope.banquepal = '';
				$scope.banquesec = '';
				$scope.stetype = '';
				$scope.steadresse1 = '';
				$scope.steadresse2 = '';
				$scope.stecp = '';
				$scope.steville = '';
				$scope.stetel = '';
				$scope.stefax = '';
				$scope.stemail = '';
				$scope.mandname = '';
				$scope.mandfonc = '';
				$scope.finname = '';
				$scope.compname = '';
				$scope.dgname = '';
				$scope.techname = '';
				$scope.assname = '';

				$scope.etatbdf = '';
				$scope.etatfi = '';
				$scope.etatpc = '';
				$scope.stecommentaire = '';
				$scope.incident = '';

				$scope.consultant = '';
				$scope.partenaire = '';

				$scope.created = '';
				$scope.user = '';
				$scope.modified = '';
				$scope.modifier = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// End Create new Societe

		// Remove existing Societe
		$scope.remove = function(societe) {
			if ( societe ) { 
				societe.$remove();

				for (var i in $scope.societes) {
					if ($scope.societes [i] === societe) {
						$scope.societes.splice(i, 1);
					}
				}
			} else {
				$scope.societe.$remove(function() {
					$location.path('societes');
				});
			}
		};
		// End Remove existing Societe

		// Update existing Societe
		$scope.update = function() {
			var societe = $scope.societe;

			societe.$update(function() {
				$location.path('societes/' + societe._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// End update existing Societe

		// Find a list of Societes
		$scope.find = function(){ 
			$scope.societes = Societes.query();
		};
		// End list existing Societe

		// Find one Societe
		$scope.findOne = function() {
			$scope.societe = Societes.get({ 
				societeId: $stateParams.societeId
			});
		};
		// End FindOne Societe

		//test pour ui grid
		$scope.listSociete = Societes.query(); 

		$scope.gridOptions = 
		{
  	  		data: $scope.listSociete,
  	  		enableSorting: true,
  			enableCellEditOnFocus: true,
  			enableFiltering: true,
  			visible: true,
  			columnDefs: 
  			[ 	{ name: 'stenom', displayName: 'Societe', width: '100'},
    			{ name: '_id', displayName: 'Edt', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/societes/{{ COL_FIELD }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>',
   				enableFiltering: false, enableSorting: false},
   				{ name: 'stegrp' , displayName: 'Grp' ,width: '60'},
    			{ name: 'siren', width: '60'},
    			{ name: 'steformsoc', displayName: 'Form.' ,width: '50'},
    			{ name: 'stetype', displayName: 'Typ.' ,width: '50' },
     			{ name: 'stecp', displayName: 'CP' ,width: '50' },
      			{ name: 'steville', displayName: 'Ville' ,width: '50' },
       			{ name: 'stetel', displayName: 'Tel' ,width: '50' },
	     		{ name: 'stemail', displayName: 'Mail' ,width: '50' },
    			{ name: 'capsoc', displayName: 'CS' ,width: '50'  },
    			{ name: 'ca', displayName: 'CA', width: '50' },
    			{ name: 'rn', displayName: 'RN' , width: '50' },
     			{ name: 'mandname', displayName: 'CEO' , width: '50' },
      			{ name: 'finname', displayName: 'DAF' , width: '50' },
      			{ name: 'techname', displayName: 'CTO' , width: '50' },

    			{ name: 'consultant', displayName: 'Cons.',width: '50'  },
    			{ name: 'partenaire', displayName: 'Part.', width: '50' },
     			
     			{ name: 'etatbdf', displayName: 'BDF' , width: '50' },
      			{ name: 'etatfi', displayName: 'FIN' , width: '50' },
      			{ name: 'etatpc', displayName: 'PCL' , width: '50' },


/*    			{ name: '_id1', displayName: 'Run', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/societes/{{ COL_FIELD }}/run"><span class="glyphicon glyphicon-play"></span></a></div>',
   				enableFiltering: false, enableSorting: false},
*/ 
    		],
    		// add on ng grid avancée chde
 			enableGridMenu: true,
    		enableSelectAll: true,
    		exporterCsvFilename: 'Contrats.csv',
    		exporterPdfDefaultStyle: {fontSize: 9},
    		exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    		exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    		exporterPdfHeader: { text: 'Liste des contrats', style: 'headerStyle' },
    		exporterPdfFooter: function ( currentPage, pageCount ) {
      			return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    		},
    		exporterPdfCustomFormatter: function ( docDefinition ) {
     		 	docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      			docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      			return docDefinition;
    		},
    		exporterPdfOrientation: 'portrait',
    		exporterPdfPageSize: 'LETTER',
    		exporterPdfMaxGridWidth: 500,
    		exporterCsvLinkElement: angular.element(document.querySelectorAll('.custom-csv-link-location')),
    		onRegisterApi: function(gridApi){
      			$scope.gridApi = gridApi;
    		}
  		};



}]);