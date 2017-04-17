var express = require('express');
var router = express.Router();
var path = require('path');

var SkillClass = require('../classes/skill');
var UserClass = require('../classes/user');

router.get('/', 
    UserClass.checkAuthentication,
    function(req, res) {
        SkillClass.allSkills(function(err, skills){
            if(err) {
                throw err;
            }
            res.status(200).json({
                skills: skills
            });
    });
});

router.put('/',
    UserClass.checkAuthentication,
    function(req, res) {
        UserClass.setSkills(req.user.id, req.body, function(err){
            if(err) {
                throw err;
            }
            res.status(200).json({
                msg: 'Sucesss update!'
            });
        });
});

module.exports = router;