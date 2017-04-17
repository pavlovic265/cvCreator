var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SkillSchema = new Schema({
  name: {
    type: String,
    index: true
  }
});

module.exports = mongoose.model('Skill', SkillSchema);