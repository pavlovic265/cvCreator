
angular.module('ProfileCtrl', [])

.controller('ProfileController', ['$scope', '$routeParams', 'UserService',
	function($scope, $routeParams, UserService){

		UserService.profile($routeParams.username, function(user){
			$scope.profileCtrl = user;	
		});

		$scope.profileCtrl =  {
			user: {}
		};
}]);
