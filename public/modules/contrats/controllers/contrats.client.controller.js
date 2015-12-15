'use strict';

// Contrats controll er
angular.module('contrats')
.controller ('ContratsController', 
['$scope', '$stateParams', '$location', 'Authentication', 'Contrats','Refinancements', 'Ecomonies', 
	function($scope, $stateParams, $location, Authentication, Contrats,Refinancements,Ecomonies)
	{
		$scope.authentication = Authentication;
		//chargement des vecteurs 
		$scope.contrats = Contrats.query(); 
		$scope.refinancements = Refinancements.query();
		$scope.ecomonies = Ecomonies.query();
		$scope.nbcontrats = $scope.nbcontrats.length;  
		$scope.nbrefinancements = $scope.nbrefinancements.length;
		$scope.nbecomonies = $scope.nbecomonies.length;

		console.log = ('nb ctrt lus:', $scope.nbcontrats,'nb refis lus:', $scope.nbrefinancements,'nb ecos lus:',$scope.nbecomonies);

		$scope.topnumcontrat = function () {
    		var topnumctrt = 0;
    		angular.forEach($scope.contrats.ctrtnum, function (ctrtnum) {
      		topnumctrt = Math.max (topnumctrt , ctrtnum);
      		});
    		return topnumctrt;
  		};
		
		// Create new Contrat
		$scope.create = function() {
			// Create new Contrat object
			var contrat = new Contrats 
			({
				name:this.name,
				bu:this.bu,
				ctrtnum: this.ctrtnum,
				locataire:this.locataire,
				typeactif:this.typeactif,
				siren: this.siren,
				refinanceur: this.refinanceur,
				consultant: this.consultant,
				partenaire:this.partenaire,
				duree:this.duree,
				periodicite:this.periodicite,
				nbperiode:this.nbperiode,
				loyer:this.loyer,
				drfnum:this.drfnum,
				econum:this.ecotnum,
				etatrefinct:this.etatrefinct,
				etatcession:this.etatcession,
				etatdenonc:this.etatdenonc,
				etatvie:this.etatvie,


				etatrglt:this.etatrglt,
				ctrtscantg: this.ctrtscantg,
				ctrtmadfacturetg: this.ctrtmadfacturetg,
				ctrtmadprelevtg: this.ctrtmadprelevtg,
				ctrtrumtg: this.ctrtrumtg,
				ctrtrumnum: this.ctrtrumnum,
				ctrtcommentaireadm:this.ctrtcommentaireadm,
				ctrtcommentairerglt:this.ctrtcommentairerglt,

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
				modifier: Authentication.user.username
			});
			console.log(contrat);

			// Redirect after save
			contrat.$save(function(response) 
			{
				$location.path('contrats/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.bu = '';
				$scope.ctrtnum = '';
				$scope.locataire = '';
				$scope.typeactif = '';
				$scope.siren = '';
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

				$scope.etatrglt = '';
				$scope.ctrtscantg = '';
				$scope.ctrtmadfacturetg = '';
				$scope.ctrtmadprelevtg = '';
				$scope.ctrtrumtg = ''; 
				$scope.ctrtrumnum ='';
				$scope.ctrtcommentaireadm = '';
				$scope.ctrtcommentairerglt = '';

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


		// // Find a list of Contrats
		// $scope.getDrefIdByNum = function(numdrf) {
		// 	$scope.refinancements = Refinancements.query();
		// 	$scope.drfid = '';
		// 	var i=0;
		// 	while (i<$scope.refinancements.length) {
		// 		if ($scope.refinancements[i].drfnum === numdrf) 
		// 			{$scope.drfid = $scope.refinancements[i]._id;}
		// 		i++;
		// 		}
		// };

		// Find last contat up list
		$scope.upctrt = function() {
			$scope.contrats = Contrats.query();
			console.dir($scope.contrats);
			console.dir($scope);
			console.log('vecteur contrat nb elts :', $scope.contrats.length);
			$scope.upctrt = 0 ;
			var i = 0 ;
			for (i= 0; i < $scope.contrats.length ; i++ ) {
				$scope.upctrt = Math.max( $scope.upctrt, $scope.contrats(i).ctrtnum);
				console.log ('up: ', $scope.upctrt, 'valctrt:' , $scope.contrats(i).ctrtnum);	
				return $scope.upctrt; 
			}
		};

		// affecte le num contrat au drf et fieco 
		$scope.memenum = function($scope) {
			console.log ('in equalNum :' , $scope.ctrtnum, $scope.drfnum, $scope.econum);
			$scope.econum = $scope.ctrtnum;
			$scope.drfnum = $scope.ctrtnum;
			console.log ('out equalNum :' , $scope.ctrtnum, $scope.drfnum, $scope.econum);
		};

  //     $scope.counter = 0;
  //     $scope.change = function() {
 	// 		console.log ('in change test :' , $scope.counter);
 	// 		        $scope.counter++;
 	// 		console.log ('out change test :' , $scope.counter);
  //    };

		// // reevalue les inputs pour calcul valeur
		// $scope.evalCtrt = function() {
		// 	console.log ('in evalCtrt: ' , $scope.periodicite, $scope.duree, $scope.nbperiode);
		// 	if ($scope.periodicite === 'tri') {$scope.nbperiode = $scope.duree/3;console.log='tri per div';} // calcul nb de periode en fonction duree mois
  //   		else if ($scope.periodicite === 'mens') {$scope.nbperiode = $scope.duree;console.log='mens per equ';}
  //   		else {console.log='error periodicité';}
		// 	console.log ('out evalCtrt: ' , $scope.periodicite, $scope.duree, $scope.nbperiode);
		// };

		// $scope.choix = function (form) {
		// 	var i = 0;
		// 	i = form.Rubrique.selectedIndex;
		// 	$scope.txts =[];
		// 	if (i === 1) {$scope.txts = ['Matériel','Poissons','Sécurité'];}
		// 		else if (i===2) {$scope.txts = ['Radioactivité','Information','Mesures'];}
		// 		else if (i===3) {$scope.txts = ['Philosophie','Psychologie','Humour'];}
		// 		else {return;}			
		// 	form.Rubrique.selectedIndex = 0;
		// 	for (i=0;i<3;i++) {
  		// 				form.Page.options[i+1].text=$scope.txts[i];
  		// 			}
		// };

		// console.log = $scope.contrats.length;
		// console.log = $scope.refinancements.length;
		// console.log = $scope.ecomonies.length;

		// list pour uigrid
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
		      	{name: 'bu', displayName: 'B.U.', width: '45', 
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
   				{ name: '_id', displayName: 'Ctrt', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/contrats/{{ COL_FIELD }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>',
   			enableFiltering: false, enableSorting: false},
    			{ name: 'ctrtnum', displayName: 'N°Ctrt', width: '60'},
    		//	{ name: 'typeactif', displayName: 'Tact', width: '20'},
  				{ name: 'typeactif', displayName: 'Type', width: '25',cellTemplate: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		   	 {if (grid.getCellValue(row ,col).toLowerCase() === 'technologique')
    		   	  {return '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-hdd"></span></div>';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase() === 'industriel')
    		    	 {return '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-wrench"></span></div>';}
    		 		else if (grid.getCellValue(row ,col).toLowerCase() === 'medical')
    		 		 {return '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-plus"></span></div>';}
    		 		else if (grid.getCellValue(row ,col).toLowerCase() === 'immateriel')
    		 		 {return '<div class="ui-grid-cell-contents"><span class="glyphicon glyphicon-cd"></span></div>';}
    		 		else  {return '';}
    			 } 
    			},
    			{ name: 'locataire' , width: '90'},
    			{ name: 'siren' , width: '90'},
    			{ name: 'consultant' , width: '50'},
    			{ name: 'refinanceur', width: '75'},
    			{ name: 'fournisseur',width: '75' },
    			{ name: 'duree', width: '50'  },
    			{ name: 'periodicite', displayName: 'Per.', width: '50' },
    			{ name: 'nbperiode', displayName: 'Nb Loyer' , width: '50' },
    			{ name: 'loyer' , width: '75' , cellFilter: 'currency:"€ " : 2' },
    			{ name: 'drfnum', displayName: 'N°DFi.', width: '60', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/refinancements/{{ COL_FIELD }}">{{ COL_FIELD }}</a></div>', },
    			{ name: 'econum', displayName: 'N°Eco.', width: '60',cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/refinancements/{{ COL_FIELD }}">{{ COL_FIELD }}</a></div>', },
    			{ name: 'ctrtdsignature', displayName: 'Date Sign.', width: '80' },
    			{ name: 'ctrtdcession', displayName: 'Date Cess.' , width: '80'  },
    			{ name: 'crtrtdlim', displayName: 'Date Lim.' , width: '80'  },

    		   { name: 'etatrefinct',displayName: 'RFI', width: '15',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		   	{if (grid.getCellValue(row ,col).toLowerCase().substring(0,6) === 'accord') {return 'green';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,5)=== 'refus') {return 'red';}
    		 		else if (grid.getCellValue(row ,col).toLowerCase().substring(0,7)=== 'attente') {return 'orange';}
    		 		else  {return '';}
    			}
    		   },
    		   
    		   { name: 'etatcession',displayName: 'CSS',width: '15',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		    {if (grid.getCellValue(row ,col).toLowerCase().substring(0,4) === 'cede') {return 'green';}
   		 			else if (grid.getCellValue(row ,col).toLowerCase().substring(0,7)=== 'prorata') {return 'orange';}
   		 			else if (grid.getCellValue(row ,col).toLowerCase().substring(0,9)=== 'autoporte') {return 'red';}
   		 			else  {return 'white';}
   			  	}
    		   },

    		   { name: 'etatdenonc',displayName: 'DNC',width: '15',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		   	{if (grid.getCellValue(row ,col).toLowerCase().substring(0,7) === 'denonce') {return 'green';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,4) === 'hors') {return 'red';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,7) === 'attente') {return 'orange';}
    		 		else  {return 'white';}
    			}
    		   },
    		   
    		   { name: 'etatvie',displayName: 'VIE',width: '15',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		    {if (grid.getCellValue(row ,col).toLowerCase().substring(0,6) === 'normal') {return 'green';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,6) === 'impaye') {return 'red';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,9) === 'evolution') {return 'orange';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,7) === 'cloture') {return 'black';}
     		 		else  {return 'white';}
   				}
    		   },
    		   
    		   { name: 'etatrglt',displayName: 'RGL',width: '15',cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex)
    		    {if (grid.getCellValue(row ,col).toLowerCase().substring(0,2) === 'ok') {return 'green';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,6) === 'impaye') {return 'red';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,8) === 'incident') {return 'orange';}
    		    	else if (grid.getCellValue(row ,col).toLowerCase().substring(0,2) === 'pc') {return 'black';}
     		 		else  {return 'white';}
   				}
    		   },

    		],

    		// add on ng grid avancée chde
 			enableGridMenu: true,
    		enableSelectAll: true,
    		exporterCsvFilename: 'leaseboard.csv',
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
 
}
]);

