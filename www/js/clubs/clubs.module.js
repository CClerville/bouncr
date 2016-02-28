
angular.module('bouncr.clubs', ['esri.map'])
	.config(function($stateProvider){
		$stateProvider
			.state('clubs', {
				url: '/clubs',
				templateUrl: 'js/clubs/clubs.html',
				controller: 'ClubsController',
				controllerAs: 'clubsVm'
			});
	});
