var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var multipart = require('connect-multiparty');
var fs = require('fs');
var path = require('path');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

var UserModel = require('../models/user');
var UserClass = require('../classes/user');

var multipartMiddleware  = multipart();

// configure passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    UserClass.getUserByUsername(username, function(err, user){
        if(err) {
            throw err;
        }
        if(!user) {
            return done(null, false, { msg: 'Unknown User!' });
        }

        UserClass.comparePassword(password, user.password, function(err, isMatch){
            if(err) {
                throw err;
            }
            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { msg : 'Invalid password!' })
            }
        });
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    UserClass.getUserByUsername(username, function(err, user) {
        done(err, { 
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    birth: user.birth,
                    skills: user.skills,
                    projects: user.projects,
                    image: user.image,
                    contact: user.contact
                });
    });
});

router.get('/', 
    UserClass.checkAuthentication,
    function(req, res, next){
        UserClass.getUserByUsername(req.user.username, function(err, user){
            if(err) {
                throw err;
            }
            res.status(200).json({
                user: user
            });
        });
});

router.post('/register', function(req, res){
    //Fields
    var firstname =  req.body.firstname,
        lastname =  req.body.lastname,
        username =  req.body.username,
        email =  req.body.email,
        password =  req.body.password,
        password2 =  req.body.reTypePassword,
        birth =  req.body.birth,
        gender =  req.body.gender;

    //Validation
    req.checkBody('firstname', 'Firstname is required!')
        .regexFirstLastName().withMessage('Firstname is wrong format!')
        .notEmpty();
    req.checkBody('lastname', 'Lastname is required!')
        .regexFirstLastName().withMessage('Lastname is wrong format!')
        .notEmpty();
    req.checkBody('username', 'Username is required!')
        .regexUsername().withMessage('Username is wrong format!')
        .notEmpty();
    req.checkBody('email', 'Email is required!')
        .isEmail().withMessage('Email is wrong format!')
        .notEmpty();
    req.checkBody('password', 'Password is required!')
        .regexPassword().withMessage('Password is wrong format!')
        .notEmpty();
    req.assert('password', 'Passwords do not match!').equals(password2);
    req.checkBody('birth', 'Birth is required!')
        .isDate().withMessage('Date is wrong format!')
        .notEmpty();
    req.checkBody('gender', 'Gender is required!').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        throw errors
    }
    var newUser = new UserModel({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password,
                        birth: birth,
                        gender: gender
                    });
    UserClass.createUser(newUser, function(err, user){
        if(err) {
            throw err;
        }
    });

    res.status(200).json({
        msg: 'You are registred and can now login!'
    });
});

router.get('/logout',
    UserClass.checkAuthentication,
    function(req, res){
        req.logout();
        req.session = null;

        res.status(200).json({
            status: 'Logout successful!',
        });
});

router.post('/login',
    function localAuthentication(req, res, next) {
            var username =  req.body.username,
            password =  req.body.password;

        req.checkBody('username', 'Username is required!')
            .regexUsername().withMessage('Username is wrong format!')
            .notEmpty();
        req.checkBody('password', 'Password is required!')
            .regexPassword().withMessage('Password is wrong format!')
            .notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            throw errors;
        }
        passport.authenticate('local', function(err, user, info){
            if(err){
                throw err;
            }
            if(!user) {
                return res.status(403).json({ message: "No user found" });
            }

            req.login(user, function(err){
                if(err) {
                    throw err;
                }
                return res.status(200).json({
                    message: 'user authenticated',
                    user: req.user
                });
            });
        })(req, res, next); 
    }
);

router.put('/upload',
    UserClass.checkAuthentication,
    multipartMiddleware,
    function (req, res) {
        var value = random.integer(1, 1000000),
            fileName = req.body.fileName.split('.')[0],
            type = path.extname(req.body.fileName),
            err,
            oldImagePath,
            dbImagePath,
            newIamgePath; 
        req.checkBody('fileName', 'The file type is invalid.').isFileType(type);
        err = req.validationErrors();

        oldImagePath = './public/' + req.user.image;
        dbImagePath = '/images/' + (fileName + '_' + value + '_' + Date.now() + type);
        newIamgePath = './public/images/' + (fileName + '_' + value + '_' + Date.now() + type);
        if(err) {
            throw err;
        }

        fs.readFile(req.files.newImage.path, function (err, data) {
            if(err) {
                throw err;
            }
            fs.writeFile(newIamgePath, data, function (err) {
                if(err) {
                    throw err;
                }
                UserClass.saveImagePath(req.user.id, dbImagePath, function(err, user) {
                    if(err) {
                        throw err;
                    }
                    if(-1 === oldImagePath.indexOf('default.png')) {
                        fs.unlink(oldImagePath, function(err) {
                            if(err) {
                                throw err;
                            }
                            res.status(200).json({
                                image: user.image
                            });
                        });
                    } else {
                        res.status(200).json({
                            image: user.image
                        });
                    }
                });
            });
        });
    }
);

router.put('/',
    UserClass.checkAuthentication,
    function (req, res) {

        req.checkBody('firstname', 'Firstname is required!')
            .regexFirstLastName().withMessage('Firstname is wrong format!')
            .notEmpty();
        req.checkBody('lastname', 'Lastname is required!')
            .regexFirstLastName().withMessage('Lastname is wrong format!')
            .notEmpty();
        req.checkBody('email', 'Username is required!')
            .isEmail().withMessage('Email is required!')
            .notEmpty();
        req.checkBody('birth', 'Birth is required!')
            .isDate().withMessage('Date is wrong format!')
            .notEmpty();
        req.checkBody('contact').optional()
            .isContact().withMessage('Contact is wrong format!');

        var errors = req.validationErrors();

        if(errors) {
            throw errors;
        }

        UserClass.updateUser(req.user.id, req.body, function(err, numAffected){
            if(err) {
                throw err;
            }
            res.status(200).json({
                msg: "success"
            });
        });
    }
);

router.get('/:username', 
    UserClass.checkAuthentication,
    function(req, res, next){

        req.checkParams('username', 'Username is required!')
            .regexUsername().withMessage('Username is wrong format!')
            .notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            throw errors
        }

        var username = req.params.username;

        UserClass.getUserByUsername(username, function(err, user){
            if(err) {
                throw err;
            }
            res.status(200).json({
                user: user
            });
        });
});

module.exports = router;