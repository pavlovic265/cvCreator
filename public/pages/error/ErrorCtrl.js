angular.module('ErrorCtrl', []).controller('ErrorController', ['$scope', 'ErrorService', 
function($scope, ErrorService){
    $scope.errorCtrl = {
        errors: ErrorService.getErrors(),
        isErrorShow: ErrorService.getNumberOfErrors()  > 0 ? true : false,
        isAllErrorsShow: false,

        addError: function(id) {
        },

        removeError: function(id) {
            this.errors = ErrorService.removeError(id);
            if(ErrorService.getNumberOfErrors() === 0) {
                this.isErrorShow = false;
                this.isAllErrorsShow = false;
            }
        },

        removeAllErrors: function()  {
            this.errors = ErrorService.removeAllErrors();
            this.isErrorShow = false;
            this.isAllErrorsShow = false;
        },

        showAllErrors: function()  {
            this.isAllErrorsShow = true;
        },

        hideAllErrors: function() {
            this.isAllErrorsShow = false;
        }
    }
}]);