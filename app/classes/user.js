var bcrypt = require('bcryptjs');
var UserModel = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
var mongoose          = require('mongoose');

var User = {
    createUser: function(newUser, callback){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    },

    getUserByUsername: function(username, callback){
        UserModel.findOne({username: username}).populate('skills').exec(callback);
    },

    getUserById: function(id, callback){
        UserModel.findById(id).populate('skills').exec(callback);
    },

    comparePassword: function(typedPassword, hashPassword, callback){
        bcrypt.compare(typedPassword, hashPassword, function(err, isMatch) {
            if(err) {
                throw err;
            }
            callback(null, isMatch);
        });
    },

    saveImagePath: function(id, imagePath, callback){
        UserModel.findByIdAndUpdate(id, {$set: {image: imagePath}}, {new: true}, callback);
    },

    checkAuthentication: function(req,res,next){
        if(req.isAuthenticated()){
            next();
        } else{
            res.redirect("/");
        }
    },

    updateUser: function(id, update, callback){
        UserModel.update({ _id: id }, update, callback)
    },

    setSkills: function(id, newSkills, callback){
        UserModel.update({ _id: id }, { $set: { skills: newSkills } }, callback);
    },

    numberOfUsers: function(){
        return UserModel.count();
    },

    allUsers: function(startFrom, callback){
        var countQuery = UserModel.count(),
            findQuery = UserModel.find().skip(startFrom).limit(10);

        this.numberOfUsers()
            .exec(function (err, num) {
                if(err) {
                    throw err;
                }
                findQuery.exec(function(err, users) {
                    if(err) {
                        throw err;
                    }
                    callback(users, num)
                });
            });
    },

    allUsersWithQuery: function(startFrom, query, callback) {
        var countQuery = UserModel.find(query).count(),
            findQuery = UserModel.find(query).skip(startFrom).limit(10);

        countQuery.exec(function (err, num) {
            if(err) {
                throw err;
            }
            findQuery.exec(function(err, users) {
                if(err) {
                    throw err;
                }
                callback(users, num);
            });
        });
    },

    userWithUsername: function(username, callback) {
        UserModel.find({username: new RegExp('^'+username, "i")})
                .populate('skills')
                .exec(callback);
    }
};


module.exports = User;