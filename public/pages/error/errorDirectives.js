cvCreaterApp
.directive('errorDirective', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/error/view/errorTemplate.html',
        replace: true,
        scope: {
                errorMessage: '@',
                errorId: '@',
                removeError: '&'
            }
    }
});