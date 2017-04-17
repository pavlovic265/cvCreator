
cvCreaterApp.service('ErrorService', ['$filter', function($filter){

    var errors = [],
            id= 1;

    return {
        getErrors: function(){
            return errors;
        },

        addError: function(error) {
            errors.push({id: id++, message: error});
        },
        addErrors: function(errorsData) {
            errorsData.forEach(function(error){
                errors.push({id: id++, message: error.msg});
            });
        },
        //Returns array of left errors
        removeError: function(id) {
            errors = $filter('filter')(errors, {id: '!'+id});
            return errors;
        },
        //return empty array
        removeAllErrors: function() {
            errors.length = 0
            return errors;
        },

        getNumberOfErrors: function() {
            return errors.length;
        }
    };
}]);