cvCreaterApp.service('ValidationService', [ function(){
    var returnObj = {
                birthFormat: {
                            format: 'dd/MM/yyyy',
                            date: null,
                            opened: false,
                            open: function(){
                                this.opened = true;
                            }
                },
                regex: {
                    fullname: '[A-Z][a-z]{1,}\\s[A-Z][a-z]{1,}',
                    firstLastName: '[A-Z][a-z]{1,}',
                    birth: '[0-9]{2}/[0-9]{2}/[0-9]{4}',
                    username: '[\\d\\w\\-\\_]{3,}',
                    password: '[a-zA-Z0-9\_\.\-]{8,}',
                    email: '[\\da-z\_\.]{3,}\@[a-z]{3,10}\.[a-z]{2,4}(\.[a-z]{2,4})?',
                    contact: '([\\d]{3}\/[\\d]{7})?',
                    title: '[A-Za-z0-9\\s]{2,}',
                    link: '((http(s)?\:\/\/)|([w]{3}\.))[A-Za-z]{1,}\.[a-z]{2,3}(\.[a-z]{2,3})?([\/a-zA-Z0-9\.\&\?\?\=\+\-]*)?',
                    description: '[A-Za-z\\s0-9\!\?\-\_\;\'\:\,\\\/\.\=\+\*\n]*'
                },
                messages: {
                    fullname: 'Fullname is in wrong format!',
                    email: 'Email wrong format!',
                    birth: 'Birth wrong format!',
                    contact: 'Contact wrong format!',
                    skill: 'Skill is wrong format!',
                    skillEmpty: 'Skill field is empty format!',
                    title: 'Project title wrong format!',
                    titleEmpty: 'Project title is empty!',
                    description: 'Project description wrong format!',
                    descriptionEmpty: 'Project description is empty!',
                    link: 'Project URL wrong format!',
                    linkEmpty: 'Project link is empty!'
                }
    };
    
    return returnObj;
}]);