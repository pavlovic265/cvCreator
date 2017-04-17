ProjectController

.directive('projectsDirective', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/project/view/projectsData.html',
        replace: true,
        scope: {
             userProjects: '=userProjects'
        },
        controller: 'ProjectController'
    }
})

.directive('projectDirectiveAdd', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/project/view/projectAdd.html',
        replace: true,
        scope: {
            project: '=',
            regex: '='
        }
    }
})

.directive('projectDataDirective', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/project/view/projectData.html',
        replace: true,
        scope: {
            project: "="
        }
    }
})

.directive('projectDataDirectiveEdit', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/project/view/projectEdit.html',
        replace: true,
        scope: {
            project: "="
        }
    }
})

.directive('projectDataDirectiveShow', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/project/view/projectShow.html',
        replace: true,
        scope: {
            project: "="
        }
    }
});