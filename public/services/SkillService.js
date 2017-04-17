cvCreaterApp.service('SkillService', ['$http', '$filter', 'ErrorService',
     function($http, $filter, ErrorService){
    var returnObj = {},
        leftSkills = [],
        addedSkills = [];
    
    returnObj = {
        allSkills: function(callbackSuccess, callbackError) {
            if(leftSkills.length !== 0) {
                callbackSuccess(leftSkills)
            }
            $http.get('/skill')
                .then(function(response){
                    callbackSuccess(response.data.skills)
                })
                .catch(function(reason){
                    ErrorService.addErrors(reason.data);
                    if(!angular.isUndefined(callbackError)) {
                        callbackError();
                    }
                });
        },
        getLeftSkills: function(){
            return leftSkills;
        },
        resetLeftSkills: function(){
            if(addedSkills.length > 0) {
                angular.forEach(addedSkills, function(skill){
                    leftSkills.push(skill);
                });
            }
        },
        getSkill: function(skillName, userSkill){
            var skill = $filter('filter')(userSkill || leftSkills, {name: skillName}, true);
            if(skill.length === 1) {
                return skill[0];
            }
            return null;
        },
        getUserSkill: function(skillName, userSkill) {
            return this.getSkill(skillName.name, userSkill);
        },
        setNewSkills: function(newSkills) {
            leftSkills = newSkills;
        },
        addSkill: function(skill){
            leftSkills.push(skill);
            return this;
        },
        addUserSkill: function(newSkill, userSkills){
            userSkills.push(newSkill);
            return this;
        },
        removeSkill: function(newSkill) {
            var index = null;
            for(var i in leftSkills) {
                if(leftSkills[i]._id === newSkill._id) {
                    index = i;
                    break;
                }
            }
            if(null !== index) {
                addedSkills.push(newSkill);
                leftSkills.splice(index, 1);
            }
            return this;
        },
        removeUserSkill: function(skill, userSkills) {
            var index = 0;
            for(var i in userSkills) {
                if(userSkills[i].name === skill.name) {
                    index = i;
                    break;
                }
            }
            addedSkills = $filter('filter')(addedSkills, {_id: '!'+skill._id}, true);
            userSkills.splice(index, 1);
            return this;
        },
        saveSkills: function(userSkills, callbackSuccess, callbackError) {
            $http.put('/skill', userSkills)
                .then(function(response){
                    callbackSuccess();
                })
                .catch(function(reason){
                    ErrorService.addErrors(reason.data);
                    if(!angular.isUndefined(callbackError)) {
                        callbackError();
                    }
                });
        }
    };
    return returnObj;
}])