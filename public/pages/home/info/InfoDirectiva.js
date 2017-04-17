InfoController
.directive('infoDataDirective', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/info/view/infoData.html',
        replace: true,
        scope: {
             user: '='
        },
        controller: 'InfoController'
    }
})

.directive('infoDataDirectiveShow', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/info/view/infoDataShow.html',
        replace: true,
        scope: {
             user: '='
        }
    }
})

.directive('infoDataDirectiveEdit', function(){
    return {
        restrict: 'E',
        templateUrl: '/pages/home/info/view/infoDataEdit.html',
        replace: true,
        scope: {
             user: '='
        }
    }
});