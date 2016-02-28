
angular.module('bouncr.login', ['esri.map'])
	.config(function($stateProvider){
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'js/login/login.html',
				controller: 'LoginController',
				controllerAs: 'loginVm'
			});
	});
