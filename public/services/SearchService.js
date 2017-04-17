
cvCreaterApp.service('SearchService', [function(){

    var returnObj = {
        username: '',
        currenPage: 1,
        setUsername: function(username) {
            this.username = username;
            return this;
        },
        setCurrentPage: function(currenPage) {
            this.currenPage = currenPage;
            return this;
        },
        getUsername: function(username) {
            return this.username;
        },
        getCurrentPage: function(currenPage) {
            return this.currenPage;
        },
        isEmpty: function() {
            return this.username === '' && this.currenPage === 1;
        },
        reset: function() {
            this.username = '';
            this.currenPage = 1;            
        }
    };
    return returnObj;
}]);