
var SkillController = angular.module('SkillCtrl', [])
.filter('newSkills', function(){
	return function(array1, array2){
			var newArray = [];
			for(var i in array1) {
				var exist = false;
				for(var j in array2) {
					if(array1[i].name === array2[j].name) {
						exist = true;
						break;
					}
				}
				if(!exist) {
					newArray.push(array1[i]);
				}
			}
			return newArray;
	}
})
.controller('SkillController', ['$scope', '$rootScope', 'newSkillsFilter', 'SkillService', 'AuthService',
function($scope, $rootScope, newSkillsFilter, SkillService, AuthService){
	$scope.$on('skillSave', function(){
		$scope.skillCtrl.save();
	});

	$scope.$on('skillCancel', function(){
		$scope.skillCtrl.Cancel();
	});
	$scope.$on('skillEdit', function(){
		SkillService.allSkills(function(skills){
				SkillService.setNewSkills(newSkillsFilter(skills, $scope.userSkills));
				$scope.skillCtrl.edit();
			},
			function() {
				$rootScope.$broadcast('hasError', 'skill', 'edit');
			});
	});

	$scope.skillCtrl = {
		isTypeing: false,
		isEdit: false,
		newSkill: undefined,
		userSkills: angular.copy($scope.userSkills),
		reset: function(){
				this.isTypeing = false;
				this.newSkill = '';
		},
		typing: function() {
			if(angular.isUndefined(this.newSkill) || !angular.isString(this.newSkill) || '' === this.newSkill.trim()) {
				this.reset();
				return;
			}
			this.isTypeing = true;
		},
		edit: function(){
			this.isEdit = true;
			this.leftSkills = SkillService.getLeftSkills();
			this.userSkills = angular.copy($scope.userSkills);
			this.reset();
		},
		add: function(skill) {
			if(angular.isUndefined(this.newSkill) || !angular.isString(this.newSkill) || '' === this.newSkill.trim()) {
				this.reset();
				return;
			}
			if(!angular.isUndefined(skill) && angular.isObject(skill)) {
				this.newSkill = skill;
			} else {
				this.newSkill = SkillService.getSkill(this.newSkill);
			}
			if(null === this.newSkill) {
				this.reset();
				return;
			}
			if(angular.isObject(this.newSkill)) {
				SkillService.addUserSkill(this.newSkill, this.userSkills)
							.removeSkill(this.newSkill);
			}			
			this.reset();
		},
		remove: function(skill) {
			skill = SkillService.getUserSkill(skill, this.userSkills);
			SkillService.removeUserSkill(skill, this.userSkills)
						.addSkill(skill);
		},
		save: function() {
			var _self = this;
			SkillService.saveSkills(this.userSkills,
			function(){
				_self.isEdit = false;
				$scope.userSkills = _self.userSkills;
				AuthService.setSkills(_self.userSkills);
			},
			function(){
				$rootScope.$broadcast('hasError', 'skill', 'edit');
			});
			this.reset();
		},
		Cancel: function(){
			this.isEdit = false;
			this.reset();
			SkillService.resetLeftSkills();
		}
	}
}]);