// angular.module('contrats')
// .directive('initFromForm', function ($parse) {
//     return {
//       link: function (scope, element, attrs) {
//         var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
//         val = attrs.value;
//         $parse(attr).assign(scope, val);
//       }
//     };
// });

// // init des vaeur par defaut du formulaire
// angular.module('contrats')
// .directive('initdefaultctrt', function() {
// 	return {
// 		link: function ($scope) {
// 			console.log ('in initdefaultctrt');
// 			$scope.valdef.bu = 'EVL';
// 			$scope.valdef.ctrtnum = 1000;
// 			$scope.valdef.locataire = '';
// 			$scope.valdef.typeactif = 'technologique';
// 			$scope.valdef.siren = '987654321';
// 			$scope.valdef.refinanceur = 'Siemens';
// 			$scope.valdef.consultant = 'chde';
// 			$scope.valdef.partenaire = '';
// 			$scope.valdef.duree = 48;
// 			$scope.valdef.periodicite = 'tri';
// 			$scope.valdef.nbperiode = '16';
// 			$scope.valdef.loyer = 0;
// 			$scope.valdef.drfnum = 0;
// 			$scope.valdef.econum = 0;
// 			$scope.valdef.etatrefinct = 'non defini';
// 			$scope.valdef.etatcession = 'non defini';
// 			$scope.valdef.etatdenonc = 'non defini';
// 			$scope.valdef.etatvie = 'non defini';
// 			$scope.valdef.etatrglt = 'non defini';
// 			$scope.valdef.ctrtscantg = false;
// 			$scope.valdef.ctrtmadfacturetg = false;
// 			$scope.valdef.ctrtmadprelevtg = false;
// 			$scope.valdef.ctrtrumtg = false; 
// 			$scope.valdef.ctrtrumnum = 0;
// 			$scope.valdef.ctrtcommentaireadm = 'ras';
// 			$scope.valdef.ctrtcommentairerglt = 'ras';
// 			$scope.valdef.ctrtdsignature = Date.now;
// 			$scope.valdef.ctrtddebut = Date.now;
// 			$scope.valdef.ctrtdcession = Date.now;
// 			$scope.valdef.crtrtdlim = Date.now;
// 			$scope.valdef.ctrtdfin = Date.now;
// 			$scope.valdef.ctrtddenonc = '';
// 			$scope.valdef.ctrtdcloture = '';
// 			$scope.valdef.ctrtcommentaire = 'ras';
// 			$scope.valdef.selectedcontrat = '';
// 			$scope.valdef.modified = '';
// 			$scope.valdef.modifier = '';
// 	// console.log ('if initdefaultctrt');
// 			console.log ('out initdefaultctrt');
// 		}
// 	};
// });