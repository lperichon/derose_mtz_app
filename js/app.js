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
	    	else if(device.platform == 'Android') {
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

	app.controller('RecentPostsController', function($scope, $location, Blog) {
		$scope.getRecent = function() {

			$scope.msg = "Loading...";

			Blog.getRecentPosts().then(function(data) {
				$scope.data = data;

				if ($scope.data.posts.length < 1)
				{
					$scope.msg = "Nothing found.";
				}else{
					$scope.msg = undefined;
				}

			});
		};

		$scope.getPost = function(id) {
			Blog.setPostId(id);
			$scope.ons.navigator.pushPage('post.html');			
		};

		// call service
		$scope.getRecent();
	});

	app.controller('PostController', function($scope, $location, Blog, $sce) {
		$scope.getPost = function() {

			$scope.msg = "Loading...";
			Blog.getPost(Blog.getPostId()).then(function(data) {
				$scope.post = data.post;

				// make trusted html in 1.2
				$scope.post.content = $sce.trustAsHtml(data.post.content);

				if (typeof data.post == "undefined")
				{
					$scope.msg = "Nothing found.";
				}else{
					$scope.msg = undefined;
				}
			});
		};

		// call service
		$scope.getPost();
	});

	app.factory('Blog', function($http) {
		var postId;
	    var Blog = {
	        endpoint: 'http://www.derosemartinez.com.ar/api',

	        setPostId: function(id) {
	        	postId = id;
	        },

	        getPostId: function() {
	        	return postId;
	        },

	        getRecentPosts: function() {
	            return this.makeCall(this.endpoint + '/get_recent_posts/?callback=JSON_CALLBACK');
	        },

	        getPost: function(id) {
	            return this.makeCall(this.endpoint + '/get_post/?id='+id+'&callback=JSON_CALLBACK');
	        },

	        makeCall: function(url){
	            return $http.jsonp(url).then(function(response){
	                return response.data;
	            });            
	        }
	    };
	    return Blog;
	});
})();
