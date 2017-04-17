var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var ejs = require('ejs');
var moment = require('moment');

var express = require('express');
var router = express.Router();
var UserClass = require('../classes/user');

router.get('/pdf', 
    UserClass.checkAuthentication,
    function(req, res){
        var source = 'app/download/template.ejs',
            html = fs.readFileSync(source, 'utf8'),
            pathCV = './app/download/CV.pdf',
            newDirname = (__dirname+'').replace('app\\download', 'public'),
            imgSrc = path.normalize('file://' + newDirname + req.user.image);

        downloadFile(res, html, pathCV, imgSrc, req.user, source);
});

router.get('/pdf/:username', 
    UserClass.checkAuthentication,
    function(req, res){

        var source = 'app/download/template.ejs',
            html = fs.readFileSync(source, 'utf8'),
            username = req.params.username;


        UserClass.getUserByUsername(username, function(err, user){
            if(err) {
                throw err;
            }

            var pathCV = './app/download/CV.pdf',
                newDirname = (__dirname+'').replace('app\\download', 'public'),
                imgSrc = path.normalize('file://' + newDirname + user.image);

            downloadFile(res, html, pathCV, imgSrc, user, source);
        });
});


module.exports = router;


function downloadFile(res, html, pathCV, imgSrc, user, source) {
            ejs.renderFile(path.join(__dirname+'/template.ejs'), 
                { 
                    user: user,
                    imgSrc: imgSrc,
                    moment: moment
                },
                function(err, html){
                    if(err) {
                        throw err;
                    }
                    var options = {
                            base: 'file://' + path.resolve(source),
                            format: 'A4',
                            height: "842px",
                            width: "595px",
                            footer: {
                                "height": "50px"
                            },
                            header: {
                                "height": "50px"
                            }
                        },
                        fileNameForUser = 'CV_' + user.firstname + '_' + user.lastname + '.pdf';
                    pdf.create(html, options).toFile('./app/download/CV.pdf', function(err, file){
                        if(err) {
                            throw err;
                        }
                        res.download(path.join(__dirname+'/CV.pdf'), fileNameForUser, function(err){
                            if(err){
                                    res.status(500).json(err);
                            }

                            if(fs.existsSync(pathCV)) {
                                fs.unlink(pathCV);
                            }
                        });
                    });
            });
}