
angular.module('bouncr.bouncers', ['esri.map'])
	.config(function($stateProvider){
		$stateProvider
			.state('bouncers', {
				url: '/bouncers',
				templateUrl: 'templates/bouncers.html',
				controller: 'BouncersController',
				controllerAs: 'bouncersVm'
			});
	});
