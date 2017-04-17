var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstname: { type: String, index: true },
  lastname:  { type: String },
  email:  { type: String },
  contact:  { type: String, default: '' },
  image: { type: String, default: '/images/default.png' },
  username:  { type: String },
  password:  { type: String },
  birth:  { type: Date },
  gender:  { type: String },
  skills: [ { type: Schema.ObjectId, ref: 'Skill', default: ''} ],
  projects: [ 
              { 
                  title: { type: String, default: ''},
                  link: { type: String, default: ''},
                  description: { type: String, default: ''}
              }
  ]
});

module.exports = mongoose.model('User', UserSchema);