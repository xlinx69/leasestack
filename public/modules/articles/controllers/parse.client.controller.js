'use strict';

var myapp = angular.module('articles',[]);

myapp.controller('parseController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) 
	{
 		$scope.authentication = Authentication;

	    $scope.showContent = function($fileContent)
	    {
	        $scope.content = $fileContent;
	    };

	    $scope.locataire = 'smoby';
	    $scope.inroutine = 0;
	    
	  	$scope.indexString = function () 
	    {
	      $scope.longfile = $scope.content.length;
	      $scope.idx = $scope.content.search('$scope.chaine');
	      $scope.content =  $scope.content.replace('<##locataire>', '$scope.locataire');
	      
	      $scope.inroutine = $scope.inroutine++;
	    };
	}
 ]);


// myapp.controller('parseController', function ($scope) {
//     $scope.showContent = function($fileContent){
//         $scope.content = $fileContent;
//     };
//     $scope.locataire = 'smoby';
//     $scope.inroutine = 0;
    
//   	$scope.indexString = function () 
//     {
//       $scope.longfile = $scope.content.length;
//       $scope.idx = $scope.content.search('$scope.chaine');
//       $scope.content =  $scope.content.replace('<##locataire>', '$scope.locataire');
      
//       $scope.inroutine = $scope.inroutine++;
      
//     };
    
//   });

myapp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});
  

// myapp.directive('String', function ($parse) {
// 	return {};
// });


