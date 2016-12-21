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
router.get('/actions', function(req, res) {
    Actions.find({}, function (err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.render('actions.pug', {actions: data});
        }
    });

});
router.get('/meets', function(req, res) {
    Meets.find({}, function (err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.render('meets.pug', {meets: data});
        }
    });
});

router.get('/notes', function(req, res) {
    Notes.find({}, function (err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.render('notes.pug', {notes: data});
        }
    });
});
router.post('/createActions',  (req, res) => {
    "use strict";
    console.log(req.body);
    Actions.create({
            Name: req.body.Name,
            ADate: req.body.ADate,
            Place: req.body.Place,
            Description: req.body.Description,
            Actives: req.body.Actives
            },(err, object) => {
        if (err) {
            console.error(err);
        } else {
            console.log("USPESHO");
            res.status(201).json(object)
        }

    })
});
router.post('/createMeets',  (req, res) => {
    "use strict";
    console.log(req.body);
    Meets.create({
        Name: req.body.Name,
        MDate: req.body.MDate,
        Place: req.body.Place,
        Description: req.body.Description,
        Regularity: req.body.Regularity
    },(err, object) => {
        if (err) {
            console.error(err);
        } else {
            console.log("USPESHO");
            res.status(201).json(object)
        }

    })
});
router.post('/createNotes',  (req, res) => {
    "use strict";
    console.log(req.body);
    Notes.create({
        Name: req.body.Name,
        NDate: req.body.NDate,
        Tags: req.body.Tags,
        Description: req.body.Description,
        },(err, object) => {
        if (err) {
            console.error(err);
        } else {
            console.log("USPESHO");
            res.status(201).json(object)
        }

    })
});
router.post('/removeNotes',  (req, res) => {
    "use strict";
    console.log(req.body);
    Notes.findById(req.body.id, function (err, object) {

        if (err) {
            console.log(err);
        } else
            object.remove(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.status(200).json({id:req.body.id});
                }
            })
    })
    });
router.post('/removeActions',  (req, res) => {
    "use strict";
    console.log(req.body);
    Actions.findById(req.body.id, function (err, object) {

        if (err) {
            console.log(err);
        } else
            object.remove(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.status(200).json({id:req.body.id});
                }
            })
    })
});
router.post('/removeMeets',  (req, res) => {
    "use strict";
    console.log(req.body);
    Meets.findById(req.body.id, function (err, object) {

        if (err) {
            console.log(err);
        } else
            object.remove(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.status(200).json({id:req.body.id});
                }
            })
    })
});
router.post('/changeActions',  (req, res) => {
    "use strict";
    console.log(req.body);
    Actions.findByIdAndUpdate(req.body.id, function (err, object) {

        if (err) {
            console.log(err);
        } else
            object.update(function (err) {
                if (err) {
                    res.sendStatus(500);
                }
                else {
                    res.status(200).json({id:req.body.id});
                }
            })
    })
});
module.exports = router;
