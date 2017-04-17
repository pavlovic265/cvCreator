SkillController
.directive('skillDataDirective', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/skill/view/skillData.html',
        replace: true,
        scope: {
             userSkills: '=userSkills'
        },
		controller: 'SkillController'
    }
})

.directive('skillDataDirectiveShow', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/skill/view/skillDataShow.html',
        replace: true,
        scope: {
             userSkills: '=userSkills'
        }
    }
})

.directive('skillDataDirectiveEdit', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/skill/view/skillDataEdit.html',
        replace: true,
        scope: {
             skillCtrl: '=skillCtrl'
        }
    }
});