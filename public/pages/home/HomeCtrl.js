var HomeController = angular.module('HomeCtrl', ['SkillCtrl', 'InfoCtrl', 'ProjectCtrl'])

.controller('HomeController', ['$scope', 'AuthService',
function($scope, AuthService){
	if(!AuthService.isLoggedIn()) {
		AuthService.checkStatus();
	}

	$scope.$on('hasError', function(event, section, action){
		$scope.homeCtrl.section[section][action] = true;
	});

	var user = AuthService.getUser();

	$scope.homeCtrl = {
		userInfo: {
				birth: user.birth,
				contact: user.contact,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				fullname: user.fullname,
				gender: user.gender,
				image: user.image
		},
		userProjects: user.projects,
		userSkills: user.skills,
		section: {
				info: {
					edit: false
				},
				skill: {
					edit: false
				},
				project: {
						add: false,
						edit: false,
				}
		},
		addNew: function(action, section, eventName) {
			this.section[section][action] = true;
			$scope.$broadcast(eventName);
		},
		add: function(action, section, eventName) {
			this.section[section][action] = true;
			$scope.$broadcast(eventName);
		},
		edit: function(action, section, eventName) {
			this.section[section][action] = true;			
			$scope.$broadcast(eventName);
		},
		Cancel: function(action, section, eventName) {
			this.section[section][action] = false;
			$scope.$broadcast(eventName);
		},
		save: function(action, section, eventName) {
			this.section[section][action] = false;
			$scope.$broadcast(eventName);
		}
	}
}])

