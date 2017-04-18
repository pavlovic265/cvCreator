// var ProjectModel = require('../models/project');
var UserModel = require('../models/user');
var mongoose = require('mongoose');

var Project = {
    addProject: function(id, project, callback){
        UserModel.findOneAndUpdate({_id: id}, {$push: {projects: project}}, { new: true }, callback);
    },
    updateProject: function(id, project, callback){
                        
        UserModel.update({'_id': id, 'projects._id': project._id},
                        { '$set': {
                                'projects.$.title': project.title,
                                'projects.$.link': project.link,
                                'projects.$.description': project.description
                            }
                        },
                        callback);
    },
    deleteProject: function(id, idProject, callback){
        UserModel.update({_id: id, 'projects._id': idProject}, 
                        {'$pull': {projects: {_id: idProject}}},
                        callback);
    }
}

module.exports = Project;