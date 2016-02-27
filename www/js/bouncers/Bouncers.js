
angular.module('bouncr.bouncers')
	.controller('BouncersController',  BouncersController);


function BouncersController(esriLoader, $state){
	vm = this;
	vm.bouncers = getBouncers();

	esriLoader.require(['esri/Map', 'esri/layers/VectorTileLayer'], function(Map, VectorTileLayer) {
	    // vm.map = new Map({ basemap: 'streets' });

	    esriLoader.require(['esri/Map'], function(Map) {
            vm.map = new Map({
                basemap: 'streets'
            });
        });

	    vm.options = {
	    	scale: 50000000,
	    	center: [-101.17, 21.78]
	    };
	});

	function getBouncers(){
		return[{
			name: 'Muslce Badass',
			price: '10.00',
			subscriptions: 8,
			location: {
				name: 'Bootie SF',
				address: '375 11th St San Francisco, CA 94103'
			},
			avatar: 'http://www.bennyluo.com/wp-content/uploads/2010/08/bouncer-white.gif'
		},{
			name: 'Shabba Ranks',
			price: '15.00',
			subscriptions: 13,
			location: {
				name: 'F8 Nightclub and Bar',
				address: '1192 Folsom San Francisco, CA 94103'
			},
			avatar: 'http://www.bennyluo.com/wp-content/uploads/2010/08/bouncer-white.gif'
		},{
			name: 'Gorgey Porgey',
			price: '5.00',
			subscriptions: 20,
			location: {
				name: 'Temple Nightclub',
				address: '540 Howard St San Francisco, CA 94105'
			},
			avatar: 'http://www.bennyluo.com/wp-content/uploads/2010/08/bouncer-white.gif'
		},{
			name: 'Chow Ming',
			price: '30.00',
			subscriptions: 40,
			location: {
				name: 'AsiaSF',
				address: '201 9th St San Francisco, CA 94103'
			},
			avatar: 'http://www.bennyluo.com/wp-content/uploads/2010/08/bouncer-white.gif'
		}];
	}

}