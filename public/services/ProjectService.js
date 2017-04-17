cvCreaterApp.service('ProjectService', ['$http', '$filter', 'ErrorService', 'ValidationService',
     function($http, $filter, ErrorService, ValidationService){
    var returnObj = {},
        messages = ValidationService.messages;
    
    returnObj = {
        hasError: function(newProject){
            var hasError = false;
			
			angular.forEach(newProject, function(value, key){
				var keyHelp = '';
				if(angular.isUndefined(value)) {
					hasError = true;
				}else if('' === value.trim()) {
					hasError = true;
					keyHelp = 'Empty';
				}
				if(hasError) {
					ErrorService.addError(messages[key.concat(keyHelp)]);					
				}
			});

            return hasError;
        },
        add: function(project, callbackSuccess, callbackError){
            $http.post('/project', {
                title: project.title,
                link: project.link,
                description: project.description
            })
            .then(function(response){
                callbackSuccess(project)
            })
            .catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });
        },
        update: function(project, callbackSuccess, callbackError){
            $http.put('/project', project)
            .then(function(response){
                callbackSuccess();
            })
            .catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });
        },
        delete: function(idProject, callbackSuccess, callbackError){
            $http.delete('/project/'+idProject)
                .then(function(response){
                    callbackSuccess();
                })
                .catch(function(reason){
                    ErrorService.addError(reason.data);
                    if(!angular.isUndefined(callbackError)) {
                    callbackError();
                    }
                });
        }
    };
    return returnObj;
}])