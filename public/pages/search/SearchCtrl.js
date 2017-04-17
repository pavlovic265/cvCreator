
angular.module('SearchCtrl', [])

.controller('SearchController', ['$scope',  '$location', 'UserService', 'SearchService', 'ValidationService',
	function($scope, $location, UserService, SearchService, ValidationService){
		var query = 'current/' + SearchService.getCurrentPage();
		if(!SearchService.isEmpty()) {
			query += (SearchService.getUsername() !== '' ? '/username/' + SearchService.getUsername() : '');
		}
		UserService.users(query, function(data){
			$scope.searchCtrl.users = data.users;
			$scope.searchCtrl.totalItems = data.total;
			if(!SearchService.isEmpty()) {
				$scope.searchCtrl.currentPage = SearchService.getCurrentPage();	
				$scope.searchCtrl.user.username = SearchService.getUsername();	
			}
		});

		$scope.searchCtrl =  {
			searchCtrl: false,
			limit: 10,
			totalItems: 0,
		  	currentPage: 1,
			users: [],
			user: {
				username: '',
				firstname: '',
				lastname: ''
			},
			pageChanged: function() {
				var query = 'current/'+ this.currentPage + (this.user.username !== '' ? '/username/' + this.user.username : '');

				UserService.users(query, function(data){
					$scope.searchCtrl.users.length= 0;
					angular.forEach(data.users, function(user){
						this.users.push(user);							
					}, $scope.searchCtrl);
					$scope.searchCtrl.totalItems = data.total;
				});
			},
			setPage: function(num) {
				this.currentPage = num;
			},
			searching: function() {

					if(this.user.username === '' && this.user.firstname === '' && this.user.lastname === '') {
						this.setPage(1);
						this.pageChanged();
						return ;
					}
					_self = this;
					var query = '';
					if(this.user.username !== '') {
						query += '/username/'+this.user.username
					}
					if(this.user.firstname !== '') {
						query += '/firstname/'+this.user.firstname
					}
					if(this.user.lastname !== '') {
						query += '/lastname/'+this.user.lastname
					}

					if(query === '') {
						return;
					}

					UserService.find(query, function(data){
						_self.users.length = 0;
						angular.forEach(data.users, function(user){
							this.users.push(user);							
						}, _self);
						_self.totalItems = data.total;
						_self.setPage(1);
					});
			},
			rememberState: function() {
				SearchService.setUsername(this.user.username)
							.setCurrentPage(this.currentPage);
			}
		};
}]);
