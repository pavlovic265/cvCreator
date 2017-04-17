var bcrypt = require('bcryptjs');
var SkillModel = require('../models/skill');

var Skill = {
    allSkills: function(callback) {
        SkillModel.find({}, callback);
    }
};


module.exports = Skill;