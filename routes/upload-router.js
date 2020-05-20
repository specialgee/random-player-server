const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const uuid = require('uuid');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: 1024 * 1024 * 5
});

const router = express.Router();

// router.post("/upload",
//     upload(req, res, (err) => {
//        console.log("Request ---", req.body);
//        console.log("Request file ---", req.file);

//        if(!err)
//           return res.send(200).end();
//     })
//  );

// router.post("/upload",
//     upload.single('image'), (req, res, next) => {
//         return res.json({
//             image: req.file.path
//         });
// });

// User model
let User = require('../models/User');

router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    //const url = req.protocol + '://' + req.get('host')
    const url = "https://random-player-server.herokuapp.com";
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});

module.exports = router;
