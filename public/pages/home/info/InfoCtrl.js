var InfoController = angular.module('InfoCtrl',[])
.controller('InfoController', ['$scope', '$rootScope', 'ValidationService', 'UserService', 'ErrorService', 'AuthService',
function($scope, $rootScope, ValidationService, UserService, ErrorService, AuthService){

	var user = $scope.user;

	$scope.$on('infoSave', function(){
		$scope.infoCtrl.save();	
	});
	$scope.$on('infoEdit', function(){
		$scope.infoCtrl.edit();	
	});
	$scope.$on('infoCancel', function(){
		$scope.infoCtrl.Cancel();	
	});

	user.birthFormat = ValidationService.birthFormat;
	user.regex = ValidationService.regex;

	user.birth = new Date(user.birth);

	user.selectImage = function(file, errFiles) {
		user.newImage = file;
	}

	$scope.infoCtrl = {
		user: user,
		isEdit: false,
		oldUser: {},
		edit: function(){
			this.isEdit = true;
			this.oldUser = angular.extend({}, {
				firstname: this.user.firstname,
				lastname: this.user.lastname,
				birth: this.user.birth,
				email: this.user.email,
				contact: this.user.contact
			});
		},
		save: function(){
			var hasError = false,
				isSame = false,
				messsages = ValidationService.messages,
				submitUser,
				_self = this;

			angular.forEach(this.user, function(value, key){
				if(UserService.checkFields(this.user, this.oldUser, value, key, messsages)) {
					hasError = true;
				}
			}, this);

			if(hasError) {
				$rootScope.$broadcast('hasError', 'info', 'edit');
				return;
			}

			this.user.firstname = this.user.fullname.split(' ')[0];
			this.user.lastname = this.user.fullname.split(' ')[1];
			submitUser = angular.copy({
							firstname: this.user.firstname,
							lastname: this.user.lastname,
							birth: this.user.birth,
							email: this.user.email
						});

			if(this.user.contact !== '') {
				submitUser.contact = this.user.contact;
			}

			isSame = UserService.isSame(this.oldUser, submitUser);

			if(this.user.newImage && '' !== this.user.newImage.name) {
				UserService.uploadImage(this.user.newImage, this.user.newImage.name,
					function(response){
						_self.user.image = response.data.image;
						AuthService.setImage( response.data.image);
						delete _self.user.newImage;
					},
					function(){
						$rootScope.$broadcast('hasError', 'info', 'edit');						
					});
					
			}

			if(!isSame) {
				UserService.update(submitUser,
					function(){
						_self.isEdit = false;
						AuthService.setInfo(submitUser);
					},
					function(){
						$rootScope.$broadcast('hasError', 'info', 'edit');				
					});
			} else {
				this.isEdit = false;
			}
		},
		Cancel: function(){
			this.isEdit = false;
			this.user.firstname = this.oldUser.firstname;
			this.user.lastname = this.oldUser.lastname;
			this.user.birth = this.oldUser.birth;
			this.user.email = this.oldUser.email;
			this.user.contact = this.oldUser.contact;
			this.user.newImage = '';
		}
	}
}])