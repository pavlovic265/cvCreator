var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var ProjectClass = require('../classes/Project');
var UserClass = require('../classes/user');

router.post('/', 
    UserClass.checkAuthentication,
    function(req, res, next){

        req.checkBody('title', 'Title is required!')
            .regexTitle().withMessage('Title is wrong format!')
            .notEmpty();
        req.checkBody('link', 'Link is required!')
            .regexLink().withMessage('Link is wrong format!')
            .notEmpty();
        req.checkBody('description', 'Description is required!')
            .regexDescription().withMessage('Description is wrong format!')
            .notEmpty();

        var err = req.validationErrors();
        if(err) {
            throw err;
        }
        ProjectClass.addProject(req.user.id, req.body, function(err, user){
            if(err) {
                throw err;
            }
            res.status(200).json({
                project: user.projects[user.projects.length-1]
            });
        });
});
router.put('/', 
    UserClass.checkAuthentication,
    function(req, res, next){
        req.checkBody('title', 'Title is required!')
            .regexTitle().withMessage('Title is wrong format!')
            .notEmpty();
        req.checkBody('link', 'Link is required!')
            .regexLink().withMessage('Link is wrong format!')
            .notEmpty();
        req.checkBody('description', 'Description is required!')
            .regexDescription().withMessage('Description is wrong format!')
            .notEmpty();

        var err = req.validationErrors();
        if(err) {
            throw err;
        }

        ProjectClass.updateProject(req.user.id, req.body, function(err){
            if(err){
                throw err;
            }
            res.status(200).json({
                success: true
            });
        });
});
router.delete('/:idProject',
    UserClass.checkAuthentication,
    function(req, res){

        ProjectClass.deleteProject(req.user.id, req.params.idProject, function(err){
            if(err){
                throw err;
            }
            res.status(200).json({
                success: true
            });
        });
    

});
 
module.exports = router;