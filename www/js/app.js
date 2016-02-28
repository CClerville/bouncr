// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('bouncr', ['ionic', 'bouncr.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    /* Bouncer Views */
    .state('bouncer', {
      url: '/bouncer',
      abstract: true,
      templateUrl: 'bouncer.html'
    })
    .state('bouncer.checkin', {
      url: '/checkin',
      views: {
        'checkin-tab': {
          templateUrl: 'checkin.html',
          controller: 'CheckInController',
          contrllerAs: 'checkinVm'
        }
      }
    })
    .state('bouncer.profile', {
      url: '/bouncer-profile',
      views: {
        'profile-tab': {
          templateUrl: 'bouncer-profile.html',
          controller: 'ProfileController',
          controllerAs: 'profileVm'
        }
      }
    })
    .state('bouncer.about', {
      url: '/about',
      views: {
        'about-tab':{
          templateUrl: 'about.html'
        }
      }
    })

    /* Cluber Views */
    .state('cluber', {
      url: "/cluber",
      abstract: true,
      templateUrl: "cluber.html"
    })
    .state('cluber.bouncers', {
      url: "/bouncers",
      views: {
        'bouncers-tab': {
          templateUrl: "bouncers.html",
          controller: 'BouncersController',
          controllerAs: 'bouncersVm'
        }
      }
    })
    .state('cluber.clubs', {
      url: "/clubs",
      views: {
        'clubs-tab': {
          templateUrl: "clubs.html",
          controller: 'ClubsController',
          controllerAs: 'clubsVm'
        }
      }
    })
    .state('cluber.profile', {
      url: "/cluber-profile",
      views: {
        'profile-tab': {
          templateUrl: "cluber-profile.html",
          controller: 'ProfileController',
          controllerAs: 'profileVm'
        }
      }
    })
    .state('cluber.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html",
          controller: 'AboutController',
          controllerAs: 'aboutVm'
        }
      }
    })
    .state('login', {
      url: '/',
      templateUrl: 'login.html',
      controller: 'LoginController',
      controllerAs: 'loginVm'
    });

  $urlRouterProvider.otherwise('/');
})
.controller('LoginController', LoginController)
.controller('BouncersController',  BouncersController)
.controller('ProfileController',  ProfileController)
.controller('ClubsController',  ClubsController)
.controller('AboutController',  AboutController)
.controller('CheckInController', CheckInController)
.factory('userService', userService);

function CheckInController(){
  vm = this;
}

function userService(){
  var USER = {};
  return {
    updateUserData: function setUser(userObj){
      USER.firstname = !!userObj.firstname ? userObj.firstname : USER.firstname;
      USER.lastname = !!userObj.lastname ? userObj.lastname : USER.lastname;
      USER.email = !!userObj.email ? userObj.email : USER.email;
      USER.role = !!userObj.role ? userObj.role : USER.role;
    },
    getUserData: function getUserData(){
      return USER;
    },
    setUserData: function setUserData(userObj){
      USER = userObj;
    }
  };
}

function LoginController($scope, $ionicModal, $rootScope, $firebase, $firebaseSimpleLogin, $state, userService){
  var vm = this;

  $ionicModal.fromTemplateUrl('user-role-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showModal = function(){
    $scope.modal.show();
  };

  $scope.closeModal = function(userRole){
    // Dummy Data
    userService.setUserData({
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      role: userRole
    });

    $scope.modal.hide();

    if( userRole === 'bouncer' ) {
      $state.go('bouncer.checkin');
    } else if (userRole === 'cluber') {
      $state.go('cluber.bouncers');
    }
  };

  vm.firebaseRef = new Firebase("https://bouncr.firebaseio.com/");

  vm.auth = $firebaseSimpleLogin(vm.firebaseRef);

  vm.user = null;
  // Logs a user in with inputted provider
  vm.doFbLogin = function() {
    
    // vm.auth.$login('facebook');

    $state.go('cluber.bouncers');

  };
  // Logs a user out
  vm.logout = function() {
    
    // vm.auth.$logout();
  };
  // Upon successful login, set the user object
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    vm.user = user;
  });
  // Upon successful logout, reset the user object
  $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
    vm.user = null;
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
    vm.user = null;
    // window.cookies.clear(function() {
      // console.log("Cookies cleared!");
    // });
  });

  $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
    console.log("Error logging user in: ", error);
  });


}

function BouncersController($state){
  var vm = this;
  vm.bouncers = getBouncers();


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

function ProfileController(userService){
  var vm = this;

  vm.user = userService.getUserData();
}

function ClubsController($ionicLoading){
  var vm = this;
  initialize();


  function initialize(){
    $ionicLoading.show({
      content: 'Location...',
      showBackdrop: false,
      hideOnStateChange: true
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
        var LatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        var mapOptions = {
          center: LatLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        vm.map = new google.maps.Map(document.getElementById("clubs-map"), mapOptions);

        var request = {
          location: LatLng,
          types: ['night_club'],
          keyword: ['night club'],
          rankBy: google.maps.places.RankBy.DISTANCE
        };

        var service = new google.maps.places.PlacesService(vm.map);
        service.nearbySearch(request, function(results, status){
          vm.clubs = results;
          console.log(results);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              if( results[i].photos ) {
                try{
                  results[i].avatar = results[i].photos[0].getUrl();
                } catch(e){
                  console.log(e);
                }
              }
              
              var placeLoc = results[i].geometry.location;
              new google.maps.Marker({
                map: vm.map,
                position: placeLoc
              });
            }
          }
          $ionicLoading.hide();
        });

        

      }, function(error) {
        console.log('error loading map');
      });
  }

}

function AboutController(){
  var vm = this;
}
