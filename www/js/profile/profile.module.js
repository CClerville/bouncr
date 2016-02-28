
angular.module('bouncr.profile', [])
	.config(function($stateProvider){
		$stateProvider
			.state('profile', {
				url: '/profile',
				templateUrl: 'js/profile/profile.html',
	        	controller: 'ProfileController',
				controllerAs: 'profileVm'
			});
	});
