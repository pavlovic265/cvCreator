angular.module('appRoutes', [])

.config(['$routeProvider', function($routeProvider) {

	$routeProvider

		.when('/login', {
			templateUrl: '/pages/login/login.html',
			controller: 'LoginController',
			access: {restricted: false}
		})

		.when('/register', {
			templateUrl: '/pages/register/register.html',
			controller: 'RegisterController',
			access: {restricted: false}
		})

		.when('/search', {
			templateUrl: '/pages/search/search.html',
			controller: 'SearchController',
			access: {restricted: true}
		})

		.when('/profile/:username', {
			templateUrl: '/pages/search/profile/profile.html',
			controller: 'ProfileController',
			resolve:  function(username) { return { username:  usernames }; },
			access: {restricted: true}
		})

		.when('/', {
			templateUrl: '/pages/home/home.html',
			controller: 'HomeController',
			access: {restricted: true}
		})

		.otherwise({
			redirectTo: '/login',
			access: {restricted: false}
		});
}])
.run(function ($rootScope, $location, $route, AuthService) {
	if(!AuthService.isLoggedIn()) {
		AuthService.checkStatus();
	}
	$rootScope.$on('$routeChangeStart',  function (event, next, current) {		
		if (next.access && next.access.restricted && !AuthService.isLoggedIn()){
			$location.path('/login');
			$route.reload();
		}
	});
});