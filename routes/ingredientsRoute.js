'use strict';

const express = require('express');
const {
    ingredients_list_get,
    ingredients_get,
    ingredients_post,
} = require('../controllers/ingredientsController');
const router = express.Router();

router.get('/', ingredients_list_get);

router.get('/:id', ingredients_get);

router.post('/', ingredients_post);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit recipe ingredients.');
});

router.delete('/', (req, res) => {
    res.send('From this endpoint you can delete recipe ingredients.');
});

module.exports = router;