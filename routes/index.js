const express = require('express'),
    router = express.Router(),
    os = require('os'),
    fs = require('fs'),
    path = require('path'),
    multer = require('multer'),
    Actions = require('../Models/Task').Actions,
    Meets = require('../Models/Task').Meets,
    Notes = require('../Models/Task').Notes,
    User = require('../Models/Task').Users,
    pug = require('pug'),
    async = require('async'),
    mongoose = require('mongoose');
const upload = multer({dest: os.tmpdir()});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index1');
});

router.get('/login',(req, res)=>{
        "use strict";
        res.render("loginform");
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
                    res.redirect("/index1");
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
    let resultArray= [];

    res.render('actions');
});
router.get('/meets', function(req, res,next) {
    res.render('meets');
});
router.get('/notes', function(req, res,next) {
    res.render('notes');
});
router.post('/create', upload.array('files', 5), (req, res) => {
    "use strict";
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
                        doc.action.push(object);
                        console.log(object);
                    }
                })
            }
        let template = pug.renderFile(path.join(__dirname, '../Models/taskCard.pug'), {action: object});
        res.status(201).json({html: template});
        });
});


module.exports = router;
