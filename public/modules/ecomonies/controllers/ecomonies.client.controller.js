'use strict';

// Ecomonies controller
var app=angular.module('ecomonies');

app.controller('EcomoniesController',['$scope', '$stateParams', '$location', 'Authentication', 'Contrats', 'Refinancements', 'Ecomonies',
    function ($scope, $stateParams, $location, Authentication, Contrats, Refinancements, Ecomonies)
{
	$scope.authentication = Authentication;

	// Create new Ecomony
	$scope.create= function()
	{
		// Create new Ecomony object
		var ecomony = new Ecomonies
		({
			name: this.name,
			bu: this.bu,
			fieconum: this.fieconum,
			locataire: this.locataire,
			typeactif: this.typeactif,
			refinanceur: this.refinanceur,
			consultant: this.consultant ,
			partenaire: this.partenaire,
			duree: this.duree,
			periodicite: this.periodicite,
			nbperiode: this.nbperiode,
			drfaccord: this.drfaccord,
			fcomtachat: this.fcomtachat,
			fcomtrachat: this.fcomtrachat,
			fcomtafin: this.fcomtafin,
			fcotxcommpart: this.fcotxcommpart,
			fcocommpart: this.fcocommpart,
			fcotxcommapport: this.fcotxcommapport,
			fcocommapport: this.fcocommapport,
			fcomtnfin: this.fcomtnfin,
			drfcoef: this.drfcoef,
			loyer: this.loyer,
			fcovaleuract: this.fcovaleuract,
			drfmtcession: this.drfmtcession,
			fcomargebrute: this.fcomargebrute,
			fcomargemad: this.fcomargemad,
			fcofrdoss: this.fcofrdoss,
			fcofraisfi: this.fcofraisfi,
			fcomargenette: this.fcomargenette,
			fcotxmargenette: this.fcotxmargenette,
			fcomargerev: this.fcomargerev,
			fcomargeprlg: this.fcomargeprlg,
			fcomargefinale: this.fcomargefinale,
			fcocommentaire:this.fcocommentaire,
			seletedfco:this.selectedfco,
			modified: Date.now(),
			modifier: this.authentication.username
		});
		// Redirect after save
		ecomony.$save(function(response) 
		{
			$location.path('ecomonies/' + response._id);
			// Clear form fields
			$scope.name = '';
			$scope.bu = '';
			$scope.fieconum = 0;
		 	$scope.locataire = '';
		 	$scope.typeactif = '';
			$scope.refinanceur = '';
			$scope.consultant  = '';
			$scope.partenaire = '';
			$scope.duree = 0;
			$scope.periodicite = '';
			$scope.nbperiode = 0;
			$scope.drfaccord = '';
			$scope.fcomtachat = 0;
			$scope.fcomtrachat = 0;
			$scope.fcomtafin = 0;
			$scope.fcotxcommpart = 0;
			$scope.fcocommpart = 0;
			$scope.fcotxcommapport = 0;
			$scope.fcocommapport = 0;
			$scope.fcomtnfin = 0;
			$scope.drfcoef = 0;
			$scope.loyer = 0;
			$scope.fcovaleuract = 0;
			$scope.drfmtcession = 0;
			$scope.fcomargebrute = 0;
			$scope.fcomargemad = 0;
			$scope.fcofrdoss = 0;
			$scope.fcofraisfi = 0;
			$scope.fcomargenette = 0;
			$scope.fcotxmargenette = 0;
			$scope.fcomargerev = 0;
			$scope.fcomargeprlg = 0;
			$scope.fcomargefinale = 0;
			$scope.fcocommentaire = '';
			$scope.selectedfco = '';
			$scope.modified = Date.now;
			$scope.modifier= $scope.authentication.user.username;
		},
		function(errorResponse){$scope.error = errorResponse.data.message;}
		);
	};


// flasching buffEco => Economies
	
	// Remove existing Ecomony
	$scope.remove = function(ecomony) {
		if ( ecomony ) { 
			ecomony.$remove();
				for (var i in $scope.ecomonies) {
					if ($scope.ecomonies [i] === ecomony) {
						$scope.ecomonies.splice(i, 1);
					}
				}
			} else {
				$scope.ecomony.$remove(function() {
					$location.path('ecomonies');
				});
			}
	};

	// Update existing Ecomony
	$scope.update = function() {
			var ecomony = $scope.ecomony;
				ecomony.modified= Date.now();
				ecomony.modifier= Authentication.username;

			ecomony.$update(function() {
				$location.path('ecomonies/' + ecomony._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
	};

	// Find a list of Ecomonies
	$scope.find = function() {
			$scope.ecomonies = Ecomonies.query();
			//
			$scope.contrats = Contrats.query();
			$scope.refinancements = Refinancements.query();
	};

	// Find existing Ecomony
	$scope.findOne = function() {
			$scope.ecomony = Ecomonies.get({ 
				ecomonyId: $stateParams.ecomonyId
			});
	};

	//liste pour affichage ui grid
	$scope.listfieco = Ecomonies.query(); 

	$scope.gridOptions = 
		{
  	  		data: $scope.listfieco,
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
   				{ name: '_id', displayName: 'Edt', width: '25', cellTemplate: '<div class="ui-grid-cell-contents"><a href="#!/ecomonies/{{ COL_FIELD }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>',
   			 enableFiltering: false, enableSorting: false
				},

    			{ name: 'fieconum', displayName: '#Eco', width: '60'},
    			{ name: 'locataire' , displayName: 'Loc.', width: '90'},
    			{ name: 'consultant' , displayName: 'Cf.', width: '50'},
    			{ name: 'refinanceur', displayName: 'Ref.', width: '75'},
    			{ name: 'partenaire', displayName: 'Part.' },
    			{ name: 'duree', displayName: 'Mois', width: '50'  },
    			{ name: 'periodicite', displayName: 'Freq', width: '50' },
    			{ name: 'nbperiode', displayName: '#Per' , width: '50' },
    			{ name: 'loyer' , displayName: 'Loy.', width: '75' , cellFilter: 'currency:"€ " : 2' },
    			{ name: 'drfnum', displayName: '#Drf.', width: '60' },
    			{ name: 'ctrtnum', displayName: '#Ctrt.', width: '60' },
 
    			{ name: 'fcomtachat', displayName: '€Ach' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomtrachat', displayName: '€Rach' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomtafin', displayName: '€BrutFi' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcocommpart', displayName: '€CmPar' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcocommapport', displayName: '€CmApp' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomtnfin', displayName: '€NetFi' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'drfmtcession', displayName: '€Cession' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargebrute' , displayName: '€MgBrute', width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargemad' , displayName: '€MgMad', width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcofrdoss', displayName: '€Doss' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcofraisfi', displayName: '€FrsFi' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargenette', displayName: '€MgNet' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargerev', displayName: '€MgRev' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargeprlg', displayName: '€MgPrlg' , width: '75' , cellFilter: 'currency:"€ " : 0' },
    			{ name: 'fcomargefinale', displayName: '€MgGlb' , width: '75' , cellFilter: 'currency:"€ " : 0' }
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

}
//}fin definition fonction
]
//] fin des rguments
);
//)findu cltrl


//
// nouveau controlleur de calco autonome
//
app.controller
('fiecoCtrlr',
['$scope', '$location', 'Authentication', 'Ecomonies',
function ($scope, $location, Authentication, Ecomonies) 
{    
    $scope.authentication = Authentication;
    
    $scope.calcEco = function() 
    {
    $scope.name = 'nom par defaut';
    $scope.mbf = $scope.ma + $scope.mr; // montant brut a financer
    $scope.mcp = $scope.mbf* $scope.tcp/100;// montant commission partenaire
    $scope.mca = $scope.mbf* $scope.tca/100;//montat commission apporteur
    $scope.mnf = $scope.mbf + $scope.mcp + $scope.mca; // montant net a financer
    if ($scope.per === 't') {$scope.npr = $scope.dum/3;} // calcul nb de periode en fonction duree mois
    else if ($scope.per === 'm') {$scope.npr = $scope.dum;}
    else {console.log='error periodicité';}
    $scope.cri = 100/$scope.npr; // coeficient refi base 100
    $scope.crn = $scope.crb*(100+$scope.tms)/100; // coef refi net margé pour calcul 
    $scope.loy = $scope.mnf*$scope.crn/100; //loyer
    $scope.vac = $scope.loy*$scope.npr; // valeur actualisé = sommation des oyer sur duree
    $scope.mcs = $scope.vac; // montant de cession
    $scope.mff = $scope.aff * $scope.tff/100 * $scope.njf/365; // frais  fi = assiette *taux frais fi *nbjours frais /an  
    $scope.mgb = $scope.mcs-$scope.mnf; // marge brute valeur actualisee -  montant net a financer
    $scope.mgm = $scope.njm*$scope.loy*(12/365)*($scope.npr/$scope.dum);  // marge mise a disposition   
    $scope.mgp = $scope.loy*$scope.nlp; // marge prolongation
   $scope.mgo = $scope.mbf*$scope.tro/100; // marge revente = taux * valeur a neuf 
    $scope.mgg = $scope.mgb+$scope.mgm+$scope.mgp-$scope.mff+$scope.mfd+$scope.mgo; // marge globale
    $scope.tmb = 100*$scope.mgb/$scope.mbf; // taux de marge brute
    $scope.tmg = 100*$scope.mgg/$scope.mbf; // taux de marge globale cesion + mise à disposition + prolong 
    };

    $scope.bufEco = function() 
    {
		var buffeco = {};
	 	buffeco.name = $scope.name;
	 	buffeco.locataire = $scope.locataire;
		buffeco.refinanceur = $scope.refinanceur;
		buffeco.consultant = $scope.consultant; 
		buffeco.partenaire = $scope.partenaire;
		buffeco.mbf = $scope.mbf;
		buffeco.ma = $scope.ma;
		buffeco.mr = $scope.mr;
        buffeco.tcp = $scope.tcp;
        buffeco.tca = $scope.tca;
        buffeco.mcp = $scope.mcp;
        buffeco.mca = $scope.mca;
        buffeco.mnf = $scope.mnf;
        buffeco.dum = $scope.dum;
        buffeco.per = $scope.per;
        buffeco.npr = $scope.npr;
        buffeco.cri = $scope.cri;
        buffeco.crn = $scope.crn;
        buffeco.crb = $scope.crb;
        buffeco.loy = $scope.loy;
        buffeco.vac = $scope.vac;
        buffeco.mcs = $scope.mcs;
        buffeco.mgb = $scope.mgb;
        buffeco.njm = $scope.njm;
        buffeco.mgm = $scope.mgm;
        buffeco.njp = $scope.njp;
        buffeco.mgp = $scope.mgm;
        buffeco.tro = $scope.tro;
        buffeco.mgo = $scope.mgo;
        buffeco.mgg = $scope.mgg;
        buffeco.tmb = $scope.tmb;
        buffeco.tmg = $scope.tmg;
        buffeco.tff = $scope.tff;
        buffeco.aff = $scope.aff;		        
        buffeco.njf = $scope.njf;		        
        buffeco.mff = $scope.mff;
        buffeco.mfd = $scope.mfd;
        buffeco.nlp = $scope.nlp;
        buffeco.nlp = $scope.nlp;
//		        $scope.buffeco = buffeco;
	};
	
	// 	var ecomony= new Ecomonies
	// 	({
	// 		name: this.name,
	// 		bu: this.bu,
	// 		fieconum: this.fieconum,
	// 		locataire: this.locataire,
	// 		refinanceur: this.refinanceur,
	// 		consultant: this.consultant ,
	// 		partenaire: this.partenaire,
	// 		duree: this.duree,
	// 		periodicite: this.periodicite,
	// 		nbperiode: this.nbperiode,
	// 		drfaccord: this.drfaccord,
	// 		fcomtachat: this.fcomtachat,
	// 		fcomtrachat: this.fcomtrachat,
	// 		fcomtafin: this.fcomtafin,
	// 		fcotxcommpart: this.fcotxcommpart,
	// 		fcocommpart: this.fcocommpart,
	// 		fcotxcommapport: this.fcotxcommapport,
	// 		fcocommapport: this.fcocommapport,
	// 		fcomtnfin: this.fcomtnfin,
	// 		drfcoef: this.drfcoef,
	// 		loyer: this.loyer,
	// 		fcovaleuract: this.fcovaleuract,
	// 		drfmtcession: this.drfmtcession,
	// 		fcomargebrute: this.fcomargebrute,
	// 		fcomargemad: this.fcomargemad,
	// 		fcofrdoss: this.fcofrdoss,
	// 		fcofraisfi: this.fcofraisfi,
	// 		fcomargenette: this.fcomargenette,
	// 		fcotxmargenette: this.fcotxmargenette,
	// 		fcomargerev: this.fcomargerev,
	// 		fcomargeprlg: this.fcomargeprlg,
	// 		fcomargefinale: this.fcomargefinale,
	// 		fcocommentaire:this.fcocommentaire,
	// 		seletedfco:this.selectedfco,
	// 		modified: Date.now(),
	// 		modifier: this.authentication.username
	// 	});
	// 	ecomony.name = buffeco.name;
	// 	ecomony.bu= buffeco.bu;
	// 	ecomony.fieconum= buffeco.fieconum;
	// 	ecomony.locataire= buffeco.locataire;
	// 	ecomony.refinanceur= buffeco.refinanceur;
	// 	ecomony.consultant= buffeco.consultant;
	// 	ecomony.partenaire= buffeco.partenaire;
	// 	ecomony.duree= buffeco.dum;
	// 	ecomony.periodicite= buffeco.per;
	// 	ecomony.nbperiode= buffeco.nbp;
	// 	ecomony.drfaccord= 'accord defaut';
	// 	ecomony.fcomtachat= buffeco.ma;
	// 	ecomony.fcomtrachat= buffeco.mr;
	// 	ecomony.fcomtafin= buffeco.mbf;
	// 	ecomony.fcotxcommpart= buffeco.tcp;
	// 	ecomony.fcocommpart= buffeco.mcp;
	// 	ecomony.fcotxcommapport= buffeco.tca;
	// 	ecomony.fcocommapport= buffeco.mca;
	// 	ecomony.fcomtnfin= buffeco.mnf;
	// 	ecomony.drfcoef= buffeco.crn;
	// 	ecomony.loyer= buffeco.loy;
	// 	ecomony.fcovaleuract= buffeco.vac;
	// 	ecomony.drfmtcession= buffeco.mcs;
	// 	ecomony.fcomargebrute= buffeco.mgb;
	// 	ecomony.fcomargemad= buffeco.mgm;
	// 	ecomony.fcofrdoss= buffeco.mfd;
	// 	ecomony.fcofraisfi= buffeco.mff;
	// 	ecomony.fcomargenette= buffeco.mgg;
	// 	ecomony.fcotxmargenette= '';
	// 	ecomony.fcomargerev= buffeco.mgo;
	// 	ecomony.fcomargeprlg= buffeco.mgp;
	// 	ecomony.fcomargefinale= buffeco.mgo;
	// 	ecomony.fcocommentaire='no comment';
	// 	ecomony.seletedfco='';
	// 	ecomony.modified= Date.now();
	// 	ecomony.modifier= $scope.authentication.username;
 //  	};
 //    	ecomony.$save(function(response) {$location.path('ecomonies/' + response._id);
	// 	// Clear form fields
	// 	$scope.name = '';
	// 	$scope.bu = '';
	// 	$scope.fieconum = '';
	//  	$scope.locataire = '';
	// 	$scope.refinanceur = '';
	// 	$scope.consultant  = '';
	// 	$scope.partenaire = '';
	// 	$scope.duree = '';
	// 	$scope.periodicite = '';
	// 	$scope.nbperiode = '';
	// 	$scope.drfaccord = '';
	// 	$scope.fcomtachat = '';
	// 	$scope.fcomtrachat = '';
	// 	$scope.fcomtafin = '';
	// 	$scope.fcotxcommpart = '';
	// 	$scope.fcocommpart = '';
	// 	$scope.fcotxcommapport = '';
	// 	$scope.fcocommapport = '';
	// 	$scope.fcomtnfin = '';
	// 	$scope.drfcoef = '';
	// 	$scope.loyer = '';
	// 	$scope.fcovaleuract = '';
	// 	$scope.drfmtcession = '';
	// 	$scope.fcomargebrute = '';
	// 	$scope.fcomargemad = '';
	// 	$scope.fcofrdoss = '';
	// 	$scope.fcofraisfi = '';
	// 	$scope.fcomargenette = '';
	// 	$scope.fcotxmargenette = '';
	// 	$scope.fcomargerev = '';
	// 	$scope.fcomargeprlg = '';
	// 	$scope.fcomargefinale = '';
	// 	$scope.fcocommentaire = '';
	// 	$scope.selectedfco = '';
	// 	$scope.modified = Date.now;
	// 	$scope.modifier= $scope.authentication.username;
	// 	},
	// 	function(errorResponse){$scope.error = errorResponse.data.message;}
	// );

    $scope.resetEco = function() 
    {
				$scope.name = '';
				$scope.bu = '';
			 	$scope.locataire = '';
				$scope.refinanceur = '';
				$scope.consultant = ''; 
				$scope.partenaire = '';
				$scope.mbf = '';
				$scope.ma = '';
				$scope.mr = '';
		        $scope.tcp = '';
		        $scope.tca = '';
		        $scope.mcp = '';
		        $scope.mca = '';
		        $scope.mnf = '';
		        $scope.dum = '';
		        $scope.per = '';
		        $scope.npr = '';
		        $scope.cri = '';
		        $scope.crn = '';
		        $scope.crb = '';
		        $scope.loy = '';
		        $scope.vac = '';
		        $scope.mcs = '';
		        $scope.mgb = '';
		        $scope.njm = '';
		        $scope.mgm = '';
		        $scope.njp = '';
		        $scope.mgp = '';
		        $scope.mgg = '';
		        $scope.tro = '';
		        $scope.mgo = '';
		        $scope.tmb = '';
		        $scope.tmg = '';
		        $scope.tff = '';
		        $scope.aff = '';		        
		        $scope.njf = '';		        
		        $scope.mff = '';
		        $scope.mfd = '';
		        $scope.nlp = '';
    };

    $scope.trsfrtEco = function() 
    {

    };

}
]
);

