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
	        window.plugins.email.open({
			    to:      [recipient],
			    subject: subject,
			    body:    body
			}); 
	    }

	});

	app.controller("aboutUsController", function($scope) {

	    $scope.call = function(phone){       
	        document.location = "tel:" + phone; 
	    }

	    $scope.mail = function(mail){       
	        document.location  = "mailto:" + mail; 
	    }
	    
	    $scope.fb = function(id){
	    	if (device.platform == 'iOS') {
	    		appAvailability.check(
				    'fb://', // URI Scheme
				    function() {  // Success callback
				        window.open('fb://profile/' + id, '_system', 'location=no');
				    },
				    function() {  // Error callback  
				    }
				);
	    	}
	    	else if(devise.platform == 'Android') {
	    		appAvailability.check(
				    'com.facebook.katana', // URI Scheme
				    function() {           // Success callback
				        window.open('fb://profile/' + id, '_system', 'location=no');
				    },
				    function() {           // Error callback
				    }
				);
	    	}
	    }
	});
})();
