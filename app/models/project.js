var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjcetSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Project', ProjcetSchema);