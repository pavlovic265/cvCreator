var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstname: { type: String, index: true, required : true  },
  lastname:  { type: String, required : true  },
  email:  { type: String, required : true  },
  contact:  { type: String, default: '' },
  image: { type: String, default: '/images/default.png' },
  username:  { type: String, unique : true, required : true },
  password:  { type: String, required : true  },
  birth:  { type: Date, required : true  },
  gender:  { type: String, required : true  },
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