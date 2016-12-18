const express = require('express'),
    router = express.Router(),
    os = require('os'),
    fs = require('fs'),
    path = require('path'),
    multer = require('multer'),
    Actions = require('../Models/Task').Actions,
    Meets = require('../Models/Task').Meets,
    Notes = require('../Models/Task').Notes,
    User = require('../Models/Task').User,
    pug = require('pug'),
    async = require('async'),
    mongoose = require('mongoose');
const upload = multer({dest: os.tmpdir()});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1.pug');
});

router.get('/login', function(req, res,next) {
    router.get('/login',(req, res)=>{
        "use strict";
    if (req.session.user) {
        res.redirect("/index1");
    }
    else{
        res.render("/");
    }
});
});

router.post('/login', (req, res) => { //коллекцию "admins" нужно создавать во множественном числе (пусть даже админ 1)
    "use strict";
    User.findByEmail(req.body.username, (err, user) => {
        if (err) {
            res.redirect('/');
        }
        else {
            req.session.user = user;
            req.session.save((err) => {
                if (err) {
                    console.error(err);
                    res.redirect('/');
                }
                else {
                    res.redirect("/profile");
                }
            });
        }
    })
});
router.get('/logout', (req, res) => {
    "use strict";
    // req.logout();
    delete req.session.user;
    req.session.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/');
        }
        else {
            res.redirect("/");
        }
    });
});
router.get('/actions', function(req, res,next) {
    res.render('actions.pug');
});
router.get('/meets', function(req, res,next) {
    res.render('meets.pug');
});
router.get('/notes', function(req, res,next) {
    res.render('notes.pug');
});
router.post('/create', upload.array('files', 5), (req, res) => {
    "use strict";
    let arrayOfTask = [];
    async.parallel(arrayOfTask, (err, results) => {
    Actions.create({
            Name: req.body.Name,
            ADate: req.body.ADate,
            Place: eq.body.Place,
            Description: req.body.Description,
            Actives: req.body.Actives
            },(err, object) => {
            if (err) {
                console.error(err);
            } else {
                object.findOne({ownProject: req.body.ownProject},function (err, doc) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        doc.actions.push(object)
                    }
                })
            }
        res.status(201)
        });
});
});

module.exports = router;
