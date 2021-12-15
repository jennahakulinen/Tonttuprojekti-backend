'use strict';
// recipeRoute

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const {
    category_list_get,
    category_get,
    category_post, } = require('../controllers/categoryController');
const router = express.Router();

router.get('/', category_list_get);

router.get('/:id', category_get);

router.post('/', category_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit recipes.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete recipes.');
});

module.exports = router;