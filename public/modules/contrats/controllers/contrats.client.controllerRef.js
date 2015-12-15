'use strict';

// Contrats controller
angular.module('contrats')
.controller ('ContratsController', 
['$scope', '$stateParams', '$location', 'Authentication', 'Contrats','Refinancements', 'Ecomonies', 
	function($scope, $stateParams, $location, Authentication, Contrats,Refinancements,Ecomonies)
	{
		$scope.authentication = Authentication;

		// Create new Contrat
		$scope.create = function() 
		{
			// Create new Contrat object
			var contrat = new Contrats 
			({
				name:this.name,
				bu:this.bu,
				ctrtnum: this.ctrtnum,
				locataire:this.locataire,
				refinanceur: this.refinanceur,
				consultant: this.consultant,
				partenaire:this.partenaire,
				duree:this.duree,
				periodicite:this.periodicite,
				nbperiode:this.duree,
				loyer:this.loyer,
				drfnum:this.drfnum,
				econum:this.econum,
				etatrefinct:this.etatrefinct,
				etatcession:this.etatcession,
				etatdenonc:this.etatdenonc,
				etatvie:this.etatvie,
				ctrtdsignature:this.ctrtdsignature,
				ctrtddebut:this.ctrtddebut,
				ctrtdcession:this.ctrtdcession,
				crtrtdlim:this.crtrtdlim,
				ctrtdfin:this.ctrtdfin,
				ctrtddenonc:this.ctrtddenonc,
				ctrtdcloture:this.ctrtdcloture,
				ctrtcommentaire:this.ctrtcommentaire,
				seletedcontrat:this.selectedcontrat,
				modified: Date.now(),
				modifier: Authentication.username
			});

			// Redirect after save
			contrat.$save(function(response) 
			{
				$location.path('contrats/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.bu = '';
				$scope.ctrtnum = '';
				$scope.locataire = '';
				$scope.refinanceur = '';
				$scope.consultant = '';
				$scope.partenaire = '';
				$scope.duree = '';
				$scope.periodicite = '';
				$scope.nbperiode = '';
				$scope.loyer = '';
				$scope.drfnum = '';
				$scope.econum = '';
		
				$scope.etatrefinct = '';
				$scope.etatcession = '';
				$scope.etatdenonc = '';
				$scope.etatvie = '';

				$scope.ctrtdsignature = '';
				$scope.ctrtddebut = '';
				$scope.ctrtdcession = '';
				$scope.crtrtdlim = '';
				$scope.ctrtdfin = '';
				$scope.ctrtddenonc = '';
				$scope.ctrtdcloture = '';
				$scope.ctrtcommentaire = '';
				$scope.selectedcontrat = '';
				$scope.modified = '';
				$scope.modifier = '';
			}, 
			function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};
	
		// Remove existing Contrat
		$scope.remove = function(contrat) {
			if ( contrat ) { 
				contrat.$remove();

				for (var i in $scope.contrats) {
					if ($scope.contrats [i] === contrat) {
						$scope.contrats.splice(i, 1);
					}
				}
			} else {
				$scope.contrat.$remove(function() {
					$location.path('contrats');
				});
			}
		};

		// Update existing Contrat
		$scope.update = function() {
			var contrat = $scope.contrat;
				contrat.modified= Date.now();
				contrat.modifier= Authentication.username;

			contrat.$update(function() {
				$location.path('contrats/' + contrat._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contrats
		$scope.find = function() {
			$scope.contrats = Contrats.query();
			//
			$scope.refinancements = Refinancements.query();
			$scope.ecomonies = Ecomonies.query();
		};

		// Find existing Contrat
		$scope.findOne = function() {
			$scope.contrat = Contrats.get({ 
				contratId: $stateParams.contratId
			});
		};


		// Find a list of Contrats
		$scope.getDrefIdByNum = function(numdrf) {
			$scope.refinancements = Refinancements.query();
			$scope.drfid = '';
			var i=0;
			while (i<$scope.refinancements.length) {
				if ($scope.refinancements[i].drfnum === numdrf) 
					{$scope.drfid = $scope.refinancements[i]._id;}
				i++;
				}

		// Find a list of Contrats
			$scope.refinancements = Refinancements.query();
			$scope.ecomonies = Ecomonies.query();
		};


		//test pour ui grid
		$scope.listContrat = Contrats.query(); 

		$scope.gridOptions = 
		{
  	  		data: $scope.listContrat,
  	  		enableSorting: true,
  			enableCellEditOnFocus: true,
  			enableFiltering: true,
  			visible: true,
  			columnDefs: 
  			[ 
		      	{name: 'bu', displayName: 'BU', width: '40', 
			        cellClass: function (grid, row, col, rowIndex, colIndex) {
			          var val = grid.getCellValue(row, col);
			          if (val === 'EVL') {
			            return 'blue';
			          }
			          else if (val === 'UBS') {
			            return 'pink';
			          }
			          else if (val === 'HBO') {
			            return 'orange';
			          }
			        }
				},
   				{ name: '_id', displayName: 'Edt', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/contrats/{{ COL_FIELD }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>',
   			enableFiltering: false, enableSorting: false},

    			{ name: 'ctrtnum', displayName: 'N° Ctrt', width: '60', color: 'red'},
    			{ name: 'locataire' , width: '90'},
    			{ name: 'consultant' , width: '50'},
    			{ name: 'refinanceur', width: '75'},
    			{ name: 'partenaire' },
    			{ name: 'duree', width: '50'  },
    			{ name: 'periodicite', displayName: 'Per.', width: '50' },
    			{ name: 'nbperiode', displayName: 'Nb per.' , width: '50' },
    			{ name: 'loyer' , width: '75' , cellFilter: 'currency:"€ " : 2' },
    			{ name: 'drfnum', displayName: '#Drf.', width: '60' },
    			{ name: 'econum', displayName: '#Eco.', width: '60' },
    			{ name: 'ctrtdsignature', displayName: 'Date Sign.', width: '80' },
    			{ name: 'ctrtdcession', displayName: 'Date Cess.' , width: '80'  },
    			{ name: 'crtrtdlim', displayName: 'Date Lim.' , width: '80'  },

    		   { name: 'etatrefinct',displayName: 'RFI',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		   	{if (grid.getCellValue(row ,col).toLowerCase().substring(1,6) === 'accord') {return 'green';}
    		    else if (grid.getCellValue(row ,col).toLowerCase().substring(1,6)=== 'refus') {return 'red';}
    		 	else if (grid.getCellValue(row ,col).toLowerCase().substring(1,7)=== 'attente') {return 'orange';}
    		 	else  {return 'black';}
    			}
    		   },
    		   
    		   { name: 'etatcession',displayName: 'CSS',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		    {if (grid.getCellValue(row ,col).toLowerCase().substring(1,4) === 'cede') {return 'green';}
   		 		else if (grid.getCellValue(row ,col).toLowerCase().substring(1,7)=== 'prorata') {return 'orange';}
   		 		else  {return 'black';}
   			  	}
    		   },


    		   { name: 'etatdenonc',displayName: 'DNC',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		   	{if (grid.getCellValue(row ,col).toLowerCase().substring(9,15) === 'tardive') {return 'green';}
    		    else if (grid.getCellValue(row ,col).toLowerCase().substring(9,15)=== 'valide') {return 'red';}
    		 	else if (grid.getCellValue(row ,col).toLowerCase().substring(5,11)=== 'denonce') {return 'orange';}
    		 	else  {return 'black';}
    			}
    		   },
    		   
    		   { name: 'etatvie',displayName: 'VIE',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		    {if (grid.getCellValue(row ,col).toLowerCase() === 'actif') {return 'green';}
    			}
    		   },

/*
    			{ name: '_id1', displayName: 'Run', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/contrats/{{ COL_FIELD }}/run"><span class="glyphicon glyphicon-play"></span></a></div>',
   			enableFiltering: false, enableSorting: false},
*/

    		],

    		// add on ng grid avancée chde
 			enableGridMenu: true,
    		enableSelectAll: true,
    		exporterCsvFilename: 'myFile.csv',
    		exporterPdfDefaultStyle: {fontSize: 9},
    		exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    		exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    		exporterPdfHeader: { text: 'List Contrat Leasboard', style: 'headerStyle' },
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


/*			

// DEBUT DE CHGT ////////////////////////////////////////////////////////////

		// setting def value
		function DefValue() {
		$scope.ctrdefnom = 'defaul ctrt name';
		$scope.ctrdefnum = '0000';
		$scope.ctrdefdrf = '0000';
		$scope.ctrdefeco = '0000';
		}

		function ctrtFullName() {
//			$scope.contraId.ctrtFullName = 'IE-'+'$scope.contraId.ctrtnum'+'-'+'$scope.contraId.consultant'+'-'+'reductdate($scope.contraId.ctrtddebut)';
			$scope.contrat = Contrats.get({ 
				contratId: $stateParams.contratId
			});
			$scope.contrat.ctrtFname= 'IE-'+'$scope.contrat.ctrtnum'+'-'+'$scope.contrat.consultant'+'-'+'reductdate($scope.contrat.ctrtddebut)';
		}

		function reductDate(indate) {
			return  {text: indate.getFullyear().substring(2,3)+indate.getMonth()};
		}	

		$scope.ctrtFullName = function(){
   			var cnct = 'IE-'+'$scope.contrat.ctrtnum'+'-'+'$scope.contrat.consultant'+'-'+'reductdate($scope.contrat.ctrtddebut)';
   			$scope.ctrtFname = cnct;       
		}	



		// Extract list of xxxnum
		$scope.findnum = function() {
			$scope.contrat.ctrnums = Contrats.query();
			$scope.refinancement.drfnums = Refinancements.query();
			$scope.economy.econums = Economies.query();
		};

		// Extraction des munero max contrat drf fieco
		$scope.maxnum = function() {
			$scope.maxctrtnum = getMax($scope.contrats.ctrtnum);
			$scope.maxdrfnum = getMax($scope.refinancements.drfnum);
			$scope.maxeconum = getMax($scope.economies.econum);
		};


function getMin(array){
   return Math.min.apply(Math,array);
}

function getMax(array){
	return Math.max.apply(Math,array);
}
*/
/*
		app.config(function($provide){
  $provide.decorator('GridOptions',function($delegate){
    var gridOptions;
    gridOptions = angular.copy($delegate);
    gridOptions.initialize = function(options) {
      var initOptions;
      initOptions = $delegate.initialize(options);
      initOptions.enableColumnMenus = false;
      return initOptions;
    };
    return gridOptions;
  });
});
*/

/*
This is the most flexible approach as it allows you to replace $scope.data whenever you feel like it without getting pointer issues.
Alternatively you can directly set the data array:
$scope.gridOptions.data = [ ]; or
$http.get('/data/100.json') .success(function(data) { $scope.myData = data; $scope.gridOptions.data = $scope.myData; });




*/