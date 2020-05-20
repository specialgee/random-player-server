const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const uuid = require('uuid');

const DIR = './public/uploads';

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

router.post("/upload",
    upload.single('image'), (req, res, next) => {
        return res.json({
            image: req.file.path
        });
});

module.exports = router;