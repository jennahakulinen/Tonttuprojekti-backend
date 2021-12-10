'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {login, user_post} = require('../controllers/authController');

router.post('/login', login);

router.post(
    '/register', 
    body('username').isLength({min: 3}).escape(), 
    body('email').isEmail(), 
    body('password').matches('(?=.*[A-Z]).{8,}'),
    body('city').isLength({min:3}).escape(),
    user_post
    );
router.post('/register', user_post)

module.exports = router;