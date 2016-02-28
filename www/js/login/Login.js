
angular.module('bouncr.login')
	.controller('LoginController',  LoginController);


function LoginController(esriLoader, $state){
	vm = this;
	vm .fbLogin = fbLogin;

	esriLoader.require(['esri/Map', 'esri/layers/VectorTileLayer'], function(Map, VectorTileLayer) {
	    // vm.map = new Map({ basemap: 'streets' });

	    esriLoader.require(['esri/Map'], function(Map) {
            vm.map = new Map({
                basemap: 'streets'
            });
        });

	    // var tileLyr = new VectorTileLayer({
     //        url: '//www.arcgis.com/sharing/rest/content/items/f96366254a564adda1dc468b447ed956/resources/styles/root.json'
     //    });
     //    vm.map.add(tileLyr);

	    vm.options = {
	    	scale: 50000000,
	    	center: [-101.17, 21.78]
	    };
	});

	function fbLogin(){
		$state.go('bouncers');
	}
}