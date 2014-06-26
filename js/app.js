(function(){
	'use strict';
	var app = angular.module('myApp', ['onsen.directives']);
	app.controller("homeController", function($scope) {

	    $scope.callSchool = function(){       
	        document.location = "tel:47333801";
	    }

	});
})();
