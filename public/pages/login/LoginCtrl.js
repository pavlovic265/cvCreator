
angular.module('LoginCtrl', [])

.controller('LoginController', ['$scope', '$location', 'ErrorService','UserService', 'AuthService', 'ValidationService',
	function($scope, $location, ErrorService, UserService, AuthService, ValidationService){


		$scope.loginCtrl =  {
			username: '',
			regex: ValidationService.regex,
			password: '',
			passwordMinLength: 8,
			isDisabled: true,
			error: {
				loginError: false,
				allErrors: false,
				baError: false
			},
			change: false,

			//Reset form data
			resetData: function(){
				this.username = '';
				this.password= '';
				this.isDisabled = true;
				this.error = false;
			},

			//Submit username and password
			login: function() {
				if(this.checkErrors()) {
					this.error.loginError = true;
					return;
				}
				var _thisError = this.error;
				_thisError.baError = false;
				AuthService.login(this.username, this.password, function(){
					_thisError.baError = true;
				});
			},

			checkErrors: function() { 
				this.error.allErrors = ($scope.loginForm.$invalid) ? true : false
				return this.error.allErrors;
			},
			registration: function() {
				$location.path('/register');
			}
		};
	}	
]);
