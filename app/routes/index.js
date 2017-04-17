var express = require('express');
var _ = require('lodash');
var router = express.Router();
var UserClass = require('../classes/user');

router.get('/users/current/:current', 
    UserClass.checkAuthentication,
    function(req, res, next){
        var current = req.params.current,
            startFrom = current*10-10;

        UserClass.allUsers(startFrom , function(users, total){
            res.status(200).json({
                users: users,
                total: total
            });
        });
});

router.get('/users((/username/:username)?(/firstname/:firstname)?(/lastname/:lastname)?)',
    UserClass.checkAuthentication,
    function(req, res, next){

        var query = {},
            username = req.params.username,
            firstname = req.params.firstname,
            lastname = req.params.lastname;

        if(!_.isUndefined(req.params.username)) {
            req.checkParams('username', 'Username is required!')
                .regexUsername().withMessage('Username is wrong format!')
                .notEmpty();
            query.username = new RegExp('^'+username, "i");
        }
        if(!_.isUndefined(req.params.firstname)) {
            req.checkParams('firstname', 'Firstname is required!')
                .regexFirstLastNameSearch().withMessage('Firstname is wrong format!')
                .notEmpty();
            query.firstname = new RegExp('^'+firstname, "i");
        }
        if(!_.isUndefined(req.params.lastname)) {
            req.checkParams('lastname', 'Lastname is required!')
                .regexFirstLastNameSearch().withMessage('Lastname is wrong format!')
                .notEmpty();
            query.lastname = new RegExp('^'+lastname, "i");
        }

        var errors = req.validationErrors();

        if(errors) {
            throw errors
        }

        if(_.isEmpty(query))
        {
            throw new Error('There was an error');
        }

        UserClass.allUsersWithQuery(0, query, function(users, total){
            res.status(200).json({
                users: users,
                total: total
            });
        });
});

router.get('/users/current/:current/username/:username', 
    UserClass.checkAuthentication,
    function(req, res, next){

        var query = {},
            current = req.params.current,
            username = req.params.username,
            startFrom = current*10-10;
        
        if(!_.isUndefined(req.params.username)) {
            query.username = new RegExp('^'+username, "i");
        }

        if(_.isEmpty(query))
        {
            throw new Error('There was an error');
        }

        UserClass.allUsersWithQuery(startFrom, query, function(users, total){
            res.status(200).json({
                users: users,
                total: total
            });
        });
});


module.exports = router;