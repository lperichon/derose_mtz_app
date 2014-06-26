(function(){
	'use strict';
	var app = angular.module('myApp', ['onsen.directives']);
	app.controller("homeController", function($scope) {

	    $scope.callSchool = function(){       
	        document.location = "tel:47333801";
	    }

	});

	app.controller("contactController", function($scope) {

	    $scope.submit = function(recipient, subject, body){       
	        window.plugins.emailComposer.showEmailComposer(subject,body,recipient,"","",false); 
	    }

	});
})();
