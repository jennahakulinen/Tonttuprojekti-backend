'use strict';
// userRoute

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/'});
const { 
    user_list_get, 
    user_get, 
    checkToken } = require('../controllers/userController');
const router = express.Router();

router.get('/token', checkToken);

router.get('/', user_list_get);

router.get('/:id', user_get);

// router.post('/', upload.single('user'), user_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit users');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete users');
});

module.exports = router;