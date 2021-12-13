'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {login, user_post} = require('../controllers/authController');
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const multer = require('multer');
const upload = multer ({dest: './uploads/', fileFilter });

router.post('/login', login);

router.post(
    '/register', 
    upload.single('filename'),
    body('email').isEmail(), 
    body('username').isLength({min: 3}).escape(), 
    body('city').isLength({min: 3}).escape(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_post
    );
router.post('/register', user_post)

module.exports = router;

//email, username, city, password, filename