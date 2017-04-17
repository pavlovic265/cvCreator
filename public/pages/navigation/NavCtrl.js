angular.module('NavCtrl', [])

.controller('NavigationController', ['$scope', 'AuthService', 'UserService', function($scope, AuthService, UserService){
    $scope.navCtrl = {
        isLoggedIn: AuthService.isLoggedIn,
        logout: function() {
			AuthService.logout();
		},
        download: function(){
            UserService.download();
        }
    }
}]);
