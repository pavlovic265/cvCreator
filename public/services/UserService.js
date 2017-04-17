cvCreaterApp.service('UserService', ['$http', '$filter', '$q', 'Upload', 'ErrorService',
     function($http, $filter, $q, Upload, ErrorService){
    var returnObj = {},
        canceler = $q.defer(),
        resolved = false,
        cancelHttp = function() {
            canceler.resolve("http call aborted");
        };

    returnObj = {
        uploadImage: function(newImage, newImageName, callbackSuccess, callbackError){
            Upload.upload({
                url: '/user/upload',
                data: {newImage: newImage, fileName: newImageName},
                method: 'PUT'
            })
            .then(function(response){
                callbackSuccess(response);
            })
            .catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });
        },

        update: function(user, callbackSuccess, callbackError) {
            $http.put('/user', user)
            .then(function(response){
                callbackSuccess();
            }).catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });

        },

        isSame: function(oldData, newData){
            return angular.equals(oldData, newData);
        },

        checkFields: function(user, oldUser, value, key, messsages) {
            if(key === 'birth'){
                value = $filter('date')(value, user.birthFormat.format);
            }
            if(messsages[key] && !(new RegExp('^' + user.regex[key] + '$')).test(value)) {
                user[key] = (key !== 'fullname') ? oldUser[key] : oldUser.firstname + ' ' + oldUser.lastname;
                ErrorService.addError(messsages[key]);
                return true;
            }
            return false;
        },
        
        download: function(){
            $http.get('/download/pdf')
            .then(function(response){
                callbackSuccess();
            }).catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });
        },

        users: function(query, callbackSuccess, callbackError) {
            $http.get('/users/'+query)
            .then(function(response){
                callbackSuccess(response.data);
            }).catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                   callbackError();
                }
            });
        },

        find: function(query, callbackSuccess, callbackError) {

                if (resolved) {
                    cancelHttp();
                }
                canceler = $q.defer();
                resolved = true;

                $http({
                    method: "GET",
                    url: "/users"+query,
                    timeout: canceler.promise
                }).then(function(response) {
                    resolved = false;
                    callbackSuccess(response.data);
                });
        },

        profile: function(username, callbackSuccess, callbackError) {
            $http({
                method: "GET",
                url: "/user/"+username
            }).then(function(response) {
                callbackSuccess(response.data);
            }).catch(function(reason){
                ErrorService.addErrors(reason.data);
                if(!angular.isUndefined(callbackError)) {
                    callbackError();
                }
            });
        }
    };
    return returnObj;
}]);