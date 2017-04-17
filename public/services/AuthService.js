cvCreaterApp.service('AuthService', ['$http', '$location', 'ErrorService',
    function($http, $location, ErrorService){
        var user = null, 
            returnObj;

        returnObj= {
            isLoggedIn: function() {
                return user ? true : false;
            },

            getUser: function() {
                return user ? user : false;
            },

            login: function(username, password, errorCallback) {
                return $http.post('/user/login', {username: username, password: password})
                            .then(function(response){
                                user = response.data.user;
                                $location.path('/');
                            })
                            .catch(function(reason) {
                                ErrorService.addError("Error logging in!");
                                errorCallback();
                            });
            },

            logout: function() {
                $http.get('/user/logout')
                        .then(function(reponse){
                            user = false;
                            $location.path('/login');
                        })
                        .catch(function(reason) {
                            ErrorService.addError("Error loging out!");
                        });
            },

            register: function(user) {
                return $http.post('/user/register', user)
                            .then(function (response) {
                                $location.path('/login');
                            })
                            .catch(function (reason) {
                                ErrorService.addErrors(reason.data.errors);
                            });;
            },

            checkStatus: function() {
                return $http.get('/user')
                            .then(function(response){
                                user = response.data.user;
                                $location.path('/');
                            });
            },

            setInfo: function(newUserData){
                user.firstname = newUserData.firstname;
                user.lastname = newUserData.lastname;
                user.birth = newUserData.birth;
                user.email = newUserData.email;
                if(!angular.isUndefind(newUserData.contact)) {
                    user.contact = newUserData.contact;
                }
            },
            
            setSkills: function(skills) {
                user.skills = skills;
            },
            
            setProjects: function(projects) {
                user.projects = projects;
            },

            setProject: function(project){
                user.projects.push(project);
            }
        }
        return returnObj;
    }
]);