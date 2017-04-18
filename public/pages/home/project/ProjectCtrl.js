var ProjectController = angular.module('ProjectCtrl',[])

.controller('ProjectController', ['$scope', '$rootScope', 'ProjectService', 'ValidationService', 'AuthService',
function($scope, $rootScope, ProjectService, ValidationService, AuthService){
	$scope.$on('projectAddNew', function(){
		$scope.projectCtrl.isAdd = true;
	});
	$scope.$on('projectAdd', function(){
		$scope.projectCtrl.isAdd = false;
		$scope.projectCtrl.add();
	});
	$scope.$on('projectAddCancel', function(){
		$scope.projectCtrl.isAdd = false;
	});

	var extendProject = {
					isEdit: false,
					oldProject: undefined,
					Cancel: function(){
						this.isEdit = false;
						if(angular.isUndefined(this.oldProject)) {
							return;
						}

						this.title = this.oldProject.title;
						this.link = this.oldProject.link;
						this.description = this.oldProject.description;
					},
					edit: function(project){
						this.isEdit = !this.isEdit;
						this.oldProject = angular.copy({
													title: project.title,
													link: project.link,
													description: project.description
												});
					},
					save: function(){
						this.isEdit = false;
						var _self = this,
							newProject = {title: this.title, link: this.link, description: this.description},
							projects = $scope.projectCtrl.projects;

						if(angular.equals(this.oldProject, {title: this.title, link: this.link, description: this.description})) {
							return;
						}
						if(ProjectService.hasError(newProject)){
							return;
						}

						ProjectService.update({
								_id: this._id,
								title: this.title,
								link: this.link,
								description: this.description
							},
							function(){
								AuthService.setProjects(projects);
							},
							function(){
								$rootScope.$broadcast('hasError', 'project', 'edit');
							});
					},
					delete: function(_id) {
						this.isEdit = false;
						var projects = $scope.projectCtrl.projects;
						for(var i = 0; i < projects.length; i++) {
							if(projects[i]._id == _id) {
								projects.splice(i, 1);
								break;
							}	
						}

						ProjectService.delete(_id,
							function(){
								AuthService.setProjects(projects);
							},
							function(){
								$rootScope.$broadcast('hasError', 'project', 'edit');
							});
					}
				};
	var extendedProjects = angular.copy($scope.userProjects)

	angular.forEach(extendedProjects, function(data){
		angular.extend(data, extendProject);
	});

	$scope.projectCtrl = {
		newProject: {
			title: '',
			link: '',
			description: ''
		},
		projects: extendedProjects,
		isAdd: false,
		regex: ValidationService.regex,
		reset: function(){
			this.newProject = {
						title: '',
						link: '',
						description: ''
					}
		},
		add: function() {
			var _self = this;
			if(ProjectService.hasError(this.newProject)) {
				return;
			}
			angular.extend(this.newProject, extendProject);
			ProjectService.add(this.newProject,
				function(project){
					_self.projects.push(project);
					AuthService.setProjects(_self.projects)
				},
				function(){
					$rootScope.$broadcast('hasError', 'project', 'add');
				});
			this.reset();
		}
	}
}]);
